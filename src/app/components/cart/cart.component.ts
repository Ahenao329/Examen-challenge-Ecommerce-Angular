import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  myCart$ = this.storeService.myCart$

  constructor(private storeService: StoreService){

  }

  totalProduct(price:number, units:number){
    return price * units
  }

  deleteProduct(id: string){
    this.storeService.deleteProduct(id);
  }

  updateUnits(operations: string, id:string){
    const product = this.storeService.findProductById(id)
    if(product){
      if ( operations === 'minus' && product.cantidad > 0){
        product.cantidad = product.cantidad - 1;        
      }
      if ( operations === 'add' ) {
        product.cantidad = product.cantidad +1;
      }
      if ( product.cantidad === 0 ) {
        this.deleteProduct(id);
      }
    }
  }

  totalCart(){
    const result = this.storeService.totalCart();
    return result;
  }
  
}
