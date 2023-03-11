import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-team-member',
	templateUrl: './team-member.component.html',
	styleUrls: ['./team-member.component.scss']
})
export class TeamMemberComponent implements OnInit {
	objectName: string = "";
	number: string = "";
	firstName: string = "";
	lastName: string = "";
	street: string = "";
	houseNumber: string = "";
	postCode: string = "";
	city: string = "";
	isDeveloper: boolean = false;

	constructor() { }

	ngOnInit(): void {
		this.number = "01-01";
		this.firstName = "Antonia";
		this.lastName = "Engfors";
		this.street = "Musterstraße";
		this.houseNumber = "128 a-b";
		this.postCode = "12345"
		this.city = "Musterhausen";
		this.isDeveloper = true;
		this.objectName = this.number + " " + this.firstName + " " + this.lastName;
	}

}
