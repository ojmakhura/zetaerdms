// Generated by andromda-angular cartridge (service\service.impl.ts.vsl) CAN EDIT
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AccessPointCriteria } from '@app/model/bw/co/roguesystems/zetaedrms/access/access-point-criteria';
import { AccessPointDTO } from '@app/model/bw/co/roguesystems/zetaedrms/access/access-point-dto';
import { AccessPointListDTO } from '@app/model/bw/co/roguesystems/zetaedrms/access/access-point-list-dto';
import { HttpClient } from '@angular/common/http';
import { Page } from '@app/model/page.model';
import { SearchObject } from '@app/model/search-object';

@Injectable({
  providedIn: 'root'
})
export class AccessPointApi {
    
    protected path = '/access';

    private http = inject(HttpClient);

    public findById(id: string | any ): Observable<AccessPointDTO | any> {

        return this.http.get<AccessPointDTO | any>(this.path + `/id/${id}`);
    }

    public getAll(): Observable<AccessPointListDTO[] | any[]> {

        return this.http.get<AccessPointListDTO[] | any[]>(this.path + `/all`);
    }

    public getAllPaged(pageNumber: number | any , pageSize: number | any ): Observable<Page<AccessPointListDTO> | any> {

        return this.http.get<Page<AccessPointListDTO> | any>(this.path + `/all/paged?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }

    public pagedSearch(criteria: SearchObject<AccessPointCriteria> | any ): Observable<Page<AccessPointListDTO> | any> {

        return this.http.post<Page<AccessPointListDTO> | any>(this.path + `/search/paged`, criteria);
    }

    public pagedSearchOr(criteria: SearchObject<AccessPointCriteria> | any ): Observable<Page<AccessPointListDTO> | any> {

        return this.http.post<Page<AccessPointListDTO> | any>(this.path + `/or/search/paged`, criteria);
    }

    public remove(id: string | any ): Observable<boolean | any> {

        return this.http.delete<boolean | any>(this.path + `/id/${id}`);
    }

    public save(accessPoint: AccessPointDTO | any ): Observable<AccessPointDTO | any> {

        return this.http.post<AccessPointDTO | any>(this.path, accessPoint);
    }

    public search(criteria: AccessPointCriteria | any ): Observable<AccessPointListDTO[] | any[]> {

        return this.http.post<AccessPointListDTO[] | any[]>(this.path + `/search`, criteria);
    }

    public searchOr(criteria: AccessPointCriteria | any ): Observable<AccessPointListDTO[] | any[]> {

        return this.http.post<AccessPointListDTO[] | any[]>(this.path + `/or/search`, criteria);
    }

}
