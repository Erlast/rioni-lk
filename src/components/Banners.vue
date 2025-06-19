<template>
  <div class="gr-block-a">
    <div class="banners banner-1">
      <div class="banner-1-text">Внимание</div>
      <div class="banner-1-icon"></div>
      <div class="banner-1-desc">
        Чтобы перейти к финансовым операциям, вам необходимо заполнить
        <span style="font-weight: bold">документы</span>
      </div>
      <div class="banner-1-btn">Заполнить</div>
    </div>
    <div class="banners banner-2">
      <div class="banner-2-name">Рекламный баннер</div>
      <div class="banner-2-descr">
        Тут написать любую нашу рекламу продукта или важную информацию, которую мы хотим донести до
        клиента
      </div>
      <div class="banner-2-desc-btns">
        <div class="banner-2-button__btn">подробнее</div>
        <div class="banner-2-button__btn"><v-icon icon="rioni:arrowRightWhite"></v-icon></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .banners {
    width: 122px;

    flex-shrink: 0;
    margin-bottom: 12px;
    border-radius: 20px;
  }

  .banner-1 {
    padding: 24px;
    background: var(--Backgrounds-light-blue, #edf6ff);

    .banner-1-text {
      margin-bottom: 11px;
      color: #2e4376;
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    .banner-1-icon {
      margin: auto;
      margin-bottom: 11px;
      width: 35px;
      height: 35px;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASLSURBVHgB3VhvaFtVFD/3vteXpk1bRtJl0bjVOmf9g0qrEkoaZv9gt1j6oX82x9ohk8n8oJ+GwiZz4IehDPzut4KwiTgEcdrphzr/oSBbu81RkUrdCN1aZ9OkSZu8dz3nvSZNsiV5N5sI+8GFl3t7z/ndc3733HsLcA+DwR2g0skcm7Hc1zfm9HpfgmRSheVluBaLfeIfHx9asytAEpWQYUexvbN/vw7xuDBtxOMAiQSNGeB288dPnXJcBkjJEqqIjDhwwIBYDF2hr7o6gHQaYGUFYG4OR9Gk2w3s5EnFJCcBDnJQEqOjRyAa1cFAP/UNlnP6pubzAeg6wI0bxtVQ6JisfVkyejXAMSSggAsjUpgFipDXSwT5/Rs2HAZJyJBhqeHhnyGVsqKhFJlqjmGGUEfx/v5LMj7s/iGbaG5+QtW0NkwHM3WSQcujkD7yJohnn7N+k44aGyltrCYe3/bt1q0tYFObtlmHursn0QEHp3O98+FtYBwcBd3TCPHRvSAebLb6STf19Wa6OlpbL95NMoo+MnIoK1qHIzsgnmlFx9Y3wyE90L4+q7bWIrWwIGaCwbft+LJDRueMHV8Xbe6Inv/bMPK/N240o9Pk8RwFG9u8HBmWGBr6vqxoi1rnVsOaFOvvnyrnr9Qg+3zLlpZqhyOAoswXrV2QmGmro5hrk8nHJvz+h6CEfkqSCff2XjZFW10NFYNqDy0E7YTa23+rhIyi7979BiwuGqYuckRbEYiMJWY229HxVjG/xcjo3OE4QeKrKD23WNOzYn7A7X4Xioj5dmRYbGBgAlZX16vp3UCumPv6fr2d78IO9jGKrLamJmhLtIVEeQkJ5op5dfWps5s3N0GBfgpn86Fw+HcMqy3Rsu9+BLFmQSAR9cL50hNyxNwdCFwpJJO7NEXs2XMQb2295vnjckFZRKPAr88DbPKCNvYRsEtT5efQInEeXsbYy37/8gezsz/B2vGfx0zs2ydMrVApl9EKXayo2QWlbH6eoiTY6dPZ7GQ+2NLg4NdIREiLFjccNG4qrZdCZMS8tATRcPiXDA+VzH3Y0NDkcjq3Y9ln5mlrE+LFnWC8EIJ0woAUE6CNfwPap59ZKy85UVhbPRJhdel061mfz98TifxFjNgru3b9gaJVpIqb9z4QPR144xKmcZbEDG/vRCdee/Op9pAcSMzB4DR1cdHVNYyCEuagRNkXPc9nrw8Z0DUivWMH2AZlgfzevKldbGsb4Rguq9K6JCvtwsKtfRT+uetgG0TE46Hiyh5xu09Qmnzm3UOVq7TszJdgVOeLVtRVgfrVGZCCppl3H1UID0dWa+eE/BNKfQ3PvMV/QDgU4IkYuF59Pf+CJQfBkoODFxxVVU+aDCu9KlBtojojpB6Q1tmH2xsLLfwtxHl+ZXJyJ9YVwzSInRWD6gbVJ5lGr1J6Fquq/v65cwPq09PTET0QOMQ5fw8JKVKVNAMyig9/KVBUaAGqaiQ07fDxlZU/M0JhY15v097Ozi+Yy9UiHW4iIhtVJJNMpa7+MDUV7JqZuYY9afifcUf/z/lP8S9Fv6mbFXUcyAAAAABJRU5ErkJggg==);
    }

    .banner-1-desc {
      color: var(--Green-total, #0c342c);
      margin-bottom: 11px;
      text-align: center;
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .banner-1-btn {
      display: flex;
      padding: 2px 12px 4px 12px;
      justify-content: center;
      align-items: flex-start;
      gap: 10px;
      color: var(--Backgrounds-white, #fff);
      text-align: center;
      font-size: 10px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      border-radius: 20px;
      background: var(--Additional-Error, #ff5d5d);
    }
  }

  .banner-2 {
    display: flex;
    width: 142px;
    height: 240px;
    padding: 20px 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    flex-shrink: 0;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('/tmp/recl-banner.png');

    .banner-2-name {
      color: var(--Backgrounds-white, #fff);
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
    .banner-2-descr {
      color: var(--Backgrounds-white, #fff);
      font-family: 'Plus Jakarta Sans';
      font-size: 10px;
      font-style: normal;
      font-weight: 500;
      line-height: 110%; /* 11px */
    }
    .banner-2-desc-btns {
      display: flex;
    }
    .banner-2-button__btn {
      margin-right: 5px;
      padding: 5px 10px;
      border-radius: 20px;
      background: var(--Green-total, #0c342c);
      color: var(--Backgrounds-white, #fff);
      text-align: center;
      font-family: 'Plus Jakarta Sans';
      font-size: 10px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
</style>
