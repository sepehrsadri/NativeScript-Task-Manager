import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { View } from "ui/core/view";
import { Page } from 'ui/page';
import { TextField } from "ui/text-field";
import { User } from '../../shared/user/user';
import { UserService } from "../../shared/user/user.service";
import { setHintColor } from '../../utils/hint-util';



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
	@ViewChild("email") email: ElementRef;
	@ViewChild("password") password: ElementRef;
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
		this.setTextFieldColors();
		let view = <View>this.container.nativeElement;
		view.animate({
			backgroundColor: this.isLoggingIn ? new Color("#b7b7b7") : new Color("#272727"),
			duration: 200
		});
	}
	setTextFieldColors() {
		let emailTextField = <TextField>this.email.nativeElement;
		let passwordTextField = <TextField>this.password.nativeElement;

		let mainTextColor = new Color(this.isLoggingIn ? "black" : "#4a86e8");
		emailTextField.color = mainTextColor;
		passwordTextField.color = mainTextColor;

		let hintColor = new Color(this.isLoggingIn ? "#b7b7b7" : "#4a86e8");
		setHintColor({ view: emailTextField, color: hintColor });
		setHintColor({ view: passwordTextField, color: hintColor });
	}
	ngAfterViewInit() {
		console.log("afterinit");
		setTimeout(() => {
			console.log(this.container.nativeElement.innerText);
		}, 100000);
	}




}
