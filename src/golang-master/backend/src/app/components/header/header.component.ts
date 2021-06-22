import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router,public service: UserService,private toastr: ToastrService) { }
  alldata: any;

  ngOnInit(): void {
  }

  logout() {
    this.service.logout().subscribe(
      data => {
        this.alldata = data;
        if(this.alldata.status == 1) {
          this.toastr.success('Logout successfully', 'Sign Out');
          localStorage.removeItem('userToken')
          this.router.navigate(['/login']);
        } else {
            this.toastr.error(this.alldata.message, 'User Details');
        }
      },
      err => { console.log(err); }
    );
  }

}
