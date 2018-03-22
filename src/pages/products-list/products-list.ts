import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ProductHttp} from "../../providers/product-http";
import {Observable} from "rxjs/Observable";
import {Cart} from "../../providers/cart";

/**
 * Generated class for the ProductsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products-list',
  templateUrl: 'products-list.html',
})
export class ProductsListPage {

  products: Observable<Array<any>>;
  constructor(public navCtrl: NavController,
              public productHttp: ProductHttp,
              public cart: Cart,
              public toast: ToastController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    setTimeout(()=>{
      this.products = this.productHttp.query();
    },300);

  }

  addItem(products){
    this.cart.addItem(products);
    let toast = this.toast.create({
      message:'Produto adicionado no carrinho',
      duration:3000
    });
    toast.present();
  }

}

//promise
