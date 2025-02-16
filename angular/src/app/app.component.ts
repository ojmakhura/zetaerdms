import { AppEnvStore } from './store/app-env.state';
import { Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { merge } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '@env/environment';
import { MaterialModule } from './material.module';
import { ShellComponent } from './shell/shell.component';
import { I18nService } from './i18n/i18n.service';
import { Logger, UntilDestroy, untilDestroyed } from './@shared';
import { AuthorisationApi } from './service/bw/co/roguesystems/zetaedrms/authorisation/authorisation-api';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { SelectItem } from './utils/select-item';
import * as nav from './shell/navigation';

const log = new Logger('App');

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule, MaterialModule],
})
export class AppComponent implements OnInit, OnDestroy {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  private titleService = inject(Title);
  private translateService = inject(TranslateService);
  private i18nService = inject(I18nService);
  readonly appStore = inject(AppEnvStore);
  private authorisationApi = inject(AuthorisationApi);
  protected keycloakService = inject(KeycloakService);
  http = inject(HttpClient);
  env = this.appStore.env;

  loadingEnv = false;

  constructor() {
    effect(() => {
      if (!this.env) {
        return;
      }

      let e = this.env();
      if (e) {
        if (e && this.loadingEnv) {
          this.loadRealmRoles(e);
          this.loadingEnv = false;
        }
      }

      let realmRoles = this.appStore.realmRoles();
    });
  }

  ngOnInit() {

    this.appStore.setAuthorisedPathsLoaded(false);
    this.loadingEnv = true;
    this.appStore.getEnv();

    // Setup logger
    if (environment.production) {
      Logger.enableProductionMode();
    }

    log.debug('init');

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

    const onNavigationEnd = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

    // Change page title on navigation or language change, based on route data
    merge(this.translateService.onLangChange, onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        switchMap((route) => route.data),
        untilDestroyed(this),
      )
      .subscribe((event) => {
        const title = event['title'];
        if (title) {
          this.titleService.setTitle(this.translateService.instant(title));
        }
      });
  }

  ngOnDestroy() {
    this.i18nService.destroy();
  }

  loadRealmRoles(env: any) {
    if (this.keycloakService.isLoggedIn()) {
      let realmUrl = `${env.authDomain}/admin/realms/${environment.keycloak.realm}`;

      this.keycloakService.loadUserProfile().then((profile) => {
        this.appStore.setIsLoggedIn(this.keycloakService.isLoggedIn());

        if (!profile) return;

        this.appStore.setAccountUri(
          `${env.authDomain}/realms/${environment.keycloak.realm}/account?referrer=' + ${encodeURIComponent(environment.keycloak.clientId)}&referrer_uri=' + ${encodeURIComponent(environment.keycloak.redirectUri)}`,
        );
        this.appStore.setUsername(this.keycloakService.getUsername());

        this.http.get<any[]>(`${realmUrl}/clients`).subscribe((clients) => {
          let client = clients.filter((client) => client.clientId === environment.keycloak.clientId)[0];
          this.http
            .get<any[]>(`${realmUrl}/users/${profile.id}/role-mappings/clients/${client.id}/composite`)
            .subscribe((roles) => {
              roles
                .sort((a, b) => a.name.localeCompare(b.name))
                .forEach((role) => {
                  if (this.keycloakService.getUserRoles().includes(role.name)) {
                    let item = new SelectItem();
                    item.label = role['description'];
                    item.value = role['name'];

                    this.appStore.addRealmRole(item);
                  }
                });

              this.loadAuthorisedPaths();
            });
        });

        this.http.get<any[]>(`${realmUrl}/users/${profile.id}/role-mappings/realm/composite`).subscribe((roles) => {
          roles
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach((role: any) => {
              if (this.keycloakService.getUserRoles().includes(role.name) && !role.description?.includes('${')) {
                let item = new SelectItem();
                item.label = role['description'];
                item.value = role['name'];

                this.appStore.addRealmRole(item);
              }
            });
          this.loadAuthorisedPaths();
        });
      });
    }
  }

  loadAuthorisedPaths() {
    let loggedIn = this.keycloakService.isLoggedIn();

    if (loggedIn && this.appStore.realmRoles().length > 0) {
      this.appStore.setAuthorisedPathsLoaded(false);
      let menus = new Array<string>();
      menus.push('MENU');
      menus.push('VIEW');

      this.authorisationApi
        .getAccessTypeCodeAuthorisations(
          this.appStore.realmRoles().map((role) => role.value),
          menus,
        )
        .subscribe({
          next: (authorisations) => {
            this.appStore.addMenus(
              nav.menuItems.map((menu) => {
                let m = authorisations.find((auth) => auth.accessPointUrl === menu.routerLink);
                if (m) {
                  return menu;
                }
              }),
            );

            this.appStore.setLoadingMenus(false);
            this.appStore.setAuthorisedPaths(authorisations.map((auth) => auth.accessPointUrl));
            this.appStore.setAuthorisedPathsLoaded(true);
          },
          error: (error) => {
            this.appStore.setAuthorisedPathsLoaded(true);
          },
          complete: () => {},
        });
    }
  }
}
