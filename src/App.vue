<template>
  <n-config-provider :theme="currentTheme.naiveTheme" :theme-overrides="currentTheme.overrides">
    <n-global-style />

    <n-message-provider>
      <n-layout
        class="app-layout"
        :style="appThemeStyle"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      >
        <AppHeader />

        <n-layout-content class="app-content">
          <div class="app-background" aria-hidden="true">
            <span class="app-orb app-orb-1"></span>
            <span class="app-orb app-orb-2"></span>
            <span class="app-orb app-orb-3"></span>
          </div>

          <div class="app-view">
            <RouterView />
          </div>
        </n-layout-content>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterView } from 'vue-router'

import AppHeader from '@/components/AppHeader.vue'
import { useUserStore } from '@/stores/userStore'
import { colorThemeMap } from '@/theme/colorThemes'

const userStore = useUserStore()

const mouseX = ref(50)
const mouseY = ref(30)

const currentTheme = computed(() => {
  return colorThemeMap[userStore.colorTheme] ?? colorThemeMap['dark-blue']
})

const primaryColor = computed(() => {
  return currentTheme.value.overrides.common.primaryColor
})

const isDarkTheme = computed(() => {
  return Boolean(currentTheme.value.naiveTheme)
})

const secondaryColor = computed(() => {
  if (primaryColor.value === '#2080f0') return '#8b5cf6'
  if (primaryColor.value === '#18a058') return '#22c55e'
  if (primaryColor.value === '#8a2be2') return '#ec4899'
  if (primaryColor.value === '#f0a020') return '#fb7185'

  return '#8b5cf6'
})

const appThemeStyle = computed(() => {
  const primaryRgb = hexToRgb(primaryColor.value)
  const secondaryRgb = hexToRgb(secondaryColor.value)

  if (isDarkTheme.value) {
    return {
      '--app-primary': primaryColor.value,
      '--app-secondary': secondaryColor.value,
      '--app-primary-rgb': primaryRgb,
      '--app-secondary-rgb': secondaryRgb,
      '--app-mouse-x': `${mouseX.value}%`,
      '--app-mouse-y': `${mouseY.value}%`,

      '--app-bg-1': '#050816',
      '--app-bg-2': '#0f172a',
      '--app-bg-3': '#020617',

      '--app-text': 'rgba(255, 255, 255, 0.94)',
      '--app-muted': 'rgba(255, 255, 255, 0.66)',
      '--app-card': 'rgba(15, 23, 42, 0.74)',
      '--app-card-hover': 'rgba(15, 23, 42, 0.92)',
      '--app-border': 'rgba(255, 255, 255, 0.1)',
      '--app-grid': 'rgba(255, 255, 255, 0.045)',
    }
  }

  return {
    '--app-primary': primaryColor.value,
    '--app-secondary': secondaryColor.value,
    '--app-primary-rgb': primaryRgb,
    '--app-secondary-rgb': secondaryRgb,
    '--app-mouse-x': `${mouseX.value}%`,
    '--app-mouse-y': `${mouseY.value}%`,

    '--app-bg-1': '#f8fbff',
    '--app-bg-2': '#eef6ff',
    '--app-bg-3': '#ffffff',

    '--app-text': 'rgba(15, 23, 42, 0.94)',
    '--app-muted': 'rgba(15, 23, 42, 0.64)',
    '--app-card': 'rgba(255, 255, 255, 0.82)',
    '--app-card-hover': 'rgba(255, 255, 255, 0.96)',
    '--app-border': 'rgba(15, 23, 42, 0.1)',
    '--app-grid': 'rgba(15, 23, 42, 0.055)',
  }
})

const handleMouseMove = (event) => {
  mouseX.value = (event.clientX / window.innerWidth) * 100
  mouseY.value = (event.clientY / window.innerHeight) * 100
}

const handleMouseLeave = () => {
  mouseX.value = 50
  mouseY.value = 30
}

function hexToRgb(hex) {
  let value = hex.replace('#', '')

  if (value.length === 3) {
    value = value
      .split('')
      .map((char) => char + char)
      .join('')
  }

  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)

  return `${r} ${g} ${b}`
}
</script>

<style>
:root {
  --app-header-height: 72px;
  --app-page-x: clamp(14px, 3vw, 24px);
  --app-section-y: clamp(72px, 9vw, 112px);
  --app-container-width: 1220px;
  --app-header-width: 1320px;
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
  color: var(--app-text);
  background:
    radial-gradient(
      circle at var(--app-mouse-x) var(--app-mouse-y),
      rgb(var(--app-primary-rgb) / 0.22),
      transparent 28%
    ),
    linear-gradient(135deg, var(--app-bg-1) 0%, var(--app-bg-2) 48%, var(--app-bg-3) 100%);
}

.app-content {
  position: relative;
  min-height: calc(100dvh - var(--app-header-height));
  overflow-x: hidden;
  background: transparent;
}

.app-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.app-background::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--app-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--app-grid) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent);
}

.app-background::after {
  content: '';
  position: absolute;
  left: var(--app-mouse-x);
  top: var(--app-mouse-y);
  width: 420px;
  height: 420px;
  border-radius: 999px;
  background: rgb(var(--app-primary-rgb) / 0.16);
  filter: blur(90px);
  transform: translate(-50%, -50%);
  transition:
    left 0.16s ease,
    top 0.16s ease;
}

.app-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(80px);
  opacity: 0.8;
  animation: appFloatOrb 11s ease-in-out infinite alternate;
}

.app-orb-1 {
  top: 8%;
  left: -140px;
  width: 380px;
  height: 380px;
  background: rgb(var(--app-primary-rgb) / 0.24);
}

.app-orb-2 {
  top: 20%;
  right: -160px;
  width: 450px;
  height: 450px;
  background: rgb(var(--app-secondary-rgb) / 0.2);
  animation-delay: -3s;
}

.app-orb-3 {
  left: 38%;
  bottom: -120px;
  width: 360px;
  height: 360px;
  background: rgb(var(--app-primary-rgb) / 0.14);
  animation-delay: -6s;
}

.app-view {
  position: relative;
  z-index: 1;
}

/* 全ページ共通 */
.app-page {
  width: 100%;
  padding: var(--app-section-y) var(--app-page-x);
  color: var(--app-text);
  background: transparent !important;
}

.app-container {
  width: min(100%, var(--app-container-width));
  margin-inline: auto;
}

.app-page-header {
  width: min(100%, 880px);
  margin-inline: auto;
  margin-bottom: clamp(48px, 7vw, 72px);
  text-align: center;
}

.app-page-header h2 {
  margin: 24px 0 16px;
  font-size: clamp(40px, 7vw, 86px);
  line-height: 1;
  letter-spacing: 0.04em;
}

.app-page-header p {
  margin: 0;
  color: var(--app-muted);
  line-height: 1.9;
}

/* 既存ページ背景を無効化 */
.home-page,
.history-section,
.projects-section,
.skills-section,
.contact-section,
.setting-section {
  background: transparent !important;
}

/* Home側の個別背景を使っている場合は非表示 */
.home-bg {
  display: none !important;
}

@keyframes appFloatOrb {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }

  to {
    transform: translate3d(42px, -34px, 0) scale(1.08);
  }
}
</style>
