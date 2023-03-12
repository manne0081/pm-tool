import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './shared/login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

import { HomeComponent } from './public/home/home.component';
import { DashboardComponent } from './private/dashboard/dashboard.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { TestComponent } from './test/test.component';
import { QuicklinksComponent } from './private/quicklinks/quicklinks.component';
import { TeamMemberComponent } from './private/team-member/team-member.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
        HomeComponent,
        PageNotFoundComponent,
        DashboardComponent,
        NavigationComponent,
        TestComponent,
        QuicklinksComponent,
        TeamMemberComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
