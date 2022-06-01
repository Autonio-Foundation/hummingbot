import { ExchangeName } from 'src/stores/exchanges';
import { StrategyName } from 'src/stores/strategies';
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
      rightText: ref(''),
    },
  },

  spread: {
    value: ref(''),

    properties: {
      title: 'Spread',
      hint: '',
      placeholder: '0',
      rightText: ref(''),
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
      rightText: ref(''),
    },
  },
  orderRefreshTime: {
    value: ref(''),

    properties: {
      title: 'Order refresh time',
      hint: '',
      placeholder: '0',
      rightText: ref(''),
    },
  },
  orderRefreshTolerance: {
    value: ref(''),

    properties: {
      title: 'Order refresh tolerance',
      hint: '',
      placeholder: '0',
      rightText: ref(''),
    },
  },
  inventoryRangeMultiplier: {
    value: ref(''),

    properties: {
      title: 'Inventory range multiplier',
      hint: '',
      placeholder: '0',
      rightText: ref(''),
    },
  },
  volatilityInterval: {
    value: ref(''),

    properties: {
      title: 'Volatility interval',
      hint: '',
      placeholder: '0',
      rightText: ref(''),
    },
  },
  avgVolatilityPeriod: {
    value: ref(''),

    properties: {
      title: 'Avg volatility period',
      hint: '',
      placeholder: '0',
      rightText: ref(''),
    },
  },

  volatilityToSpreadMultiplier: {
    value: ref(''),

    properties: {
      title: 'Volatility to spread multiplier',
      hint: '',
      placeholder: '0',
      rightText: ref(''),
    },
  },
  maxSpread: {
    value: ref(''),

    properties: {
      title: 'Max spread',
      hint: '',
      placeholder: '0',
      rightText: ref(''),
    },
  },
  maxOrderAge: {
    value: ref(''),

    properties: {
      title: 'Max order age',
      hint: '',
      placeholder: '0',
      rightText: ref(''),
    },
  },

  fileName: {
    value: ref(StrategyName.Liquidity),

    properties: {
      title: '',
      hint: '',
      placeholder: 'Title',
      rightText: ref('.yml'),
    },
  },
};
