import { HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { GroceryService } from '~/shared/grocery/grocery.service';
import { AppComponent } from "./app.component";
import { navigatableComponents, routes } from "./app.routing";




@NgModule({
	imports: [
		NativeScriptModule,
		NativeScriptFormsModule,
		NativeScriptHttpModule,
		NativeScriptRouterModule,
		NativeScriptRouterModule.forRoot(routes),
		HttpClientModule
	],
	declarations: [
		AppComponent,
		...navigatableComponents,
	],
	providers: [GroceryService],
	bootstrap: [AppComponent],
	schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
