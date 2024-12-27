export class Product {

    constructor(
        public id:string ,
        public title: string,
        public description: string,
        public price: number,
        public images:string,
        public cantidad:number
    ){}
}

export interface ProductInterface {
    ok: boolean;
    product: string;
}