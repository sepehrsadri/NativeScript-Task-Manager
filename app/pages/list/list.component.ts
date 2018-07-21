import { Component, OnInit } from "@angular/core";
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
}