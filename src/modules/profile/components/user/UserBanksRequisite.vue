<script setup lang="ts">
  import { ref } from 'vue';

  const form = ref();

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  const name = ref('');
  const nameRules = ref([
    v => !!v || 'Name is required',
    v => (v && v.length <= 10) || 'Name must be 10 characters or less'
  ]);
  const select = ref(null);
  const checkbox = ref(false);

  async function validate() {
    const { valid } = await form.value.validate();

    if (valid) alert('Form is valid');
  }
  function reset() {
    form.value.reset();
  }
  function resetValidation() {
    form.value.resetValidation();
  }
</script>

<template>
  <v-form ref="form" class="form">
    <div class="form-inside">
      <div class="form-inside-block">
        <div class="form-inside-label">Банковские реквизиты</div>
        <div class="form-inside-inputs">
          <div class="form-inside-inputs-grid justify-end">
            <v-checkbox
              label="Использовать  как основной"
              class="form-inside-text-2"
              true-icon="rioni:formCheckOn"
              false-icon="rioni:formCheckOff"
            ></v-checkbox>
          </div>
          <div class="form-inside-inputs-grid">
            <v-select
              label="Страна"
              density="compact"
              :items="['Австралия', 'Австрия', 'Азербайджан', 'Албания', 'Алжир']"
            ></v-select>
            <v-text-field hide-details="auto" label="Наименование банка"></v-text-field>
          </div>
          <div class="form-inside-inputs-grid">
            <v-text-field hide-details="auto" label="IBAN"></v-text-field>
            <v-text-field hide-details="auto" label="SWIFT"></v-text-field>
          </div>
          <div class="form-inside-inputs-grid justify-end form-inside-text-2">Заблокировать</div>
        </div>
      </div>
      <v-btn class="form-save" block @click="validate">Сохранить изменения</v-btn>
    </div>
  </v-form>
</template>

<style scoped lang="scss"></style>
