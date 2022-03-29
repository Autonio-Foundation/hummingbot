import { ref } from 'vue';

import { Exchange } from './exchanges';

export enum StrategyName {
  PureMarketMaking = 'pure-market-making',
  Arbitrage = 'arbitrage',
}

enum StrategyCategoryDefault {
  All = 'All Exchanges',
}

export const StrategyCategory = { ...StrategyCategoryDefault, ...Exchange };

export type StrategyCategory = StrategyCategoryDefault | Exchange;

interface Strategy {
  title: string;
  description: string;
  place: number;
  placeType: 'equal' | 'lt' | 'gt';
  fileHref: string;
  strategyName: StrategyName;
  categories: string[];
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
    categories: [StrategyCategory.Binance, StrategyCategory.CryptoCom],
  },
  {
    title: 'Arbitrage',
    description:
      'This strategy allows Hummingbot users to run a market making strategy on a single trading pair on a spot exchanges.',
    fileHref: '/',
    strategyName: StrategyName.Arbitrage,
    place: 2,
    placeType: 'equal',
    categories: [StrategyCategory.Binance],
  },
];

export const $strategies = ref(strategies);
