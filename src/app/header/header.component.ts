import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isPrivate: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    setIsPrivate(test: boolean) {
        this.isPrivate = test;
    }

}
