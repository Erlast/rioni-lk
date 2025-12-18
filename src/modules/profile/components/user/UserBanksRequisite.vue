<script setup lang="ts">
  import { reactive } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { email, required, helpers } from '@vuelidate/validators';

  const initialState = {
    iban: '',
    email: '',
    select: null,
    checkbox: null
  };

  const state = reactive({
    ...initialState
  });

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  const rules = {
    iban: {
      required: helpers.withMessage(
        'Данные неверны или не соответствуют заполненным полям ',
        required
      )
    },
    email: { required, email },
    select: { required },
    items: { required },
    checkbox: { required }
  };

  const v$ = useVuelidate(rules, state);

  function clear() {
    v$.value.$reset();

    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value;
    }
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
            <v-text-field
              v-model="state.iban"
              hide-details="auto"
              label="IBAN"
              required
              :error-messages="v$.iban.$errors.map(e => e.$message)"
              @blur="v$.iban.$touch"
              @input="v$.iban.$touch"
            ></v-text-field>

            <v-text-field hide-details="auto" label="SWIFT" required></v-text-field>
          </div>
          <div class="form-inside-inputs-grid justify-end form-inside-text-2">Заблокировать</div>
        </div>
      </div>
      <v-btn class="form-save" block @click="v$.$validate">Сохранить изменения</v-btn>
    </div>
  </v-form>
</template>

<style scoped lang="scss"></style>
