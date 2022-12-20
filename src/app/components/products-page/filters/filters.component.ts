import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  public maxNumbOfFloors: number = environment.maxNumbOfFloors;
  public maxNumbOfSections: number = environment.maxNumbOfSections;
  public filterForm: FormGroup = new FormGroup({
    code: new FormControl()
  });
  
  private sub: Subscription;

  constructor(private productsService: ProductsServiceService) { }

  ngOnInit(): void {
    this.sub = this.filterForm.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(values => { this.productsService.filterProducts(values.code, 'code'); });
  }

  public counter(n: number): Array<number> {
    return Array(n);
  }

  public filterProductPerFloor(floor: number): void {
    this.productsService.filterProducts(floor+1, 'floor');
  }

  public filterProductPerSection(section: number): void {
    this.productsService.filterProducts(section+1, 'section');
  }

  public resetResults(): void {
    this.productsService.getAllProducts();
  }
}

