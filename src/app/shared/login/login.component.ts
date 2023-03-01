import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    username: string = "";
    password: string = "";

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    login(): void {
        if (this.username == "test" && this.password == "test") {
            console.log("Login success!");

            this.router.navigate(['dashboard'])

        } else {
            alert("Die Anmeldung ist fehlgeschlagen, bitte versuchen Sie es erneut!");
        }
    }

    test(): void {
        this.username = "test";
        this.password = "test";
    }
}
