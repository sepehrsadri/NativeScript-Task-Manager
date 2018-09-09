import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as app from "application";
import * as platform from "platform";
import { Grocery } from '~/shared/grocery/grocery';
import { GroceryService } from '~/shared/grocery/grocery.service';



declare var android;
@Component({

	moduleId: module.id,
	selector: 'grocery-add-update',
	templateUrl: './grocery-add-update.component.xml',
	styleUrls: ['./grocery-add-update.component.css']
})


export class GroceryAddUpdateComponent implements OnInit {

	grocery: Grocery;
	groceryCompare: Grocery;
	/*for grocery compare this syntax doesn't work >> this.groceryCompare = this.grocery
	because of different between call by refrence & call by value , above syntax only point to a part of a home of
	memory but we need another part of memory to compare to our grocery so we need the syntax that used on ngOnInit*/


	constructor(private groceryService: GroceryService,
		private router: Router, private location: Location, private activeRoute: ActivatedRoute) {

	}

	ngOnInit() {
		this.activeRoute.params.subscribe(params => {
			const id: string = params['id'];
			if (id !== null && id !== undefined && id.trim() !== "") {
				this.groceryService.get(id).subscribe(groceryobject => {
					this.grocery = groceryobject;
					this.groceryCompare = new Grocery(this.grocery.id, this.grocery.name, this.grocery.date, this.grocery.description, this.grocery.number);
					console.log("for grocery object!");
				})
			} else {
				this.grocery = new Grocery(null, "", null, "", null);
			}

		});

	}
	add() {
		if (this.grocery.name.trim() === "") {
			alert("Enter a grocery item");
			return;
		}

		// Dismiss the keyboard
		/* 	let textField = <TextField>this.groceryTextField.nativeElement;
			textField.dismissSoftInput(); */


		this.groceryService.add(this.grocery)
			.subscribe(
				groceryObject /* The object that server returned to the client */ => {
					// const item of this.groceryList
					if (platform.isAndroid)
						android.widget.Toast.makeText(app.android.context, "item successfully added", 0).show();
					this.router.navigate(["/list"]);
					this.clean();
				},
				(error) => {
					if (error == 400) {
						alert({
							message: "you add similar item Failed!",
							okButtonText: "OK"
						});
					} else {
						alert({
							message: "An error occurred while adding an item to your list.",
							okButtonText: "OK"
						});
						this.clean();
					}
				}
			)
	}
	done() {
		if (this.grocery.id) {
			this.update();
		} else {
			this.add();
		}
	}
	back() {
		this.location.back();
	}
	clean() {
		this.grocery = new Grocery(null, "", null, "", null)
	}
	update() {
		if (this.groceryCompare.name.toLowerCase().localeCompare(this.grocery.name.toLowerCase()) == 0 &&
			this.groceryCompare.description.toLowerCase().localeCompare(this.grocery.description.toLowerCase()) == 0 &&
			(this.groceryCompare.number == this.grocery.number) == true)
			alert("No changes, change something!");
		else {
			this.groceryService.update(this.grocery).subscribe(groceryobject => {

				if (platform.isAndroid)
					android.widget.Toast.makeText(app.android.context, "item successfully updated", 0).show();
				this.router.navigate(["/list"]);


			},
				() => {
					alert({
						message: "An error occurred while adding an item to your list.",
						okButtonText: "OK"
					});
					this.clean();
				}

			)
		}

	}
}


