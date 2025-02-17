
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AppState } from '@app/store/app-state';
import { SearchObject } from '@app/model/search-object';
import { Page } from '@app/model/page.model';
import { DocumentDTO } from '@app/model/bw/co/roguesystems/zetaedrms/document/document-dto';
import { DocumentApi } from '@app/service/bw/co/roguesystems/zetaedrms/document/document-api';

export type DocumentApiState = AppState<any, any> & {
  uploaded: DocumentDTO[];
};

const initialState: DocumentApiState = {
  data: null,
  dataList: [],
  dataPage: new Page<any>(),
  searchCriteria: new SearchObject<any>(),
  error: null,
  loading: false,
  success: false,
  messages: [],
  loaderMessage: '',
  uploaded: [],
};

export const DocumentApiStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store: any) => {
    const documentApi = inject(DocumentApi);
    return {
      reset: () => {
        patchState(store, initialState);
      },
      download: rxMethod<{ filePath: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return documentApi.download(data.filePath,).pipe(
            tapResponse({
              next: (data: File | any) => {
                //patchState(
                //store,
                // {
                //    data,
                //    loading: false,
                //    error: false,
                //    success: true,
                //    messages: []
                //}
                //);
              },
              error: (error: any) => {
                patchState(
                  store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error]
                }
                );
              },
            }),
          );
        }),
      ),
      findById: rxMethod<{ id: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return documentApi.findById(data.id,).pipe(
            tapResponse({
              next: (data: DocumentDTO | any) => {
                patchState(
                  store,
                  {
                    data,
                    loading: false,
                    error: false,
                    success: true,
                    messages: [`Found document information.`]
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error]
                }
                );
              },
            }),
          );
        }),
      ),
      getAll: rxMethod<void>(
        switchMap(() => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return documentApi.getAll().pipe(
            tapResponse({
              next: (dataList: DocumentDTO[] | any[]) => {
                patchState(
                  store,
                  {
                    dataList,
                    loading: false,
                    error: false,
                    success: true,
                    messages: []
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error]
                }
                );
              },
            }),
          );
        }),
      ),
      getAllPaged: rxMethod<{ pageNumber: number | any, pageSize: number | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return documentApi.getAllPaged(data.pageNumber, data.pageSize,).pipe(
            tapResponse({
              next: (dataPage: Page<DocumentDTO>) => {
                patchState(
                  store,
                  {
                    dataPage,
                    loading: false,
                    error: false,
                    success: true,
                    messages: [`Found ${dataPage.totalElements} items`]
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error]
                }
                );
              },
            }),
          );
        }),
      ),
      pagedSearch: rxMethod<{ criteria: SearchObject<string> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return documentApi.pagedSearch(data.criteria,).pipe(
            tapResponse({
              next: (dataPage: Page<DocumentDTO>) => {
                patchState(
                  store,
                  {
                    dataPage,
                    loading: false,
                    error: false,
                    success: true,
                    messages: [`Found ${dataPage.totalElements} items`]
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error]
                }
                );
              },
            }),
          );
        }),
      ),
      remove: rxMethod<{ id: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return documentApi.remove(data.id,).pipe(
            tapResponse({
              next: (data: boolean | any) => {
                patchState(
                  store,
                  {
                    loading: false,
                    error: false,
                    success: true,
                    messages: [`Removed document information.`]
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error]
                }
                );
              },
            }),
          );
        }),
      ),
      save: rxMethod<{ accessPointType: DocumentDTO | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return documentApi.save(data.accessPointType,).pipe(
            tapResponse({
              next: (data: DocumentDTO | any) => {
                patchState(
                  store,
                  {
                    data,
                    loading: false,
                    error: false,
                    success: true,
                    messages: [`Saved document information.`]
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error]
                }
                );
              },
            }),
          );
        }),
      ),
      search: rxMethod<{ criteria: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return documentApi.search(data.criteria,).pipe(
            tapResponse({
              next: (dataList: DocumentDTO[] | any[]) => {
                patchState(
                  store,
                  {
                    dataList,
                    loading: false,
                    error: false,
                    success: true,
                    messages: [`Found ${dataList.length} items`]
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error]
                }
                );
              },
            }),
          );
        }),
      ),
      upload: rxMethod<{ files: File[] }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return documentApi.upload(data.files,).pipe(
            tapResponse({
              next: (uploaded: DocumentDTO[]) => {
                patchState(
                  store,
                  {
                    uploaded,
                    loading: false,
                    error: false,
                    success: true,
                    messages: [`Uploaded ${uploaded.length} files`]
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error]
                }
                );
              },
            }),
          );
        }),
      ),
      uploadOne: rxMethod<{ file: File }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return documentApi.upload(data.files,).pipe(
            tapResponse({
              next: (data: DocumentDTO) => {
                patchState(
                  store,
                  {
                    data,
                    loading: false,
                    error: false,
                    success: true,
                    messages: [`File uploaded`]
                  }
                );
              },
              error: (error: any) => {
                patchState(
                  store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error]
                }
                );
              },
            }),
          );
        }),
      ),
    }
  }),
);
