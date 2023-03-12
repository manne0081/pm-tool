import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-team-member',
	templateUrl: './team-member.component.html',
	styleUrls: ['./team-member.component.scss']
})

export class TeamMemberComponent implements OnInit {
	id: number;
	number: string = "";
	firstName: string = "";
	lastName: string = "";
	shortName: string = "";
	email: string = "";
	street: string = "";
	houseNumber: string = "";
	postCode: string = "";
	city: string = "";
	isDeveloper: boolean = false;
	test: string = "";

	constructor() {
		this.id = 0;
	}

	ngOnInit(): void {
		this.number = "01-01";
		this.firstName = "Bärbel";
		this.lastName = "Beispiel";
		this.street = "Musterstraße";
		this.houseNumber = "128 a-b";
		this.postCode = "12345"
		this.city = "Musterhausen";
		this.isDeveloper = true;
		this.shortName = this.createShortName(this.firstName, this.lastName);
		this.email = this.createEmail(this.firstName, this.lastName);
	}

	createShortName(firstName: string, lastName: string): string {
		var i = "";
		i = firstName.substring(0,3) + lastName.substring(0,1);
		return i;
	}

	createEmail(firstName: string, lastName: string): string {
		var i = "";
		i = firstName.substring(0,1).toLocaleLowerCase() + "." + lastName.toLowerCase() + "@systaro.de";
		return i;
	}

	onKeyFirstName(event: any) {
		this.shortName = this.createShortName(this.firstName, this.lastName);
	}

	onKeyLastName(event: any) {
		this.shortName = this.createShortName(this.firstName, this.lastName);
	}

	onFocusOutName() {
		if(this.email == "") {
			this.email = this.firstName.substring(0,1).toLowerCase() + "." + this.lastName.toLowerCase() + "@systaro.de";
		}
	}

}
