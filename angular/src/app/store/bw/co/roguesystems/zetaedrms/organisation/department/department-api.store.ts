
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AppState } from '@app/store/app-state';
import { SearchObject } from '@app/model/search-object';
import { Page } from '@app/model/page.model';
import { DepartmentDTO } from '@app/model/bw/co/roguesystems/zetaedrms/organisation/department/department-dto';
import { DepartmentListDTO } from '@app/model/bw/co/roguesystems/zetaedrms/organisation/department/department-list-dto';
import { DepartmentApi } from '@app/service/bw/co/roguesystems/zetaedrms/organisation/department/department-api';

export type DepartmentApiState = AppState<DepartmentDTO, DepartmentListDTO> & {
};

const initialState: DepartmentApiState = {
  data: new DepartmentDTO(),
  dataList: [],
  dataPage: new Page<any>(),
  searchCriteria: new SearchObject<any>(),
  error: null,
  loading: false,
  success: false,
  messages: [],
  loaderMessage: '',
};

export const DepartmentApiStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const departmentApi = inject(DepartmentApi);
    return {
      reset: () => {
        patchState(store, initialState);
      },
      findById: rxMethod<{ id: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return departmentApi.findById(data.id).pipe(
            tapResponse({
              next: (data: DepartmentDTO | any) => {
                patchState(store, {
                  data,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Department ${data.name} loaded successfully`],
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
          return departmentApi.getAll().pipe(
            tapResponse({
              next: (dataList: DepartmentListDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Found ${dataList.length} departments`],
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
          return departmentApi.getAllPaged(data.pageNumber, data.pageSize).pipe(
            tapResponse({
              next: (dataPage: Page<DepartmentListDTO> | any) => {
                patchState(store, {
                  dataPage,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [
                    (dataPage?.numberOfElements | 0) > 0
                      ? `Page ${dataPage.pageable.pageNumber + 1} of departments loaded successfully`
                      : 'No departments found',
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
      getOrganisationDepartments: rxMethod<{ organisationId: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return departmentApi.getOrganisationDepartments(data.organisationId).pipe(
            tapResponse({
              next: (dataList: DepartmentListDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Found ${dataList.length} departments`],
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
      getPagedOrganisationDepartments: rxMethod<{ organisationId: string; pageNumber: number; pageSize: number }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return departmentApi
            .getPagedOrganisationDepartments(data.organisationId, data.pageNumber, data.pageSize)
            .pipe(
              tapResponse({
                next: (dataPage: Page<DepartmentListDTO> | any) => {
                  patchState(store, {
                    dataPage,
                    loading: false,
                    error: false,
                    success: true,
                    messages: [
                      (dataPage?.numberOfElements | 0) > 0
                        ? `Page ${dataPage.pageable.pageNumber + 1} of departments loaded successfully`
                        : 'No departments found on page ${dataPage.pageable.pageNumber + 1}',
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
      pagedSearch: rxMethod<{ criteria: SearchObject<DepartmentListDTO> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return departmentApi.pagedSearch(data.criteria).pipe(
            tapResponse({
              next: (dataPage: Page<DepartmentListDTO> | any) => {
                patchState(store, {
                  dataPage,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [
                    (dataPage?.numberOfElements | 0) > 0
                      ? `Page ${dataPage.pageable.pageNumber + 1} of departments loaded successfully`
                      : 'No departments found on page ${dataPage.pageable.pageNumber + 1}',
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
          return departmentApi.remove(data.id).pipe(
            tapResponse({
              next: (data: boolean | any) => {
                patchState(store, {
                  data: new DepartmentDTO(),
                  dataList: [],
                  dataPage: new Page<any>(),
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Department ${data.name} removed successfully`],
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
      save: rxMethod<{ department: DepartmentDTO | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return departmentApi.save(data.department).pipe(
            tapResponse({
              next: (data: DepartmentDTO | any) => {
                patchState(store, {
                  data,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Department ${data.name} saved successfully`],
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
      search: rxMethod<{ criteria: SearchObject<DepartmentListDTO> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return departmentApi.search(data.criteria).pipe(
            tapResponse({
              next: (dataList: DepartmentListDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Found ${dataList.length} departments`],
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

