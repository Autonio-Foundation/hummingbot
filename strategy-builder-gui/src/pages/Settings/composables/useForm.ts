import ccxt from 'ccxt';
import { StrategyName } from 'src/composables/useStrategies';
import { $exchangeNameMap, $markets, ExchangeName } from 'src/stores/exchanges';
import { computed, Ref } from 'vue';

import { $form } from '../stores/form';
import { FormValue, Input, Order, Select } from '../stores/form.types';
import { defaultOrder } from '../stores/pureMMForm';

export { BtnToggleType } from '../stores/form.types';

const fixValue = (value: number | string | boolean | Order[]) => {
  if (typeof value === 'number') {
    return String(value.toFixed(2));
  }

  return value;
};

export const useForm = (strategyName: Ref<StrategyName>) => {
  const form = $form[strategyName.value];

  const values = computed(
    () =>
      Object.keys(form).reduce(
        (acc, key) => ({ ...acc, [key]: fixValue(form[key].value.value) }),
        {},
      ) as FormValue,
  );

  const init = () => {
    const localStorageData = localStorage.getItem(strategyName.value);

    if (localStorageData) {
      const parsedLocalStorage = JSON.parse(localStorageData);

      Object.keys(form).forEach((key) => {
        if (key === 'orderAmount' && strategyName.value === StrategyName.PureMarketMaking) {
          const tradingPair = form.market.value.value as string;

          (form[key] as Input).properties.rightText.value = tradingPair
            ? tradingPair.split('/')[0]
            : '';
        } else if (key !== 'fileName') {
          form[key].value.value = parsedLocalStorage[key];
        }
      });
    }
  };

  const updateOptions = (fieldName: string, value: ExchangeName[]) => {
    const select = form[fieldName] as Select;
    select.properties.options.value = value;
  };

  const updateMarkets = (exchangeName: ExchangeName, markets: string[]) => {
    $markets.value[exchangeName] = markets;
  };

  const updateInputRightText = (fieldName: string, text: string) => {
    (form[fieldName] as Input).properties.rightText.value = text;
  };

  const filterMarkets = (
    exchangeName: ExchangeName,
    fieldName: string,
    val: string,
    update: (callback: () => void) => void,
  ) => {
    if (val === '') {
      update(() => {
        (form[fieldName] as Select).properties.options.value = $markets.value[exchangeName] || [];
      });
      return;
    }

    update(() => {
      (form[fieldName] as Select).properties.options.value = (
        $markets.value[exchangeName] || []
      ).filter((value) => value.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
  };

  const getMarkets = async (exchangeName: ExchangeName) => {
    const value = $exchangeNameMap[exchangeName];
    const proxy = process.env.CCXT_PROXY || '';
    const context = new (
      ccxt as unknown as {
        [key: string]: new (args: { proxy: string }) => {
          loadMarkets: () => Promise<ccxt.Dictionary<ccxt.Market>>;
        };
      }
    )[value]({ proxy });

    const marketsDictionary = await context.loadMarkets();
    const markets: string[] = [];

    Object.values(marketsDictionary).forEach((val) => {
      markets.push(val.symbol);
    });

    return markets;
  };

  const getTokens = (markets: string[]) => [
    ...new Set(
      markets.reduce((accTokens: string[], market) => [...accTokens, ...market.split('/')], []),
    ),
  ];

  const filterTokens = (
    exchangeName: ExchangeName,
    fieldName: string,
    val: string,
    update: (callback: () => void) => void,
  ) => {
    const tokens = getTokens($markets.value[exchangeName] || []);
    if (val === '') {
      update(() => {
        (form[fieldName] as Select).properties.options.value = tokens;
      });
      return;
    }

    update(() => {
      (form[fieldName] as Select).properties.options.value = tokens.filter(
        (value) => value.toLowerCase().indexOf(val.toLowerCase()) > -1,
      );
    });
  };

  return {
    fields: form,
    values,
    init,
    defaultOrder,
    updateOptions,
    updateMarkets,
    updateInputRightText,
    filterMarkets,
    filterTokens,
    getMarkets,
    getTokens,
  };
};
