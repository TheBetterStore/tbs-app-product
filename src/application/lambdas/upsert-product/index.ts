import 'reflect-metadata';
import TYPES from '../../../infrastructure/types';
import container from './container';
import {IProductService} from '../../../domain/interfaces/product-service.interface';
import {IProduct} from '../../../domain/models/product.interface';
import {HttpUtils} from '../../../infrastructure/http-utils';

console.log('INFO - lambda is cold-starting.');
exports.handler = async (event, context) => {
  console.info('Entered handler');

  const product: IProduct = JSON.parse(event.body);
  const svc = container.get<IProductService>(TYPES.IProductService);
  await svc.upsertProduct(product);
  console.debug('Upserted product:', product);
  const response = HttpUtils.buildJsonResponse(204, {}, event?.headers?.origin || '');
  console.info('Exiting handler');
  return response;
};
