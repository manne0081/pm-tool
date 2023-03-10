import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
	classDashboard: string = '';
	classTest: string = '';
	classTest2: string = '';
	classTest3: string = '';

	constructor(private route: Router) { }

	ngOnInit(): void {
		this.setCssToItem(this.route.url);
	}
	
	// setting the right css-classes to the navigation-items
	// -----------------------------------------------------
	setCssToItem(route: string): void {
		if (route == "/dashboard") {
			console.log("url == /dashboard!");
			this.classDashboard = "navigation-item first-item active";
			this.classTest = "navigation-item inactive post-active";
		}
		if (route == "/test") {
			console.log("url == /test!");
			this.classDashboard = "navigation-item first-item pre-active";
			this.classTest = "navigation-item active";
			this.classTest2 = "navigation-item inactive post-active";
		}
		if (route == "/test2") {
			console.log("url == /test2!");
			this.classTest = "navigation-item first-item pre-active";
			this.classTest2 = "navigation-item active";
			this.classTest3 = "navigation-item inactive post-active";
		}
	}



}
