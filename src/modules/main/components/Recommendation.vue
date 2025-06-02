<script setup lang="ts">
  type Slide = {
    name: string
    desc: string
    note: string
  }
  const slides: Slide[] = [
    { name: 'Высокодоходные бумаги', desc: 'Доходность в %', note: 'Новое' },
    { name: 'Увеличьте доходность в %', desc: 'Готовые решения', note: 'Более 30 направлений' },
    { name: 'Аналитика', desc: 'Инвестобзоры и новости рынка', note: '' }
  ]
</script>

<template>
  <div class="reccomendation">
    <div class="b-block"><div class="b-block__name">Rioni Сapital рекомендует</div></div>
    <div class="reccomendation-content">
      <v-slide-group show-arrows class="reccomendation-content-sldier">
        <v-slide-group-item v-for="slide in slides" v-slot="{ isSelected, toggle }">
          <div class="reccomendation-content-item">
            <div class="reccomendation-content-item-data__note" v-if="slide.note">
              {{ slide.note }}
            </div>
            <div class="reccomendation-content-item-data">
              <div class="reccomendation-content-item__name">{{ slide.name }}</div>
              <div class="reccomendation-content-item__desc">{{ slide.desc }}</div>
            </div>
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .reccomendation {
    margin-bottom: 28px;
  }
  .reccomendation-content-item {
    display: flex;
    margin-right: 24px;
    width: 267px;
    height: 144px;
    padding: 16px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    border-radius: 10px;
    background: #eef3f8;
  }

  .reccomendation-content-item__name {
    color: #2e4376;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .reccomendation-content-item__desc {
    color: #a7a7a7;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .reccomendation-content-item-data__note {
    align-self: self-end;
    padding: 4px 11px;
    color: #2e4376;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-radius: 20px;
    background: #cad9f6;
  }
</style>
