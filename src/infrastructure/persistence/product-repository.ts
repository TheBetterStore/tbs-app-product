import {IProductRepository} from '../interfaces/product-repository.interface';
import {inject, injectable} from 'inversify';
import TYPES from '../types';
import {IProduct} from '../../domain/models/product.interface';
import {IDynamoDBClient} from '../interfaces/dynamodb-client.interface';
import {DocumentClient} from 'aws-sdk/clients/dynamodb';
import {v4} from 'uuid';
const util = require('util');

@injectable()
export class ProductRepository implements IProductRepository {
  private ddbClient: IDynamoDBClient;
  private productTableName: string;

  constructor(@inject(TYPES.IDynamoDBClient) ddbClient: IDynamoDBClient,
              @inject(TYPES.ProductTableName) productTableName: string) {
    this.ddbClient = ddbClient;
    this.productTableName = productTableName;
  }

  async getProduct(productId: string): Promise<IProduct> {
    console.info('Entered ProductRepository.getProduct');
    console.debug(`Retrieving product with is ${productId}`);
    const params: DocumentClient.GetItemInput = {
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

    const params: DocumentClient.PutItemInput = {
      TableName: this.productTableName,
      Item: p,
      ReturnValues: 'ALL_OLD',
    };

    const res = await this.ddbClient.put(params);
    console.debug(util.inspect(res));
    console.info('Exiting ProductRepository.upsertProduct');
  }
}
