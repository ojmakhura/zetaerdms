// Generated by andromda-angular cartridge (view\view.component.imp.ts.vsl) CAN EDIT!
import { Component, effect, inject, signal } from '@angular/core';
import { EditAccessPointComponent } from '@app/view/access/edit-access-point.component';
import { EditAccessPointVarsForm } from '@app/view/access/edit-access-point.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from "@shared/loader/loader.component";
import { AppEnvStore } from '@app/store/app-env.state';
import { AuthorisationApiStore } from '@app/store/bw/co/roguesystems/zetaedrms/authorisation/authorisation-api.store';
import { UrlTree } from '@angular/router';
import { CommonModule } from '@angular/common';

export enum EditAccessPointRestrictions {
  DELETE_BUTTON = '/access/edit{button:delete}',
}

@Component({
  selector: 'app-edit-access-point',
  templateUrl: './edit-access-point.component.html',
  styleUrls: ['./edit-access-point.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModule,
    LoaderComponent,
  ],
})
export class EditAccessPointImplComponent extends EditAccessPointComponent {
  deleting = false;

  private appState = inject(AppEnvStore);
  private authorisationApiStore = inject(AuthorisationApiStore);

  constructor() {
    super();
    this.accessPointApiStore.reset();
    this.success = this.accessPointApiStore.success;
    this.loading = this.accessPointApiStore.loading;
    this.error = this.accessPointApiStore.error;
    this.messages = this.accessPointApiStore.messages;
    this.loaderMessage = this.accessPointApiStore.loaderMessage;

    effect(() => {
      let restrictedItems = this.authorisationApiStore.dataList();

      if (restrictedItems) {
        restrictedItems.forEach((item) => {
          if (item === EditAccessPointRestrictions.DELETE_BUTTON) {
            // this.deleteUnrestricted = signal(true);
          }
        });
      }

      if (this.success() && this.deleting) {
        this.deleting = false;
        this.router.navigate(['/access']);
      }
    });
  }

  override beforeOnInit(form: EditAccessPointVarsForm): EditAccessPointVarsForm {
    this.route.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.accessPointApiStore.findById(params);
      }
    });

    const tree: UrlTree = this.router.parseUrl(this.router.url);
    let cleanUrl = tree.root.children['primary']?.segments.map((it) => it.path).join('/') || '';

    this.authorisationApiStore.findRestrictedViewItems({
      url: encodeURIComponent(`/${cleanUrl}{`),
      roles: this.appState.realmRoles().map((role) => role.value),
    });

    return form;
  }

  doNgOnDestroy(): void {}

  override beforeEditAccessPointSave(form: any): void {
    if (this.editAccessPointForm.invalid) {
      return;
    }

    // let accessPoint = this.accessPoint.formGroupControl.value;
    // this.accessPointApiStore.save({ accessPoint });
  }

  override beforeEditAccessPointDelete(): void {
    if (confirm('Are you sure you want to delete this access point? This action cannot be undone.')) {
      this.deleting = true;
      // let accessPoint = this.accessPoint.formGroupControl.value;
      // this.accessPointApiStore.remove({ id: accessPoint.id });
    }
  }

  override doNgAfterViewInit(): void {
    // this.editAccessPointForm = this.accessPoint.formGroupControl;
  }

  override editAccessPointFormReset() {
    super.editAccessPointFormReset();
    // this.accessPoint.accessPointTypeFilteredList$ = of([]);
  }
}
