import { Component, OnInit } from "@angular/core";

@Component({

	selector: "list",
	moduleId: module.id,
	templateUrl: "./list.component.html",
	styleUrls: ["./list.component.common.css", "./list.component.css"]
})
export class ListComponent implements OnInit {
	groceryList: Array<object> = [];
	ngOnInit() {
		this.groceryList.push({ name: "Apples" });
		this.groceryList.push({ name: "Oranges" });
		this.groceryList.push({ name: "Bananas" });

	}
}