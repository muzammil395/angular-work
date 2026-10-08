import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(readonly shop: ShopService) {}
}