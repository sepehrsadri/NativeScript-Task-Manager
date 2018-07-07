import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AppComponent } from "./app.component";
import { routes } from "./app.routing";



@NgModule({
	imports: [
		NativeScriptModule,
		NativeScriptFormsModule,
		NativeScriptHttpModule,
		NativeScriptRouterModule,
		NativeScriptRouterModule.forRoot(routes)
	],
	declarations: [
		AppComponent,
		...navigatableComponents
	],
	bootstrap: [AppComponent],
	schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
