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
        @click="onClickUpload"
      >
        Upload strategy
      </q-btn>
      <input ref="file" style="display: none" type="file" @change="handleFileUpload" />
    </div>
  </q-toolbar>
</template>

<script lang="ts">
import { strategyNameFromFileMap } from 'src/pages/Settings/composables/useFileHref';
import { $fileMap } from 'src/pages/Settings/stores/form';
import { BtnToggleType } from 'src/pages/Settings/stores/form.types';
import { defineComponent, getCurrentInstance, Ref, ref } from 'vue';

export default defineComponent({
  setup() {
    const imageUrl = ref() as Ref<string>;
    const file = ref<HTMLElement | null>(null);
    const onClickUpload = () => {
      file.value?.click();
    };

    const handleFileUpload = () => {
      const fileReader = new FileReader();

      fileReader.addEventListener('load', () => {
        imageUrl.value = fileReader.result as string;

        const data = Buffer.from(imageUrl.value, 'base64').toString('binary');
        const repData = data.slice(data.indexOf('template_version:'));
        const dataArr = repData.split('\n');
        const obj: { [key: string]: any } = {};

        dataArr.forEach((val) => {
          const valArr = val.split(':');

          obj[valArr[0].replace(/ /g, '')] = valArr[1].replace(/ /g, '');
        });

        const stringOrders: string[] = [];

        Object.keys(obj).forEach((key) => {
          if (key.includes('order_') && obj[key].includes('[')) {
            stringOrders.push(obj[key]);
            delete obj[key];
          }
        });

        const orders = stringOrders.map((value) => {
          const orderArr = value.replace(/(\[)|(\])/g, '').split(',');
          const orderValue = orderArr[0] as BtnToggleType;
          const orderAmount = Number(orderArr[1]);
          const orderLevelParam = Number(orderArr[2]);

          const order = {
            value: orderValue,
            hint: 'Order hint',
            orderAmount: {
              value: orderAmount,

              properties: {
                placeholder: '0',
                rightText: '',
              },
            },
            orderLevelParam: {
              value: orderLevelParam,

              properties: {
                placeholder: '0',
                rightText: '',
              },
            },
          };
          return order;
        });

        obj.orders = orders;

        const strategyName = strategyNameFromFileMap[obj.strategy];
        delete obj.strategy;
        delete obj.template_version;
        const fileMap = $fileMap[strategyName];

        Object.keys(fileMap).forEach((fileKey) => {
          Object.keys(obj).forEach((objKey) => {
            if (fileMap[fileKey] === objKey && objKey !== 'orders') {
              obj[fileKey] =
                obj[objKey] === 'true' ? true : obj[objKey] === 'false' ? false : obj[objKey];

              delete obj[objKey];
            }
          });
        });

        localStorage.setItem(strategyName, JSON.stringify(obj));
      });
    };

    return { onClickUpload, handleFileUpload, file };
  },
});
</script>

<style scoped lang="scss">
.logo {
  max-width: 56px;
}
</style>
