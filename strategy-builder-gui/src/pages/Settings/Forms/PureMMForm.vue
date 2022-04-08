<template>
  <div class="row q-gutter-md q-mb-lg">
    <q-btn
      v-model="formType"
      flat
      rounded
      :ripple="false"
      class="text-capitalize"
      :class="formType === FormType.Basic ? 'text-white bg-mono-grey-2' : 'bg-none'"
      @click="formType = FormType.Basic"
    >
      Basic
    </q-btn>
    <q-btn
      v-model="formType"
      rounded
      flat
      :ripple="false"
      class="text-capitalize"
      :class="formType === FormType.Advanced ? 'text-white bg-mono-grey-2' : 'bg-none'"
      @click="formType = FormType.Advanced"
    >
      Advanced
    </q-btn>
  </div>
  <div v-if="formType === FormType.Basic" class="q-gutter-md">
    <FieldSelect v-bind="exchange" :on-select-update="handleSelectUpdate" />
    <FieldInputSelect v-bind="market" :filter="filterMarketsSelect" />
    <FieldInput v-bind="bidSpread" />
    <FieldInput v-bind="askSpread" />
    <FieldInput v-bind="orderRefreshTime" />
    <FieldInput v-bind="orderAmount" input-class="col-4" />
    <FieldToggle v-bind="pingPong" />
  </div>
  <div v-if="formType === FormType.Advanced" class="q-gutter-md">
    <FieldInput v-bind="orderLevels" />
    <FieldInput v-bind="orderLevelAmount" />
    <FieldInput v-bind="orderLevelSpread" />
    <FieldToggle v-bind="inventorySkew" />
    <FieldInput v-bind="inventoryTargetBase" />
    <FieldInput v-bind="inventoryRangeMultiplier" />
    <FieldInput v-bind="inventoryPrice" />
    <FieldInput v-bind="filledOrderDelay" />
    <FieldToggle v-bind="hangingOrders" />
    <FieldInput v-bind="hangingOrdersCancel" />
    <FieldInput v-bind="minimumSpread" />
    <FieldInput v-bind="orderRefreshTolerance" />
    <FieldInput v-bind="priceCelling" />
    <FieldInput v-bind="priceFloor" />
    <FieldToggle v-bind="orderOptimization" />
    <FieldInput v-bind="askOrderOptimizationDepth" />
    <FieldInput v-bind="bidOrderOptimizationDepth" />
    <FieldToggle v-bind="addTransactionCosts" />
    <FieldSelect v-bind="priceSource" />
    <FieldSelect v-bind="priceType" />
    <FieldSelect v-bind="priceSourceExchange" />
    <FieldSelect v-bind="priceSourceMarket" />
    <FieldToggle v-bind="takeIfCrossed" />
    <FieldInput v-bind="priceSourceCustomApi" input-class="col-6" />
    <FieldInput v-bind="customApiUpdateInterval" />
    <FieldOrders :strategy-name="strategyName" />
    <FieldInput v-bind="maxOrderAge" />
  </div>
</template>
<script lang="ts">
import { useExchangesByStrategyName } from 'src/composables/useExchangesByStrategyName';
import { StrategyName } from 'src/composables/useStrategies';
import { $exchangeNameMap, ExchangeName } from 'src/stores/exchanges';
import { defineComponent, ref } from 'vue';

import FieldInput from '../components/FieldInput.vue';
import FieldInputSelect from '../components/FieldInputSelect.vue';
import FieldOrders from '../components/FieldOrders.vue';
import FieldSelect from '../components/FieldSelect.vue';
import FieldToggle from '../components/FieldToggle.vue';
import { BtnToggleType, useForm } from '../composables/useForm';
import { Select } from '../stores/form.types';

enum FormType {
  Basic,
  Advanced,
}

export default defineComponent({
  name: 'PureMMForm',
  components: { FieldInput, FieldSelect, FieldToggle, FieldOrders, FieldInputSelect },

  emits: ['update:formType'],

  setup() {
    const strategyName = ref(StrategyName.PureMarketMaking);
    const exchanges = useExchangesByStrategyName(strategyName);
    const { fields, updateOptions, updateMarkets, filterMarkets, getMarkets } =
      useForm(strategyName);
    const formType = ref(FormType.Basic);

    updateOptions('exchange', exchanges.value);

    const handleSelectUpdate = async (val: ExchangeName) => {
      console.log($exchangeNameMap[val]);

      const markets = await getMarkets($exchangeNameMap[val]);
      updateMarkets(val, markets);
    };

    const filterMarketsSelect = (val: string, update: (callback: () => void) => void) =>
      filterMarkets((fields.exchange as Select).value.value as ExchangeName, 'market', val, update);

    return {
      ...fields,
      formType,
      FormType,
      BtnToggleType,
      strategyName,
      handleSelectUpdate,
      filterMarketsSelect,
    };
  },
});
</script>
