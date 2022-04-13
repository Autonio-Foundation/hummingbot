import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { StrategyName } from './useExchangesByStrategyName';

export const useStrategyName = () => {
  const route = useRoute();
  return computed(() => route.params.strategyName as StrategyName);
};
