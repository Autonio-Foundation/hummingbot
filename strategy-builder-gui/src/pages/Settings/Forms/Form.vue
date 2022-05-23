<template>
  <q-form @submit="handleSubmit">
    <div class="bg-mono-grey-1 q-px-xl q-py-lg rounded-borders q-mt-md full-width">
      <div class="text-white text-h4 q-mb-lg">
        {{ displaySaveForm ? titleDisplayMap[strategyName] : 'Settings' }}
      </div>
      <component :is="componentsMap[strategyName]" v-if="!displaySaveForm" />
      <SaveForm v-if="displaySaveForm" :strategy-name="strategyName" />
    </div>
    <Pager v-model="currentStep" :file-name="fileName" :file-href="fileHref" />
  </q-form>
</template>

<script lang="ts">
import { StrategyName } from 'src/composables/useStrategies';
import { $strategyNameDisplayMap } from 'src/stores/strategies';
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import { useStrategyFile } from '../../../composables/useStrategyFile';
import { useStrategyName } from '../../../composables/useStrategyName';
import Pager from '../components/Pager/Index.vue';
import { useForm } from '../composables/useForm';
import { useSteps } from '../composables/useSteps';
import ArbitrageForm from './ArbitrageForm.vue';
import LiquidityForm from './LiquidityForm.vue';
import PureMMForm from './PureMMForm.vue';
import SaveForm from './SaveForm.vue';

const componentsMap = {
  [StrategyName.PureMarketMaking]: PureMMForm.name,
  [StrategyName.Arbitrage]: ArbitrageForm.name,
  [StrategyName.Liquidity]: LiquidityForm.name,
};

export default defineComponent({
  components: { PureMMForm, SaveForm, Pager, ArbitrageForm, LiquidityForm },

  setup() {
    const steps = useSteps();
    const strategyName = useStrategyName();
    const { values, init } = useForm(strategyName);
    const router = useRouter();

    init();

    router.afterEach((to) => {
      const pathStrategyName = to.path.split('/')[2] as StrategyName;

      if (pathStrategyName === strategyName.value) {
        init();
      }
    });

    const { getHref } = useStrategyFile();

    const fileHref = getHref(strategyName);
    const displaySaveForm = computed(() => steps.current.value === steps.count);
    const fileName = computed(() => values.value.fileName);

    const handleSubmit = () => {
      localStorage.setItem(strategyName.value, JSON.stringify(values.value));
    };

    return {
      componentsMap,
      displaySaveForm,
      titleDisplayMap: $strategyNameDisplayMap,
      handleSubmit,
      currentStep: steps.current,
      strategyName,
      fileHref,
      fileName,
    };
  },
});
</script>
