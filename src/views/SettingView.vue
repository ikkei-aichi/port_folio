<template>
  <section class="setting-section app-page" :style="pageThemeStyle">
    <div class="setting-container app-container">
      <div class="page-header">
        <n-tag round type="primary" size="large"> Settings </n-tag>

        <h2>
          <n-gradient-text type="primary"> Setting </n-gradient-text>
        </h2>

        <p>ポートフォリオ全体の表示テーマを変更できます。</p>
      </div>

      <n-grid responsive="screen" cols="1 m:2" :x-gap="28" :y-gap="28">
        <n-gi>
          <n-card class="setting-card reveal" :bordered="false">
            <h3>カラーテーマ設定</h3>

            <div class="setting-item">
              <div>
                <strong>現在のテーマ</strong>
                <p>プリセットからテーマを選択できます。</p>
              </div>

              <n-tag round type="primary">
                {{ currentThemeLabel }}
              </n-tag>
            </div>

            <n-select v-model:value="selectedTheme" :options="colorThemeOptions" size="large" />

            <n-divider />

            <div class="setting-item">
              <div>
                <strong>モード</strong>
                <p>ライトモード / ダークモードを切り替えます。</p>
              </div>

              <n-switch v-model:value="darkMode">
                <template #checked> Dark </template>

                <template #unchecked> Light </template>
              </n-switch>
            </div>

            <n-divider />

            <div>
              <strong>メインカラー</strong>
              <p class="muted">サイト全体で使用するアクセントカラーを選択します。</p>

              <n-grid responsive="screen" cols="2 s:4" :x-gap="12" :y-gap="12">
                <n-gi v-for="color in baseColorOptions" :key="color.value">
                  <button
                    class="color-button"
                    :class="{ active: selectedBaseColor === color.value }"
                    :style="{ '--color': color.color }"
                    type="button"
                    @click="changeBaseColor(color.value)"
                  >
                    <span></span>
                    {{ color.label }}
                  </button>
                </n-gi>
              </n-grid>
            </div>

            <n-divider />

            <n-space :wrap="true">
              <n-button type="primary" round @click="saveTheme"> 設定を保存 </n-button>

              <n-button round @click="resetTheme"> デフォルトに戻す </n-button>
            </n-space>
          </n-card>

          <n-card class="setting-card preset-area" :bordered="false">
            <h3>テーマ一覧</h3>

            <n-grid responsive="screen" cols="1 s:2" :x-gap="14" :y-gap="14">
              <n-gi v-for="theme in colorThemeOptions" :key="theme.value">
                <button
                  class="preset-card"
                  :class="{ active: userStore.colorTheme === theme.value }"
                  :style="getPresetStyle(theme.value)"
                  type="button"
                  @click="selectTheme(theme.value)"
                >
                  <span></span>

                  <div>
                    <strong>{{ theme.label }}</strong>
                    <small>{{ theme.value }}</small>
                  </div>
                </button>
              </n-gi>
            </n-grid>
          </n-card>
        </n-gi>

        <n-gi>
          <n-card class="preview-card reveal" :bordered="false">
            <h3>表示プレビュー</h3>

            <div class="preview-window">
              <n-tag round type="primary" size="small"> Portfolio </n-tag>

              <h4>Ikkei Miyata</h4>

              <p>Vue / Naive UI を使って、見やすく使いやすいWebサイトを制作します。</p>

              <n-space :wrap="true">
                <n-button type="primary" round size="small"> Contact </n-button>

                <n-button round size="small"> Projects </n-button>
              </n-space>

              <n-grid
                responsive="screen"
                cols="1 s:2"
                :x-gap="12"
                :y-gap="12"
                class="preview-mini-grid"
              >
                <n-gi>
                  <div class="mini-card">
                    <strong>Skills</strong>
                    <span>Vue / JavaScript</span>
                  </div>
                </n-gi>

                <n-gi>
                  <div class="mini-card">
                    <strong>Projects</strong>
                    <span>Web App / UI</span>
                  </div>
                </n-gi>
              </n-grid>
            </div>

            <div class="theme-info">
              <div>
                <span>Theme</span>
                <strong>{{ userStore.colorTheme }}</strong>
              </div>

              <div>
                <span>Primary</span>
                <strong>{{ primaryColor }}</strong>
              </div>

              <div>
                <span>Mode</span>
                <strong>{{ isDarkTheme ? 'Dark' : 'Light' }}</strong>
              </div>
            </div>
          </n-card>
        </n-gi>
      </n-grid>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useMessage } from 'naive-ui'
import { useUserStore } from '@/stores/userStore'
import { colorThemeMap, colorThemeOptions } from '@/theme/colorThemes'

const userStore = useUserStore()
const message = useMessage()

const baseColorOptions = [
  { label: 'Blue', value: 'blue', color: '#2080f0' },
  { label: 'Green', value: 'green', color: '#18a058' },
  { label: 'Purple', value: 'purple', color: '#8a2be2' },
  { label: 'Orange', value: 'orange', color: '#f0a020' },
]

const selectedTheme = computed({
  get() {
    return userStore.colorTheme
  },
  set(value) {
    selectTheme(value)
  },
})

const selectedBaseColor = computed(() => {
  return userStore.colorTheme.split('-')[1] ?? 'blue'
})

const darkMode = computed({
  get() {
    return userStore.colorTheme.startsWith('dark')
  },
  set(value) {
    const mode = value ? 'dark' : 'light'
    selectTheme(`${mode}-${selectedBaseColor.value}`)
  },
})

const currentTheme = computed(() => {
  return colorThemeMap[userStore.colorTheme] ?? colorThemeMap['dark-blue']
})

const primaryColor = computed(() => {
  return currentTheme.value.overrides.common.primaryColor
})

const isDarkTheme = computed(() => {
  return Boolean(currentTheme.value.naiveTheme)
})

const currentThemeLabel = computed(() => {
  return (
    colorThemeOptions.find((theme) => theme.value === userStore.colorTheme)?.label ??
    userStore.colorTheme
  )
})

const pageThemeStyle = computed(() => {
  const rgb = hexToRgb(primaryColor.value)

  return {
    '--page-primary': primaryColor.value,
    '--page-primary-rgb': rgb,
    '--page-bg': isDarkTheme.value ? '#050816' : '#f8fbff',
    '--page-bg-2': isDarkTheme.value ? '#0f172a' : '#eef6ff',
    '--page-card': isDarkTheme.value ? 'rgba(15,23,42,0.76)' : 'rgba(255,255,255,0.82)',
    '--page-card-hover': isDarkTheme.value ? 'rgba(15,23,42,0.92)' : 'rgba(255,255,255,0.96)',
    '--page-text': isDarkTheme.value ? 'rgba(255,255,255,0.92)' : 'rgba(15,23,42,0.92)',
    '--page-muted': isDarkTheme.value ? 'rgba(255,255,255,0.66)' : 'rgba(15,23,42,0.62)',
    '--page-border': isDarkTheme.value ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.1)',
  }
})

const selectTheme = (value) => {
  userStore.setUserStore({
    colorTheme: value,
  })

  message.success(`テーマを「${getThemeLabel(value)}」に変更しました`)
}

const changeBaseColor = (color) => {
  const mode = darkMode.value ? 'dark' : 'light'
  selectTheme(`${mode}-${color}`)
}

const saveTheme = () => {
  localStorage.setItem('colorTheme', userStore.colorTheme)
  message.success('設定を保存しました')
}

const resetTheme = () => {
  selectTheme('dark-blue')
}

const getThemeLabel = (value) => {
  return colorThemeOptions.find((theme) => theme.value === value)?.label ?? value
}

const getPresetStyle = (value) => {
  const theme = colorThemeMap[value]
  const color = theme?.overrides?.common?.primaryColor ?? '#2080f0'
  const rgb = hexToRgb(color)

  return {
    '--preset-color': color,
    '--preset-rgb': rgb,
  }
}

function hexToRgb(hex) {
  const value = hex.replace('#', '')
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)

  return `${r} ${g} ${b}`
}
</script>

<style scoped>
.app-page {
  width: 100vw;
  background-color: aqua;
}

.setting-section {
  width: 100%;
  min-height: calc(100dvh - var(--app-header-height));
  padding: var(--app-section-y) var(--app-page-x);
  color: var(--page-text);
}

.setting-container {
  width: min(100%, var(--app-container-width));
  margin: 0 auto;
}

.page-header {
  width: min(100%, 880px);
  margin: 0 auto clamp(48px, 7vw, 72px);
  text-align: center;
}

.page-header h2 {
  margin: 24px 0 16px;
  font-size: clamp(40px, 7vw, 86px);
  line-height: 1;
}

.page-header p,
.muted {
  margin: 0;
  color: var(--page-muted);
  line-height: 1.9;
}

.setting-card,
.preview-card {
  border-radius: 24px;
  background: var(--page-card);
  border: 1px solid var(--page-border);
  backdrop-filter: blur(16px);
}

.setting-card h3,
.preview-card h3 {
  margin: 0 0 24px;
  color: var(--page-text);
  font-size: 28px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
}

.setting-item strong {
  color: var(--page-text);
}

.setting-item p {
  margin: 6px 0 0;
  color: var(--page-muted);
}

.color-button,
.preset-card {
  width: 100%;
  border: 1px solid var(--page-border);
  color: var(--page-text);
  background: rgb(var(--page-primary-rgb) / 0.06);
  cursor: pointer;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease;
}

.color-button {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  border-radius: 16px;
}

.color-button span,
.preset-card > span {
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: var(--color, var(--preset-color));
  box-shadow: 0 0 18px var(--color, var(--preset-color));
}

.color-button:hover,
.color-button.active,
.preset-card:hover,
.preset-card.active {
  transform: translateY(-4px);
  border-color: var(--color, var(--preset-color));
  background: rgb(var(--page-primary-rgb) / 0.1);
}

.preset-area {
  margin-top: 24px;
}

.preset-card {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px;
  border-radius: 18px;
  text-align: left;
}

.preset-card strong {
  display: block;
  color: var(--page-text);
}

.preset-card small {
  color: var(--page-muted);
}

.preview-window {
  padding: 24px;
  border-radius: 22px;
  border: 1px solid var(--page-border);
  background:
    radial-gradient(circle at top right, rgb(var(--page-primary-rgb) / 0.2), transparent 38%),
    rgb(var(--page-primary-rgb) / 0.06);
}

.preview-window h4 {
  margin: 18px 0 10px;
  color: var(--page-text);
  font-size: 34px;
}

.preview-window p {
  color: var(--page-muted);
  line-height: 1.8;
}

.preview-mini-grid {
  margin-top: 20px;
}

.mini-card {
  padding: 16px;
  border-radius: 16px;
  border: 1px solid var(--page-border);
  background: var(--page-card);
}

.mini-card strong {
  display: block;
  color: var(--page-text);
}

.mini-card span {
  color: var(--page-muted);
}

.theme-info {
  display: grid;
  gap: 12px;
  margin-top: 20px;
}

.theme-info div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px;
  border-radius: 16px;
  background: rgb(var(--page-primary-rgb) / 0.08);
  border: 1px solid var(--page-border);
}

.theme-info span {
  color: var(--page-muted);
}

.theme-info strong {
  color: var(--page-text);
}

.reveal {
  animation: fadeUp 0.75s both;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(32px);
    filter: blur(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}
</style>
