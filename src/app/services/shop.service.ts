import { computed, Injectable, signal } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  label: string;
  volume: string;
  rating: number;
  reviews: number;
}

export interface CartLine {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class ShopService {
  readonly products: Product[] = [
    {
      id: 'dew-drop-serum',
      name: 'Dew Drop Hydrating Serum',
      category: 'Skincare',
      price: 2850,
      description: 'A featherlight hyaluronic serum for a fresh, cushiony glow.',
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85',
      label: 'BESTSELLER',
      volume: '30 ml',
      rating: 4.9,
      reviews: 128,
    },
    {
      id: 'daily-veil-moisturizer',
      name: 'Daily Veil Face Cream',
      category: 'Skincare',
      price: 2350,
      description: 'A comforting daily moisturiser that leaves skin soft, never heavy.',
      image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85',
      label: 'SKIN FAVORITE',
      volume: '50 ml',
      rating: 4.8,
      reviews: 94,
    },
    {
      id: 'soft-focus-lipstick',
      name: 'Soft Focus Satin Lipstick',
      category: 'Makeup',
      price: 1850,
      description: 'Comfort-first satin colour with a soft, blurred finish.',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=85',
      label: 'NEW SHADE',
      volume: '3.5 g',
      rating: 4.7,
      reviews: 76,
    },
    {
      id: 'peony-cheek-tint',
      name: 'Peony Cloud Cheek Tint',
      category: 'Makeup',
      price: 1650,
      description: 'A blendable, buildable flush that melts in like second skin.',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85',
      label: 'EDITOR PICK',
      volume: '8 ml',
      rating: 4.9,
      reviews: 61,
    },
    {
      id: 'skin-shield-spf',
      name: 'Skin Shield Daily SPF 50',
      category: 'Sun care',
      price: 2550,
      description: 'A weightless daily sunscreen made to sit beautifully under makeup.',
      image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85',
      label: 'DAILY ESSENTIAL',
      volume: '50 ml',
      rating: 4.8,
      reviews: 113,
    },
    {
      id: 'amber-glow-perfume',
      name: 'Amber Glow Eau de Parfum',
      category: 'Fragrance',
      price: 4950,
      description: 'Warm amber, soft rose and skin musk in an easy everyday scent.',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85',
      label: 'SIGNATURE SCENT',
      volume: '50 ml',
      rating: 4.9,
      reviews: 42,
    },
  ];

  private readonly storageKey = 'muzammil-cosmetics-cart';
  readonly cart = signal<CartLine[]>(this.loadCart());
  readonly cartCount = computed(() => this.cart().reduce((sum, line) => sum + line.quantity, 0));
  readonly subtotal = computed(() => this.cart().reduce((sum, line) => sum + line.product.price * line.quantity, 0));
  readonly selectedProduct = signal<Product | null>(null);

  addToCart(product: Product): void {
    this.cart.update((lines) => {
      const existing = lines.find((line) => line.product.id === product.id);
      return existing
        ? lines.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...lines, { product, quantity: 1 }];
    });
    this.saveCart();
  }

  changeQuantity(productId: string, change: number): void {
    this.cart.update((lines) => lines
      .map((line) => line.product.id === productId ? { ...line, quantity: line.quantity + change } : line)
      .filter((line) => line.quantity > 0));
    this.saveCart();
  }

  removeFromCart(productId: string): void {
    this.cart.update((lines) => lines.filter((line) => line.product.id !== productId));
    this.saveCart();
  }

  clearCart(): void {
    this.cart.set([]);
    this.saveCart();
  }

  private loadCart(): CartLine[] {
    if (typeof localStorage === 'undefined') return [];

    try {
      const stored = JSON.parse(localStorage.getItem(this.storageKey) ?? '[]') as CartLine[];
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  }

  private saveCart(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart()));
    }
  }
}