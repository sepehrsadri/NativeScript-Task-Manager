import { ListComponent } from "./pages/list/list.component";
import { LoginComponent } from "./pages/login/login.component";

export const routes = [
	{ path: "", component: LoginComponent },
	{ path: "list", component: ListComponent }
];

export const navigatableComponents = [
	LoginComponent,
	ListComponent
];