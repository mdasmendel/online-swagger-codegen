import Axios from 'axios';
import * as Fs from 'fs';
import * as Path from 'path';

export enum ClientType {
  TYPESCRIPT_NODE = 'typescript-node',
}

export interface IGeneratorOptions {
  spec?: string;
  specURL?: string;
  client?: ClientType;
  outPath: string;
}

const defaultClient = ClientType.TYPESCRIPT_NODE;

export const GenerateSDK = async (options: IGeneratorOptions) => {
  if (!options.spec && !options.specURL) {
    throw new Error('at least one of spec or specURL should be provided');
  }

  options.client = options.client || defaultClient;

  let swaggerSpec = options.spec;
  if (options.specURL) {
    const { data } = await Axios.get(options.specURL);
    swaggerSpec = data;
  }

  let response = await Axios.post('https://generator.swagger.io/api/gen/clients/typescript-node', {
    spec: swaggerSpec,
  });
  response = await Axios.get(response.data.link, {
    responseType: 'stream',
  });

  const savePath = Path.resolve(options.outPath || __dirname, 'sdk.zip');
  const writer = Fs.createWriteStream(savePath);
  response.data.pipe(writer);

  await new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};
