
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AppState } from '@app/store/app-state';
import { SearchObject } from '@app/model/search-object';
import { Page } from '@app/model/page.model';
import { OrganisationListDTO } from '@app/model/bw/co/roguesystems/zetaedrms/organisation/organisation-list-dto';
import { OrganisationDTO } from '@app/model/bw/co/roguesystems/zetaedrms/organisation/organisation-dto';
import { OrganisationApi } from '@app/service/bw/co/roguesystems/zetaedrms/organisation/organisation-api';

export type OrganisationApiState = AppState<any, any> & {};

const initialState: OrganisationApiState = {
  data: null,
  dataList: [],
  dataPage: new Page<any>(),
  searchCriteria: new SearchObject<any>(),
  error: null,
  loading: false,
  success: false,
  messages: [],
  loaderMessage: '',
};

export const OrganisationApiStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const organisationApi = inject(OrganisationApi);
    return {
      reset: () => {
        patchState(store, initialState);
      },
      findById: rxMethod<{ id: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return organisationApi.findById(data.id).pipe(
            tapResponse({
              next: (data: OrganisationDTO | any) => {
                patchState(store, {
                  data,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Organisation ${data.name} loaded successfully`],
                });
              },
              error: (error: any) => {
                patchState(store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error],
                });
              },
            }),
          );
        }),
      ),
      getAll: rxMethod<void>(
        switchMap(() => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return organisationApi.getAll().pipe(
            tapResponse({
              next: (dataList: OrganisationDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Found ${dataList.length} organisations`],
                });
              },
              error: (error: any) => {
                patchState(store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error],
                });
              },
            }),
          );
        }),
      ),
      getAllPaged: rxMethod<{ pageNumber: number | any; pageSize: number | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return organisationApi.getAllPaged(data.pageNumber, data.pageSize).pipe(
            tapResponse({
              next: (dataPage: Page<OrganisationListDTO> | any) => {
                patchState(store, {
                  dataPage,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [
                    (dataPage?.numberOfElements | 0) > 0
                      ? `Page ${dataPage.pageable.pageNumber + 1} of organisations loaded successfully`
                      : `No organisations found in page ${dataPage.pageable.pageNumber + 1}`,
                  ],
                });
              },
              error: (error: any) => {
                patchState(store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error],
                });
              },
            }),
          );
        }),
      ),
      pagedSearch: rxMethod<{ criteria: SearchObject<OrganisationListDTO> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Loading ...' });
          return organisationApi.pagedSearch(data.criteria).pipe(
            tapResponse({
              next: (dataPage: Page<OrganisationListDTO> | any) => {
                patchState(store, {
                  dataPage,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [
                    (dataPage?.numberOfElements | 0) > 0
                      ? `Page ${dataPage.pageable.pageNumber + 1} of organisations loaded successfully`
                      : `No organisations found in page ${dataPage.pageable.pageNumber + 1}`,
                  ],
                });
              },
              error: (error: any) => {
                patchState(store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error],
                });
              },
            }),
          );
        }),
      ),
      remove: rxMethod<{ id: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return organisationApi.remove(data.id).pipe(
            tapResponse({
              next: (data: boolean | any) => {
                patchState(store, {
                  data: new OrganisationDTO(),
                  dataList: [],
                  dataPage: new Page<any>(),
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Organisation removed successfully`],
                });
              },
              error: (error: any) => {
                patchState(store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error],
                });
              },
            }),
          );
        }),
      ),
      save: rxMethod<{ organisation: OrganisationDTO | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Saving ...' });
          return organisationApi.save(data.organisation).pipe(
            tapResponse({
              next: (data: OrganisationDTO | any) => {
                patchState(store, {
                  data,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Organisation ${data.name} saved successfully`],
                });
              },
              error: (error: any) => {
                patchState(store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error],
                });
              },
            }),
          );
        }),
      ),
      search: rxMethod<{ criteria: SearchObject<OrganisationListDTO> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Searching ...' });
          return organisationApi.search(data.criteria).pipe(
            tapResponse({
              next: (dataList: OrganisationListDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Found ${dataList.length} organisations`],
                });
              },
              error: (error: any) => {
                patchState(store, {
                  error,
                  loading: false,
                  success: false,
                  messages: [error?.error ? error.error : error],
                });
              },
            }),
          );
        }),
      ),
    };
  }),
);
