// Generated by andromda-angular cartridge (view\view.component.imp.ts.vsl) CAN EDIT!
import { Component } from '@angular/core';
import { EditDepartmentComponent } from '@app/view/organisation/department/edit-department.component';
import { EditDepartmentVarsForm } from '@app/view/organisation/department/edit-department.component';
import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@app/material.module';
import { TableComponent } from '@app/components/table/table.component';
import { LoaderComponent } from "@shared/loader/loader.component";
import { DepartmentSearchImplComponent } from '@app/components/organisation/department/department-search-impl.component';
import { DepartmentDetailsImplComponent } from '@app/components/organisation/department/department-details-impl.component';
import { DepartmentEditorImplComponent } from '@app/components/organisation/department/department-editor-impl.component';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModule,
    TableComponent,
    LoaderComponent,
    DepartmentSearchImplComponent,
    DepartmentDetailsImplComponent,
    DepartmentEditorImplComponent,
  ],
})
export class EditDepartmentImplComponent extends EditDepartmentComponent {

    constructor() {
        super();
    }

    override beforeOnInit(form: EditDepartmentVarsForm): EditDepartmentVarsForm{
        return form;
    }

    doNgOnDestroy(): void {
    }
}
