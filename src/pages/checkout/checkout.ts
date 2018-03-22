import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PaymentHttp} from "../../providers/payment-http";
import scriptjs from 'scriptjs';

declare let PagSeguroDirectPayment;

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

    paymentMethod= 'Boleto';
    paymentMethods: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public paymentHttp: PaymentHttp) {
  }

    ionViewDidLoad() {
        scriptjs('https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js', () => {
            this.paymentHttp.getSession()
                .subscribe(data => {
                    this.initSession(data);
                    this.getPaymentMethods();
                })
        })
    }

    initSession(data) {
        PagSeguroDirectPayment.setSessionId(data.sessionId);
    }


  getPaymentMethods(){
      PagSeguroDirectPayment.getPaymentMethods({
          amount: 100,
          sucesss(response){
              let paymentMethods = response.paymentMethods;
              this.paymentMethods= Object.keys(paymentMethods).map((key) => paymentMethods[key]);
              console.log(this.paymentMethods)

          }
      })
  }

}
