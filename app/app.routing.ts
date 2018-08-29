import { GroceryDetailsComponent } from '~/pages/grocery-details/grocery-details.component';
import { GroceryAddUpdateComponent } from './pages/grocery-add-update/grocery-add-update.component';
import { ListComponent } from "./pages/list/list.component";
import { LoginComponent } from "./pages/login/login.component";

export const routes = [
	{ path: "", component: LoginComponent },
	{ path: "list", component: ListComponent },
	{ path: "grocery/:id", component: GroceryDetailsComponent },
	{ path: "add", component: GroceryAddUpdateComponent },
	{ path: "grocery/:id", component: GroceryAddUpdateComponent }
];

export const navigatableComponents = [
	LoginComponent,
	ListComponent,
	GroceryDetailsComponent,
	GroceryAddUpdateComponent
];
