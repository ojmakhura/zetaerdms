import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import * as nav from './navigation';
import { LanguageSelectorComponent } from '@app/i18n/language-selector.component';
import { KeycloakService } from 'keycloak-angular';
import { AppEnvStore } from '@app/store/app-env.state';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, MaterialModule, RouterModule, LanguageSelectorComponent],
})
export class ShellComponent implements OnInit {
  menus: any[] = [];
  private keycloakService = inject(KeycloakService);
  readonly appStore = inject(AppEnvStore);
  env = this.appStore.env;
  protected router: Router = inject(Router);

  constructor(
    private titleService: Title,
    private breakpoint: BreakpointObserver,
  ) {}

  ngOnInit() {
    this.menus = nav.menuItems;
  }

  logout() {
    let e = this.env ? this.env() : null;
    this.keycloakService.logout(window.location.origin).then(() => {});
  }

  get username(): string | null {
    return null;
  }

  get isMobile(): boolean {
    return this.breakpoint.isMatched(Breakpoints.Small) || this.breakpoint.isMatched(Breakpoints.XSmall);
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
