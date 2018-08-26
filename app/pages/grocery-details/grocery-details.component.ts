import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroceryService } from '~/shared/grocery/grocery.service';


@Component({
	moduleId: module.id,
	selector: 'grocery-details',
	templateUrl: './grocery-details.component.xml',
	styleUrls: ['./grocery-details.component.css'],
})

export class GroceryDetailsComponent implements OnInit {

	constructor(private route: ActivatedRoute, private groceryService: GroceryService) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			const id = this.route.snapshot.paramMap.get('id');
		})
	}
	delete(id) {

		let options = {
			title: "Alert",
			message: "Do you want to delete this item?",
			okButtonText: "Yes",
			cancelButtonText: "No",
		};

		confirm(options).then((result: boolean) => {
			if (result) {
				var index = this.groceryList.findIndex(e => e.id == id);
				/* function(Grocery e):boolean {
					return e.id==id;
					it's like a for loop that chek for each item and if it was true take back the number of find index that used!
				}*/
				if (index > -1)
					this.grocerytService.delete(id)
						.subscribe(
							() => {
								this.groceryList.splice(index, 1);
								alert("your selected item delete!");
							},
							(err) => {
								console.log(err);
								alert("sorry your item isn't deleted");
							}
						)
				// this.groceryList.splice(index, 1);

			}
		});
	}
}
