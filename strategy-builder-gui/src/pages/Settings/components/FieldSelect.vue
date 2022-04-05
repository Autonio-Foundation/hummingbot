<template>
  <Field :title="properties.title" :hint="properties.hint" :type="FieldType.Select">
    <Select
      v-model="fieldValue.value"
      :options="properties.options"
      :label-text="properties.labelText"
      :filter="filter"
      :markets-field-name="marketsFieldName"
      :strategy-name="strategyName"
    />
  </Field>
</template>

<script lang="ts">
import { StrategyName } from 'src/stores/strategies';
import { computed, defineComponent, PropType, Ref } from 'vue';

import { FieldType } from '../stores/form.types';
import Field from './Field.vue';
import Select from './Select/Index.vue';

export default defineComponent({
  components: { Field, Select },
  props: {
    value: { type: Object as PropType<Ref<string>>, require: false, default: () => ({}) },
    marketsFieldName: { type: String, require: false, default: () => '' },
    strategyName: {
      type: String as PropType<StrategyName>,
      require: false,
      default: () => StrategyName.PureMarketMaking,
    },
    properties: { type: Object, require: false, default: () => ({}) },
    filter: { type: Boolean, require: false, default: () => false },
  },

  setup(props) {
    const fieldValue = computed(() => props.value);

    return { FieldType, fieldValue };
  },
});
</script>
