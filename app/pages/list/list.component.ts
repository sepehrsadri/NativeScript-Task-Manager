import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { registerElement } from "nativescript-angular/element-registry";
import * as SocialShare from "nativescript-social-share";
import { GroceryService } from "~/shared/grocery/grocery.service";
import { Grocery } from "../../shared/grocery/grocery";



declare var android;

registerElement("PullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);

@Component({
	moduleId: module.id,
	selector: "list",
	templateUrl: "./list.component.xml",
	styleUrls: ["./list.component.common.css", "./list.component.css"]
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
	constructor(private groceryService: GroceryService, private router: Router, private location: Location) { }

	selectItem(id: string) {
		// this.router.navigate(["/grocery/:id"]);0
		this.router.navigate(["/grocery", id]);
		// this._router.navigate(["/details", selectedItem.id]);


	}
	add() {
		this.router.navigate(["/add"]);
	}
	back() {
		this.location.back();

	}

	refreshList(args) {
		var pullRefresh = args.object;
		this.groceryList.splice(0, this.groceryList.length);

		this.groceryService.load()
			.subscribe(loadedGroceries => {
				loadedGroceries.forEach((groceryObject) => {
					this.groceryList.unshift(groceryObject);
				});
				this.isLoading = false;
				this.listLoaded = true;
			});





		setTimeout(function () {
			pullRefresh.refreshing = false;
		}, 1000);
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
