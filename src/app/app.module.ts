import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AllProductsComponent } from './components/products-page/all-products/all-products.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { ProductItemComponent } from './components/products-page/all-products/product-item/product-item.component';
import { FiltersComponent } from './components/products-page/filters/filters.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AllProductsComponent,
    ErrorPageComponent,
    UpdateProductComponent,
    ProductItemComponent,
    FiltersComponent,
    ProductsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
