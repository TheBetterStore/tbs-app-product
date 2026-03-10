import {
  GetCommandInput,
  GetCommandOutput,
  PutCommandInput, PutCommandOutput, QueryCommandInput, QueryCommandOutput,
  ScanCommandInput,
  ScanCommandOutput,
} from '@aws-sdk/lib-dynamodb';

export interface IAwsDynamoDBClient {
  scan(params: ScanCommandInput): Promise<ScanCommandOutput>;
  get(params: GetCommandInput): Promise<GetCommandOutput>;
  put(params: PutCommandInput): Promise<PutCommandOutput>;
  query(params: QueryCommandInput): Promise<QueryCommandOutput>;
}