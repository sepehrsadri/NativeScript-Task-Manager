import { Component } from "@angular/core";
import { User } from "./shared/user/user";

@Component({
	selector: "my-app",
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.common.css', 'app.component.css']
})
export class AppComponent {
	user: User;
	// email: string = "sepehrsadri@gmail.com";
	isLoggingIn = true;

	constructor() {
		this.user = new User();
	}
	submit() {
		alert("you are using this email : " + this.user.email);
	}
	toggleDisplay() {
		this.isLoggingIn = !this.isLoggingIn;
	}



}