import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Product } from '../shared/models/product';
import { ProductPageComponent } from './../shared/components/product-page/product-page.component';
import { ProductPage } from './../shared/models/product-page';
import { PullProductsService } from './services/pull-products.service';

@Component({
  selector: 'app-pull-principle',
  standalone: true,
  imports: [
    CommonModule,
    ProductPageComponent,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './pull-principle.component.html',
  styleUrls: ['./pull-principle.component.scss'],
})
export class PullPrincipleComponent implements OnInit, OnDestroy {
  productPage: ProductPage | null = null;
  pageSizeCtrl = new FormControl('10', { nonNullable: true });

  productPageSubscription: Subscription | null = null;
  ctrlSubscription: Subscription | null = null;

  constructor(private productsService: PullProductsService) {}

  ngOnInit(): void {
    this.getProductPage(this.pageSizeCtrl.value);
    this.ctrlSubscription = this.pageSizeCtrl.valueChanges.subscribe(
      (value) => {
        this.getProductPage(value);
      }
    );
  }

  getProductPage(pageSize: string) {
    this.productPage = null;
    this.productPageSubscription = this.productsService
      .getAll(pageSize)
      .subscribe((page) => {
        this.productPage = page;
      });
  }

  delete(product: Product) {
    this.productsService.delete(product.id).subscribe(() => {
      this.getProductPage(this.pageSizeCtrl.value);
    });
  }

  ngOnDestroy(): void {
    this.ctrlSubscription?.unsubscribe();
    this.productPageSubscription?.unsubscribe();
  }
}
