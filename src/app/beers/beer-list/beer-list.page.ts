import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.page.html',
  styleUrls: ['./beer-list.page.scss'],
})
export class BeerListPage implements OnInit {

  beersList;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getAllBeers();
  }



  getAllBeers() {
    //Get saved list of beers
    this.api.getBeersList().subscribe((response: any) => {
      console.log(response);
      this.beersList = response.data;
    });
  }

  editBeer() {
    console.log('edit pressed');
  }

  addBeer() {
    console.log('add pressed');
  }

  deleteBeer(item) {
    //Delete item in Beer data
    console.log(item);
    this.api.deleteBeer(item.id).subscribe((response) => {
      //Update list after delete is successful
      console.log(response);
      this.getAllBeers();
    });
  }

  backHome() {
    console.log('Back to home page');
    this.router.navigateByUrl('/home');
  }
}
