import { StrategyName } from 'src/composables/useStrategies';

import { $arbitrageForm, arbitrageFieldsFileMap } from './arbitrageForm';
import { $Forms, FileMapContainer } from './form.types';
import { $liquidityForm, liquidityFormFileFieldsMap } from './liquidityForm';
import { $pureMMForm, pureMMFormFileFieldsMap } from './pureMMForm';

export const $form: $Forms = {
  [StrategyName.PureMarketMaking]: $pureMMForm,
  [StrategyName.Arbitrage]: $arbitrageForm,
  [StrategyName.Liquidity]: $liquidityForm,
};

export const $fileMap: FileMapContainer = {
  [StrategyName.PureMarketMaking]: pureMMFormFileFieldsMap,
  [StrategyName.Arbitrage]: arbitrageFieldsFileMap,
  [StrategyName.Liquidity]: liquidityFormFileFieldsMap,
};
