import { GroceryDetailsComponent } from '~/pages/grocery-details/grocery-details.component';
import { ListComponent } from "./pages/list/list.component";
import { LoginComponent } from "./pages/login/login.component";

export const routes = [
	{ path: "", component: LoginComponent },
	{ path: "list", component: ListComponent },
	{ path: "details", component: GroceryDetailsComponent }
];

export const navigatableComponents = [
	LoginComponent,
	ListComponent,
	GroceryDetailsComponent
];
