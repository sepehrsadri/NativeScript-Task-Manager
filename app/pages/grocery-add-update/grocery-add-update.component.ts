import { Component, OnInit } from '@angular/core';
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
	grocery = "";
	description = "";
	number = 0;
	groceryList: Array<Grocery> = [];

	constructor(private groceryService: GroceryService) {

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
		let isOk = true;
		for (let i: number = 0; i < this.groceryList.length; i++) {
			var n = this.groceryList[i].name.localeCompare(this.grocery);
			if (n == 0) {
				alert("sorry you enter similar item!" + "please add a new one!");
				this.grocery = "";
				this.description = "";
				this.number = 0;
				isOk = false;
			}
		}
		if (isOk)
			this.groceryService.add(this.grocery, this.description, this.number)
				.subscribe(
					groceryObject /* The object that server returned to the client */ => {
						// const item of this.groceryList

						this.groceryList.unshift(groceryObject);
						if (platform.isAndroid)
							android.widget.Toast.makeText(app.android.context, "item successfully added", 0).show();

						this.grocery = "";
						this.description = "";
						this.number = 0;


					},
					() => {
						alert({
							message: "An error occurred while adding an item to your list.",
							okButtonText: "OK"
						});
						this.grocery = "";
						this.description = "";
						this.number = 0;
					}
				)
	}
}
