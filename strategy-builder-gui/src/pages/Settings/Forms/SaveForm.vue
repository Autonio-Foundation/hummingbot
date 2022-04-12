<template>
  <div>
    <div class="bg-mono-grey-2 column text-white text-h6 rounded-borders q-py-md q-px-md q-mb-lg">
      <div class="border row justify-between q-pb-sm">
        <span>Binance</span>
        <span>VALUE</span>
      </div>
      <div class="row justify-between q-pt-sm">
        <span>Order Size</span>
        <span>VALUE</span>
      </div>
    </div>
    <div class="column text-white text-body1">
      File name
      <FieldInput v-bind="fileName" :type="InputType.Text" input-class="col-12 q-mt-sm" />
    </div>
  </div>
</template>

<script lang="ts">
import { StrategyName } from 'src/composables/useStrategies';
import { defineComponent, PropType, ref } from 'vue';

import FieldInput from '../components/FieldInput.vue';
import { InputType } from '../components/Input.vue';
import { useForm } from '../composables/useForm';

export default defineComponent({
  components: { FieldInput },
  props: {
    strategyName: {
      type: String as PropType<StrategyName>,
      required: true,
      default: () => StrategyName.PureMarketMaking,
    },
  },

  setup(props) {
    const { fields } = useForm(ref(props.strategyName));

    return { ...fields, InputType };
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:map';
.border {
  border-bottom: 2px dashed map.get($colors, 'mono-grey-3') !important;
}
</style>
