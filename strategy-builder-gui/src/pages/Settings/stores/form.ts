import { StrategyName } from 'src/composables/useStrategies';

import { $arbitrageForm, arbitrageFieldsFileMap } from './arbitrageForm';
import { $Forms, FileMapContainer } from './form.types';
import { $pureMMForm, pureMMFormFileFieldsMap } from './pureMMForm';

export const $form: $Forms = {
  [StrategyName.PureMarketMaking]: $pureMMForm,
  [StrategyName.Arbitrage]: $arbitrageForm,
};

export const $fileMap: FileMapContainer = {
  [StrategyName.PureMarketMaking]: pureMMFormFileFieldsMap,
  [StrategyName.Arbitrage]: arbitrageFieldsFileMap,
};
