import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { ProductPageComponent } from '../shared/components/product-page/product-page.component';
import { Product } from '../shared/models/product';
import {
  ProductPageState,
  PushProductsService,
} from './services/push-products.service';

@Component({
  selector: 'app-push-principle',
  standalone: true,
  imports: [
    CommonModule,
    ProductPageComponent,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  providers: [PushProductsService],
  templateUrl: './push-principle.component.html',
  styleUrls: ['./push-principle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PushPrincipleComponent implements OnInit {
  vm$: Observable<ProductPageState> = this.productsService.vm$;

  pageSizeCtrl!: FormControl;

  constructor(private productsService: PushProductsService) {}

  ngOnInit(): void {
    const { pagination } = this.productsService.getStateSnapshot();

    this.pageSizeCtrl = this.productsService.buildPageSizeControl();
    this.pageSizeCtrl.patchValue(pagination.selectedSize, { emitEvent: false });
  }

  delete(product: Product) {
    this.productsService.deleteProduct(product.id);
  }
}
