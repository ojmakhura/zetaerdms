// Generated by andromda-angular cartridge (view\view.component.imp.ts.vsl) CAN EDIT!
import { Component } from '@angular/core';
import { EditOrganisationComponent } from '@app/view/organisation/edit-organisation.component';
import { EditOrganisationVarsForm } from '@app/view/organisation/edit-organisation.component';
import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@app/material.module';
import { TableComponent } from '@app/components/table/table.component';
import { LoaderComponent } from "@shared/loader/loader.component";
import { OrganisationDetailsImplComponent } from '@app/components/organisation/organisation-details-impl.component';
import { OrganisationEditorImplComponent } from '@app/components/organisation/organisation-editor-impl.component';

@Component({
  selector: 'app-edit-organisation',
  templateUrl: './edit-organisation.component.html',
  styleUrls: ['./edit-organisation.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModule,
    TableComponent,
    LoaderComponent,
    OrganisationDetailsImplComponent,
    OrganisationEditorImplComponent,
  ],
})
export class EditOrganisationImplComponent extends EditOrganisationComponent {

    constructor() {
        super();
    }

    override beforeOnInit(form: EditOrganisationVarsForm): EditOrganisationVarsForm{
        return form;
    }

    doNgOnDestroy(): void {
    }
}
