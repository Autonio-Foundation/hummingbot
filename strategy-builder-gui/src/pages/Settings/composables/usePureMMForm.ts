import {
  StrategyName,
  useExchangesByStrategyName,
} from 'src/composables/useExchangesByStrategyName';
import { Exchange } from 'src/stores/exchanges';
import { ref } from 'vue';

import { Select } from '../stores/form.types';
import { $pureMMForm } from '../stores/pureMMForm';

export const usePureMMForm = () => {
  const exchanges = useExchangesByStrategyName(ref(StrategyName.PureMarketMaking));

  const updateExchangeOptions = () => {
    Object.values($pureMMForm).forEach((val) => {
      const field = val as Select;
      if (
        JSON.stringify(field.properties.options?.value) === JSON.stringify(Object.values(Exchange))
      ) {
        field.properties.options.value = exchanges.value;
      }
    });
  };

  return { updateExchangeOptions };
};
