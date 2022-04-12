import { Ref, ref } from 'vue';

export enum ExchangeName {
  Binance = 'Binance',
  AscendEX = 'AscendEX',
  CryptoCom = 'Crypto.com',
  Kucoin = 'Kucoin',
  BinanceUS = 'BinanceUS',
}

export const $exchangeNameMap = {
  [ExchangeName.Binance]: 'binance',
  [ExchangeName.AscendEX]: 'ascendex',
  [ExchangeName.CryptoCom]: 'cryptocom',
  [ExchangeName.BinanceUS]: 'binanceus',
  [ExchangeName.Kucoin]: 'kukoin',
};

export const $markets: Ref<{ [key in `${ExchangeName}`]?: string[] }> = ref({});
export const $tokens: Ref<{ [key in `${ExchangeName}`]?: string[] }> = ref({});
