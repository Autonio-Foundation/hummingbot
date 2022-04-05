import ccxt from 'ccxt';
import { StrategyName } from 'src/composables/useStrategies';
import { Exchange } from 'src/stores/exchanges';
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

  const updateOptions = (fieldName: string, value: Exchange[]) => {
    const select = form[fieldName] as Select;
    select.properties.options.value = value;
  };

  const updateMarkets = async (fieldName: string, value: string) => {
    const select = form[fieldName] as Select;
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

    select.properties.options.value = markets;
  };

  return { fields: form, values, init, defaultOrder, updateOptions, updateMarkets };
};
