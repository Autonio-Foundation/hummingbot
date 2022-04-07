import { ExchangeName } from 'src/stores/exchanges';
import { StrategyName } from 'src/stores/strategies';
import { ref } from 'vue';

import { $Form } from './form.types';

export const arbitrageFieldsFileMap = {
  primaryMarket: 'primary_market',
  secondaryMarket: 'secondary_market',
  primaryMarketTradingPair: 'primary_market_trading_pair',
  secondaryMarketTradingPair: 'secondary_market_trading_pair',
  minProfitability: 'min_profitability',
  useOracleConversionRate: 'use_oracle_conversion_rate',
  secondaryToPrimaryBaseConversionRate: 'secondary_to_primary_base_conversion_rate',
  secondaryToPrimaryQuoteConversionRate: 'secondary_to_primary_quote_conversion_rate',
};

const exchangeOptions = ref(Object.values(ExchangeName));

export const $arbitrageForm: $Form = {
  primaryMarket: {
    value: ref(''),

    properties: {
      options: exchangeOptions,
      labelText: 'Select market',
      title: 'Primary Market',
      hint: '',
    },
  },
  secondaryMarket: {
    value: ref(''),

    properties: {
      options: exchangeOptions,
      labelText: 'Select market',
      title: 'Secondary Market',
      hint: '',
    },
  },
  primaryMarketTradingPair: {
    value: ref(''),

    properties: {
      options: ref(['1', '2', '3', '4', '5']),
      labelText: 'Select trading pair',
      title: 'Primary market trading pair',
      hint: '',
    },
  },
  secondaryMarketTradingPair: {
    value: ref(''),

    properties: {
      options: ref(['1', '2', '3', '4', '5']),
      labelText: 'Select trading pair',
      title: 'Secondary market trading pair',
      hint: '',
    },
  },
  minProfitability: {
    value: ref(0),

    properties: {
      title: 'Min profitability',
      hint: '',
      placeholder: '0',
      rightText: '',
    },
  },
  useOracleConversionRate: {
    value: ref(false),

    properties: {
      title: 'Ping pong',
      hint: '',
    },
  },
  secondaryToPrimaryBaseConversionRate: {
    value: ref(0),

    properties: {
      title: 'Secondary to primary base conversion rate',
      hint: '',
      placeholder: '0',
      rightText: '',
    },
  },
  secondaryToPrimaryQuoteConversionRate: {
    value: ref(0),

    properties: {
      title: 'Secondary to primary quote conversion rate',
      hint: '',
      placeholder: '0',
      rightText: '',
    },
  },
  fileName: {
    value: ref(StrategyName.Arbitrage),

    properties: {
      title: '',
      hint: '',
      placeholder: 'Title',
      rightText: '.yml',
    },
  },
};
