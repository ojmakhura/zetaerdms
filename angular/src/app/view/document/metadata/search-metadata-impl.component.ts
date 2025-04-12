// Generated by andromda-angular cartridge (view\view.component.imp.ts.vsl) CAN EDIT!
import { Component } from '@angular/core';
import { SearchMetadataComponent } from '@app/view/document/metadata/search-metadata.component';
import { SearchMetadataVarsForm } from '@app/view/document/metadata/search-metadata.component';
import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@app/material.module';
import { TableComponent } from '@app/components/table/table.component';
import { LoaderComponent } from "@shared/loader/loader.component";

@Component({
  selector: 'app-search-metadata',
  templateUrl: './search-metadata.component.html',
  styleUrls: ['./search-metadata.component.scss'],
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
export class SearchMetadataImplComponent extends SearchMetadataComponent {

    constructor() {
        super();
    }

    override beforeOnInit(form: SearchMetadataVarsForm): SearchMetadataVarsForm{
        return form;
    }

    doNgOnDestroy(): void {
    }
}
