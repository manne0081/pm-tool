import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

// PUBLIC-COMPONENTS
// *****************
import { HomeComponent } from './modules/public/home/home.component';
import { AuthComponent } from './modules/public/auth/auth.component';

// PRIVATE-COMPONENTS
// ******************
import { PrivateComponent } from './modules/private/private.component';
import { DashboardComponent } from './modules/private/dashboard/dashboard.component';
import { TeamListComponent } from './modules/private/team/team-list/team-list.component';
import { WorkScheduleListComponent } from './modules/private/workSchedule/work-schedule-list/work-schedule-list.component';
import { ClientListComponent } from './modules/private/client/client-list/client-list.component';
import { ProjectListComponent } from './modules/private/project/project-list/project-list.component';

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
            { path: 'teamMember', component: TeamListComponent },
            { path: 'workSchedule', component: WorkScheduleListComponent },
            { path: 'clients', component: ClientListComponent },
            { path: 'projects', component: ProjectListComponent},
        ]
    },

    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
