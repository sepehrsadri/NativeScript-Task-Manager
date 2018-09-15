import { Component } from "@angular/core";
require("xnativescript-localstorage");
@Component({
	selector: "main",
	template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {
	constructor() {
		localStorage.setItem("start", "0");
	}
	chek() {
		if (localStorage.getItem("start").localeCompare("1") == 0) {

		}
	}

}
