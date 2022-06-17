import {IProduct} from './product.interface';

export class Product implements IProduct {
  productId?: string = '1';
  category: string = '';
  name: string = '';
  lastUpdatedTime: string = '';
  brandId: string = 'ABC';
  description: string = '';
  hitCount: number = 0;
  imageUrl: string = '';
  price: number = 0;
  sku: string = '123';
  type: 'PHYSICAL' | 'DIGITAL';

  constructor() {
    this.type = 'PHYSICAL';
  }
}
