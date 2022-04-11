<template>
  <div class="q-gutter-md">
    <FieldSelect v-bind="exchange" />
    <FieldSelect v-bind="markets" />
    <FieldSelect v-bind="token" />
    <FieldInput v-bind="orderAmount" />
    <FieldInput v-bind="spread" />
    <FieldToggle v-bind="inventorySkew" />
    <FieldInput v-bind="targetBase" />
    <FieldInput v-bind="orderRefreshTime" />
    <FieldInput v-bind="orderRefreshTolerance" />
    <FieldInput v-bind="inventoryRangeMultiplier" />
    <FieldInput v-bind="volatilityInterval" />
    <FieldInput v-bind="avgVolatilityPeriod" />
    <FieldInput v-bind="volatilityToSpreadMultiplier" />
    <FieldInput v-bind="maxSpread" />
    <FieldInput v-bind="maxOrderAge" />
  </div>
</template>
<script lang="ts">
import { StrategyName } from 'src/composables/useStrategies';
import { defineComponent, ref } from 'vue';

import FieldInput from '../components/FieldInput.vue';
import FieldSelect from '../components/FieldSelect.vue';
import FieldToggle from '../components/FieldToggle.vue';
import { useForm } from '../composables/useForm';

export default defineComponent({
  name: 'LiquidityForm',
  components: { FieldInput, FieldSelect, FieldToggle },

  setup() {
    const strategyName = ref(StrategyName.Liquidity);
    const { fields } = useForm(strategyName);

    return {
      ...fields,
    };
  },
});
</script>
