import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products = [];
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll(){
    var products = this._httpService.getProducts();
    products.subscribe((data:any) => {
      console.log(data);
      this.products = data.data;
    })
  }
  deleteProduct(id){
    var deleted = this._httpService.deleteOne(id);
    deleted.subscribe((data: any) => {
      console.log(data.message);
      this.getAll();
    })
  }
}
