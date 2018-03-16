import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  products = [];
  product: object;
  newProduct: object;
  error: any;
  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
    this.newProduct = { title: '', price: Number, image: ''};
  }
  addNewProduct(){
    var editProduct = this._httpService.createProduct(this.newProduct);
    editProduct.subscribe((data: any) =>{
      if(data.error){
        this.error = data.error.errors.name.message;
        console.log(data.error);
      }else{
        console.log(data);
        this.products.push(data);
        this.newProduct = { title: '', price: Number, image: ''};
        this.goHome();
      }
    })
  }
  goHome(){
    this._router.navigate(['/products']);
  }
}
