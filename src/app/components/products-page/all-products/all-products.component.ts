import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsServiceService } from '../../../services/products-service.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  public filteredString: string = '';
  constructor(
    public productsService: ProductsServiceService,
    private router: Router){}

  ngOnInit() {
    this.productsService.getAllProducts();
  }

  public addProduct() {
    this.router.navigate(['products', 'add']);
  };

}
