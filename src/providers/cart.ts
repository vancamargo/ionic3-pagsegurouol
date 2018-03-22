import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Cart {
   items: Array<any>=[];
   total = 0
  constructor(public http: HttpClient) {

  }
  addItem(item){
    this.items.push(item);
    this.calculateTotal()
  }

  removeItem(index){
    this.items.splice(index,1);
    this.calculateTotal()
  }
  calculateTotal(){
    let total = 0;
    this.items.forEach(item =>{
      total += Number(item.price);
    });
    this.total = total;

  }

}
