<template>
  <Field :type="FieldType.Orders" class="q-gutter-y-md">
    <Order
      v-for="(order, index) in orders"
      :key="index"
      :title="`Order ${index + 1}`"
      hint="Order hint"
    >
      <template #toggle>
        <q-btn-toggle
          v-model="order.value"
          class="flex justify-between full-width"
          unelevated
          :ripple="false"
          toggle-color="mono-grey-2"
          text-color="mono-grey-3"
          :options="[
            { label: 'sell', value: BtnToggleType.Sell },
            { label: 'buy', value: BtnToggleType.Buy },
          ]"
        />
      </template>
      <template #counters>
        <Input
          v-model="order.orderAmount.value"
          :type="InputType.Number"
          v-bind="{ ...order.orderAmount.properties }"
        />
        <Input
          v-model="order.orderLevelParam.value"
          :type="InputType.Number"
          v-bind="{ ...order.orderLevelParam.properties }"
        />
      </template>
    </Order>
  </Field>
</template>

<script lang="ts">
import { StrategyName } from 'src/stores/strategies';
import { defineComponent, PropType, Ref, ref, watch } from 'vue';

import { useForm } from '../composables/useForm';
import { useOrders } from '../composables/useOrders';
import { BtnToggleType, FieldType } from '../stores/form.types';
import Field from './Field.vue';
import Input, { InputType } from './Input.vue';
import Order from './Order.vue';

export default defineComponent({
  components: { Field, Input, Order },
  props: {
    strategyName: {
      type: String as PropType<StrategyName>,
      default: () => StrategyName.PureMarketMaking,
    },
  },

  setup(props) {
    const orders = useOrders(ref(props.strategyName));
    const { fields, init } = useForm(ref(props.strategyName));

    init();

    watch(fields.orderLevels.value, (value) => {
      orders.update(String(value));
    });

    return { FieldType, orders: orders.value, BtnToggleType, InputType };
  },
});
</script>
