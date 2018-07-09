import { Component } from "@angular/core";
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";

@Component({
	providers: [UserService],
	selector: "my-app",
	templateUrl: './pages/login/login.component.html',
	styleUrls: ['./pages/login/login.component.common.css', './pages/login/login.component.css']
})
export class LoginComponent {
	user: User;
	isLoggingIn = true;

	constructor(private userService: UserService) {
		this.user = new User();
		this.user.email = "sepehrsadri@gmail.com";
		this.user.password = "password";
	}

	submit() {
		if (this.isLoggingIn) {
			this.login();
		}
		else {
			this.signUp();
		}
	}
	login() {

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
	}



}