import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'ui/page';
import { User } from '../../shared/user/user';
import { UserService } from "../../shared/user/user.service";


require("nativescript-localstorage");
@Component({
	moduleId: module.id,
	providers: [UserService],
	selector: "my-app",
	templateUrl: './login.component.xml',
	styleUrls: ['./login.component.common.css', './login.component.css']
})
export class LoginComponent implements OnInit {
	user: User;
	isLoggingIn = true;
	@ViewChild("container") container: ElementRef;
	ngOnInit() {
		this.page.actionBarHidden = true;
		this.page.backgroundImage = "res://my_bk";
		this.page.style.backgroundRepeat = "no-repeat";
		this.page.style.backgroundPosition = "center center";
		this.page.style.backgroundSize = "cover";
	}

	constructor(private routerExtensions: RouterExtensions, private router: Router, private userService: UserService, private page: Page) {
		this.user = new User();
	}

	submit() {
		// this.login();
		localStorage.setItem("start", "0");
		this.routerExtensions.navigate(["/list"]);

	}
	/* 	toggleDisplay() {
			this.isLoggingIn = !this.isLoggingIn;
			let view = <View>this.container.nativeElement;
			view.animate({
				backgroundColor: this.isLoggingIn ? new Color("#b7b7b7") : new Color("#272727"),
				duration: 1000
			});
		} */

	ngAfterViewInit() {
		console.log("afterinit");
		setTimeout(() => {
			console.log(this.container.nativeElement.innerText);
		}, 100000);
	}
}
