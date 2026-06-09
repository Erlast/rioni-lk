<script lang="ts" setup>
  import { useAccountStore } from '@/stores/accountStore.ts';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';

  const accountStore = useAccountStore();
  const { t } = useI18n();

  const greetings = computed(() => {
    if (accountStore.data.gender === 'F') {
      return `${t('notice.mrs')}, ${accountStore.data.name} ${accountStore.data.patronymic}`;
    }
    if (accountStore.data.gender === 'M') {
      return `${t('notice.mr')}, ${accountStore.data.name} ${accountStore.data.patronymic}`;
    }
    return t('notice.mr');
  });
</script>
<template>
  <div class="gr-block-a">
    <div class="notice">
      <div class="notice-icon"><div class="notice-icon-warning"></div></div>
      <div class="notice-inside">
        <div class="notice-name">{{ t('notice.title') }}</div>

        <div class="notice-1-desc">{{ greetings }}! {{ t('notice.text') }}</div>
        <div class="notice-1-btn">{{ t('notice.fillBtn') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .notice {
    display: flex;
    justify-content: center;
    position: relative;
    width: 170px;

    border-radius: 20px;
    background: var(--Backgrounds-choice-button, #cad9f6);
    .notice-icon {
      display: flex;
      position: absolute;
      justify-content: center;
      align-items: center;
      top: -20px;
      width: 46px;
      height: 46px;
      border-radius: 30px;
      background: var(--Elements, #6794da);

      .notice-icon-warning {
        width: 23px;
        height: 23px;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALJSURBVHgBtVVLSFRRGP7OuXemOzN3HB+lTIqVaSoMWLmJNFKCLBcKtVAjehBEQUQESRipaCrRA1y0a9OqdiW0cVHgJoIgsggmqaCImsgadZ537uN07gxDpnPvaI9vc17/+f6f//v/c4D/CLJSu7d97VddgtDhIOKD0qH7fXzP+Bfkgn7tqMJSihBLKfgen4fP5TVKhiZEfsbsLtI8xDQ22jNjcGLB44NX9mFjsR8LiSj9crnzfb7gbMlvd1c3SAybRE6cBWMGKopLkVJiG6ZONgb+mPxYY9MzRoVMdIRgrmlfeqQ8GSLfD5SVT9txWB6w8VODMNPh8qTXoTNDiGzbjXfnbqTXft9aRJU4Cfa2ja6WXDDiCwPU6fq1Q7JDZmKmp8hTAJniAixyn4ucLox0vzJ0A8ThhB08DgmqodFQf+dMLgfLyG8erKx3g9SJsg/5wVBRVGaKWzV1IlCXl/zsjtZpItCVNhcXl0HgFwLrq14v5fttkRWRSjJWA39hRtyXvW2DVuQCWyriYhiZZszVkswwUOj2ooTiEhblPjsh4ZGu5zIjW+1yPbvnAIof3jFLJccpwcfwV0iS/MY/PFFv+kxHfrFj3WYvaIMoF8AOJZN3Oa/Vc5IRV1ViNfe66mrMHfPxwZVd7UGiacTyqeBdGTo9gJROoHDu6vHzOZ1Q7oBy7K2tDQJBUTBFZIlYq+C2jjq2vRlqZTV0nndd4/WfSkIKfchpW+CS8S0SJkd2ViVFQ4n3E+ca2MERjSyL0QqmuF7JAzGVHKNQVVDRvhOdM9Ogcz94PVE4EmEUvpiytXc7JWi6DhIdOxRaw1iZ6LYXMx2VpoB/GnmsCD7Pz/LssyhpaYH0eP/huM4F5VrYXosm47xZErY2qqHDQQVW/nTSmS0P4dNwzy0vJc0Gs/4aDVUhESUhWJ3z+qGqpj7Zcv3RceT5Av8aPwGDdAEmvSTz0QAAAABJRU5ErkJggg==);
      }
    }
    .notice-inside {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-top: 30px;
      width: 110px;
      .notice-name {
        margin-bottom: 10px;
        font-weight: 600;
        color: var(--Text-dark-blue, #2e4376);
        text-align: center;
      }
      .notice-1-desc {
        margin-bottom: 10px;
        color: var(--Dark-blue, #0f171f);
        text-align: center;
        font-size: 10px;
      }
      .notice-1-btn {
        display: inline-block;
        color: var(--Backgrounds-white, #fff);
        text-align: center;

        padding: 2px 12px 4px 12px;
        margin-bottom: 20px;
        font-size: 10px;
        border-radius: 20px;
        background: var(--Elements, #6794da);
      }
    }
  }
</style>
