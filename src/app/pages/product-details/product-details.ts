import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product, ShopService } from '../../services/shop.service';

@Component({
  imports: [RouterLink, DecimalPipe],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export class ProductDetails {
  added = false;

  constructor(readonly shop: ShopService, private readonly route: ActivatedRoute) {}

  get product(): Product {
    const productId = this.route.snapshot.paramMap.get('id');
    return this.shop.products.find((product) => product.id === productId)
      ?? this.shop.selectedProduct()
      ?? this.shop.products[0];
  }

  addToCart(): void {
    this.shop.addToCart(this.product);
    this.added = true;
  }
}
