import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { confirm } from "ui/dialogs";
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
	constructor(private activeRoute: ActivatedRoute, private groceryService: GroceryService, private location: Location, private router: Router) {
		this.activeRoute.params.subscribe(params => this.id = params['id']);
		this.grocery = new Grocery(null, "", null, "", null);

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
	delete(id: string) {

		let options = {
			title: "Alert",
			message: "Do you want to delete this item?",
			okButtonText: "Yes",
			cancelButtonText: "No",
		};

		confirm(options).then((result: boolean) => {
			if (result) {
				/* function(Grocery e):boolean {
					return e.id==id;
					it's like a for loop that chek for each item and if it was true take back the number of find index that used!
				}*/
				this.groceryService.delete(id)
					.subscribe(
						() => {
							alert("your item deleted!");
							this.router.navigate(["/list"]);

						},
						(err) => {
							console.log(err);
							alert("sorry your item isn't deleted");
						}
					)
				// this.groceryList.splice(index, 1);

			}
		});
	}

	edit(id: string) {
		// this.router.navigate(["/grocery/:id"]);0
		this.router.navigate(["/update", id]);
		// this._router.navigate(["/details", selectedItem.id]);


	}

}

