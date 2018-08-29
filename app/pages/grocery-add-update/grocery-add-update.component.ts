import { Component, OnInit } from '@angular/core';
import { Grocery } from '~/shared/grocery/grocery';
@Component({
	moduleId: module.id,
	selector: 'grocery-add-update',
	templateUrl: './grocery-add-update.component.xml',
	styleUrls: ['./grocery-add-update.component.css']
})


export class GroceryAddUpdateComponent implements OnInit {
	grocery: Grocery;

	constructor() {

	}

	ngOnInit() { }
}
