import { $strategies, StrategyMarket } from 'src/stores/strategies';
import { computed, Ref } from 'vue';

export { StrategyName } from 'src/stores/strategies';

export const useStrategiesByCategory = (category: Ref<StrategyMarket>) => {
  const values = computed(() =>
    $strategies.value
      .sort((a, b) => a.place - b.place)
      .filter(
        (val) => category.value === StrategyMarket.All || val.markets.includes(category.value),
      ),
  );

  return { values };
};
