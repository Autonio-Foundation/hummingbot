export enum Exchange {
  Binance = 'Binance',
  AscendEX = 'AscendEX',
  CryptoCom = 'Crypto.com',
  Kucoin = 'Kucoin',
  BinanceUS = 'BinanceUS',
}

export const $exchangeNameMap = {
  [Exchange.Binance]: 'binance',
  [Exchange.AscendEX]: 'ascendex',
  [Exchange.CryptoCom]: 'kucoin',
  [Exchange.BinanceUS]: 'binanceus',
};
