import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { ProductDetails } from './pages/product-details/product-details';
import { Cart } from './pages/cart/cart';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { ShopService } from './services/shop.service';

const productExistsGuard: CanActivateFn = (route) => {
  const productId = route.paramMap.get('id');
  const shop = inject(ShopService);
  return shop.products.some((product) => product.id === productId)
    ? true
    : inject(Router).createUrlTree(['/products']);
};

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: Products },
  { path: 'product-details', redirectTo: 'product-details/dew-drop-serum', pathMatch: 'full' },
  { path: 'product-details/:id', component: ProductDetails, canActivate: [productExistsGuard] },
  { path: 'cart', component: Cart },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' },
];