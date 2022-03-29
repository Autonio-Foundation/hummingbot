import { StrategyCategory } from '../stores/strategies';

export { StrategyName } from 'src/stores/strategies';

export const useStrategies = () => {
  const categories = Object.values(StrategyCategory);

  return { categories };
};
