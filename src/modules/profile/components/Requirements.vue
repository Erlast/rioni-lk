<script setup lang="ts">
  import { useDisplay } from 'vuetify';

  const { mobile } = useDisplay();
</script>

<template>
  <v-sheet
    class="d-flex flex-column ga-2 rounded-xxl pa-6"
    style="background-color: var(--color-Choosen) !important"
  >
    <v-sheet>Требования брокера</v-sheet>
    <v-sheet class="d-flex flex-column ga-2">
      <v-sheet
        class="d-flex ga-2 rounded-20 pa-6"
        :class="{ 'align-center': !mobile }"
        style="background-color: white !important"
      >
        <v-sheet>
          <v-img src="/img/component_1.png" alt="Component" :width="mobile ? 52 : 72" />
        </v-sheet>
        <v-sheet class="d-flex flex-column ga-2">
          <v-sheet class="font-default font-semibold text-hard-blue">
            Название/раздел требования
          </v-sheet>
          <v-sheet>
            Небольшая инструкция пояснение, что необходимо сделать/предоставить/куда перейти/что
            будет если не сделать этого
          </v-sheet>
        </v-sheet>
        <v-sheet
          class="d-flex ga-2"
          :class="{ 'flex-column': mobile }"
          :max-width="mobile ? 65 : 'auto'"
        >
          <v-btn
            v-if="mobile"
            class="btn-custom"
            variant="outlined"
            icon
            rounded="mr"
            width="100%"
            height="36"
          >
            <v-img width="16" src="/img/calendar.png" />
          </v-btn>
          <v-btn v-else class="btn-custom" variant="outlined" rounded="mr">
            <template #prepend>
              <v-img width="16" src="/img/calendar.png" />
            </template>
            Добавить напоминание
          </v-btn>

          <v-btn
            v-if="mobile"
            variant="flat"
            icon
            rounded="mr"
            class="btn-custom btn-upload"
            height="36"
            width="100%"
          >
            <v-icon icon="mdi-download" />
          </v-btn>
          <v-btn v-else variant="flat" rounded="mr" class="btn-custom btn-upload">Загрузить</v-btn>
        </v-sheet>
      </v-sheet>
      <v-sheet
        class="d-flex ga-2 rounded-20 pa-6"
        :class="{ 'align-center': !mobile }"
        style="background-color: white !important"
      >
        <v-sheet>
          <v-img src="/img/component_2.png" alt="Component" :width="mobile ? 52 : 72" />
        </v-sheet>
        <v-sheet class="d-flex flex-column ga-2">
          <v-sheet class="font-default font-semibold text-hard-blue">
            Название/раздел требования
          </v-sheet>
          <v-sheet>
            Небольшая инструкция пояснение, что необходимо сделать/предоставить/куда перейти/что
            будет если не сделать этого
          </v-sheet>
        </v-sheet>
        <v-sheet
          class="d-flex ga-2"
          :class="{ 'flex-column': mobile }"
          :max-width="mobile ? 65 : 'auto'"
        >
          <v-btn
            v-if="mobile"
            variant="flat"
            rounded="mr"
            class="btn-custom btn-created"
            width="100%"
            height="36"
          >
            23:30
          </v-btn>

          <v-btn v-else variant="flat" rounded="mr" class="btn-custom btn-created">
            Напоминание создано
          </v-btn>

          <v-btn
            v-if="mobile"
            variant="flat"
            icon
            rounded="mr"
            class="btn-custom btn-upload"
            width="100%"
            height="36"
          >
            <v-icon icon="mdi-download" />
          </v-btn>
          <v-btn v-else variant="flat" rounded="mr" class="btn-custom btn-upload">Загрузить</v-btn>
        </v-sheet>
      </v-sheet>
      <v-sheet
        class="d-flex ga-2 rounded-20 pa-6"
        :class="{ 'align-center': !mobile }"
        style="background-color: white !important"
      >
        <v-sheet>
          <v-img src="/img/component_3.png" alt="Component" :width="mobile ? 52 : 72" />
        </v-sheet>
        <v-sheet class="d-flex flex-column ga-2">
          <v-sheet class="font-default font-semibold text-hard-blue">
            Название/раздел требования
          </v-sheet>
          <v-sheet>
            Небольшая инструкция пояснение, что необходимо сделать/предоставить/куда перейти/что
            будет если не сделать этого
          </v-sheet>
        </v-sheet>
        <v-sheet :class="{ 'flex-column': mobile }" :max-width="mobile ? 65 : 'auto'">
          <v-btn
            v-if="mobile"
            variant="flat"
            rounded="mr"
            icon
            class="btn-custom btn-process"
            width="100%"
            height="36"
          >
            <v-icon icon="mdi-autorenew" />
          </v-btn>
          <v-btn v-else variant="flat" rounded="mr" class="btn-custom btn-process">
            Запрос в обработке
          </v-btn>
        </v-sheet>
      </v-sheet>
      <v-sheet
        class="d-flex ga-2 rounded-20 pa-6"
        :class="{ 'align-center': !mobile }"
        style="background-color: white !important"
      >
        <v-sheet>
          <v-img src="/img/component_4.png" alt="Component" :width="mobile ? 52 : 72" />
        </v-sheet>
        <v-sheet class="d-flex flex-column ga-2">
          <v-sheet class="font-default font-semibold text-hard-blue">
            Название/раздел требования
          </v-sheet>
          <v-sheet>
            Небольшая инструкция пояснение, что необходимо сделать/предоставить/куда перейти/что
            будет если не сделать этого
          </v-sheet>
        </v-sheet>
        <v-sheet
          class="d-flex ga-2"
          :class="{ 'flex-column': mobile }"
          :max-width="mobile ? 65 : 'auto'"
        >
          <v-btn
            v-if="mobile"
            variant="flat"
            rounded="mr"
            class="btn-custom btn-created"
            width="100%"
            height="36"
          >
            23:30
          </v-btn>

          <v-btn v-else variant="flat" rounded="mr" class="btn-custom btn-created">
            Напоминание создано
          </v-btn>

          <v-btn
            v-if="mobile"
            variant="flat"
            icon
            rounded="mr"
            class="btn-custom btn-upload"
            width="100%"
            height="36"
          >
            <v-icon icon="mdi-download" />
          </v-btn>
          <v-btn v-else variant="flat" rounded="mr" class="btn-custom btn-upload">Загрузить</v-btn>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="scss">
  .btn-custom {
    padding: 0 30px;
    font-size: 12px;
    &.btn-upload {
      color: white;
      background-color: var(--color-Element);
    }

    &.btn-created {
      color: var(--color-HardBlue);
      background-color: var(--color-Choosen);
    }

    &.btn-process {
      color: var(--color-ElementCheck);
      background-color: var(--color-LightGreen);
    }

    &.v-btn--variant-outlined {
      border-width: 2px;
      border-color: var(--color-Element);
    }
  }
</style>
