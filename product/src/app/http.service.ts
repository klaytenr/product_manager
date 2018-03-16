import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient) { }
  createProduct(product){
    return this._http.post('/product', product);
  }
  getOneProduct(id){
    return this._http.get('/product/' + id);
  }
  getProducts(){
    return this._http.get('/product');
  }
  deleteOne(id){
    return this._http.delete('/product/' + id);
  }
  editOne(product){
    return this._http.put('/edit/'+product._id, product)
  }
}
