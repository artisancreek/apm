import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  filteredProducts: Product[] = [];
  products: Product[] = [];
  errorMessage = '';
  sub!: Subscription;

  constructor(private productService: ProductService) { }

  private _listFilter: string = '';
  public get listFilter(): string {
    return this._listFilter;
  }
  public set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter(listFilter):', value);
    this.filteredProducts = this.performFilter(value);
  }

  private _amount: number = 0;
  public get amount(): number {
    return this._amount;
  }
  public set amount(value: number) {
    this._amount = value;
    console.log('In setter(amount):', value);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) => 
      product.productName.toLocaleLowerCase().includes(filterBy));
  }
 
   ngOnInit(): void {
    console.log('In OnInit');
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onRatingClicked(message: string): void {
     this.pageTitle = 'Product List: ' + message;
  }

}
