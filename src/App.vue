<template>
  <n-config-provider :theme="currentTheme.naiveTheme" :theme-overrides="currentTheme.overrides">
    <n-global-style />

    <n-message-provider>
      <n-layout class="app-layout">
        <AppHeader />

        <n-layout-content class="app-content">
          <RouterView />
        </n-layout-content>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'

import AppHeader from '@/components/AppHeader.vue'
import { useUserStore } from '@/stores/userStore'
import { colorThemeMap } from '@/theme/colorThemes'

const userStore = useUserStore()

const currentTheme = computed(() => {
  return colorThemeMap[userStore.colorTheme] ?? colorThemeMap['dark-blue']
})
</script>

<style>
:root {
  --app-header-height: 76px;
  --app-page-x: 24px;
  --app-section-y: 112px;
  --app-container-width: 1220px;
  --app-header-container-width: 1320px;
}

@media (max-width: 980px) {
  :root {
    --app-header-height: 68px;
    --app-page-x: 18px;
    --app-section-y: 86px;
  }
}

@media (max-width: 560px) {
  :root {
    --app-header-height: 64px;
    --app-page-x: 14px;
    --app-section-y: 78px;
  }
}

html,
body,
#app {
  width: 100%;
  min-height: 100%;
  margin: 0;
}

html {
  scroll-behavior: smooth;
  scrollbar-gutter: stable;
}

body {
  overflow-x: hidden;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.app-layout {
  min-height: 100vh;
}

.app-content {
  min-height: calc(100dvh - var(--app-header-height));
  overflow-x: hidden;
}
</style>
