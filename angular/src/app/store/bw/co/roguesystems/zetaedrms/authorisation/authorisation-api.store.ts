
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AppState } from '@app/store/app-state';
import { SearchObject } from '@app/model/search-object';
import { Page } from '@app/model/page.model';
import { AuthorisationListDTO } from '@app/model/bw/co/roguesystems/zetaedrms/authorisation/authorisation-list-dto';
import { AuthorisationDTO } from '@app/model/bw/co/roguesystems/zetaedrms/authorisation/authorisation-dto';
import { AuthorisationCriteria } from '@app/model/bw/co/roguesystems/zetaedrms/authorisation/authorisation-criteria';
import { AuthorisationApi } from '@app/service/bw/co/roguesystems/zetaedrms/authorisation/authorisation-api';

export type AuthState = {
  data: AuthorisationDTO;
  dataList: AuthorisationListDTO[];
  dataPage: Page<AuthorisationListDTO>;
  searchCriteria: SearchObject<AuthorisationCriteria>;
  error: any;
  loading: boolean;
  success: boolean;
  messages: string[];
  loaderMessage: string;
  restrictedViewItems: string[];
};

const initialState: AppState<any, any> = {
  data: null,
  dataList: [],
  dataPage: new Page<any>(),
  searchCriteria: new SearchObject<any>(),
  // restrictedViewItems: [],
  error: null,
  loading: false,
  success: false,
  messages: [],
  loaderMessage: '',
};

export const AuthorisationApiStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const authorisationApi = inject(AuthorisationApi);
    return {
      reset: () => {
        patchState(store, initialState);
      },
      findById: rxMethod<{ id: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true, loaderMessage: 'Authorisation loading...' });
          return authorisationApi.findById(data.id).pipe(
            tapResponse({
              next: (data: AuthorisationDTO | any) => {
                patchState(store, {
                  data,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Authorisation found.`],
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
      findByRolesAndUrl: rxMethod<{ url: string | any; roles: Set<string> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return authorisationApi.findByRolesAndUrl(data.url, data.roles).pipe(
            tapResponse({
              next: (dataList: AuthorisationDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Found ${data.length} authorisations.`],
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
      findByRolesAndUrlPaged: rxMethod<{
        url: string | any;
        roles: Set<string> | any;
        pageNumber: number | any;
        pageSize: number | any;
      }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return authorisationApi.findByRolesAndUrlPaged(data.url, data.roles, data.pageNumber, data.pageSize).pipe(
            tapResponse({
              next: (dataPage: AuthorisationDTO | any) => {
                patchState(store, {
                  dataPage,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [
                    `Found ${dataPage.numberOfElements} of ${dataPage.totalElements} in page ${dataPage.number} of ${dataPage.totalPages}`,
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
      findRestrictedViewItems: rxMethod<{ url: string | any; roles: Set<string> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return authorisationApi.findRestrictedViewItems(data.url, data.roles).pipe(
            tapResponse({
              next: (dataList: AuthorisationDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  // success: true,
                  // messages: [`Found ${data.length} authorisations.`],
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
      getAccessTypeCodeAuthorisations: rxMethod<{ roles: Set<string> | any; accessPointTypeCodes: Set<string> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return authorisationApi.getAccessTypeCodeAuthorisations(data.roles, data.accessPointTypeCodes).pipe(
            tapResponse({
              next: (dataList: AuthorisationDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Found ${data.length} authorisations.`],
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
      getAccessTypeCodeAuthorisationsPaged: rxMethod<{
        roles: Set<string> | any;
        accessPointTypeCodes: Set<string> | any;
        pageNumber: number | any;
        pageSize: number | any;
      }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return authorisationApi
            .getAccessTypeCodeAuthorisationsPaged(data.roles, data.accessPointTypeCodes, data.pageNumber, data.pageSize)
            .pipe(
              tapResponse({
                next: (dataPage: Page<AuthorisationDTO> | any) => {
                  patchState(store, {
                    dataPage,
                    loading: false,
                    error: false,
                    success: true,
                    messages: [
                      `Found ${dataPage.numberOfElements} of ${dataPage.totalElements} in page ${dataPage.number} of ${dataPage.totalPages}`,
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
      getAll: rxMethod<void>(
        switchMap(() => {
          patchState(store, { loading: true });
          return authorisationApi.getAll().pipe(
            tapResponse({
              next: (dataList: AuthorisationDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Found ${dataList.length} authorisations.`],
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
          patchState(store, { loading: true });
          return authorisationApi.getAllPaged(data.pageNumber, data.pageSize).pipe(
            tapResponse({
              next: (dataPage: Page<AuthorisationDTO> | any) => {
                patchState(store, {
                  dataPage,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [
                    `Found ${dataPage.numberOfElements} of ${dataPage.totalElements} in page ${dataPage.number + 1} of ${dataPage.totalPages}`,
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
          return authorisationApi.remove(data.id).pipe(
            tapResponse({
              next: (data: boolean | any) => {
                patchState(store, {
                  data: new AuthorisationDTO(),
                  dataList: [],
                  dataPage: new Page<any>(),
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Authorisation removed.`],
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
      save: rxMethod<{ authorisation: AuthorisationDTO | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return authorisationApi.save(data.authorisation).pipe(
            tapResponse({
              next: (data: AuthorisationDTO | any) => {
                patchState(store, {
                  data,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Authorisation saved.`],
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
      search: rxMethod<{ criteria: AuthorisationCriteria | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return authorisationApi.search(data.criteria).pipe(
            tapResponse({
              next: (dataList: AuthorisationDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Found ${dataList.length} authorisations.`],
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
      searchPaged: rxMethod<{ criteria: SearchObject<AuthorisationCriteria> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return authorisationApi.searchPaged(data.criteria).pipe(
            tapResponse({
              next: (dataPage: Page<AuthorisationDTO> | any) => {
                patchState(store, {
                  dataPage,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [
                    `Found ${dataPage.numberOfElements} of ${dataPage.totalElements} in page ${dataPage.number + 1} of ${dataPage.totalPages}`,
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
    };
  }),
);
