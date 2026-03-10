import {IProductRepository} from '../interfaces/product-repository.interface';
import {inject, injectable} from 'inversify';
import TYPES from '../types';
import {IProduct} from '../../domain/models/product.interface';
import {IAwsDynamoDBClient} from '../interfaces/aws-dynamodb-client.interface';
import {v4} from 'uuid';
import {GetCommandInput, PutCommandInput} from '@aws-sdk/lib-dynamodb';
const util = require('util');

@injectable()
export class ProductRepository implements IProductRepository {
  private ddbClient: IAwsDynamoDBClient;
  private productTableName: string;

  constructor(@inject(TYPES.IAwsDynamoDBClient) ddbClient: IAwsDynamoDBClient,
              @inject(TYPES.ProductTableName) productTableName: string) {
    this.ddbClient = ddbClient;
    this.productTableName = productTableName;
  }

  async getProduct(productId: string): Promise<IProduct> {
    console.info('Entered ProductRepository.getProduct');
    console.debug(`Retrieving product with is ${productId}`);
    const params: GetCommandInput = {
      TableName: this.productTableName,
      Key: {
        'productId': productId,
      },
    };
    const res = await this.ddbClient.get(params);
    console.info('Exiting ProductRepository.getProduct');
    return res.Item as IProduct;
  }

  async getProducts(category: string): Promise<IProduct[]> {
    console.info('Entered ProductRepository.getProducts');
    let params;

    if (category && category != 'ALL') {
      params = {
        TableName: this.productTableName,
        FilterExpression: 'category=:category',
        ExpressionAttributeValues: {
          ':category': category,
        },
      };
    } else {
      params = {
        TableName: this.productTableName,
      };
    }
    console.debug('Retrieving products for params:', params);
    const res = await this.ddbClient.scan(params);
    console.info('Exiting ProductRepository.getProducts');
    return res.Items as IProduct[];
  }

  async upsertProduct(p: IProduct): Promise<void> {
    console.info('Entered ProductRepository.upsertProduct');
    const currentTime = new Date();
    if (!p.productId) {
      p.productId = v4();
    }
    p.lastUpdatedTime = currentTime.toISOString();

    const params: PutCommandInput = {
      TableName: this.productTableName,
      Item: p,
      ReturnValues: 'ALL_OLD',
    };

    const res = await this.ddbClient.put(params);
    console.debug(util.inspect(res));
    console.info('Exiting ProductRepository.upsertProduct');
  }
}
