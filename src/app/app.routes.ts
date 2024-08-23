import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

// PUBLIC-COMPONENTS
// *****************
import { HomeComponent } from './modules/public/home/home.component';
import { AuthComponent } from './modules/public/auth/auth.component';

// PRIVATE-COMPONENTS
// ******************
import { DashboardComponent } from './modules/private/dashboard/dashboard.component';
import { PrivateComponent } from './modules/private/private.component';

// ROUTES
// ******
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },

    { path: 'home', component: HomeComponent },
    { path: 'auth', component: AuthComponent },

    { path: '', component: PrivateComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
        ]
    },

    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
