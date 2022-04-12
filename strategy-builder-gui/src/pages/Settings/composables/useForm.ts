import ccxt from 'ccxt';
import { StrategyName } from 'src/composables/useStrategies';
import { $markets, $tokens, ExchangeName } from 'src/stores/exchanges';
import { computed, Ref } from 'vue';

import { $form } from '../stores/form';
import { FormValue, Order, Select } from '../stores/form.types';
import { defaultOrder } from '../stores/pureMMForm';

export { BtnToggleType } from '../stores/form.types';

const fixValue = (value: number | string | boolean | Order[]) => {
  if (typeof value === 'number') {
    return Number(value.toFixed(2));
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

      Object.keys(form).forEach((val) => {
        form[val].value.value = parsedLocalStorage[val];
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

  const updateTokens = (exchangeName: ExchangeName, tokens: string[]) => {
    $tokens.value[exchangeName] = tokens;
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

  const filterTokens = (
    exchangeName: ExchangeName,
    fieldName: string,
    val: string,
    update: (callback: () => void) => void,
  ) => {
    if (val === '') {
      update(() => {
        (form[fieldName] as Select).properties.options.value = $tokens.value[exchangeName] || [];
      });
      return;
    }

    update(() => {
      (form[fieldName] as Select).properties.options.value = (
        $tokens.value[exchangeName] || []
      ).filter((value) => value.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
  };

  const getMarkets = async (value: string) => {
    const context = new (
      ccxt as unknown as {
        [key: string]: new (args: unknown[]) => {
          loadMarkets: () => Promise<ccxt.Dictionary<ccxt.Market>>;
        };
      }
    )[value]([null]);
    const marketsDictionary = await context.loadMarkets();
    const markets: string[] = [];

    Object.values(marketsDictionary).forEach((val) => {
      markets.push(val.symbol);
    });

    return markets;
  };

  const getTokens = (markets: string[]) => {
    const tokens: string[] = [];

    markets.forEach((market) => {
      const symbolTokens = market.split('/');

      symbolTokens.forEach((token: string) => {
        if (!tokens.includes(token)) {
          tokens.push(token);
        }
      });
    });

    return tokens;
  };

  return {
    fields: form,
    values,
    init,
    defaultOrder,
    updateOptions,
    updateMarkets,
    updateTokens,
    filterMarkets,
    filterTokens,
    getMarkets,
    getTokens,
  };
};
