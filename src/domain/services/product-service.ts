import {IProductService} from '../interfaces/product-service.interface';
import {inject, injectable} from 'inversify';
import TYPES from '../../infrastructure/types';
import {IProductRepository} from '../../infrastructure/interfaces/product-repository.interface';
import {IProduct} from '../models/product.interface';

@injectable()
/**
 * ProductService
 */
export class ProductService implements IProductService {
  private repo: IProductRepository;

  /**
   * Constructor
   * @param {IProductRepository} repo
   */
  constructor(@inject(TYPES.IProductRepository) repo: IProductRepository) {
    this.repo = repo;
  }

  getProduct(productId: string): Promise<IProduct> {
    console.info('Entered getProduct');
    const p = this.repo.getProduct(productId);
    console.info('Exiting getProduct');
    return p;
  }

  async getProducts(category: string): Promise<IProduct[]> {
    console.info('Entered getProducts for category: ' + category);
    const p = await this.repo.getProducts(category);
    console.info('Exiting getProducts');
    return p;
  }

  async upsertProduct(p: IProduct): Promise<void> {
    console.info('Entered upsertProduct');
    const res = await this.repo.upsertProduct(p);
    console.info('Exiting upsertProduct', res);
  }
}
