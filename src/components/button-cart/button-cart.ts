import { Component } from '@angular/core';
import {Cart} from "../../providers/cart";

/**
 * Generated class for the ButtonCartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'button-cart',
  templateUrl: 'button-cart.html'
})
export class ButtonCartComponent {

  constructor(public cart: Cart) {
    console.log('Hello ButtonCartComponent Component');

  }

}
