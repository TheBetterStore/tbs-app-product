import {IProduct} from '../models/product.interface';

export interface IProductService {
  getProduct(productId: string): Promise<IProduct>;
  getProducts(category: string): Promise<IProduct[]>;
  upsertProduct(p: IProduct): Promise<void>;
}
