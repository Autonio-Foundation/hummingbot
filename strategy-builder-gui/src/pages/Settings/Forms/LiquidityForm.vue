<template>
  <div class="q-gutter-md">
    <FieldSelect v-bind="exchange" :on-select-update="handleSelectUpdate" />
    <FieldInputSelect v-bind="markets" :filter="filterMarketsField" />
    <FieldInputSelect v-bind="token" :filter="filterTokenField" />
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
import { useExchangesByStrategyName } from 'src/composables/useExchangesByStrategyName';
import { StrategyName } from 'src/composables/useStrategies';
import { ExchangeName } from 'src/stores/exchanges';
import { defineComponent, ref } from 'vue';

import FieldInput from '../components/FieldInput.vue';
import FieldInputSelect from '../components/FieldInputSelect.vue';
import FieldSelect from '../components/FieldSelect.vue';
import FieldToggle from '../components/FieldToggle.vue';
import { useForm } from '../composables/useForm';
import { Select } from '../stores/form.types';

export default defineComponent({
  name: 'LiquidityForm',
  components: { FieldInput, FieldSelect, FieldToggle, FieldInputSelect },

  setup() {
    const strategyName = ref(StrategyName.Liquidity);
    const { fields, updateOptions, updateMarkets, filterMarkets, getMarkets, filterTokens } =
      useForm(strategyName);
    const exchanges = useExchangesByStrategyName(strategyName);
    const currentExchangeName = fields.exchange.value.value as ExchangeName;

    updateOptions('exchange', exchanges.value);

    const handleSelectUpdate = async (val: ExchangeName) => {
      const markets = await getMarkets(val);

      updateMarkets(val, markets);
    };

    if (currentExchangeName) {
      handleSelectUpdate(currentExchangeName);
    }

    const filterMarketsField = (val: string, update: (callback: () => void) => void) =>
      filterMarkets(
        (fields.exchange as Select).value.value as ExchangeName,
        'markets',
        val,
        update,
      );

    const filterTokenField = (val: string, update: (callback: () => void) => void) =>
      filterTokens((fields.exchange as Select).value.value as ExchangeName, 'token', val, update);

    return {
      ...fields,
      handleSelectUpdate,
      filterMarketsField,
      filterTokenField,
    };
  },
});
</script>
