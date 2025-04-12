import { HttpClient } from '@angular/common/http';
// Generated by andromda-angular cartridge (view\view.component.imp.ts.vsl) CAN EDIT!
import { Component, effect, inject, signal } from '@angular/core';
import { SearchAuthorisationsComponent } from '@app/view/authorisation/search-authorisations.component';
import { SearchAuthorisationsVarsForm } from '@app/view/authorisation/search-authorisations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@app/material.module';
import { TableComponent } from '@app/components/table/table.component';
import { LoaderComponent } from "@shared/loader/loader.component";
import { AuthorisationSearchImplComponent } from '@app/components/authorisation/authorisation-search-impl.component';
import { KeycloakService } from 'keycloak-angular';
import { AppEnvStore } from '@app/store/app-env.state';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { UrlTree } from '@angular/router';
import { AuthorisationCriteria } from '@app/model/bw/co/roguesystems/zetaedrms/authorisation/authorisation-criteria';
import { SearchObject } from '@app/model/search-object';

export enum SearchAuthorisationsRestrictions {
  DELETE_BUTTON = '/authorisation/search{button:delete}',
}

@Component({
  selector: 'app-search-authorisations',
  templateUrl: './search-authorisations.component.html',
  styleUrls: ['./search-authorisations.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModule,
    TableComponent,
    LoaderComponent,
    AuthorisationSearchImplComponent,
  ],
})
export class SearchAuthorisationsImplComponent extends SearchAuthorisationsComponent {

  protected keycloakService: KeycloakService = inject(KeycloakService);
  http = inject(HttpClient);
  readonly appStore = inject(AppEnvStore);
  realmRoles = this.appStore.realmRoles;

  constructor() {
    super();
    this.authorisationApiStore.reset();
    this.success = this.authorisationApiStore.success;
    this.loading = this.authorisationApiStore.loading;
    this.error = this.authorisationApiStore.error;
    this.messages = this.authorisationApiStore.messages;
    this.loaderMessage = this.authorisationApiStore.loaderMessage;
    this.authorisationsTablePaged = true;
    this.authorisationsTableSignal = this.authorisationApiStore.dataPage;

    effect(() => {
      let restrictedItems = this.authorisationApiStore.dataList();

      if (restrictedItems) {
        restrictedItems.forEach((item) => {
          if (item.url === SearchAuthorisationsRestrictions.DELETE_BUTTON) {
            // this.deleteUnrestricted = signal(true);
          }
        });
      }
    });
  }

  override beforeOnInit(form: SearchAuthorisationsVarsForm): SearchAuthorisationsVarsForm {
    return form;
  }

  doNgOnDestroy(): void {}

  override doNgAfterViewInit(): void {
    this.authorisationsTable?.tablePaginator?.page?.subscribe({
      next: (paginator: MatPaginator) => {
        this.doSearch(paginator.pageIndex, paginator.pageSize);
      },
    });
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    let cleanUrl = tree.root.children['primary']?.segments.map((it) => it.path).join('/') || '';

    this.authorisationApiStore.findRestrictedViewItems({
      url: encodeURIComponent(`/${cleanUrl}{`),
      roles: this.appStore.realmRoles().map((role) => role.value),
    });

    this.doSearch();
  }

  override beforeSearchAuthorisationsSearch(form: any): void {
    form.criteria = this.criteria.formGroupControl.value;
    this.doSearch();
  }

  private doSearch(pageNumber: number = 0, pageSize: number = 10): void {
    let criteria = new SearchObject<AuthorisationCriteria>();
    criteria.criteria = this.criteria.formGroupControl.value;

    let tmp: Set<string> = criteria.criteria.roles;
    let roles: Array<string> = [];

    tmp.forEach((role) => {
      roles.push(role);
    });

    criteria.criteria.roles = roles;

    criteria.pageNumber = pageNumber;
    criteria.pageSize = pageSize;

    this.authorisationApiStore.searchPaged({ criteria: criteria });
  }

  override afterOnInit(): void {}
}
