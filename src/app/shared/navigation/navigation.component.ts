import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
	classItem1: string = '';
	classItem2: string = '';
	classItem3: string = '';
	classItem4: string = '';

	constructor(private route: Router) { }

	ngOnInit(): void {
		this.setCssToItem(this.route.url);
	}
	
	// setting the right css-classes to the navigation-items
	// -----------------------------------------------------
	setCssToItem(route: string): void {
		if (route == "/dashboard") {
			console.log("url == /dashboard!");
			this.classItem1 = "navigation-item first-item active";
			this.classItem2 = "navigation-item inactive post-active";
		}
		if (route == "/test") {
			console.log("url == /test!");
			this.classItem1 = "navigation-item first-item pre-active";
			this.classItem2 = "navigation-item active";
			this.classItem3 = "navigation-item inactive post-active";
		}
		if (route == "/test2") {
			console.log("url == /test2!");
			this.classItem1 = "navigation-item first-item pre-active";
			this.classItem2 = "navigation-item active";
			this.classItem3 = "navigation-item inactive post-active";
		}
	}



}
