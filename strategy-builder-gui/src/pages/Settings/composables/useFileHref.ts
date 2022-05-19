import { StrategyName } from 'src/stores/strategies';
import { computed, Ref } from 'vue';

import { $fileMap } from '../stores/form';
import { Order } from '../stores/form.types';
import { useForm } from './useForm';

const templateVersionMap = {
  [StrategyName.PureMarketMaking]: 22,
  [StrategyName.Arbitrage]: 5,
  [StrategyName.Liquidity]: 3,
};

export const strategyNameInFileMap = {
  [StrategyName.PureMarketMaking]: 'pure_market_making',
  [StrategyName.Liquidity]: 'liquidity_mining',
  [StrategyName.Arbitrage]: 'arbitrage',
};

export const strategyNameFromFileMap = {
  [strategyNameInFileMap[StrategyName.PureMarketMaking]]: StrategyName.PureMarketMaking,
  [strategyNameInFileMap[StrategyName.Liquidity]]: StrategyName.Liquidity,
  [strategyNameInFileMap[StrategyName.Arbitrage]]: StrategyName.Arbitrage,
};

export const useFileHref = (strategyName: Ref<StrategyName>) => {
  const { values } = useForm(strategyName);
  return computed(() => {
    const valuesObj = Object.keys($fileMap[strategyName.value]).reduce((acc, key) => {
      const fieldName = $fileMap[strategyName.value][key];
      let fieldValue: string | number | boolean | string[] =
        values.value[key] === undefined ? '' : values.value[key];

      if (fieldName === 'orders') {
        const ordersArr: Order[] = JSON.parse(JSON.stringify(fieldValue));
        const ordersFormatArr: string[] = [];
        ordersArr.forEach((val, index) => {
          ordersFormatArr.push(
            `order_${index + 1}: [${[
              String(val.value).toLowerCase(),
              String(val.orderAmount.value ?? 0),
              String(val.orderLevelParam.value ?? 0),
            ]}]`
              .replace(/,/g, '-')
              .replace(/(\[)|(\])/g, '='),
          );
        });
        fieldValue = ordersFormatArr;
      }
      return {
        ...acc,
        [fieldName]: fieldValue,
      };
    }, {});

    let iterator = 0;
    return `data:text/plain,${JSON.stringify(
      {
        template_version: templateVersionMap[strategyName.value],
        strategy: strategyNameInFileMap[strategyName.value],
        ...valuesObj,
      },
      null,
      1,
    )
      .replace(/[{},"]/g, '')
      .replace(/-/g, ', ')
      .replace(/(\[)|(\])/g, '')
      .replace(/=/g, () => {
        iterator += 1;
        if (iterator % 2 === 0) {
          return ']';
        }
        return '[';
      })}`;
  });
};
