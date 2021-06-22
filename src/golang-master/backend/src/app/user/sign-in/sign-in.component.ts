import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  constructor(public service: UserService,public router: Router,
    private toastr: ToastrService) { }
    alldata: any;
    

  ngOnInit(): void {
    if (localStorage.getItem('userToken') != null) {
      this.router.navigate(['/company/list']);
    }
  }

  onSubmit(form: NgForm) {
    this.service.postLogin().subscribe(
      data => {
        this.alldata = data;
        if(this.alldata.status == 1) {
          this.resetForm(form);
          this.toastr.success('Login successfully', 'Sign In');
          localStorage.setItem('userToken',this.alldata.data.token);
          this.router.navigate(['/company/list']);
        } else {
          if(this.alldata.data?.errors) {
            this.toastr.error(this.alldata.data.errors[0], 'User Details');
          } else {
            this.toastr.error(this.alldata.message, 'User Details');
          }
        }
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    this.service.formData.Email = '';
    this.service.formData.Password = '';
  }
  
  logout() {
    localStorage.removeItem('userToken')
    this.router.navigate(['/login']);
  }

}