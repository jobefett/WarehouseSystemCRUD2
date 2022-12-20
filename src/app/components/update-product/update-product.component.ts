import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsServiceService } from 'src/app/services/products-service.service';
import { Product } from 'src/app/services/products.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  public dataTitle: string = '';
  public loading: boolean = false;
  public productData: Product = {
    'code': '',
    'quantity': 0,
    'floor': 0,
    'section': 0,
  };

  public productsForm: FormGroup;

  constructor(
    public productsService: ProductsServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.dataTitle = data.title;
    });

    if (this.dataTitle === 'update') {
        this.productData = this.productsService.productData;
    }

    this.initForm(this.productData);

    this.productsService.loading$.subscribe(loading => {
      this.loading = loading;
      if (!loading) {
        this.router.navigate(['products']);
      }
    });
  }

  public initForm(productData: Product): void {
    this.productsForm = this.fb.group({
      code: [productData.code, [
        Validators.required,
        Validators.pattern('([A-Z]{2,4}) {1}([0-9]{4,6})')
      ]],
      quantity: [productData.quantity, [
        Validators.required,
        Validators.min(0)
      ]],
      floor: [productData.floor, [
        Validators.required,
        Validators.min(0),
        Validators.max(environment.maxNumbOfFloors)
      ]],
      section: [productData.section, [
        Validators.required,
        Validators.min(0),
        Validators.max(environment.maxNumbOfSections)
      ]]
    });
    if (this.dataTitle) this.productsForm.controls['code'].disable();
  }

  get code() {
    return this.productsForm.get('code') as FormControl;
  }
  get quantity() {
    return this.productsForm.get('quantity') as FormControl;
  }
  get floor() {
    return this.productsForm.get('floor') as FormControl;
  }
  get section() {
    return this.productsForm.get('section') as FormControl;
  }

  public onSubmit(): void {
    if (this.dataTitle === 'update') {
      let updateData: Product  = {
        'code': this.productsForm.controls.code.value,
        'quantity': this.productsForm.controls.quantity.value,
        'floor': this.productsForm.controls.floor.value,
        'section': this.productsForm.controls.section.value,
      };
      this.productsService.updateProduct(updateData);
    } else {
      this.productsService.addProduct(this.productsForm.value);
    }
  }
}
