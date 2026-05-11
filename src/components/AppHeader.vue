<template>
  <n-layout-header bordered class="app-header" :style="headerThemeStyle">
    <div class="header-inner">
      <!-- Logo -->
      <RouterLink to="/" class="logo">
        <div class="logo-icon">
          <span>楽</span>
        </div>

        <div class="logo-content">
          <n-gradient-text
            :gradient="{
              from: primaryColor,
              to: secondaryColor,
            }"
            class="logo-text"
          >
            Ikkei Miyata
          </n-gradient-text>

          <span class="logo-subtitle"> Portfolio </span>
        </div>
      </RouterLink>

      <!-- PC Navigation -->
      <nav class="header-nav">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          active-class="nav-link-active"
          exact-active-class="nav-link-exact-active"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- Mobile Menu Button -->
      <n-button class="mobile-menu-button" circle quaternary @click="mobileMenuOpen = true">
        <span class="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </n-button>
    </div>
  </n-layout-header>

  <!-- Mobile Drawer -->
  <n-drawer v-model:show="mobileMenuOpen" placement="right" :width="drawerWidth">
    <n-drawer-content class="mobile-drawer" :style="headerThemeStyle" closable>
      <template #header>
        <div class="drawer-title">
          <div class="logo-icon small">
            <span>楽</span>
          </div>

          <div>
            <strong>Ikkei Miyata</strong>
            <span>Portfolio Menu</span>
          </div>
        </div>
      </template>

      <div class="drawer-content">
        <nav class="drawer-nav">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="drawer-nav-link"
            active-class="drawer-nav-link-active"
            exact-active-class="drawer-nav-link-exact-active"
            @click="mobileMenuOpen = false"
          >
            <span>{{ item.label }}</span>
            <small>{{ item.description }}</small>
          </RouterLink>
        </nav>

        <div class="drawer-theme">
          <div class="drawer-section-title">Theme</div>

          <n-select v-model:value="selectedTheme" :options="colorThemeOptions" size="large" />
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useUserStore } from '@/stores/userStore'
import { colorThemeMap, colorThemeOptions } from '@/theme/colorThemes'

const userStore = useUserStore()

const mobileMenuOpen = ref(false)

const navItems = [
  {
    label: 'Home',
    to: '/',
    description: 'トップページ',
  },
  {
    label: 'History',
    to: '/history',
    description: 'これまでの歩み',
  },
  {
    label: 'Projects',
    to: '/projects',
    description: 'かかわった制作物',
  },
  {
    label: 'Skills',
    to: '/skills',
    description: 'スキルセット',
  },
  {
    label: 'Blog',
    to: '/blog',
    description: '記事・メモ',
  },
  {
    label: 'Contact',
    to: '/contact',
    description: 'お問い合わせ',
  },
  {
    label: 'Setting',
    to: '/setting',
    description: 'テーマ設定',
  },
]

const selectedTheme = computed({
  get() {
    return userStore.colorTheme
  },
  set(colorTheme) {
    userStore.setUserStore({ colorTheme })
  },
})

const currentTheme = computed(() => {
  return colorThemeMap[userStore.colorTheme] || colorThemeMap['dark-blue']
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

const headerThemeStyle = computed(() => {
  const primaryRgb = hexToRgb(primaryColor.value)
  const secondaryRgb = hexToRgb(secondaryColor.value)

  if (isDarkTheme.value) {
    return {
      '--header-primary': primaryColor.value,
      '--header-secondary': secondaryColor.value,
      '--header-primary-rgb': primaryRgb,
      '--header-secondary-rgb': secondaryRgb,
      '--header-bg': 'rgba(2, 6, 23, 0.72)',
      '--header-bg-strong': 'rgba(15, 23, 42, 0.96)',
      '--header-text': 'rgba(255, 255, 255, 0.92)',
      '--header-muted': 'rgba(255, 255, 255, 0.58)',
      '--header-border': 'rgba(255, 255, 255, 0.1)',
      '--header-nav-bg': 'rgba(255, 255, 255, 0.06)',
      '--header-nav-hover': 'rgba(255, 255, 255, 0.1)',
    }
  }

  return {
    '--header-primary': primaryColor.value,
    '--header-secondary': secondaryColor.value,
    '--header-primary-rgb': primaryRgb,
    '--header-secondary-rgb': secondaryRgb,
    '--header-bg': 'rgba(255, 255, 255, 0.78)',
    '--header-bg-strong': 'rgba(255, 255, 255, 0.96)',
    '--header-text': 'rgba(15, 23, 42, 0.92)',
    '--header-muted': 'rgba(15, 23, 42, 0.56)',
    '--header-border': 'rgba(15, 23, 42, 0.1)',
    '--header-nav-bg': 'rgba(15, 23, 42, 0.055)',
    '--header-nav-hover': 'rgba(15, 23, 42, 0.08)',
  }
})

const drawerWidth = computed(() => {
  if (typeof window === 'undefined') return 360
  return window.innerWidth <= 420 ? window.innerWidth : 380
})

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

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  height: var(--app-header-height);
  padding: 0 var(--app-page-x);
  color: var(--header-text);
  background:
    radial-gradient(circle at 10% 0%, rgb(var(--header-primary-rgb) / 0.18), transparent 34%),
    radial-gradient(circle at 90% 0%, rgb(var(--header-secondary-rgb) / 0.14), transparent 30%),
    var(--header-bg);
  border-bottom: 1px solid var(--header-border);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: 100%;
  width: 100%;
  max-width: var(--app-header-container-width);
  margin: 0 auto;
}
.logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  color: inherit;
  text-decoration: none;
}

.logo-icon {
  position: relative;
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 42px;
  height: 42px;
  overflow: hidden;
  border-radius: 16px;
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  background: linear-gradient(135deg, var(--header-primary), var(--header-secondary));
  box-shadow:
    0 12px 30px rgb(var(--header-primary-rgb) / 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.45);
}

.logo-icon::after {
  content: '';
  position: absolute;
  inset: -50%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
  transform: rotate(35deg) translateX(-80%);
  animation: logoShine 4s ease-in-out infinite;
}

.logo-icon span {
  position: relative;
  z-index: 1;
}

.logo-icon.small {
  width: 38px;
  height: 38px;
  border-radius: 14px;
  font-size: 16px;
}

.logo-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
  line-height: 1.1;
}

.logo-text {
  max-width: 260px;
  overflow: hidden;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 0.02em;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.logo-subtitle {
  margin-top: 4px;
  color: var(--header-muted);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 48px;
  padding: 5px;
  border: 1px solid var(--header-border);
  border-radius: 999px;
  background: var(--header-nav-bg);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 10px 30px rgba(0, 0, 0, 0.08);
}

.nav-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 0 15px;
  border-radius: 999px;
  color: var(--header-text);
  opacity: 0.68;
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
  transition:
    opacity 0.22s ease,
    background 0.22s ease,
    color 0.22s ease,
    transform 0.22s ease,
    box-shadow 0.22s ease;
}

.nav-link:hover {
  opacity: 1;
  background: var(--header-nav-hover);
  transform: translateY(-1px);
}

.nav-link-active,
.nav-link-exact-active {
  color: #fff;
  opacity: 1;
  background: linear-gradient(135deg, var(--header-primary), var(--header-secondary));
  box-shadow:
    0 10px 24px rgb(var(--header-primary-rgb) / 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.34);
}

.mobile-menu-button {
  display: none;
  flex: 0 0 auto;
  color: var(--header-text);
}

.hamburger {
  display: grid;
  gap: 4px;
  width: 18px;
}

.hamburger span {
  display: block;
  height: 2px;
  border-radius: 999px;
  background: currentColor;
}

.mobile-drawer {
  color: var(--header-text);
  background:
    radial-gradient(circle at 20% 0%, rgb(var(--header-primary-rgb) / 0.2), transparent 36%),
    var(--header-bg-strong);
}

.drawer-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.drawer-title strong {
  display: block;
  color: var(--header-text);
  font-size: 16px;
}

.drawer-title span {
  display: block;
  margin-top: 3px;
  color: var(--header-muted);
  font-size: 12px;
}

.drawer-content {
  display: grid;
  gap: 24px;
}

.drawer-nav {
  display: grid;
  gap: 10px;
}

.drawer-nav-link {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 16px 18px;
  border: 1px solid var(--header-border);
  border-radius: 20px;
  color: var(--header-text);
  background: rgb(var(--header-primary-rgb) / 0.045);
  text-decoration: none;
  transition:
    transform 0.22s ease,
    background 0.22s ease,
    border-color 0.22s ease;
}

.drawer-nav-link:hover {
  transform: translateY(-2px);
  background: rgb(var(--header-primary-rgb) / 0.09);
}

.drawer-nav-link span {
  font-size: 15px;
  font-weight: 900;
}

.drawer-nav-link small {
  color: var(--header-muted);
  font-size: 12px;
}

.drawer-nav-link-active,
.drawer-nav-link-exact-active {
  color: #fff;
  border-color: rgb(var(--header-primary-rgb) / 0.5);
  background: linear-gradient(135deg, var(--header-primary), var(--header-secondary));
  box-shadow: 0 14px 34px rgb(var(--header-primary-rgb) / 0.24);
}

.drawer-nav-link-active small,
.drawer-nav-link-exact-active small {
  color: rgba(255, 255, 255, 0.72);
}

.drawer-section-title {
  margin-bottom: 10px;
  color: var(--header-muted);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

@keyframes logoShine {
  0%,
  65% {
    transform: rotate(35deg) translateX(-90%);
  }

  100% {
    transform: rotate(35deg) translateX(90%);
  }
}

@media (max-width: 1180px) {
  .app-header {
    padding: 0 18px;
  }

  .header-inner {
    gap: 16px;
  }

  .nav-link {
    padding: 0 12px;
    font-size: 13px;
  }

  .logo-text {
    max-width: 220px;
    font-size: 20px;
  }
}

@media (max-width: 980px) {
  .header-nav {
    display: none;
  }

  .mobile-menu-button {
    display: inline-flex;
  }

  .logo-icon {
    width: 40px;
    height: 40px;
    border-radius: 15px;
  }

  .logo-text {
    max-width: 220px;
    font-size: 20px;
  }
}

@media (max-width: 560px) {
  .logo {
    gap: 10px;
  }

  .logo-icon {
    width: 38px;
    height: 38px;
    border-radius: 14px;
    font-size: 16px;
  }

  .logo-text {
    max-width: 150px;
    font-size: 18px;
  }

  .logo-subtitle {
    font-size: 10px;
  }
}

@media (max-width: 380px) {
  .logo-text {
    max-width: 118px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .logo-icon::after {
    animation: none;
  }

  .nav-link,
  .drawer-nav-link {
    transition: none;
  }
}
</style>
