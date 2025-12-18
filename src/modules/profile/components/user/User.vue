<script setup lang="ts"></script>

<template>
  <div class="form-inside">
    <div class="form-inside-block">
      <div class="form-inside-label">Налоговые резидентства</div>
      <div class="form-inside-inputs">
        <div class="form-inside-inputs-label form-inside-text-1">
          Выберите все страны в которых вы являетесь налоговым резидентом
        </div>
        <div class="form-inside-inputs-grid">
          <div class="form-inside-inputs-number">1</div>
          <v-select
            label="Страна"
            density="compact"
            :items="['Австралия', 'Австрия', 'Азербайджан', 'Албания', 'Алжир']"
          ></v-select>
          <v-text-field hide-details="auto" label="ИНН"></v-text-field>
        </div>
      </div>
    </div>
    <div class="form-inside-block">
      <div class="form-inside-label">Дополнительные сведения</div>
      <div class="form-inside-inputs-grid justify-space-between">
        <v-checkbox
          label="Имеются бенефициары"
          class="form-inside-text-1"
          true-icon="rioni:formCheckOn"
          false-icon="rioni:formCheckOff"
        ></v-checkbox>
        <v-checkbox
          label="Являюсь PEP (politically exposed person)"
          class="form-inside-text-1"
          true-icon="rioni:formCheckOn"
          false-icon="rioni:formCheckOff"
        ></v-checkbox>
      </div>
    </div>
    <div class="form-inside-block">
      <div class="form-inside-label">Вид на жительство и аналоги документа</div>
      <div class="form-inside-inputs">
        <div class="form-inside-inputs-label form-inside-text-1">
          Выберите все страны, где имеется вид на жительство
        </div>
        <div class="form-inside-inputs-grid">
          <v-select
            label="Страна"
            density="compact"
            :items="['Австралия', 'Австрия', 'Азербайджан', 'Албания', 'Алжир']"
          ></v-select>
          <v-select
            label="Кем выдан"
            density="compact"
            :items="['Данные 1', 'Данные 2', 'Данные 4']"
          ></v-select>
        </div>
        <div class="form-inside-inputs-grid">
          <v-text-field hide-details="auto" label="Номер документа"></v-text-field>
          <v-text-field hide-details="auto" label="Срок пребывания"></v-text-field>
        </div>
        <div class="form-inside-inputs-grid justify-space-between">
          <v-checkbox
            label="Вида на жительства (или аналога) в государстве, отличном от гражданства, не имею"
            class="form-inside-text-1"
            true-icon="rioni:formCheckOn"
            false-icon="rioni:formCheckOff"
          ></v-checkbox>
        </div>
      </div>
    </div>
    <div class="form-inside-block">
      <div class="form-inside-label">Место работы</div>
    </div>
    <div class="form-inside-inputs">
      <div class="form-inside-inputs-grid">
        <v-text-field hide-details="auto" label="Название компании"></v-text-field>
        <v-text-field hide-details="auto" label="Должность"></v-text-field>
      </div>
      <div class="form-inside-inputs-grid">
        <div class="with-50-percent">
          <v-text-field hide-details="auto" label="Отрасль"></v-text-field>
        </div>
        <div class="d-flex ga-2 with-50-percent">
          <v-text-field hide-details="auto" label="Номер телефона"></v-text-field>
          <v-text-field hide-details="auto" label="Сайт"></v-text-field>
        </div>
      </div>
      <v-checkbox
        label="Состою в некомерческой организации (НКО)"
        class="form-inside-text-1"
        true-icon="rioni:formCheckOn"
        false-icon="rioni:formCheckOff"
      ></v-checkbox>
      <v-checkbox
        label="Состою в неправительственной организации (НПО)"
        class="form-inside-text-1"
        true-icon="rioni:formCheckOn"
        false-icon="rioni:formCheckOff"
      ></v-checkbox>
      <v-checkbox
        label="Статус самозанятого"
        class="form-inside-text-1"
        true-icon="rioni:formCheckOn"
        false-icon="rioni:formCheckOff"
      ></v-checkbox>
      <v-checkbox
        label="Не работаю"
        class="form-inside-text-1"
        true-icon="rioni:formCheckOn"
        false-icon="rioni:formCheckOff"
      ></v-checkbox>
    </div>
    <div class="form-save">Сохранить изменения</div>
  </div>
</template>

<style scoped lang="scss"></style>
