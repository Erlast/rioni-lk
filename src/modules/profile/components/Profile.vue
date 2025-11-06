<script setup lang="ts">
  import { API_ROUTES } from '@/api';
  import { onMounted, ref } from 'vue';
  import type { Profile } from '@/interfaces/profile';
  import { computed } from 'vue';

  const simpleProfile = ref<Profile>();
  var blur = 0;
  async function fetchSimpleProfile() {
    const data = await fetch(API_ROUTES.simpleProfile);
    const res = (await data.json()) as Profile;
    simpleProfile.value = res;
  }

  const themeVars = computed(() => ({
    '--protect-blur': blur
  }));
  onMounted(() => {
    fetchSimpleProfile();
  });

  function onProtect(): void {
    if (blur === 3) {
      blur = 0;
    } else {
      blur = 3;
    }
  }
</script>

<template>
  <div class="profile b-section">
    <div class="profile-form-bg">
      <div class="profile-form">
        <div class="profile-form__label">Карта клиента</div>
        <div class="profile-form-inside">
          <div class="profile-form-inside-block">
            <div
              class="profile-form-photo"
              :style="{ 'background-image': `url(${simpleProfile?.photoUrl})` }"
            ></div>
          </div>

          <div class="profile-form-inside-block">
            <div class="profile-form-cell">
              <div class="profile-form-cell-name">Номер БС</div>
              <div class="profile-form-cell-info">{{ simpleProfile?.nbs }}</div>
            </div>
            <div class="profile-form-cell">
              <div class="profile-form-cell-name">Номер счета ДУ</div>
              <div class="profile-form-cell-info">{{ simpleProfile?.ndu }}</div>
            </div>
            <div class="profile-form-cell">
              <div class="profile-form-cell-name">Почта</div>
              <div class="profile-form-cell-info">{{ simpleProfile?.email }}</div>
            </div>
            <div class="profile-form-cell">
              <div class="profile-form-cell-name">Телефон</div>
              <div class="profile-form-cell-info">{{ simpleProfile?.phone }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="profile-form">
        <div class="profile-form__label">
          Персональные данные
          <div class="profile-form-icon profile-form__show" v-on:click="onProtect()"></div>
          <div class="profile-form-icon profile-form__change"></div>
        </div>

        <div class="profile-form-inside" v-bind:style="{ filter: `blur(${blur}px)` }">
          <div class="profile-form-inside-block profile-form-inside-block-personal-max-width">
            <div class="profile-form-cell">
              <div class="profile-form-cell-name">Имя</div>
              <div class="profile-form-cell-info">
                {{ simpleProfile?.name }} {{ simpleProfile?.patronymic }}
                {{ simpleProfile?.surname }}
              </div>
            </div>
            <div class="profile-form-cell">
              <div class="profile-form-cell-2s-fields">
                <div class="profile-form-cell-2s-fields-field">
                  <div class="profile-form-cell-name">Дата рождения</div>
                  <div class="profile-form-cell-info">{{ simpleProfile?.dateOfBirth }}</div>
                </div>
                <div class="profile-form-cell-2s-fields-field">
                  <div class="profile-form-cell-name">Пол</div>
                  <div class="profile-form-cell-info">{{ simpleProfile?.gender }}</div>
                </div>
              </div>
            </div>

            <div class="profile-form-cell">
              <div class="profile-form-cell-name">Гражданство</div>
              <div class="profile-form-cell-info">{{ simpleProfile?.citizenship }}</div>
            </div>
            <div class="profile-form-cell">
              <div class="profile-form-cell-name">Место рождения</div>
              <div class="profile-form-cell-info">{{ simpleProfile?.placeOfBirth }}</div>
            </div>
          </div>
          <div class="profile-form-inside-block">
            <div class="profile-form-cell">
              <div class="profile-form-cell-name">Тип документа</div>
              <div class="profile-form-cell-info">{{ simpleProfile?.documentType }}</div>
            </div>
            <div class="profile-form-cell">
              <div class="profile-form-cell-name">№ паспорта</div>
              <div class="profile-form-cell-info">{{ simpleProfile?.passportNumber }}</div>
            </div>
            <div class="profile-form-cell">
              <div class="profile-form-cell-name">Дата выдачи</div>
              <div class="profile-form-cell-info">{{ simpleProfile?.passportIssueDate }}</div>
            </div>
            <div class="profile-form-cell">
              <div class="profile-form-cell-name">Конец срока действия</div>
              <div class="profile-form-cell-info">{{ simpleProfile?.passportExpiryDate }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .profile {
    display: flex;
    position: relative;
  }
  .profile-form-bg {
    display: flex;
    margin-right: 20px;
    flex-direction: row;
  }
  .profile-form {
    width: 473px;
    height: 270px;
    padding: 24px;
    margin-right: 12px;
    border-radius: 30px;
    box-sizing: border-box;
    background: var(--Backgrounds-white, #fff);

    .profile-form__label {
      display: flex;
      color: var(--Text-Text-color, #2a2a2a);

      font-size: 16px;
    }
    .profile-form-icon {
      margin-left: 10px;
      width: 22px;
      height: 22px;
      background-size: contain;
      background-repeat: no-repeat;
      cursor: pointer;
    }
    .profile-form__show {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHbSURBVHgB5ZS9TgJBEMdn9/iw0hPfwITGxMTSRIiJYjSx1sLC3kdQUSR8PIIPYGHjC0iURBMaS2PsjG8ALnSAt+PsfcByt6AJNsZp7nZ35jf/nd0dgD9gDH7fkNmblQ97syyDGQ5Tm4JWW/Rjk+g2ILrK2XdB5IKzW6U0R7bkzqD10q4fv3trRBtAQYj6SUr5TwCTilx5nTZ0CwhJwzqK+qk1DmoGFwrcbiRUwJw5J0iR7cXJp+lDgaBch0bBe3uW3Vrp0p+lg4CxZynhCKy+3VmTdzpUTwbFojSC6WT79IlpeR3JcLdzf1qDoETD7Rt3EsAHt2I+Vy2NQlUlncaPoJ5EKmH8KhjyIQTzEV+UBSOUnDlaaxBVfQB+FXgQqJzDfpyzngkqsv2Y5JiIgBljIcV0ogyuQ9llK+M8maBeHfEiAgZZciNBK4XI9A/VSgANXykNiqlcZRskZkNyHVE/Ox+MRlWqh1HtiUwvGb5S3HJWQXImkV8CyhV9266QhXQCbvYdM9jzmnz6ISWE6IhUekGHKotNgJJiTPm5IwKI2GUO7oiH/CP4ddWNjYEGb99dmMsUFtlMfBk+6RCS1mundvzmx0aAo2CvPzRhTEOZyuyNslTNOmiH/8++ADyM9BuqIpoWAAAAAElFTkSuQmCC);
    }
    .profile-form__change {
      margin-left: auto;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFSSURBVHgBtZSxToRAEIZnFiKXWJicD6CFnaURuzMRo9HE1gewsNPO9mCpLI29D2AoTbQ4zwdAqyt4CONdZQyXkx13ERLCyR6Q+NOwy8w3/yy7i9BWrsts6n0DAiKDMwYtZePuVEHUOyVwl4EIaxOkE9clRiROgOSjpFxtXNxa3e5mXJkog0PfYTlkG3ozWZUdwZ7xCMMDBPawFn10zBQig5HII8OYcyYrj8oQNXyCl+QYHIODZ4UBF+ZvY+SF/r6va6cIyYyKKAoQAp6ocfoBCbEpZD2aLAXBaZLP6f9aTYiSqePk+2QRROto63qwUgWx+4Mruz8UtUDGF5xXOkG2XCyibU0gmzESlzGK+xE/fH8FvSpBb9y5gQZqfdb+F0SAokmSWvzyXLZGxHfcZ7nBjYW3gIKgEC6UIs3J6rTTHVuxdMX/KDSnNF+eqM9obBXnfwCvgJvAHCULOAAAAABJRU5ErkJggg==);
    }

    .profile-form-protect {
      filter: blur(3px);
    }

    .profile-form-inside {
      display: flex;
      flex-direction: row;
      margin-top: 12px;

      .profile-form-inside-block {
        margin-right: 60px;
        min-width: 110px;
        width: min-content;

        .profile-form-photo {
          width: 170px;
          height: 170px;
          flex-shrink: 0;
          border-radius: 10px;
        }
        .profile-form-cell {
          margin-bottom: 12px;
          line-height: 16px;
          .profile-form-cell-2s-fields {
            display: flex;
            .profile-form-cell-2s-fields-field {
              margin-right: 24px;
            }
          }
          .profile-form-cell-name {
            color: var(--Text-type-text, #99abbd);

            font-size: 10px;
          }
          .profile-form-cell-info {
            color: var(--Text-dark-blue, #2e4376);

            font-size: 14px;
          }
        }
      }

      .profile-form-inside-block-personal-max-width {
        width: 190px;
      }
    }
  }
</style>
