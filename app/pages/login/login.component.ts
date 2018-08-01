import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { View } from "ui/core/view";
import { Page } from 'ui/page';
import { User } from '../../shared/user/user';
import { UserService } from "../../shared/user/user.service";



@Component({
	providers: [UserService],
	selector: "my-app",
	templateUrl: './pages/login/login.component.html',
	styleUrls: ['./pages/login/login.component.common.css', './pages/login/login.component.css']
})
export class LoginComponent implements OnInit {
	user: User;
	isLoggingIn = true;
	@ViewChild("container") container: ElementRef;
	ngOnInit() {
		this.page.actionBarHidden = true;
		this.page.backgroundImage = "res://bg_login";
	}

	constructor(private router: Router, private userService: UserService, private page: Page) {
		this.user = new User();
		this.user.email = "ashkansadri@gmail.com";
		this.user.password = "1234";
	}

	submit() {
		if (!this.user.isValidEmail()) {
			alert("Enter a valid email address.");
			return;
		}
		if (this.isLoggingIn) {
			// this.login();
			this.router.navigate(["/list"]);
		}
		else {
			// this.signUp();
		}
	}
	login() {
		this.userService.login(this.user)
			.subscribe(
				() => this.router.navigate(["/list"]),
				(error) => alert("Unfortunately we could not find your account.")
			);
	}
	signUp() {
		this.userService.register(this.user)
			.subscribe(
				() => {
					alert("Your account was successfully created.");
					this.toggleDisplay();
				},
				() => alert("Unfortunately we were unable to create your account.")
			);
	}
	toggleDisplay() {
		this.isLoggingIn = !this.isLoggingIn;
		let view = <View>this.container.nativeElement;
		view.animate({
			backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
			duration: 200
		});
	}



}