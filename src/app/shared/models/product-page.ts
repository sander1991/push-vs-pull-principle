import { Product } from './product';
export interface ProductPage {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
