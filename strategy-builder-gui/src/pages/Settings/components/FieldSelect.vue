<template>
  <Field :title="properties.title" :hint="properties.hint" :type="FieldType.Select">
    <Select
      v-model="fieldValue.value"
      :options="options"
      :label-text="properties.labelText"
      :use-input="isInput"
      @filter="filter"
      @update:modelValue="onSelectUpdate"
    />
  </Field>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';

import { FieldType } from '../stores/form.types';
import Field from './Field.vue';
import Select from './Select/Index.vue';

export default defineComponent({
  components: { Field, Select },
  props: {
    value: { type: Object as PropType<Ref<string>>, require: false, default: () => ({}) },

    properties: { type: Object, require: false, default: () => ({}) },
    isInput: { type: Boolean, require: false, default: () => false },
    onSelectUpdate: { type: Function, require: false, default: () => ({}) },
  },

  setup(props) {
    const fieldValue = computed(() => props.value);

    /*
     1. GET STATIC MARKETS OPTIONS FOR FILTER
     2. set filtered values to props.properties.options.value:
      props.properties.options.value = staticMarkets.filter(...)
     3.
    */

    const filter = (inputValue: string, update: (callback: () => void) => void) => {
      update(() => {
        // d
      });
    };

    return { FieldType, fieldValue, filter };
  },
});
</script>
