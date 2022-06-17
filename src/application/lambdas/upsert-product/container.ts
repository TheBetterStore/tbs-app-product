import {Container} from 'inversify';
import TYPES from '../../../infrastructure/types';
import {ProductRepository} from '../../../infrastructure/persistence/product-repository';
import {ProductService} from '../../../domain/services/product-service';
import {IProductRepository} from '../../../infrastructure/interfaces/product-repository.interface';
import {IProductService} from '../../../domain/interfaces/product-service.interface';
import {IDynamoDBClient} from '../../../infrastructure/interfaces/dynamodb-client.interface';
import {DynamoDBClient} from '../../../infrastructure/adapters/dynamodb-client';

const container = new Container();

container.bind<IProductRepository>(TYPES.IProductRepository).to(ProductRepository).inSingletonScope();
container.bind<IProductService>(TYPES.IProductService).to(ProductService).inSingletonScope();
container.bind<IDynamoDBClient>(TYPES.IDynamoDBClient).to(DynamoDBClient).inSingletonScope();

export default container;
