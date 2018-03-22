import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductHttp} from "../../providers/product-http";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

  product: Observable<Object>;

  constructor(public navCtrl: NavController,
              public productHttp: ProductHttp,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {

    setTimeout(()=>{
      let id = this.navParams.get('products');
      this.product = this.productHttp.get(id);
    }, 300);
  }

}
