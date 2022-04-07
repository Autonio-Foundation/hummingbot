import { ExchangeName } from 'src/stores/exchanges';
import { $strategies, StrategyCategory, StrategyName } from 'src/stores/strategies';
import { computed, Ref } from 'vue';

export { StrategyName } from 'src/stores/strategies';

export const useExchangesByStrategyName = (strategyName: Ref<StrategyName>) =>
  computed(() =>
    Object.values(ExchangeName).filter((exchange) =>
      Object.values($strategies.value).find(
        (strategy) =>
          (strategy.categories.includes(StrategyCategory.All) ||
            strategy.categories.includes(exchange)) &&
          strategy.strategyName === strategyName.value,
      ),
    ),
  );
