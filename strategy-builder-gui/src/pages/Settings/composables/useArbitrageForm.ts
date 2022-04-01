import {
  StrategyName,
  useExchangesByStrategyName,
} from 'src/composables/useExchangesByStrategyName';
import { Exchange } from 'src/stores/exchanges';
import { ref } from 'vue';

import { $arbitrageForm } from '../stores/arbitrageForm';
import { Select } from '../stores/form.types';

export const useArbitrageForm = () => {
  const exchanges = useExchangesByStrategyName(ref(StrategyName.Arbitrage));

  const updateExchangeOptions = () => {
    Object.values($arbitrageForm).forEach((val) => {
      const field = val as Select;
      if (
        JSON.stringify(field.properties?.options?.value) === JSON.stringify(Object.values(Exchange))
      ) {
        field.properties.options.value = exchanges.value;
      }
    });
  };

  return { updateExchangeOptions };
};
