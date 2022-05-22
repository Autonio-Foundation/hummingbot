<template #header>
  <q-toolbar class="row flex items-center q-mb-lg q-px-none">
    <div class="col">
      <router-link class="q-px-none q-py-none" :to="{ name: 'strategies' }">
        <q-img
          :src="require('./header-logo.svg')"
          fit="contain"
          no-transition
          no-spinner
          class="logo"
        />
      </router-link>
    </div>
    <div class="col flex justify-end">
      <q-btn
        color="mono-grey-1"
        size="md"
        padding="md lg"
        class="text-uppercase"
        @click="file.click()"
      >
        Upload strategy
      </q-btn>
      <input v-show="false" ref="file" type="file" @change="handleFileUpload" />
    </div>
  </q-toolbar>
</template>

<script lang="ts">
import { useStrategyFile } from 'src/composables/useStrategyFile';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const file = ref<HTMLElement | null>(null);
    const { handleFileUpload } = useStrategyFile();

    return { handleFileUpload, file };
  },
});
</script>

<style scoped lang="scss">
.logo {
  max-width: 56px;
}
</style>
