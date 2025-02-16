import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/@shared/shared.module';
import { LoaderComponent } from '@app/@shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, SharedModule, MaterialModule, LoaderComponent],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  constructor() {}

  ngOnInit() {
    this.isLoading = true;
  }
}
