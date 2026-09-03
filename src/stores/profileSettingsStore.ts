import { defineStore } from 'pinia';

export const useProfileSettingsStore = defineStore('profileSettings', {
  state: () => ({
    showProfileSettings: false
  })
});
