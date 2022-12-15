import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  delay,
  distinctUntilChanged,
  EMPTY,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { ProductPage } from 'src/app/shared/models/product-page';

export interface Pagination {
  selectedSize: number;
  pageSizes: number[];
}

export type StateType = 'LOADING' | 'ERROR' | 'DATA';

export interface ProductPageState {
  productPage: ProductPage;
  pagination: Pagination;
  stateType: StateType;
}
@Injectable({
  providedIn: 'root',
})
export class PushProductsService implements OnDestroy {
  url = 'https://dummyjson.com/products';
  unsubscribe$: Subject<boolean> = new Subject<boolean>();

  _state: ProductPageState = {
    productPage: {
      products: [],
      total: 0,
      skip: 0,
      limit: 0,
    },
    pagination: {
      selectedSize: 5,
      pageSizes: [5, 10, 20, 50],
    },
    stateType: 'LOADING',
  };

  private store = new BehaviorSubject<ProductPageState>(this._state);
  private state$ = this.store.asObservable();
  private reloadData$ = new BehaviorSubject<boolean>(false);

  productPage$ = this.state$.pipe(
    map((state) => state.productPage),
    distinctUntilChanged()
  );
  pagination$ = this.state$.pipe(
    map((state) => state.pagination),
    distinctUntilChanged()
  );
  stateType$ = this.state$.pipe(map((state) => state.stateType));

  vm$: Observable<ProductPageState> = combineLatest([
    this.pagination$,
    this.productPage$,
    this.stateType$,
  ]).pipe(
    map(([pagination, productPage, stateType]) => {
      return { pagination, productPage, stateType };
    })
  );

  /**
   * Watch 2 streams to trigger user loads and state updates
   */
  constructor(private httpClient: HttpClient) {
    combineLatest([this.pagination$, this.reloadData$])
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap(([pagination]) => {
          return this.getAll(pagination);
        })
      )
      .subscribe({
        next: (productPage: ProductPage) =>
          this.updateState({ ...this._state, productPage, stateType: 'DATA' }),
        error: (e) => this.updateState({ ...this._state, stateType: 'ERROR' }),
        complete: () => console.info('complete'),
      });
  }

  // ------- Public Methods ------------------------

  // Allows quick snapshot access to data for ngOnInit() purposes
  getStateSnapshot(): ProductPageState {
    return { ...this._state, pagination: { ...this._state.pagination } };
  }

  buildPageSizeControl(): FormControl {
    const searchTerm = new FormControl();
    searchTerm.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value) => this.updatePagination(value));

    return searchTerm;
  }

  updatePagination(selectedSize: number, currentPage: number = 0) {
    const pagination = { ...this._state.pagination, currentPage, selectedSize };
    this.updateState({ ...this._state, pagination, stateType: 'LOADING' });
  }

  deleteProduct(id: number) {
    this.updateState({ ...this._state, stateType: 'LOADING' });
    this.delete(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.reloadData$.next(true);
      });
  }

  // ------- Private Methods ------------------------

  private delete(id: number): Observable<never> {
    return this.httpClient.delete<never>(this.url + '/' + id);
  }

  private getAll(pagination: Pagination): Observable<ProductPage> {
    return this.httpClient
      .get<ProductPage>(this.url + '?limit=' + pagination.selectedSize)
      .pipe(
        delay(2000),
        catchError((err) => EMPTY)
      );
  }

  /** Update internal state cache and emit from store... */
  private updateState(state: ProductPageState) {
    this.store.next((this._state = state));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}
