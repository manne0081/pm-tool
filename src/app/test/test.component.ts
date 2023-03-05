import { Component, OnInit } from '@angular/core';
import { last } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
	number: string = "";
	firstName: string = "";
	lastName: string = "";
	street: string = "";
	houseNumber: string = "";
	postCode: string = "";
	city: string = "";
	objectName: string = "";

	constructor() { }

	ngOnInit(): void {
		this.number = "KND-00105015-01";
		this.firstName = "Max";
		this.lastName = "Mustermann";
		this.street = "Musterstraße";
		this.houseNumber = "128 a-b";
		this.postCode = "12345"
		this.city = "Musterhausen";
		this.objectName = this.number + " - " + this.firstName + " " + this.lastName;
	}

}
