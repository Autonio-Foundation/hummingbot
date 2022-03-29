import { Exchange } from 'src/stores/exchanges';
import { $strategies, StrategyCategory, StrategyName } from 'src/stores/strategies';
import { computed, Ref } from 'vue';

export { StrategyName } from 'src/stores/strategies';

export const useExchangesByStrategyName = (category: Ref<StrategyName>) =>
  computed(() =>
    Object.values(Exchange).filter((exchange) =>
      Object.values($strategies.value).find(
        (strategy) =>
          (strategy.categories.includes(StrategyCategory.All) ||
            strategy.categories.includes(exchange)) &&
          strategy.strategyName === category.value,
      ),
    ),
  );
