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
	public groceryList: Array<Grocery> = [];
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
				this.groceryList = loadedGroceries;
				this.isLoading = false;
				this.listLoaded = true;
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


}
