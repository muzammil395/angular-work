import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product, ShopService } from '../../services/shop.service';

@Component({
  imports: [RouterLink, DecimalPipe],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products {
  search = '';
  category = 'All';
  addedProductId = '';

  constructor(readonly shop: ShopService, route: ActivatedRoute) {
    const category = route.snapshot.queryParamMap.get('category');
    if (category && this.categories.includes(category)) this.category = category;
  }

  get categories(): string[] {
    return ['All', ...new Set(this.shop.products.map((product) => product.category))];
  }

  get visibleProducts(): Product[] {
    const search = this.search.trim().toLowerCase();
    return this.shop.products.filter((product) =>
      (this.category === 'All' || product.category === this.category) &&
      (!search || `${product.name} ${product.category}`.toLowerCase().includes(search)),
    );
  }

  addToCart(product: Product): void {
    this.shop.addToCart(product);
    this.addedProductId = product.id;
  }

  setSearch(event: Event): void {
    this.search = (event.target as HTMLInputElement).value;
  }

  setCategory(event: Event): void {
    this.category = (event.target as HTMLSelectElement).value;
  }
}
