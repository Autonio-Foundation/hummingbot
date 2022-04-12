import { ExchangeName } from 'src/stores/exchanges';
import { ref } from 'vue';

import { $Form, FileMap } from './form.types';

const exchangeOptions = ref(Object.values(ExchangeName));

export const liquidityFormFileFieldsMap: FileMap = {
  exchange: 'exchange',
  markets: 'markets',
  token: 'token',
  orderAmount: 'order_amount',
  spread: 'spread',
  inventorySkew: 'inventory_skew_enabled',
  targetBase: 'target_base_pct',
  orderRefreshTime: 'order_refresh_time',
  orderRefreshTolerance: 'order_refresh_tolerance_pct',
  invnentoryRangeMultiplier: 'inventory_range_multiplier',
  volatilityInterval: 'volatility_interval',
  avgVolatilityPeriod: 'avg_volatility_period',
  volatilityToSpreadMultiplier: 'volatility_to_spread_multiplier',
  maxSpread: 'max_spread',
  maxOrderAge: 'max_order_age',
};

export const $liquidityForm: $Form = {
  exchange: {
    value: ref(''),

    properties: {
      options: exchangeOptions,
      labelText: 'Select exchange',
      title: 'Exchange',
      hint: '',
    },
  },
  markets: {
    value: ref(''),

    properties: {
      options: ref([]),
      labelText: 'Select markets',
      title: 'Markets',
      hint: '',
    },
  },
  token: {
    value: ref(''),

    properties: {
      options: ref([]),
      labelText: 'Select token',
      title: 'Token',
      hint: '',
    },
  },
  orderAmount: {
    value: ref(0),

    properties: {
      title: 'Order amount',
      hint: '',
      placeholder: '0.00',
      rightText: '',
    },
  },

  spread: {
    value: ref(''),

    properties: {
      title: 'Spread',
      hint: '',
      placeholder: '0',
      rightText: '',
    },
  },

  inventorySkew: {
    value: ref(false),

    properties: {
      title: 'Inventory skew',
      hint: '',
    },
  },
  targetBase: {
    value: ref(''),

    properties: {
      title: 'Target base',
      hint: '',
      placeholder: '0',
      rightText: '',
    },
  },
  orderRefreshTime: {
    value: ref(''),

    properties: {
      title: 'Order refresh time',
      hint: '',
      placeholder: '0',
      rightText: '',
    },
  },
  orderRefreshTolerance: {
    value: ref(''),

    properties: {
      title: 'Order refresh tolerance',
      hint: '',
      placeholder: '0',
      rightText: '',
    },
  },
  inventoryRangeMultiplier: {
    value: ref(''),

    properties: {
      title: 'Inventory range multiplier',
      hint: '',
      placeholder: '0',
      rightText: '',
    },
  },
  volatilityInterval: {
    value: ref(''),

    properties: {
      title: 'Volatility interval',
      hint: '',
      placeholder: '0',
      rightText: '',
    },
  },
  avgVolatilityPeriod: {
    value: ref(''),

    properties: {
      title: 'Avg volatility period',
      hint: '',
      placeholder: '0',
      rightText: '',
    },
  },

  volatilityToSpreadMultiplier: {
    value: ref(''),

    properties: {
      title: 'Volatility to spread multiplier',
      hint: '',
      placeholder: '0',
      rightText: '',
    },
  },
  maxSpread: {
    value: ref(''),

    properties: {
      title: 'Max spread',
      hint: '',
      placeholder: '0',
      rightText: '',
    },
  },
  maxOrderAge: {
    value: ref(''),

    properties: {
      title: 'Max order age',
      hint: '',
      placeholder: '0',
      rightText: '',
    },
  },
};
