export interface IData {
  market_caps: Array<string>;
  prices: Array<string>;
  total_volumes: Array<string>;
}

export type Action<T> = {
  type: string;
  payload: Partial<T>;
};
