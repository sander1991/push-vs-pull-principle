import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { ProductPage } from '../../shared/models/product-page';

@Injectable({
  providedIn: 'root',
})
export class PullProductsService {
  url = 'https://dummyjson.com/products';

  constructor(private httpClient: HttpClient) {}

  public getAll(limit: string): Observable<ProductPage> {
    return this.httpClient
      .get<ProductPage>(this.url + '?limit=' + limit)
      .pipe(delay(2000));
  }

  public delete(id: number): Observable<never> {
    return this.httpClient.delete<never>(this.url + '/' + id);
  }
}
