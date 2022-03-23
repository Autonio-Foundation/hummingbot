import { ref } from 'vue';

import { $Form, FieldType } from './form.types';

export const $arbitrageForm: $Form = {
  primaryMarket: {
    value: ref(''),
    type: FieldType.Select,

    properties: {
      options: ['1', '2', '3', '4', '5'],
      labelText: 'Select market',
      title: 'Primary Market',
      hint: '',
    },
  },
  secondaryMarket: {
    value: ref(''),
    type: FieldType.Select,

    properties: {
      options: ['1', '2', '3', '4', '5'],
      labelText: 'Select market',
      title: 'Primary Market',
      hint: '',
    },
  },
  primaryMarketTradingPair: {
    value: ref(''),
    type: FieldType.Select,

    properties: {
      options: ['1', '2', '3', '4', '5'],
      labelText: 'Select trading pair',
      title: 'Primary market trading pair',
      hint: '',
    },
  },
  secondaryMarketTradingPair: {
    value: ref(''),
    type: FieldType.Select,

    properties: {
      options: ['1', '2', '3', '4', '5'],
      labelText: 'Select trading pair',
      title: 'Secondary market trading pair',
      hint: '',
    },
  },
  minProfitability: {
    value: ref(0),
    type: FieldType.Input,

    properties: {
      title: 'Min profitability',
      hint: '',
      placeholder: '0',
      rightText: '',
    },
  },
  useOracleConversionRate: {
    value: ref(false),
    type: FieldType.Toggle,
    properties: {
      title: 'Ping pong',
      hint: '',
    },
  },
  secondaryToPrimaryBaseConversionRate: {
    value: ref(0),
    type: FieldType.Input,

    properties: {
      title: 'Secondary to primary base conversion rate',
      hint: '',
      placeholder: '0',
      rightText: '',
    },
  },
  secondaryToPrimaryQuoteConversionRate: {
    value: ref(0),
    type: FieldType.Input,

    properties: {
      title: 'Secondary to primary quote conversion rate',
      hint: '',
      placeholder: '0',
      rightText: '',
    },
  },
};
