import {Container} from 'inversify';
import TYPES from '../../../infrastructure/types';
import {ProductRepository} from '../../../infrastructure/persistence/product-repository';
import {ProductService} from '../../../domain/services/product-service';
import {IProductRepository} from '../../../infrastructure/interfaces/product-repository.interface';
import {IProductService} from '../../../domain/interfaces/product-service.interface';
import {IAwsDynamoDBClient} from '../../../infrastructure/interfaces/aws-dynamodb-client.interface';
import {AwsDynamodbClient} from '../../../infrastructure/adapters/aws-dynamodb-client';

const container = new Container();

container.bind<IProductRepository>(TYPES.IProductRepository).to(ProductRepository).inSingletonScope();
container.bind<IProductService>(TYPES.IProductService).to(ProductService).inSingletonScope();
container.bind<IAwsDynamoDBClient>(TYPES.IAwsDynamoDBClient).to(AwsDynamodbClient).inSingletonScope();
container.bind<string>(TYPES.ProductTableName).toConstantValue(process.env.PRODUCT_TABLE_NAME || '');

export default container;
