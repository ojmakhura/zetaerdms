import { Component, ElementRef, HostListener, inject, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/@shared/shared.module';
import { DocumentApiStore } from '@app/store/bw/co/roguesystems/zetaedrms/document/document-api.store';
import { DataService, ExplorerComponent, ExplorerService } from 'ngx-explorer';
import { DocumentDataService } from '@app/service/bw/co/roguesystems/zetaedrms/document/document-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, SharedModule, MaterialModule, ExplorerComponent],
  providers: [
    {
      provide: DataService,
      useClass: DocumentDataService,
    },
  ],
})
export class HomeComponent implements OnInit {
  files: any[] = [];
  documentApiStore = inject(DocumentApiStore);
  private explorerService = inject(ExplorerService);

  constructor() {
    this.explorerService.openNode();

    // subscribe to tree updates
    this.explorerService.root$.subscribe((root) => {
      console.log('Root:', root);
    });
  }

  ngOnInit() {}

  /**
   * on file drop handler
   */
  onFileDropped(event: any) {
    console.log(event);
    this.prepareFilesList(event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler($event: any) {
    console.log($event);
    this.prepareFilesList($event.target.files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 2);
      }
    }, 2);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      console.log(item);
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals?: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  uploadFiles() {
    console.log(this.files);
    // this.documentApiStore.upload({files: this.files});
    // this.documentApiStore.uploadOne({file: this.files[0]});
  }

  onDragLeave($event: DragEvent) {
    console.log($event);
  }
  onDragOver($event: DragEvent) {
    console.log('onDragOver', $event);
  }
}
