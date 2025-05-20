<template>
  <div class="header">
    <div class="header-logo"></div>
    <div class="header-menu">
      <nav>
        <RouterLink to="/" class="header-menu__element">Главная</RouterLink>
        <RouterLink to="notification" class="header-menu__element">Уведомления</RouterLink>
        <RouterLink to="profile" class="header-menu__element">Профиль</RouterLink>
        <RouterLink to="analitics" class="header-menu__element">Аналитика</RouterLink>
      </nav>
    </div>
    <div class="header-user-panel">
      <div class="header-user-panel-chat"></div>
      <div class="header-user-panel-notification"></div>
      <div class="header-user-panel-profile">
        <div class="header-user-panel-profile__icon"></div>
        <div class="header-user-panel-profile__name">Иван 990</div>
        <div class="header-user-panel-profile__exit"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .header {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    padding: 13px 17px;
    height: 54px;
  }

  .header-logo {
    margin-right: 93px;
    width: 101px;
    height: 50px;
    background-image: url('/img/min-logo.png');
    background-size: cover;
  }

  .header-menu {
    color: var(--Backgrounds-white, #fff);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    .header-menu__element {
      width: 99px;
      height: 32px;
      padding: 5px 15px;
      justify-content: center;
      align-items: flex-start;
      flex-shrink: 0;
      color: #2e4376;
    }

    .router-link-exact-active {
      color: #fff;
      border-radius: 20px;
      background: var(--Text-dark-blue, #2e4376);
    }
  }

  .header-user-panel {
    display: flex;
    align-items: center;
    margin-left: auto;
    color: var(--Backgrounds-white, #fff);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .header-user-panel-chat {
    padding-right: 34px;
    width: 31px;
    height: 31px;
    background-repeat: no-repeat;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAgCAYAAADqgqNBAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKcSURBVHgB7ZZNTBNBFMffm90tiPIhHsQIaFKMnlpII/FgSLxwNgSNxkQTYowePSA3vHjg6gW1hlAPesMeNHowUaNJE4KJWLHRBNuC0UUb0dJCP3ZnxtkeEMq23dJNe+GXNruz82b/b96beTsAO9QAFH9y5NTIufrG9lvAKVQEkbOJWGgkGhh/IlqslDl6zj4YS6d+DyMQAjbAORM/ei30bNhrNIvZkkwqfsMuYQNEgvVNbeOlhHPiIjoINsOpbmkyts14O8hWjLjA0dCKjGaXuJaipXzmCA1ggZLismM3TcS+9H96ev0VWMhjORQVRyLzr4GHbQn19bLRPtx75ZLOdQdUIkhkPTrtnRS3UomZS8+F8J9WZ//BDveZBaqt2rI43QN37/9VQ31Fk6fO+UfFhXb2nJ+3S9iAammpef+xF4XFEWEtvqDmbglWFGozxOJtKBh2NCrvLvM+zoFLSj2KggJW0bNrHHMv/Y+lrZaPpDjiQf/VveWMcZ2+85nRzNGNz7ZVZBBlHcqEMX3LmC0zJ0SmRK7LcBFSpu8xjQzVUvvcA/c4gMU1KPKkaykj7IXFJaWOxsPTXdFZX7TE21A4AERSqEj/ImdMMrMiiBQlpZPqaSk/35vEDeFfkXdOdda3CBZJrny7HH455itigh09Q57mdteMWacQRy7JdWwlMuNU308YwpZLaGNL12Tn8SFFbEXF1IBDtqX9xG1RI0y75eXIm5OUsPmfQX8MyqzdVEtCU5vLW9xmtWCf/GNuKgA1wtJW43rmg5EesBmr9Zp0D06ExRHlkPUhm9GyCZZ/XLP9CFUIz4VHo+n40k1RktcdkKBKqB+n3nb0XgQ9newTHwWsqriAq8HHGxwArKb4ugMHugc1Ttl32KEW/APNtwIEWe0a7gAAAABJRU5ErkJggg==);
  }

  .header-user-panel-notification {
    padding-right: 34px;
    width: 24px;
    height: 27px;
    background-repeat: no-repeat;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAcCAYAAAB75n/uAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIcSURBVHgB3ZVPaBNBFMbfm5nsbtpotAGprVaIf4qJWlsFPXgVQSraYPFgVXoQwasHT7aCiOSkIChelAqCQQTBi14VLwqV4iFQKZ4LamkkbbKzM+OkNKVNNp3tNpf2OwyzO2++H/vem1mAjS4MGEe6T4/2R7fuGVPKY3O/p278/JTN6ffCtJGCWXh86O2oFKUnSrhRJblF7diFjsMXy9P5919Mm4nJvDLw4p8RBLIUi4hUSe/B8phVDRrBD517nEVCbynp+sYR5ii7JXH/26vBEf2o1gLAo4PP816pcADMdVKWE58cfzOc0nNZu+hbg76h3F2dlgwEawIUvJxo7z7Dpyc/fq5d9KsBynLxDgTvsEokYiR2z2+pDrAj3X9Ep8ZU/DoJtwi7j13bawS0dZ4YgDDSXxHdtuuyEUAIPQghRVksZQQgWg6EFAJzzABK4xAWwFjCCKDM3gchxezWpBGAkWgnhJSuXwfUtPcKQLzrVJLPzyoIKV4uwM7eTFcjAE2evD6FuIYDVieE9v3nfy33rU5IT+bZVz4/A+uV9tD32IsJWExVFSCFV+qDJkm4/9KweLtWAbq2bRKaJO214Lk0VCGps9kxKXjoc7BggpGZ/Ifbw9Dg/9B0GTumZ+DpDyX4dt/NhM1OvLuZhvUAKjG9l156fO7vijNjtSbk+OsrDAypCHLvq++5qxahziNqtxQj9paCEO7DIOabQ/8BlpWWZjj9yUkAAAAASUVORK5CYII=);
  }

  .header-user-panel-profile {
    display: flex;
    align-items: center;
  }

  .header-user-panel-profile__icon {
    margin-right: 6px;
    width: 46px;
    height: 46px;
    background-repeat: no-repeat;
    background-image: url(data:image/png;base64,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);
  }

  .header-user-panel-profile__name {
    color: #2e4376;
    margin-right: 6px;
  }

  .header-user-panel-profile__exit {
    width: 16px;
    height: 16px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB9SURBVHgBxZNBCoAgEEV/7lp4kBbd0U0nLGjbGapdkI2gYDAjDgZ9eMxC/9cZEfhIHbEQJ4MrGU2sMzGgQek0tYxyv20JCOadmLjF2haC2YMJyQMc+NdI+DxEO4OgO9ZLukFJVS1IspK5NiCFvKSdwSEFbESPhr8wEiv+0APQ6C2hSod44wAAAABJRU5ErkJggg==);
  }
</style>
