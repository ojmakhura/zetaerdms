
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { AppState } from '@app/store/app-state';
import { SearchObject } from '@app/model/search-object';
import { Page } from '@app/model/page.model';
import { UserDTO } from '@app/model/bw/co/roguesystems/zetaedrms/user/user-dto';
import { UserApi } from '@app/service/bw/co/roguesystems/zetaedrms/user/user-api';

export type UserApiState = AppState<any, any> & {};

const initialState: UserApiState = {
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

export const UserApiStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const userApi = inject(UserApi);
    return {
      reset: () => {
        patchState(store, initialState);
      },
      addRole: rxMethod<{ userId: string | any; role: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return userApi.addRole(data.userId, data.role).pipe(
            tapResponse({
              next: (data: boolean | any) => {
                patchState(store, {
                  loading: false,
                  error: false,
                  success: true,
                  messages: ['Role added'],
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
      changePassword: rxMethod<{ userId: string | any; newPassword: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return userApi.changePassword(data.userId, data.newPassword).pipe(
            tapResponse({
              next: (data: string | any) => {
                patchState(store, {
                  data,
                  loading: false,
                  error: false,
                  success: true,
                  messages: ['Password changed.'],
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
      findByClientRoles: rxMethod<{ roles: Set<string> | any; clientId: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return userApi.findByClientRoles(data.roles, data.clientId).pipe(
            tapResponse({
              next: (dataList: UserDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Found ${dataList.length} users`],
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
      findByDepartmentId: rxMethod<{ departmentId: number | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return userApi.findByDepartmentId(data.departmentId).pipe(
            tapResponse({
              next: (dataList: UserDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Users found for department id: ${data.name}`],
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
      findByDepartmentName: rxMethod<{ departmentName: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return userApi.findByDepartmentName(data.departmentName).pipe(
            tapResponse({
              next: (dataList: UserDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Users found for department ${data.name}`],
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
      findByRealmRoles: rxMethod<{ roles: Set<string> | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return userApi.findByRealmRoles(data.roles).pipe(
            tapResponse({
              next: (dataList: UserDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [],
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
      findUserById: rxMethod<{ userId: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return userApi.findUserById(data.userId).pipe(
            tapResponse({
              next: (data: UserDTO | any) => {
                patchState(store, {
                  data,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`User found: ${data.username}`],
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
      loadUsers: rxMethod<void>(
        switchMap(() => {
          patchState(store, { loading: true });
          return userApi.loadUsers().pipe(
            tapResponse({
              next: (dataList: UserDTO[] | any[]) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Loaded ${dataList.length} users`],
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
      removeRole: rxMethod<{ userId: string | any; role: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return userApi.removeRole(data.userId, data.role).pipe(
            tapResponse({
              next: (data: boolean | any) => {
                patchState(store, {
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Role removed`],
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
      saveUser: rxMethod<{ user: UserDTO | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return userApi.saveUser(data.user).pipe(
            tapResponse({
              next: (data: UserDTO | any) => {
                patchState(store, {
                  data,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`User ${data.username} saved.`],
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
      search: rxMethod<{ criteria: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return userApi.search(data.criteria).pipe(
            tapResponse({
              next: (dataList: UserDTO[] | any) => {
                patchState(store, {
                  dataList,
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Found ${dataList.length} users`],
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
      updateUserName: rxMethod<{ userId: string | any; username: string | any }>(
        switchMap((data: any) => {
          patchState(store, { loading: true });
          return userApi.updateUserName(data.userId, data.username).pipe(
            tapResponse({
              next: (data: boolean | any) => {
                patchState(store, {
                  loading: false,
                  error: false,
                  success: true,
                  messages: [`Username updated`],
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
