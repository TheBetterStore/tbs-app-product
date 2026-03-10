import 'reflect-metadata';
import TYPES from '../../../infrastructure/types';
import container from './container';
import {IProductService} from '../../../domain/interfaces/product-service.interface';
import {HttpUtils} from '../../../infrastructure/http-utils';

console.info('Lambda is cold-starting.');
exports.handler = async (event, context) => {
  console.info('Entered handler');
  console.debug('request content:', event);

  const queryStringParams = event.queryStringParameters;

  const svc = container.get<IProductService>(TYPES.IProductService);

  if (event.pathParameters) {
    const params = event.pathParameters;
    if (params.id) {
      const p = await svc.getProduct(params.id);
      console.debug('Retrieved product:', p);
      const response = HttpUtils.buildJsonResponse(200, p, event?.headers?.origin || '');
      console.debug('Returning response:', response);
      console.info('Exiting handler');
      return response;
    }
  } else {
    let category = 'ALL';
    if (queryStringParams && queryStringParams.category) {
      category = queryStringParams.category;
    }
    const p = await svc.getProducts(category);
    console.debug('Retrieved products:', p);
    const response = HttpUtils.buildJsonResponse(200, p, event?.headers?.origin || '');
    console.debug('Returning response:', response);
    console.info('Exiting handler');
    return response;
  }
};
