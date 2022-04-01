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

  return { fields: form, values, init, defaultOrder, updateOptions };
};
