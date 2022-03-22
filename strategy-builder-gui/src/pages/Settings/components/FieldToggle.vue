<template>
  <Field :title="properties.title" :hint="properties.hint" :type="FieldType.Toggle">
    <q-toggle v-model="fieldValue.value" color="main-green-1" />
  </Field>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';

import { FieldType } from '../stores/form.types';
import Field from './Field.vue';

export default defineComponent({
  components: { Field },
  props: {
    value: { type: Object as PropType<Ref<string>>, require: false, default: () => ({}) },
    properties: { type: Object, require: false, default: () => ({}) },
  },

  setup(props) {
    const fieldValue = computed(() => props.value);
    return { FieldType, fieldValue };
  },
});
</script>
