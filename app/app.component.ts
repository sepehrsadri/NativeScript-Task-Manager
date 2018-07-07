import { Component } from "@angular/core";
import { User } from "./shared/user/user";
import { UserService } from "./shared/user/user.service";

@Component({
	providers: [UserService],
	selector: "my-app",
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.common.css', 'app.component.css']
})
export class AppComponent {
	user: User;
	// email: string = "sepehrsadri@gmail.com";
	isLoggingIn = true;

	constructor(private userService: UserService) {
		this.user = new User();
	}

	submit() {
		if (this.isLoggingIn) {
			this.login();
		}
		else {
			this.signup();
		}

		// alert("you are using this email : " + this.user.email);
	}
	login() {

	}
	signup() {
		this.userService.register(this.user);
	}
	toggleDisplay() {
		this.isLoggingIn = !this.isLoggingIn;
	}



}