import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductPage } from '../../models/product-page';
import { ProductCardComponent } from './../product-card/product-card.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {
  @Input() productPage!: ProductPage;
  @Output() delete = new EventEmitter<Product>();
}
