import 'reflect-metadata';
import TYPES from '../../../infrastructure/types';
import container from './container';
import {IProductService} from '../../../domain/interfaces/product-service.interface';
import {IProduct} from '../../../domain/models/product.interface';
import {Logger} from '@thebetterstore/tbs-lib-infra-common/lib/logger';
import {HttpUtils} from '@thebetterstore/tbs-lib-infra-common/lib/http-utils';

console.log('INFO - lambda is cold-starting.');
exports.handler = async (event, context) => {
  Logger.info('Entered handler');

  const productTableName = process.env.PRODUCT_TABLE_NAME || '';
  container.bind<string>(TYPES.ProductTableName).toConstantValue(productTableName);
  const product: IProduct = JSON.parse(event.body);
  const svc = container.get<IProductService>(TYPES.IProductService);
  await svc.upsertProduct(product);
  Logger.debug('Upserted product:', product);
  const response = HttpUtils.buildJsonResponse(204, {}, {});
  Logger.info('Exiting handler');
  return response;
};
