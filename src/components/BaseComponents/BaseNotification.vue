<script setup lang="ts">
  import { computed, watch, ref } from 'vue'
  import { useNotify } from '@/stores/notifyStore'
  import { Notifications, useNotification } from '@kyvg/vue3-notification'
  import { useDisplay, useTheme } from 'vuetify'
  import { useI18n } from 'vue-i18n'
  import CloseButton from '@/components/BaseComponents/CloseButton.vue'

  type ColorIcon = {
    success: string
    info: string
    warn: string
    error: string
  }

  const style = getComputedStyle(document.documentElement)
  const notifyStore = useNotify()
  const { notify } = useNotification()
  const { mobile } = useDisplay()
  const { t } = useI18n()
  const theme = useTheme()

  const displayedNotificationIds = ref(new Set())

  const systemFlexColumn = computed(() => {
    return ['d-flex', notifyStore.description?.length > 30 || mobile.value ? 'flex-column' : 'ga-2']
  })
  const colorIcon: ColorIcon = {
    success: theme.global.current.value.dark
      ? style.getPropertyValue('--color-SuccessBackground')
      : style.getPropertyValue('--color-SuccessNormal'),
    info: theme.global.current.value.dark
      ? style.getPropertyValue('--color-MainBackground')
      : style.getPropertyValue('--color-MainNormal'),
    warn: theme.global.current.value.dark
      ? style.getPropertyValue('--color-WarningsBackground')
      : style.getPropertyValue('--color-WarningNormal'),
    error: theme.global.current.value.dark
      ? style.getPropertyValue('--color-AlertBackground')
      : style.getPropertyValue('--color-AlertNormal')
  }

  const width = computed(() => {
    if (mobile.value) {
      return 'calc(100dvw - 16px)'
    }
    switch (notifyStore.group) {
      case 'session':
        return '620px'
      case 'system':
        return '890px'
      case 'app':
        return '600px'
      default:
        return '890px'
    }
  })

  const formatText = (text: string | undefined) => {
    if (!text) {
      return ''
    }

    let formatted = text.replace(/\r\n|\r|\n/g, '<br>')
    const urlRegex = /https?:\/\/[^\s<>"{}|\\^`\[\]]+/g
    formatted = formatted.replace(urlRegex, url => `<a href="${url}" target="_blank">${url}</a>`)

    return formatted
  }

  const defaultClasses = [
    'position-relative',
    'd-flex',
    `${!mobile.value ? 'align-center' : ''}`,
    'ga-4',
    'notification',
    `${!mobile.value ? 'pr-14' : ''}`,
    'w-100'
  ]

  watch(
    () => notifyStore.notifications,
    newNotifications => {
      const newItems = newNotifications.filter(n => !displayedNotificationIds.value.has(n.id))

      newItems.forEach(item => {
        displayedNotificationIds.value.add(item.id)
        notify({
          id: item.id.toString(),
          title: item.message,
          text: item.description,
          type: item.type,
          group: item.group,
          duration: item.duration
        })

        if (item.duration && item.duration > 0) {
          setTimeout(() => {
            notifyStore.removeNotification(item.id)
            displayedNotificationIds.value.delete(item.id)
          }, item.duration)
        }
      })
    },
    { deep: true }
  )
</script>

<template>
  <Notifications
    class="vue-notification-group-copy"
    :classes="['notification', 'notification-app']"
    group="copy"
    position="top center"
    dangerously-set-inner-html
    ignore-duplicates
  >
    <template #body="props">
      <div :class="[...defaultClasses, 'notification-system', 'test-copy', props.item.type]">
        <IconCheckFill :color="theme.global.current.value.dark ? 'white-exact' : 'black-exact'" />
        <div :class="{ 'body-b1-bold': !mobile, 'body-b3-bold': mobile }">
          {{ props.item.title }}
        </div>
        <div :class="{ 'body-b1': !mobile, 'body-b3': mobile }" v-html="props.item.text"></div>
        <CloseButton
          @click="
            () => {
              props.close()
              notifyStore.removeNotification(parseInt(props.item.id))
            }
          "
        />
      </div>
    </template>
  </Notifications>
  <Notifications
    class="vue-notification-group-session"
    group="session"
    position="top center"
    :width="width"
    dangerously-set-inner-html
    pause-on-hover
    ignore-duplicates
  >
    <template #body="props">
      <div :class="[...defaultClasses, 'session', 'test-session', props.item.type]">
        <v-img src="/img/zhdun.png" width="120" />
        <div class="d-flex flex-column ga-4">
          <p class="title-h3">
            {{ props.item.title }}
          </p>
          <div
            :class="{ 'body-b1': !mobile, 'body-b3': mobile }"
            style="color: var(--color-BlackInactive)"
          >
            {{ t(`notification.sessionEnd.${mobile ? 'mobileDescription' : 'description'}`) }}
          </div>
        </div>
        <CloseButton
          @click="
            () => {
              props.close()
              notifyStore.removeNotification(parseInt(props.item.id))
            }
          "
        />
      </div>
    </template>
  </Notifications>
  <Notifications
    data-testid="notification-system"
    class="vue-notification-group-system"
    group="system"
    position="top center"
    :width="width"
    dangerously-set-inner-html
    ignore-duplicates
  >
    <template #body="props">
      <div
        :class="[...defaultClasses, 'notification-system', 'test-system', 'pr-14', props.item.type]"
      >
        <div :class="{ 'align-self-center': !mobile }">
          <v-icon
            icon="info"
            :color="
              props.item.type ? colorIcon[props.item.type as keyof ColorIcon] : colorIcon.info
            "
          />
        </div>
        <div :class="systemFlexColumn">
          <div
            :class="{ 'body-b1-bold': !mobile, 'body-b3-bold': mobile }"
            v-html="formatText(props.item.title)"
          />
          <div :class="{ 'body-b1': !mobile, 'body-b3': mobile }" v-html="props.item.text"></div>
          <CloseButton
            @click="
              () => {
                props.close()
                notifyStore.removeNotification(parseInt(props.item.id))
              }
            "
          />
        </div>
      </div>
    </template>
  </Notifications>
  <Notifications
    class="vue-notification-group-app"
    :classes="['notification', 'notification-app']"
    group="app"
    :width="width"
    position="top center"
    dangerously-set-inner-html
    ignore-duplicates
  >
    <template #body="props">
      <div :class="[...defaultClasses, 'notification-system', 'test-app', props.item.type]">
        <div :class="{ 'body-b1-bold': !mobile, 'body-b3-bold': mobile }">
          {{ props.item.title }}
        </div>
        <div :class="{ 'body-b1': !mobile, 'body-b3': mobile }" v-html="props.item.text"></div>
        <CloseButton
          @click="
            () => {
              props.close()
              notifyStore.removeNotification(parseInt(props.item.id))
            }
          "
        />
      </div>
    </template>
  </Notifications>
</template>

<style scope lang="scss">
  .vue-notification-wrapper {
    border-radius: 8px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.2);
    margin-bottom: 6px !important;
    min-height: 70px;
  }

  .vue-notification-group-copy {
    width: fit-content !important;
  }

  .vue-notification-group-system,
  .vue-notification-group-session,
  .vue-notification-group-promote,
  .vue-notification-group-app,
  .vue-notification-group-copy {
    top: 24px !important;
  }

  .vue-notification-group-note {
    bottom: 24px !important;
    right: 24px !important;
  }

  @media (max-width: 960px) {
    .vue-notification-group-system,
    .vue-notification-group-session,
    .vue-notification-group-app,
    .vue-notification-group-promote {
      left: 8px !important;
      top: 55px !important;
    }

    .vue-notification-group-copy {
      left: 50% !important;
      top: 55px !important;
      transform: translateX(-50%) !important;
    }
  }

  @media (max-width: 540px) {
    .vue-notification-group-session {
      .notification {
        flex-direction: row;
      }
    }
  }

  .notification-note {
    min-height: 70px;
    height: 100%;
  }

  .notification-system {
    min-height: 70px;
    height: 100%;
  }

  .notification-app {
    min-height: 70px;
    height: 100%;
  }

  .v-theme--myCustomLightTheme {
    .notification {
      font-weight: 700;
      padding: 16px;

      background: $colorWhiteWhite;

      // types (green, amber, red)
      &.success {
        background: $colorSuccessBackground;
      }

      &.warn,
      &.session {
        background: $colorWarningBackground;
      }

      &.error {
        background: $colorAlertBackground;
      }
    }
  }

  .v-theme--myCustomDarkTheme {
    .notification {
      font-weight: 700;
      padding: 16px;

      background: $colorBlackBlack;

      // types (green, amber, red)
      &.success {
        background: $colorSuccessDark;
      }

      &.warn,
      &.session {
        background: $colorWarningDark;
      }

      &.error {
        background: $colorAlertDark;
      }
    }
  }
</style>
