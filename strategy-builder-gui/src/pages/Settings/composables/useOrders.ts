import { StrategyName } from 'src/composables/useStrategies';
import { Ref } from 'vue';

import { $form } from '../stores/form';
import { OrderType } from '../stores/form.types';
import { defaultOrder } from '../stores/pureMMForm';

export { BtnToggleType } from '../stores/form.types';

export const useOrders = (strategyName: Ref<StrategyName>) => {
  $form[strategyName.value].orders.value.value = [];
  const computedOrders = $form[strategyName.value].orders.value as Ref<OrderType[]>;

  const addOrder = () => {
    computedOrders.value.push(JSON.parse(JSON.stringify(defaultOrder)));
  };

  const removeLastOrder = () => {
    computedOrders.value.pop();
  };

  return { computedOrders, addOrder, removeLastOrder };
};
