import { StrategyName } from 'src/composables/useStrategies';
import { Ref } from 'vue';

export enum FieldType {
  Input,
  Select,
  Toggle,
  Orders,
}

export enum BtnToggleType {
  Sell = 'Sell',
  Buy = 'Buy',
}

export interface Select {
  value: Ref<string>;
  type: FieldType;
  properties: {
    options: string[];
    labelText: string;
    title: string;
    hint: string;
  };
}

export interface Input {
  value: Ref<string> | Ref<number>;
  type: FieldType;
  properties: {
    placeholder?: string;
    rightText?: string;
    title: string;
    hint: string;
  };
}
export interface Toggle {
  value: Ref<boolean>;
  type: FieldType;
  properties: {
    title: string;
    hint: string;
  };
}

export interface Order {
  value: Ref<BtnToggleType>;
  orderAmount: Input;
  orderLevelParam: Input;
}

export interface Orders {
  value: Ref<Order[]>;
  type: FieldType;
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
