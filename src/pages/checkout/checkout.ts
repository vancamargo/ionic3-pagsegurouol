import {Component, NgZone, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams,  Segment} from 'ionic-angular';
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
    @ViewChild(Segment)
    segment: Segment;

    paymentMethod = 'Boleto';
    paymentMethods: Array<any> = [];

    creditCard = {
        num: '',
        cvv: '',
        monthExp: '',
        yearExp: '',
        brand: '',
        token: ''

    }

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public paymentHttp: PaymentHttp,
                public zone: NgZone) {
    }

    ionViewDidLoad() {
        scriptjs('https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js', () => {
            this.paymentHttp.getSession()
                .subscribe(data => {
                    this.initSession(data);
                    this.getPaymentMethods()


                })
        })
    }

    initSession(data) {
        PagSeguroDirectPayment.setSessionId(data.sessionId);
    }


    getPaymentMethods() {
        PagSeguroDirectPayment.getPaymentMethods({
            amount: 100,
            success: (response) => {
                this.zone.run(() => {

                    let paymentMethods = response.paymentMethods;
                    console.log(response.paymentMethods);
                    this.paymentMethods = Object.keys(paymentMethods).map((key) => paymentMethods[key]);
                    setTimeout(() => {
                        this.segment._inputUpdated();
                        this.segment.ngAfterContentInit();
                    },)

                });
            }
        })


    }

    makePayment() {
        this.getCreditCardBrand();

    }

    getCreditCardBrand() {
        PagSeguroDirectPayment.getBrand({
            cardBin: this.creditCard.num.substring(0, 6),
            success: (response) => {
                this.zone.run(() => {
                    this.creditCard.brand = response.brand.name;

                });
            }
        })
    }



}




