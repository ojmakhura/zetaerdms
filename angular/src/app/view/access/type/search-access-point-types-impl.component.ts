// Generated by andromda-angular cartridge (view\view.component.imp.ts.vsl) CAN EDIT!
import { Component, inject } from '@angular/core';
import { SearchAccessPointTypesComponent } from '@app/view/access/type/search-access-point-types.component';
import { SearchAccessPointTypesVarsForm } from '@app/view/access/type/search-access-point-types.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@app/material.module';
import { TableComponent } from '@app/components/table/table.component';
import { LoaderComponent } from "@shared/loader/loader.component";
import { AppEnvStore } from '@app/store/app-env.state';
import { AuthorisationApiStore } from '@app/store/bw/co/roguesystems/zetaedrms/authorisation/authorisation-api.store';
import { UrlTree } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-access-point-types',
  templateUrl: './search-access-point-types.component.html',
  styleUrls: ['./search-access-point-types.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModule,
    TableComponent,
    LoaderComponent,
  ],
})
export class SearchAccessPointTypesImplComponent extends SearchAccessPointTypesComponent {
  private appState = inject(AppEnvStore);
  private authorisationApiStore = inject(AuthorisationApiStore);

  constructor() {
    super();
    this.accessPointTypeApiStore.reset();
    this.success = this.accessPointTypeApiStore.success;
    this.loading = this.accessPointTypeApiStore.loading;
    this.error = this.accessPointTypeApiStore.error;
    this.messages = this.accessPointTypeApiStore.messages;
    this.accessPointTypesTablePaged = false;
    this.accessPointTypesTableSignal = this.accessPointTypeApiStore.dataList;
  }

  override beforeOnInit(form: SearchAccessPointTypesVarsForm): SearchAccessPointTypesVarsForm {
    const tree: UrlTree = this.router.parseUrl(this.router.url);
    let cleanUrl = tree.root.children['primary']?.segments.map((it) => it.path).join('/') || '';

    this.authorisationApiStore.findRestrictedViewItems({
      url: encodeURIComponent(`/${cleanUrl}{`),
      roles: this.appState.realmRoles().map((role) => role.value),
    });

    this.accessPointTypeApiStore.search(this.searchAccessPointTypesForm.value);

    return form;
  }

  doNgOnDestroy(): void {}

  override beforeSearchAccessPointTypesSearch(form: any): void {
    this.accessPointTypeApiStore.search(this.searchAccessPointTypesForm.value);
  }
}
