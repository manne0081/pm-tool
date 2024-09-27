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
import { TeamMemberListComponent } from './modules/private/team/team-member/team-member-list/team-member-list.component';
import { WorkScheduleListComponent } from './modules/private/team/work-schedule/work-schedule-list/work-schedule-list.component';
import { ClientListComponent } from './modules/private/client/client-list/client-list.component';
import { ProjectListComponent } from './modules/private/project/project-list/project-list.component';
import { ProjectDetailComponent } from './modules/private/project/project-detail/project-detail.component';
import { DemoListComponent } from './modules/private/demo/demo-list/demo-list.component';
import { TaskListComponent } from './modules/private/workspace/task-list/task-list.component';
import { CalendarListComponent } from './modules/private/workspace/calendar-list/calendar-list.component';
import { MessageListComponent } from './modules/private/workspace/message-list/message-list.component';

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
            { path: 'task', component: TaskListComponent },
            { path: 'calendar', component: CalendarListComponent },
            { path: 'message', component: MessageListComponent },
            { path: 'teamMember', component: TeamMemberListComponent },
            { path: 'workSchedule', component: WorkScheduleListComponent },
            { path: 'client', component: ClientListComponent },
            { path: 'project', component: ProjectListComponent},
            { path: 'project/:id', component: ProjectDetailComponent},
            { path: 'demo', component: DemoListComponent},
        ]
    },

    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
