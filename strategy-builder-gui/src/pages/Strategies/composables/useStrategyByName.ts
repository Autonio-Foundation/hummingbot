import { $strategies, StrategyName } from 'src/stores/strategies';
import { computed, Ref } from 'vue';

export { StrategyName } from 'src/stores/strategies';

export const useStrategyByName = (name: Ref<StrategyName>) => {
  const value = computed(() => $strategies.value.find((val) => name.value === val.strategyName));

  return { value };
};
