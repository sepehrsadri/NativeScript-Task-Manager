import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Grocery } from '~/shared/grocery/grocery';
import { GroceryService } from '~/shared/grocery/grocery.service';


@Component({
	moduleId: module.id,
	selector: 'grocery-details',
	templateUrl: './grocery-details.component.xml',
	styleUrls: ['./grocery-details.component.css']
})

export class GroceryDetailsComponent implements OnInit {
	id: string;
	grocery: Grocery;
	constructor(private route: ActivatedRoute, private groceryService: GroceryService, private location: Location) {
		this.route.params.subscribe(params => this.id = params['id']);
		this.grocery = new Grocery(null, "", null, "");

	}

	ngOnInit() {
		this.groceryService.get(this.id)
			.subscribe(groceryObject => {
				// console.log("object from server is : " + groceryObject);
				this.grocery = groceryObject;

			},
				() => {
					alert("we got a problem on display your item information!");
				}
			)
	}
	back() {
		this.location.back();

	}
}
