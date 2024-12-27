import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public products:Product[] = []

  constructor(private storeService:StoreService){}

  ngOnInit(): void {
    this.getProducts();
  };

  getProducts(){
    this.storeService.getAllProducts()
    .subscribe((products: any) => {
      this.products = products;
      console.log(this.products);
  }, error => {
    console.log(error);    
  });
  }

  addToCart(product: Product) {
    this.storeService.addProduct(product)
  }
  

}
