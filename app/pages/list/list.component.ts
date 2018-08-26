import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import * as app from "application";
import * as SocialShare from "nativescript-social-share";
import * as platform from "platform";
import { TextField } from 'ui/text-field';
import { GroceryService } from "~/shared/grocery/grocery.service";
import { Grocery } from "../../shared/grocery/grocery";

declare var android;

@Component({
	selector: "list",
	moduleId: module.id,
	templateUrl: "./list.component.xml",
	styleUrls: ["./list.component.common.css", "./list.component.css"],
	providers: [GroceryService]
})
export class ListComponent implements OnInit {
	isLoading: boolean = true;
	listLoaded: boolean = false;

	grocery = "";
	@ViewChild('groceryTextField') groceryTextField: ElementRef;
	groceryList: Array<Grocery> = [];
	ngOnInit() {
		this.isLoading = true;

		this.groceryService.load()
			.subscribe(loadedGroceries => {
				loadedGroceries.forEach((groceryObject) => {
					this.groceryList.unshift(groceryObject);
				});
				this.isLoading = false;
				this.listLoaded = true;
			});
	}
	constructor(private groceryService: GroceryService, private router: Router) { }
	add() {
		if (this.grocery.trim() === "") {
			alert("Enter a grocery item");
			return;
		}

		// Dismiss the keyboard
		let textField = <TextField>this.groceryTextField.nativeElement;
		textField.dismissSoftInput();
		let isOk = true;
		for (let i: number = 0; i < this.groceryList.length; i++) {
			var n = this.groceryList[i].name.localeCompare(this.grocery);
			if (n == 0) {
				alert("sorry you enter similar item!" + "please add a new one!");
				this.grocery = "";
				isOk = false;
			}
		}
		if (isOk)
			this.groceryService.add(this.grocery)
				.subscribe(
					groceryObject /* The object that server returned to the client */ => {
						// const item of this.groceryList

						this.groceryList.unshift(groceryObject);
						if (platform.isAndroid)
							android.widget.Toast.makeText(app.android.context, "item successfully added", 0).show();

						this.grocery = "";


					},
					() => {
						alert({
							message: "An error occurred while adding an item to your list.",
							okButtonText: "OK"
						});
						this.grocery = "";
					}
				)
	}
	selectItem(id: string) {
		this.router.navigate(["/grocery/:id"]);



	}
	/* 	delete(id: string) {

			let options = {
				title: "Alert",
				message: "Do you want to delete this item?",
				okButtonText: "Yes",
				cancelButtonText: "No",
			};

			confirm(options).then((result: boolean) => {
				if (result) {
					var index = this.groceryList.findIndex(e => e.id == id);
					/* function(Grocery e):boolean {
						return e.id==id;
						it's like a for loop that chek for each item and if it was true take back the number of find index that used!
					}
					if (index > -1)
						this.groceryListService.delete(id)
							.subscribe(
								() => {
									this.groceryList.splice(index, 1);
									alert("your selected item delete!");
								},
								(err) => {
									console.log(err);
									alert("sorry your item isn't deleted");
								}
							)
					// this.groceryList.splice(index, 1);

				}
			});
		} */

	share() {
		let listString = this.groceryList
			.map(grocery => grocery.name)
			.join(", ")
			.trim()
		SocialShare.shareText(listString);
	}
}
