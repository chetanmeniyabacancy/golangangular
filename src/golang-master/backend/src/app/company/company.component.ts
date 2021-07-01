import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../shared/company.service';
import { Company } from '../shared/company.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import{ GlobalConstants } from '../common/global-constants';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {
  constructor(public service: CompanyService,public router: Router,private http: HttpClient,
    private toastr: ToastrService) { }
    alldata: any;
    companies: Company[];
    dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    // this.service.refreshList().subscribe(data => {
    //   this.alldata = data;
    //   this.companies = this.alldata.data;
    // });
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http.post<DataTablesResponse>(
            GlobalConstants.apiURL+"company/listfordatatables",
            dataTablesParameters, {}
          ).subscribe(resp =>  {
            that.alldata = resp.data;
            that.companies = that.alldata.companies;
            callback({
              recordsTotal: that.alldata.recordsTotal,
              recordsFiltered: that.alldata.recordsTotal,
              data: []
            });
          });
      },
      columns: [{ data: 'id' }, { data: 'name' }, { data: 'status' }]
    }
  }

  populateForm(selectedRecord: Company) {
    this.service.formData = Object.assign({}, selectedRecord);
    this.router.navigate(['/company/update']);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteCompanyDetail(id)
        .subscribe(
          data => {
            this.alldata = data;
            if(this.alldata.status == 1) {
              this.toastr.error("Deleted successfully", 'Company Details');
                this.router.navigateByUrl('/').then(() => {
                    this.router.navigate(['/company/list']);
                });            
            } else {
              this.toastr.error(this.alldata.message, 'Company Details');
            }
            
          },
          err => { console.log(err) }
        )
    }
  }
}
