<script setup lang="ts">
  import { inject, reactive } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { email, required, helpers } from '@vuelidate/validators';
  import { useI18n } from 'vue-i18n';

  const initialState = {
    iban: '',
    email: '',
    select: null,
    items: null,
    checkbox: null
  };

  const state = reactive({
    ...initialState
  });

  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  let showProfileData = inject('showProfileData');
  const { t } = useI18n();

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

    // for (const [key, value] of Object.entries(initialState)) {
    //   state[key] = value;
    // }
  }
</script>

<template>
  <v-card width="900">
    <v-sheet class="modal-window">
      <v-sheet>
        <v-card-title>
          <v-sheet class="modal-windows-label">
            {{ t('profile.modals.settings.title') }}
            <v-sheet class="button-close" @click="showProfileData = false"></v-sheet>
          </v-sheet>
        </v-card-title>

        <v-card-text>
          <v-form ref="form">
            <v-sheet
              class="pa-8 d-flex flex-column ga-4"
              rounded="xxl"
              style="background-color: var(--color-MainBackground) !important"
            >
              <v-sheet class="d-flex flex-column ga-2">
                <v-sheet class="text-background-blue font-20 font-semibold">
                  Банковские реквизиты
                </v-sheet>
                <v-sheet class="d-flex flex-column ga-3">
                  <v-sheet class="d-flex justify-end">
                    <v-checkbox
                      label="Использовать как основной"
                      hide-details
                      true-icon="rioni:formCheckOn"
                      false-icon="rioni:formCheckOff"
                    ></v-checkbox>
                  </v-sheet>
                  <v-sheet class="d-flex ga-2">
                    <v-select
                      variant="solo"
                      flat
                      density="compact"
                      :items="['Австралия', 'Австрия', 'Азербайджан', 'Албания', 'Алжир']"
                      hide-details="auto"
                      :label="t('profile.modals.anketa.countryTitle')"
                    ></v-select>
                    <v-text-field
                      variant="solo"
                      density="compact"
                      flat
                      hide-details="auto"
                      label="Наименование банка"
                    ></v-text-field>
                  </v-sheet>
                  <v-sheet class="d-flex ga-2">
                    <v-text-field
                      v-model="state.iban"
                      variant="solo"
                      density="compact"
                      flat
                      hide-details="auto"
                      label="IBAN"
                      required
                      :error-messages="v$.iban.$errors.map(e => e.$message)"
                      @blur="v$.iban.$touch"
                      @input="v$.iban.$touch"
                    ></v-text-field>

                    <v-text-field
                      variant="solo"
                      density="compact"
                      flat
                      hide-details="auto"
                      label="SWIFT"
                      required
                    ></v-text-field>
                  </v-sheet>
                  <v-sheet class="d-flex justify-end">Заблокировать</v-sheet>
                </v-sheet>
              </v-sheet>
              <v-btn
                variant="flat"
                rounded="lg"
                bg="element-check"
                color="element-check"
                @click="v$.$validate"
              >
                <v-sheet class="text-white">
                  {{ t('profile.modals.settings.contactInformationSaveBtn') }}
                </v-sheet>
              </v-btn>
            </v-sheet>
          </v-form>
        </v-card-text>
      </v-sheet>
    </v-sheet>
  </v-card>
</template>

<style scoped lang="scss"></style>
