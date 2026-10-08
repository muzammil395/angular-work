import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShopService } from '../../services/shop.service';

@Component({
  imports: [RouterLink, DecimalPipe],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {
  checkedOut = false;

  constructor(readonly shop: ShopService) {}

  checkout(): void {
    this.shop.clearCart();
    this.checkedOut = true;
  }
}
