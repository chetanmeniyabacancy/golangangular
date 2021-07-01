import { Routes } from '@angular/router'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { CompanyComponent } from './company/company.component';
import { AddcompanyComponent } from './company/addcompany/addcompany.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard] },
    { path: 'company/list', component: CompanyComponent,canActivate:[AuthGuard]  },
    { path: 'company/insert', component: AddcompanyComponent,canActivate:[AuthGuard]  },
    { path: 'company/update', component: AddcompanyComponent,canActivate:[AuthGuard]  },
    { path: 'login', component: SignInComponent },
    // {
    //     path: 'signup', component: UserComponent,
    //     children: [{ path: '', component: SignInComponent }]
    // },
    // {
    //     path: 'login', component: UserComponent,
    //     children: [{ path: '', component: SignInComponent }]
    // },
    { path: '**', redirectTo: '/login'},
];