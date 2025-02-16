
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AppState } from '@app/store/app-state';
import { SearchObject } from '@app/model/search-object';
import { Page } from '@app/model/page.model';
import { MetadataDTO } from '@app/model/bw/co/roguesystems/zetaedrms/document/metadata/metadata-dto';
import { MetadataApi } from '@app/service/bw/co/roguesystems/zetaedrms/document/metadata/metadata-api';

export type MetadataApiState = AppState<any, any> & {};

const initialState: MetadataApiState = {
  data: null,
  dataList: [],
  dataPage: new Page<any>(),
  searchCriteria: new SearchObject<any>(),
  error: null,
  loading: false,
  success: false,
  messages: [],
  loaderMessage: ''
};

export const MetadataApiStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store: any) => {
    const metadataApi = inject(MetadataApi);
    return {
      reset: () => {
        patchState(store, initialState);
      },
      findById: rxMethod<{id: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return metadataApi.findById(data.id, ).pipe(
            tapResponse({
              next: (data: MetadataDTO | any) => {
                patchState(
                  store,
                  {
                     data,
                     loading: false,
                     error: false,
                     success: true,
                     messages: [`Metadata found.`]
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
          return metadataApi.getAll().pipe(
            tapResponse({
              next: (dataList: MetadataDTO[] | any[]) => {
                patchState(
                  store,
                  {
                    dataList,
                     loading: false,
                     error: false,
                     success: true,
                     messages: [`${dataList.length} Metadata found.`]
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
      getAllPaged: rxMethod<{pageNumber: number | any , pageSize: number | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return metadataApi.getAllPaged(data.pageNumber, data.pageSize, ).pipe(
            tapResponse({
              next: (dataPage: Page<MetadataDTO> | any) => {
                patchState(
                  store,
                  {
                     dataPage,
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
      pagedSearch: rxMethod<{criteria: SearchObject<string> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return metadataApi.pagedSearch(data.criteria, ).pipe(
            tapResponse({
              next: (dataPage: Page<MetadataDTO> | any) => {
                patchState(
                  store,
                  {
                     dataPage,
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
      remove: rxMethod<{id: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return metadataApi.remove(data.id, ).pipe(
            tapResponse({
              next: (data: boolean | any) => {
                patchState(
                  store,
                  {
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
      save: rxMethod<{metadata: MetadataDTO | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return metadataApi.save(data.metadata, ).pipe(
            tapResponse({
              next: (data: MetadataDTO | any) => {
                patchState(
                  store,
                  {
                     data,
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
      search: rxMethod<{criteria: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return metadataApi.search(data.criteria, ).pipe(
            tapResponse({
              next: (dataList: MetadataDTO[] | any[]) => {
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
    }
  }),
);
