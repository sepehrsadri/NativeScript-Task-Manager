import { Component } from "@angular/core";

@Component({
	selector: "my-app",
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.common.css', 'app.component.css']
})
export class AppComponent {
	email: string = "sepehrsadri@gmail.com";
	isLoggingIn: boolean = true;
	submit() {
		alert("you are using this email : " + this.email);


	}


}