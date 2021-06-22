import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Company } from './company.model';
import{ GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  constructor(private http: HttpClient) { }

  formData: Company = new Company();
  list: Company[];

  postCompanyDetail() {
    return this.http.post(GlobalConstants.apiURL+"company/", this.formData);
  }

  putCompanyDetail() {
    const body = new HttpParams()
    .set('name', this.formData.name)
    .set('status', String(this.formData.status));

    return this.http.put(`${GlobalConstants.apiURL}company/${this.formData.id}`,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    );
  }

  deleteCompanyDetail(id: number) {
    return this.http.delete(`${GlobalConstants.apiURL}company/${id}`);
  }

  refreshList() {
    return this.http.get(GlobalConstants.apiURL+"company/list");
  }


}
