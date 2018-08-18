import { Injectable } from "@angular/core";
import { Headers, Http, Response, URLSearchParams } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Config } from "../config";
import { Grocery } from "./grocery";


@Injectable()
export class GroceryListService {
	// baseUrl = Config.apiUrl + "appdata/" + Config.appKey + "/Groceries";
	baseUrl = "http://192.168.1.34:8081/" + 'grocery'

	constructor(private http: Http) { }

	load() {
		// Kinvey-specific syntax to sort the groceries by last modified time. Don’t worry about the details here.
		let params = new URLSearchParams();
		params.append("sort", "{\"_kmd.lmt\": 1}");

		return this.http.get(this.baseUrl, {
			headers: this.getCommonHeaders(),
			params: params
		})
			.map(res => res.json())
			.map(data => {
				let groceryList = Array<Grocery>();
				data.forEach((grocery) => {
					groceryList.push(new Grocery(grocery.id, grocery.name));
				});
				return groceryList;
			})
			.catch(this.handleErrors);
	}

	getCommonHeaders() {
		let headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Kinvey " + Config.token);
		return headers;
	}

	handleErrors(error: Response) {
		console.log(JSON.stringify(error.json()));
		return Observable.throw(error);
	}
	add(name: string) {
		return this.http.post(
			this.baseUrl,
			JSON.stringify({ Name: name }),
			{ headers: this.getCommonHeaders() }
		)
			.map(res => res.json())
			.map(data => {
				return new Grocery(data._id, name);
			})
			.catch(this.handleErrors);
	}
	delete(id: string) {
		return this.http.delete(
			this.baseUrl + "/delete" + id,
			{ headers: this.getCommonHeaders() }
		)
			.map(res => res.json())
			.catch(this.handleErrors);
	}

}