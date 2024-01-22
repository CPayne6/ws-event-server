import { RawData } from 'ws';
export declare function extractDispatch<T extends string = string, K = any>(rawData: RawData): [T, K];
