<script setup lang="ts">
  import RioniLogo from '@/components/RioniLogo.vue';
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useDisplay } from 'vuetify';
  import CreateAccountForm from '@/components/AuthComponents/CreateAccountForm.vue';

  const { mobile } = useDisplay();
  const { t } = useI18n();
  const drawer = ref(false);
</script>

<template>
  <v-sheet class="position-relative h-100" style="background-color: transparent !important">
    <Transition name="drawer-slide">
      <v-sheet v-if="drawer" class="d-flex h-100" style="background-color: white !important">
        <v-sheet v-if="!mobile" class="d-flex flex-column w-50 pa-6">
          <v-sheet v-if="!mobile"><RioniLogo /></v-sheet>
          <v-sheet class="rounded-xxl h-100 pa-6" style="background-color: white !important">
            <CreateAccountForm v-model:drawer="drawer" />
          </v-sheet>
        </v-sheet>
        <v-sheet
          class="d-flex flex-column justify-center pa-6 pr-0"
          :class="{ 'w-50': !mobile, 'w-100': mobile }"
        >
          <v-sheet
            class="d-flex flex-column ga-3 pa-6 rounded-l-20 font-smaller"
            style="height: fit-content; background-color: var(--color-MainBackground) !important"
          >
            <v-sheet class="d-flex flex-column ga-3">
              <v-sheet class="d-flex justify-space-between align-center">
                <v-sheet>{{ t('registration.secondStep.loginRecommendations') }}</v-sheet>
                <v-sheet
                  class="text-additional-link cursor-pointer font-small"
                  @click="drawer = false"
                >
                  {{ t('registration.secondStep.slideUp') }}
                  <v-icon icon="mdi-chevron-right" />
                </v-sheet>
              </v-sheet>
              <v-sheet class="d-flex flex-column ga-1 font-small text-light-grey">
                <v-sheet>{{ t('registration.secondStep.loginRules.rule1') }}</v-sheet>
                <v-sheet>
                  {{ t('registration.secondStep.loginRules.rule2') }}
                </v-sheet>
              </v-sheet>
            </v-sheet>
            <v-sheet class="d-flex flex-column ga-3">
              <v-sheet>{{ t('registration.secondStep.passwordRecommendations') }}</v-sheet>
              <v-sheet class="d-flex flex-column ga-1 font-small text-light-grey">
                <v-sheet>{{ t('registration.secondStep.passwordRules.rule1') }}</v-sheet>
                <v-sheet>{{ t('registration.secondStep.passwordRules.rule2') }}</v-sheet>
                <v-sheet>{{ t('registration.secondStep.passwordRules.rule3') }}</v-sheet>
                <v-sheet>{{ t('registration.secondStep.passwordRules.rule4') }}</v-sheet>
                <v-sheet>{{ t('registration.secondStep.passwordRules.rule5') }}</v-sheet>
                <v-sheet>{{ t('registration.secondStep.passwordRules.rule6') }}</v-sheet>
              </v-sheet>
            </v-sheet>

            <v-sheet class="d-flex ga-6">
              <v-sheet class="d-flex flex-column ga-3">
                <v-sheet>{{ t('registration.secondStep.strongPasswords') }}</v-sheet>
                <v-sheet class="d-flex flex-column font-small text-light-grey">
                  <v-sheet>RfFXY–3Y,XD*h\s</v-sheet>
                  <v-sheet>L!%9#ENVs9b;.X</v-sheet>
                  <v-sheet>vx92PC!VpoJb#22</v-sheet>
                </v-sheet>
              </v-sheet>
              <v-sheet class="d-flex flex-column ga-3">
                <v-sheet>{{ t('registration.secondStep.weakPasswords') }}</v-sheet>
                <v-sheet class="d-flex flex-column font-small text-light-grey">
                  <v-sheet>qwerty1234567</v-sheet>
                  <v-sheet>Vasiliy_Ivanov</v-sheet>
                  <v-sheet>12.02.1998</v-sheet>
                </v-sheet>
              </v-sheet>
            </v-sheet>
          </v-sheet>
        </v-sheet>
      </v-sheet>
      <v-sheet
        v-else
        class="d-flex h-100"
        :class="{ 'justify-center': mobile }"
        style="background-color: var(--color-MainBackground) !important"
      >
        <v-sheet v-if="!mobile" class="h-100 pa-6" width="50%">
          <v-sheet v-if="!mobile"><RioniLogo /></v-sheet>
          <v-sheet class="d-flex justify-center align-center" height="80%">
            <v-sheet v-if="!mobile" class="d-flex">
              <v-sheet
                class="d-flex justify-center flex-column align-center"
                style="height: fit-content"
              >
                <v-img src="/img/rioni-logo-big.png" max-width="150" width="150" />
                <v-sheet class="d-flex flex-column align-center justify-center" max-width="230">
                  <v-sheet class="text-hard-blue font-18 text-center">
                    {{ t('auth.slogan') }}
                  </v-sheet>
                </v-sheet>
              </v-sheet>
            </v-sheet>
          </v-sheet>
        </v-sheet>
        <v-sheet
          class="rounded-xxl h-100 pa-6 d-flex flex-column justify-center align-center"
          :class="{ 'w-50': !mobile, 'w-100': mobile }"
          style="background-color: white !important"
        >
          <CreateAccountForm v-model:drawer="drawer" />
        </v-sheet>
      </v-sheet>
    </Transition>
  </v-sheet>
</template>

<style scoped lang="scss">
  .drawer-slide-enter-active,
  .drawer-slide-leave-active {
    position: absolute;
    inset: 0;
    transition: transform 0.35s ease;
  }

  .drawer-slide-enter-from {
    transform: translateX(100%);
  }

  .drawer-slide-leave-to {
    transform: translateX(100%);
  }
</style>
