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
	name = "";
	description = "";
	number: number;
	grocery: Grocery;

	constructor(private groceryService: GroceryService, private router: Router, private location: Location, private activeRoute: ActivatedRoute) {

	}

	ngOnInit() {
		this.activeRoute.params.subscribe(params => {
			const id: string = params['id'];
			if (id) {
				this.groceryService.get(id).subscribe(groceryobject => {
					this.grocery = groceryobject;
				})
			} else {
				this.grocery = new Grocery(null, "", null, "", null);
			}

		});

	}
	add() {
		if (this.name.trim() === "") {
			alert("Enter a grocery item");
			return;
		}

		// Dismiss the keyboard
		/* 	let textField = <TextField>this.groceryTextField.nativeElement;
			textField.dismissSoftInput(); */


		this.groceryService.add(this.name, this.description, this.number)
			.subscribe(
				groceryObject /* The object that server returned to the client */ => {
					// const item of this.groceryList
					if (platform.isAndroid)
						android.widget.Toast.makeText(app.android.context, "item successfully added", 0).show();
					this.router.navigate(["/list"]);
					this.clean();
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
		this.name = "";
		this.description = "";
		this.number = Number();
	}
	update() {
		this.groceryService.update(this.name, this.description, this.number).subscribe(groceryobject => {

			if (platform.isAndroid)
				android.widget.Toast.makeText(app.android.context, "item successfully added", 0).show();
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


