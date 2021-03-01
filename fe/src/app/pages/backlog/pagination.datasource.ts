import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {DataSource} from '@angular/cdk/collections';
import {map, shareReplay, startWith, switchMap} from 'rxjs/operators';

// source: https://nils-mehlhorn.de/posts/angular-material-pagination-datasource

export interface Sort<T> {
  property: keyof T;
  order: 'asc' | 'desc';
}

export interface PageRequest<T> {
  page: number;
  size: number;
  sort?: Sort<T>;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  size: number;
  number: number;
}

export type PaginationEndpoint<T, Q> = (req: PageRequest<T>, query: Q) => Observable<Page<T>>

export interface SimpleDataSource<T> extends DataSource<T> {
  connect(): Observable<T[]>;
  disconnect(): void;
}

export class PaginationDataSource<T, Q> implements SimpleDataSource<T> {
  public page$: Observable<Page<T>>;
  private pageNumber = new Subject<number>();
  private sort: BehaviorSubject<Sort<T>>;
  private query: BehaviorSubject<any>; // <= this one
  private initialQuery: any;  // <= this one

  constructor(
    endpoint: PaginationEndpoint<T>,
    initialSort: Sort<T>,
    size = 10
  ) {
    this.sort = new BehaviorSubject<Sort<T>>(initialSort);
    this.page$ = combineLatest([this.sort, this.query]).pipe(
      switchMap(([sort, query]) => this.pageNumber.pipe(
        startWith(0),
        switchMap(page => endpoint({page, sort, size}, query))
      )),
      shareReplay(1)
    );
    this.query = new BehaviorSubject<Q>(this.initialQuery);
  }

  sortBy(sort: Partial<Sort<T>>): void {
    const lastSort = this.sort.getValue();
    const nextSort = {...lastSort, ...sort};
    this.sort.next(nextSort);
  }

  queryBy(query: Partial<Q>): void {
    const lastQuery = this.query.getValue();
    const nextQuery = {...lastQuery, ...query};
    this.query.next(nextQuery);
  }

  fetch(page: number): void {
    this.pageNumber.next(page);
  }

  connect(): Observable<T[]> {
    return this.page$.pipe(map(page => page.content));
  }

  disconnect(): void {}
}
