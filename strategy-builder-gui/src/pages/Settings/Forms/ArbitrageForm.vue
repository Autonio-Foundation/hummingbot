<template>
  <div class="q-gutter-md">
    <FieldSelect
      v-bind="primaryMarket"
      :on-select-update="(val) => onSelectUpdate(val, 'primaryMarketTradingPair')"
    />
    <FieldSelect v-bind="primaryMarketTradingPair" :is-input="true" />
    <FieldSelect v-bind="secondaryMarket" />
    <FieldSelect v-bind="secondaryMarketTradingPair" :default-options="secondaryMarketOptions" />
    <FieldInput v-bind="minProfitability" />
    <FieldToggle v-bind="useOracleConversionRate" />
    <FieldInput v-bind="secondaryToPrimaryBaseConversionRate" />
    <FieldInput v-bind="secondaryToPrimaryQuoteConversionRate" />
  </div>
</template>
<script lang="ts">
import { useExchangesByStrategyName } from 'src/composables/useExchangesByStrategyName';
import { StrategyName } from 'src/composables/useStrategies';
import { $exchangeNameMap, Exchange } from 'src/stores/exchanges';
import { defineComponent, ref } from 'vue';

import FieldInput from '../components/FieldInput.vue';
import FieldSelect from '../components/FieldSelect.vue';
import FieldToggle from '../components/FieldToggle.vue';
import { useForm } from '../composables/useForm';

export default defineComponent({
  name: 'ArbitrageForm',
  components: { FieldInput, FieldSelect, FieldToggle },

  setup() {
    const strategyName = ref(StrategyName.Arbitrage);
    const exchanges = useExchangesByStrategyName(strategyName);
    const { fields, updateOptions, updateMarkets, getMarkets } = useForm(strategyName);

    updateOptions('primaryMarket', exchanges.value);
    updateOptions('secondaryMarket', exchanges.value);

    const onSelectUpdate = async (val: string, selectForUpdateName: string) => {
      const markets = await getMarkets($exchangeNameMap[val as unknown as Exchange]);
      updateMarkets(selectForUpdateName, markets);
    };

    return {
      ...fields,
      onSelectUpdate,
    };
  },
});
</script>
