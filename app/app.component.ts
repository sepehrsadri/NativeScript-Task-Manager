import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router';
require("nativescript-localstorage");
@Component({
	selector: "main",
	template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent implements OnInit {

	constructor(private routerExtensions: RouterExtensions) {

	}
	ngOnInit() {
		console.log(localStorage.getItem("start"));
		if (localStorage.getItem("start") == null) {
			this.routerExtensions.navigate(["/login"]);
		}
		else {
			this.routerExtensions.navigate(["/list"]);
		}
	}


}





