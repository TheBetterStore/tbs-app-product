import 'reflect-metadata';
import TYPES from '../../../infrastructure/types';
import container from './container';
import {IProductService} from '../../../domain/interfaces/product-service.interface';
import {S3Event} from 'aws-lambda';
import {S3Client, GetObjectCommand, GetObjectCommandInput} from '@aws-sdk/client-s3';
import {IProduct} from '../../../domain/models/product.interface';

const s3Client = new S3Client({});

console.info('Lambda is cold-starting.');
exports.handler = async (event: S3Event, context) => {
  console.info('Entered handler');
  console.debug('request content:', event);

  const getS3Params: GetObjectCommandInput = {
    Bucket: event.Records[0].s3.bucket.name,
    Key: event.Records[0].s3.object.key,
  };

  const res = await s3Client.send(new GetObjectCommand(getS3Params));
  const data = await res.Body?.transformToString() || '';

  const lines = data.split(/\r\n|\r|\n/);
  console.info('Lines:', lines);

  const svc = container.get<IProductService>(TYPES.IProductService);

  for (let i = 1; i < lines.length; i++) {
    let line = lines[i].trim();
    const tokens = line.split('|');
    console.info('tokens:', tokens);
    // @ts-ignore
    const p: IProduct = {
      productId: tokens[0],
      productDetails: {
        brandId: tokens[1],
        sku: tokens[5],
      },
      brandId: tokens[1],
      sku: tokens[5],
      category: (tokens[2] == 'COMPUTERS' ? 'COMPUTERS': 'BOOKS'),
      name: tokens[3],
      description: tokens[4],
      type: 'PHYSICAL',
      imageUrl: tokens[6],
      smallImageUrl: tokens[6],
      smallerImageUrl: tokens[6],
      price: Number(tokens[7]),
    };
    console.info(p);
    await svc.upsertProduct(p);
  }
  console.info('Exiting handler');
};
