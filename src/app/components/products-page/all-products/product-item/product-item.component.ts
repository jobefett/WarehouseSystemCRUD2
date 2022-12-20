import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { Product } from 'src/app/services/products.interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() public productItem: Product;
  public loading: boolean = false;
  public deleteFlag: boolean = false;

  constructor(public productsService: ProductsServiceService, private router: Router){}

  ngOnInit(): void {
    this.productsService.loading$.subscribe(loading => {
      this.loading = loading;
    });
  }

  public onDelete(product: Product): void {
    if(confirm("Are you sure you want to delete " + product.code)) {
      this.deleteFlag = true;
      this.productsService.deleteProduct(product);
      this.productsService.getAllProducts();
    }
  }

  public onUpdate(product: Product): void {
    this.productsService.productData = product;
    this.router.navigate(['products', product.code]);
  }
}
