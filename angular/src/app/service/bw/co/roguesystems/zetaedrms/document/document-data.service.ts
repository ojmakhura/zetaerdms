import { inject, Injectable } from '@angular/core';
import { DocumentDTO } from '@app/model/bw/co/roguesystems/zetaedrms/document/document-dto';
import { KeycloakService } from 'keycloak-angular';
import { DataNode, IDataService } from 'ngx-explorer';
import { Observable, of } from 'rxjs';
import { DocumentApi } from '@service/bw/co/roguesystems/zetaedrms/document/document-api';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DocumentDataService implements IDataService<DocumentDTO> {

  keycloakService = inject(KeycloakService);
  documentApi = inject(DocumentApi);

  constructor() {}

  getContent(target: DocumentDTO): Observable<{ files: DocumentDTO[]; dirs: DocumentDTO[] }> {
    console.log('getContent', target);

    return this.documentApi.getFileList(target?.filePath ? target.filePath : '/')
      .pipe(
        map((response => {
          console.log(response);
          const files = response.filter((item) => !item.dir);
          const dirs = response.filter((item) => item.dir);

          return { files, dirs };
        }))
      );
  }


  getName(document: DocumentDTO): string {
    return document.documentName;
  }

  createDir(parent: DocumentDTO, name: string): Observable<DocumentDTO> {

    const newDocument = new DocumentDTO();
    newDocument.documentName = name;
    newDocument.filePath = `${parent?.filePath ? parent?.filePath + '/' : ''}${name}`;
    newDocument.dir = true;
    newDocument.contentType = "application/directory";

    if(parent?.id) {
      newDocument.parent = parent;
    }

    return this.documentApi.save(newDocument);
  }

  delete(target: DocumentDTO[]): Observable<DocumentDTO> {
    throw new Error('Method not implemented.');
  }

  downloadFile(target: DocumentDTO): Observable<DocumentDTO> {
    throw new Error('Method not implemented.');
  }

  openTree(data: DocumentDTO): Observable<Array<DataNode<DocumentDTO>>> {

    console.log('openTree', data);

    return this.documentApi.getFileList(data.filePath)
      .pipe(
        map((response) => {
          const nodes: Array<DataNode<DocumentDTO>> = response.map((item) => ({
            data: item,
            isLeaf: item.dir,
            children: [],
          }));

          return nodes;
        })
      );
  }

  rename(target: DocumentDTO, newName: string): Observable<DocumentDTO> {
    throw new Error('Method not implemented.');
  }

  uploadFiles(parent: DocumentDTO, files: FileList): Observable<DocumentDTO> {
    console.log('uploadFiles', parent, files);
    console.log(files.length, files.item(0));
    throw new Error('Method not implemented.');
  }
}
