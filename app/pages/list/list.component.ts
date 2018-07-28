import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { confirm } from "ui/dialogs";
import { TextField } from 'ui/text-field';
import { Grocery } from "../../shared/grocery/grocery";
import { GroceryListService } from "../../shared/grocery/grocery-list.service";

@Component({
	selector: "list",
	moduleId: module.id,
	templateUrl: "./list.component.html",
	styleUrls: ["./list.component.common.css", "./list.component.css"],
	providers: [GroceryListService]
})
export class ListComponent implements OnInit {

	grocery = "";
	@ViewChild('groceryTextField') groceryTextField: ElementRef;
	groceryList: Array<Grocery> = [];
	ngOnInit() {
		this.groceryListService.load()
			.subscribe(loadedGroceries => {
				loadedGroceries.forEach((groceryObject) => {
					this.groceryList.unshift(groceryObject);
				});
			});
	}
	constructor(private groceryListService: GroceryListService) { }
	add() {
		if (this.grocery.trim() === "") {
			alert("Enter a grocery item");
			return;
		}

		// Dismiss the keyboard
		let textField = <TextField>this.groceryTextField.nativeElement;
		textField.dismissSoftInput();

		this.groceryListService.add(this.grocery)
			.subscribe(
				groceryObject => {
					this.groceryList.unshift(groceryObject);
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
	delete(id: string) {
		let options = {
			title: "Alert",
			message: "Do you want to delete this item?",
			okButtonText: "Yes",
			cancelButtonText: "No",
		};

		confirm(options).then((result: boolean) => {
			if (result) {
				const index = this.groceryList.findIndex(e => e.id == id);
				if (index > -1)
					this.groceryList.splice(index, 1);
			}
		});
	}
}