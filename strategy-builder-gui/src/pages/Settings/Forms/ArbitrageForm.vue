<template>
  <div class="q-gutter-md">
    <FieldSelect v-bind="primaryMarket" :on-select-update="handleSelectUpdate" />
    <FieldInputSelect v-bind="primaryMarketTradingPair" :filter="filterPrimaryMarketTradingPair" />
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
import { $exchangeNameMap, ExchangeName } from 'src/stores/exchanges';
import { defineComponent, ref } from 'vue';

import FieldInput from '../components/FieldInput.vue';
import FieldInputSelect from '../components/FieldInputSelect.vue';
import FieldSelect from '../components/FieldSelect.vue';
import FieldToggle from '../components/FieldToggle.vue';
import { useForm } from '../composables/useForm';
import { Select } from '../stores/form.types';

export default defineComponent({
  name: 'ArbitrageForm',
  components: { FieldInput, FieldInputSelect, FieldSelect, FieldToggle },

  setup() {
    const strategyName = ref(StrategyName.Arbitrage);
    const exchanges = useExchangesByStrategyName(strategyName);
    const { fields, updateOptions, updateMarkets, filterMarkets, getMarkets } =
      useForm(strategyName);

    updateOptions('primaryMarket', exchanges.value);
    updateOptions('secondaryMarket', exchanges.value);

    const handleSelectUpdate = async (val: ExchangeName) => {
      const markets = await getMarkets($exchangeNameMap[val]);
      updateMarkets(val, markets);
    };

    const filterPrimaryMarketTradingPair = (val: string, update: (callback: () => void) => void) =>
      filterMarkets(
        (fields.primaryMarket as Select).value.value as ExchangeName,
        'primaryMarketTradingPair',
        val,
        update,
      );

    return {
      ...fields,
      handleSelectUpdate,
      filterPrimaryMarketTradingPair,
    };
  },
});
</script>
