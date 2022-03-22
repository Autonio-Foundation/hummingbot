<template>
  <Field :title="properties.title" :hint="properties.hint" :type="FieldType.Input">
    <Input
      v-model="fieldValue.value"
      :type="type"
      :placeholder="properties.placeholder"
      :right-text="properties.rightText"
      :class="inputClass"
    />
  </Field>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';

import { FieldType } from '../stores/form.types';
import Field from './Field.vue';
import Input, { InputType } from './Input.vue';

export default defineComponent({
  components: { Field, Input },
  props: {
    type: { type: Number as PropType<InputType>, require: false, default: () => InputType.Number },

    inputClass: { type: String, require: false, default: () => 'col-2' },

    value: { type: Object as PropType<Ref<string>>, require: false, default: () => ({}) },
    properties: { type: Object, require: false, default: () => ({}) },
  },

  setup(props) {
    const fieldValue = computed(() => props.value);
    return { InputType, FieldType, fieldValue };
  },
});
</script>

<style lang="scss">
@use 'sass:map';
.form-input {
  border: 1px solid map.get($colors, 'mono-grey-2');
}
.form-input .q-field__append {
  height: 100%;
}
</style>
