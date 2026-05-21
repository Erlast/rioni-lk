<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  import { useI18n } from 'vue-i18n';

  const { mobile } = useDisplay();
  const { t } = useI18n();
</script>

<template>
  <v-sheet class="d-flex flex-column ga-2" :class="{ 'mt-6': mobile }">
    <v-sheet class="text-white">{{t('footer.feedbackTitle')}}</v-sheet>
    <v-form>
      <v-textarea name="text" :placeholder="t('footer.feedbackPlaceholder')" class="text-black" />
      <v-btn variant="flat" type="submit" class="bg-hard-blue text-white rounded-mg" block>
        {{t('footer.feedbackSubmit')}}
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<style scoped lang="scss"></style>
