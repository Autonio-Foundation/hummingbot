import { StrategyName } from 'src/composables/useStrategies';
import { Ref } from 'vue';

export enum FieldType {
  Input,
  Select,
  Toggle,
  Orders,
}

export enum BtnToggleType {
  Sell = 'sell',
  Buy = 'buy',
}

export interface Select {
  value: Ref<string>;
  properties: {
    options: Ref<string[]> | Ref<unknown[]>;
    labelText: string;
    title: string;
    hint: string;
  };
}

export interface Input {
  value: Ref<string> | Ref<number>;
  properties: {
    placeholder?: string;
    rightText: Ref<string>;
    title: string;
    hint: string;
  };
}
export interface Toggle {
  value: Ref<boolean>;
  properties: {
    title: string;
    hint: string;
  };
}

export interface Order {
  value: Ref<BtnToggleType>;
  orderAmount: Input;
  orderLevelParam: Input;
  hint: string;
}

export interface Orders {
  value: Ref<Order[]>;
}

export interface $Form {
  [key: string]: Select | Toggle | Input | Orders;
}

export type $Forms = {
  [key in `${StrategyName}`]: $Form;
};

export interface FileMap {
  [key: string]: string;
}

export type FileMapContainer = {
  [key in `${StrategyName}`]: FileMap;
};

export interface FormValue {
  [key: string]: number | string | boolean;
}

export type FormValueContainer = {
  [key in `${StrategyName}`]: FormValue;
};
