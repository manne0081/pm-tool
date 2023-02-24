import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    isPrivate: boolean = false;
    isVisible: boolean = true;

    public href: string = "";

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.href = this.router.url;
        console.log("ngOnInit > url: " + this.href + " => isVisible: " + this.isVisible);
        if(this.href = "/login") {
            this.isVisible = false;
        };
    }

    setIsPrivate(isPrivate: boolean) {
        this.isPrivate = isPrivate;
        this.href = this.router.url;
        
        if(this.href = "/login"){
            this.isVisible = false;
            console.log("setIsPrivate > url: " + this.href + " => isVisible: " + this.isVisible);
        };
    }

}
