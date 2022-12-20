import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Product } from './products.interface';
import { productsMock } from './../mock/data';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  public products$: Subject<Product[]> = new Subject<Product[]>();
  public loading$: Subject<boolean> = new Subject<boolean>();
  public filterCount$: Subject<number> = new Subject<number>();
  public productData: Product;

  constructor(private http: HttpClient) { }

  public getAllProducts(): void {
    this.http.get<Array<Product>>('https://itk-exam-api.herokuapp.com/api/offices')
      .subscribe(
        (response) => {
          // I planned to do an interceptor here to have a working http service that fethes the correct data
          // and interceptor would actually filter/update the data
          setTimeout(() => {
            this.products$.next(productsMock);
          }, 500);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  public addProduct(product: Product): void {
    this.http.get<Array<Product>>('https://itk-exam-api.herokuapp.com/api/offices')
    .subscribe(
      (response) => {
        this.loading$.next(true);
        setTimeout(() => {
          productsMock.push(product);
          this.loading$.next(false);
        }, 500);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public deleteProduct(product: Product): void {
    this.http.get<Array<Product>>('https://itk-exam-api.herokuapp.com/api/offices')
    .subscribe(
      (response) => {
        this.loading$.next(true);
        setTimeout(() => {
          const index = productsMock.indexOf(product);
          if (index > -1) {
            productsMock.splice(index, 1);
            this.loading$.next(false);
          }
        }, 500);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public updateProduct(product: Product): void {
    this.http.get<Array<Product>>('https://itk-exam-api.herokuapp.com/api/offices')
    .subscribe(
      (response) => {
        this.loading$.next(true);
        setTimeout(() => {
          const index = productsMock.findIndex(item => item.code === product.code);
          if (index > -1) {
            productsMock[index] = product;
            this.loading$.next(false);
          }
        }, 500);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public filterProducts(filterString: any, filterBy: string): void {
    this.http.get<Array<Product>>('https://itk-exam-api.herokuapp.com/api/offices')
      .subscribe(
        (response) => {
          setTimeout(() => {
            let filteredArray;
            if (filterBy === 'code') {
              filteredArray = productsMock.filter(item => item.code.includes(filterString));
            }
            if (filterBy === 'floor') {
              filteredArray = productsMock.filter(item => item.floor === filterString);
            }
            if (filterBy === 'section') {
              filteredArray = productsMock.filter(item => item.section === filterString);
            }
            this.products$.next(filteredArray);
          }, 500);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
