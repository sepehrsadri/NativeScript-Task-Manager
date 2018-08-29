import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as app from "application";
import * as platform from "platform";
import { GroceryService } from '~/shared/grocery/grocery.service';


declare var android;
@Component({
	moduleId: module.id,
	selector: 'grocery-add-update',
	templateUrl: './grocery-add-update.component.xml',
	styleUrls: ['./grocery-add-update.component.css']
})


export class GroceryAddUpdateComponent implements OnInit {
	grocery = "";
	description = "";
	number: number;

	constructor(private groceryService: GroceryService, private router: Router) {

	}

	ngOnInit() { }
	add() {
		if (this.grocery.trim() === "") {
			alert("Enter a grocery item");
			return;
		}

		// Dismiss the keyboard
		/* 	let textField = <TextField>this.groceryTextField.nativeElement;
			textField.dismissSoftInput(); */


		this.groceryService.add(this.grocery, this.description, this.number)
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
	clean() {
		this.grocery = "";
		this.description = "";
		this.number = Number("");

	}
}
