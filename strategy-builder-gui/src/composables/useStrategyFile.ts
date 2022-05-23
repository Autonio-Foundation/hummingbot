import { useForm } from 'src/pages/Settings/composables/useForm';
import { $fileMap } from 'src/pages/Settings/stores/form';
import { BtnToggleType, Order } from 'src/pages/Settings/stores/form.types';
import { StrategyName } from 'src/stores/strategies';
import { computed, Ref } from 'vue';
import { useRouter } from 'vue-router';

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

export const useStrategyFile = () => {
  const router = useRouter();

  const getHref = (strategyName: Ref<StrategyName>) => {
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

  const upload = (event: Event) => {
    const fileReader = new FileReader();
    const files = (event.target as HTMLInputElement).files as FileList;

    fileReader.addEventListener('load', () => {
      try {
        const data = Buffer.from(fileReader.result as string, 'base64').toString('binary');
        const repData = data.slice(data.indexOf('template_version:'));
        const dataArr = repData.split('\n');
        const obj: { [key: string]: string | boolean | object } = {};

        dataArr.forEach((val) => {
          if (val) {
            const valArr = val.split(':');
            obj[valArr[0].replace(/ /g, '')] = valArr[1].replace(/ /g, '');
          }
        });

        const stringOrders: string[] = [];

        Object.keys(obj).forEach((key) => {
          if (key.includes('order_') && (obj[key] as string).includes('[')) {
            stringOrders.push(obj[key] as string);
            delete obj[key];
          }
        });

        const orders = stringOrders.map((value) => {
          const orderArr = value.replace(/(\[)|(\])/g, '').split(',');
          const orderValue = orderArr[0] as BtnToggleType;
          const orderAmount = Number(orderArr[1]);
          const orderLevelParam = Number(orderArr[2]);

          const order = {
            value: orderValue,
            hint: 'Order hint',
            orderAmount: {
              value: orderAmount,

              properties: {
                placeholder: '0',
                rightText: '',
              },
            },
            orderLevelParam: {
              value: orderLevelParam,

              properties: {
                placeholder: '0',
                rightText: '',
              },
            },
          };
          return order;
        });

        obj.orders = orders;

        const strategyName = strategyNameFromFileMap[obj.strategy as string];
        delete obj.strategy;
        delete obj.template_version;
        const fileMap = $fileMap[strategyName];

        Object.keys(fileMap).forEach((fileKey) => {
          Object.keys(obj).forEach((objKey) => {
            if (fileMap[fileKey] === objKey && objKey !== 'orders') {
              obj[fileKey] =
                obj[objKey] === 'true' ? true : obj[objKey] === 'false' ? false : obj[objKey];

              delete obj[objKey];
            }
          });
        });

        localStorage.setItem(strategyName, JSON.stringify(obj));

        router.push({ path: `/settings/${strategyName}`, force: true }).then(() => {
          window.location.reload();
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Wrong file format: ', e); // TODO: ADD POPUP WITH ERROR
      }
    });
    fileReader.readAsDataURL(files[0]);
  };

  return { getHref, upload };
};
