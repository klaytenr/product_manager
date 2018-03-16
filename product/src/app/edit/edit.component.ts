import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product: object;
  error: any;
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.getProduct(params['id']));
  }
  getProduct(id){
    var product = this._httpService.getOneProduct(id);
    product.subscribe((data: any) => {
      this.product = data.data;
    })
    console.log(this.product);
  }
  editProduct(product){
    var editedProduct = this._httpService.editOne(product);
    editedProduct.subscribe((data:any) => {
      if(data.error){
        this.error = data.error;
        console.log(data.error);
      }else{
        console.log(data);
        this.product = data.product;
        this.goHome();
      }
    })
  }
  deleteProduct(id){
    var deleted = this._httpService.deleteOne(id);
    deleted.subscribe((data: any) => {
      this.goHome();
    })
  }
  goHome(){
    this._router.navigate(['/products']);
  }
}
