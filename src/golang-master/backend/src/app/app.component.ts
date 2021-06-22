import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import{ GlobalConstants } from './common/global-constants';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = GlobalConstants.siteTitle;
  isLogin: boolean = false;


  constructor(private router: Router) {
    // on route change to '/login', set the variable showHead to false
      router.events.forEach((event) => {
        if (event instanceof NavigationStart) {
          if (localStorage.getItem('userToken') != null) {
            this.isLogin = true;
          } else {
            // console.log("NU")
            this.isLogin = false;
          }
        }
      });
    }
}
