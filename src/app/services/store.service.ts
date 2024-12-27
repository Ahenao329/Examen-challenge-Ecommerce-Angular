import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductInterface } from '../interfaces/product.interface';
import { BehaviorSubject, elementAt, map } from 'rxjs';
import { environment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private readonly baseUrl = environment.api;

  private myList:Product[] = [];

  constructor( private HTTP: HttpClient) {

   }

  
    private myCart = new BehaviorSubject<Product[]>([]);
    myCart$ = this.myCart.asObservable();

  

  getAllProducts(){
       return this.HTTP.get<ProductInterface>(`${this.baseUrl}`)
       .pipe(
        map(( res: ProductInterface) => res.product)
       )
  }

  
  addProduct(product: Product) {

    if(this.myList.length === 0){
      product.cantidad = 1;
      this.myList.push(product);
      this.myCart.next(this.myList);
    } else {
      const productMod = this.myList.find((element) => {
        return element.id === product.id;
      })
      if(productMod === product){
        console.log(productMod,'sssssssss');
        
        productMod.cantidad = productMod.cantidad +1;
        this.myCart.next(this.myList);
      } else {
        product.cantidad = 1;
        this.myList.push(product);
        this.myCart.next(this.myList);
      }
    }
    console.log(this.myCart, '❤️');
    console.log(this.myList,'😂' );
  }

  // addProduct(product: Product) {
  //   const existingProduct = this.myList.find((p) => p.id === product.id);

  //   if (!existingProduct) {
  //     // Si el producto no existe en la lista, lo agregamos con cantidad 1
  //     product.cantidad = 1;
  //     this.myList.push(product);
  //   } else {
  //     // Si el producto ya existe en la lista, aumentamos la cantidad en 1
  //     existingProduct.cantidad++;
  //   }

  //   // Actualizamos el carrito observable con la nueva lista
  //   this.myCart.next(this.myList);
  // }



  deleteProduct(id:string){
    this.myList = this.myList.filter((Product) => {
      return Product.id != id;
    });
    this.myCart.next(this.myList);
  }

  findProductById(id: string) {
    return this.myList.find((element) => {
      return element.id === id
    })
  }

  
  

  totalCart() {
    let total = this.myList.reduce(function (acc, product) { return acc + (product.cantidad * product.price); }, 0)
    if (this.myList.length >= 3 ){
      let totales = total * 0.2
      return total - totales
    }else {
      return total 
    }
  }






}
