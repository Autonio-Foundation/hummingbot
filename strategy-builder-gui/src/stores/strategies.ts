import { ref } from 'vue';

export enum StrategyName {
  PureMarketMaking = 'pure-market-making',
  Arbitrage = 'arbitrage',
}

export enum StrategyMarket {
  All = 'All exchanges',
  Binance = 'Binance',
  AscendEX = 'AscendEX',
  CryptoCom = 'Crypto.com',
  Kucoin = 'Kucoin',
  BinanceUS = 'BinanceUS',
}

interface Strategy {
  title: string;
  description: string;
  place: number;
  placeType: 'equal' | 'lt' | 'gt';
  fileHref: string;
  strategyName: StrategyName;
  markets: StrategyMarket[];
}

const strategies: Strategy[] = [
  {
    title: 'Pure Market Making',
    description:
      'This strategy allows Hummingbot users to run a market making strategy on a single trading pair on a spot exchanges.',
    fileHref: '/',
    strategyName: StrategyName.PureMarketMaking,
    place: 1,
    placeType: 'equal',
    markets: [StrategyMarket.Binance, StrategyMarket.CryptoCom],
  },
  {
    title: 'Arbitrage',
    description:
      'This strategy allows Hummingbot users to run a market making strategy on a single trading pair on a spot exchanges.',
    fileHref: '/',
    strategyName: StrategyName.Arbitrage,
    place: 1,
    placeType: 'equal',
    markets: [StrategyMarket.Binance],
  },
];

export const $strategies = ref(strategies);
