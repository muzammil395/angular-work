import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product, ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor(readonly shop: ShopService) {}

  addToCart(product: Product): void {
    this.shop.addToCart(product);
  }
}