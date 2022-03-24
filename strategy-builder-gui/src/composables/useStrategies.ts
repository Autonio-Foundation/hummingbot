import { StrategyMarket } from '../stores/strategies';

export { StrategyName } from 'src/stores/strategies';

export const useStrategies = () => {
  const markets: string[] = Object.values(StrategyMarket);

  return { markets };
};
