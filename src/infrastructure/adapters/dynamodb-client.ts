import {IDynamoDBClient} from '../interfaces/dynamodb-client.interface';
import {injectable} from 'inversify';
import {DocumentClient, QueryInput} from 'aws-sdk/clients/dynamodb';

// const AWSXRay = require('aws-xray-sdk-core');
const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();
// AWSXRay.captureAWSClient(docClient.service);

@injectable()
export class DynamoDBClient implements IDynamoDBClient {

  async scan(params: QueryInput): Promise<DocumentClient.ScanOutput> {
    console.debug(`Scanning items`);
    return docClient.scan(params).promise();
  }

  get(params: DocumentClient.GetItemInput): Promise<DocumentClient.GetItemOutput> {
    console.debug('Getting from DynamoDB');
    return docClient.get(params).promise();
  }

  async put(params: DocumentClient.PutItemInput): Promise<DocumentClient.PutItemOutput> {
    console.debug('Putting object to DynamoDB', params);
    const res = docClient.put(params).promise();
    console.debug('Returning...');
    return res;
  }

  async query(params: DocumentClient.QueryInput): Promise<DocumentClient.QueryOutput> {
    console.debug('Querying DynamoDB');
    return docClient.query(params).promise();
  }
}
