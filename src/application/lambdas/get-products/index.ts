import 'reflect-metadata';
import TYPES from '../../../infrastructure/types';
import container from './container';
import {IProductService} from '../../../domain/interfaces/product-service.interface';
import {Logger} from '@thebetterstore/tbs-lib-infra-common/dist/infrastructure/logger';
import {HttpUtils} from '@thebetterstore/tbs-lib-infra-common/dist/infrastructure/utils/http-utils';

Logger.info('Lambda is cold-starting.');
exports.handler = async (event, context) => {
  Logger.info('Entered handler');
  Logger.debug('request content:', event);

  const productTableName = process.env.PRODUCT_TABLE_NAME || '';
  container.bind<string>(TYPES.ProductTableName).toConstantValue(productTableName);

  const queryStringParams = event.queryStringParameters;

  const svc = container.get<IProductService>(TYPES.IProductService);

  if (event.pathParameters) {
    const params = event.pathParameters;
    if (params.id) {
      const p = await svc.getProduct(params.id);
      Logger.debug('Retrieved product:', p);
      const response = HttpUtils.buildJsonResponse(200, p, {});
      Logger.debug('Returning response:', response);
      Logger.info('Exiting handler');
      return response;
    }
  } else {
    let category = 'ALL';
    if (queryStringParams && queryStringParams.category) {
      category = queryStringParams.category;
    }
    const p = await svc.getProducts(category);
    Logger.debug('Retrieved products:', p);
    const response = HttpUtils.buildJsonResponse(200, p, {});
    Logger.debug('Returning response:', response);
    Logger.info('Exiting handler');
    return response;
  }
};
