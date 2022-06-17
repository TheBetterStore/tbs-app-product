import {IProduct} from '../../domain/models/product.interface';

export interface IProductRepository {
  getProduct(id: string): Promise<IProduct>;
  getProducts(category: string): Promise<IProduct[]>;
  upsertProduct(p: IProduct): Promise<void>;
}
