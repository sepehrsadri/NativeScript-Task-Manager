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
	search: string = "";


	grocery = "";
	@ViewChild('groceryTextField') groceryTextField: ElementRef;
	public groceryList: Array<Grocery> = [];
	public filterList: Array<Grocery> = [];
	ngOnInit() {
		this.loadData();
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

	loadData() {
		this.isLoading = true;
		this.groceryService.load()
			.subscribe(loadedGroceries => {
				this.updateList(loadedGroceries);

			});
	}

	refreshList(args) {
		var pullRefresh = args.object;
		this.groceryList.splice(0, this.groceryList.length);

		this.loadData();

		setTimeout(function () {
			pullRefresh.refreshing = false;
		}, 1000);
	}
	share() {
		let listString = this.groceryList
			.map(grocery => grocery.name)
			.join(", ")
			.trim()
		SocialShare.shareText(listString);
	}
	public clear() {
		this.search = "";
		this.filterList = this.groceryList;
	}
	public submit() {
		if (this.search.trim() === "") {
			this.filterList = this.groceryList;
		}
		else {
			this.filterList = this.groceryList.filter(g => g.name.toLowerCase().includes(this.search.toLowerCase()));
			/* for (var i = 0; i < this.groceryList.length; i++) {
				if (this.groceryList[i].name.localeCompare(this.search) == 0) {
					if (platform.isAndroid)
						android.widget.Toast.makeText(app.android.context, "found it!", 0).show();
					this.arrayMove(this.groceryList, i, 0);
					break;
				} else {
					if (i == this.groceryList.length - 1) {
						alert("Sorry,can't find your item!");
						break;
					}
				}

			} */
		}
	}
	public updateList(arr: Array<Grocery>) {
		this.groceryList = arr;
		this.isLoading = false;
		this.listLoaded = true;
		this.submit();
	}
	onTextChanged() {
		if (this.search.length >= 2)
			this.submit();
	}
	/* 	arrayMove(arr, oldIndex, newIndex) {
			if (newIndex >= arr.length) {
				var k = newIndex - arr.length + 1;
				while (k--) {
					arr.push(undefined);
				}
			}
			arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
		}; */
}
