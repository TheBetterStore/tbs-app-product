import {IAwsDynamoDBClient} from '../interfaces/aws-dynamodb-client.interface';
import {injectable} from 'inversify';
import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient, GetCommand,
  GetCommandInput, GetCommandOutput, PutCommand, PutCommandInput, PutCommandOutput, QueryCommand, QueryCommandInput,
  QueryCommandOutput,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

@injectable()
export class AwsDynamodbClient implements IAwsDynamoDBClient {
  async scan(params: ScanCommandInput): Promise<ScanCommandOutput> {
    console.debug(`Scanning items`);
    const command = new ScanCommand(params);
    return docClient.send(command);
  }

  async get(params: GetCommandInput): Promise<GetCommandOutput> {
    console.debug('Getting from DynamoDB');
    const command = new GetCommand(params);
    return docClient.send(command);
  }

  async put(params: PutCommandInput): Promise<PutCommandOutput> {
    console.debug('Putting object to DynamoDB', params);
    const command = new PutCommand(params);
    return docClient.send(command);
  }

  async query(params: QueryCommandInput): Promise<QueryCommandOutput> {
    console.debug('Querying DynamoDB');
    const command = new QueryCommand(params);
    return docClient.send(command);
  }
}
