<template>
  <section
    class="setting-section"
    :class="{
      'is-dark': isDarkTheme,
      'is-light': !isDarkTheme,
    }"
    :style="settingThemeStyle"
  >
    <div class="setting-bg"></div>

    <div class="setting-container">
      <div class="setting-header">
        <n-tag round type="primary" size="large"> Settings </n-tag>

        <h2>
          <n-gradient-text type="primary"> Setting </n-gradient-text>
        </h2>

        <p>
          ポートフォリオ全体の表示テーマを変更できます。
          選択したテーマはブラウザに保存され、次回アクセス時にも反映されます。
        </p>
      </div>

      <div class="setting-layout">
        <div class="setting-main">
          <n-card class="setting-card" :bordered="false">
            <div class="card-title">
              <span>Theme</span>
              <strong>カラーテーマ設定</strong>
            </div>

            <div class="setting-item">
              <div class="setting-item-head">
                <div>
                  <h3>現在のテーマ</h3>
                  <p>プリセットからテーマを選択できます。</p>
                </div>

                <n-tag round type="primary">
                  {{ currentThemeLabel }}
                </n-tag>
              </div>

              <n-select v-model:value="selectedTheme" :options="colorThemeOptions" size="large" />
            </div>

            <n-divider />

            <div class="setting-item">
              <div class="setting-item-head">
                <div>
                  <h3>モード</h3>
                  <p>ライトモード / ダークモードを切り替えます。</p>
                </div>

                <n-switch v-model:value="darkMode">
                  <template #checked> Dark </template>
                  <template #unchecked> Light </template>
                </n-switch>
              </div>
            </div>

            <n-divider />

            <div class="setting-item">
              <div class="setting-item-head">
                <div>
                  <h3>メインカラー</h3>
                  <p>サイト全体で使用するアクセントカラーを選択します。</p>
                </div>
              </div>

              <div class="color-grid">
                <button
                  v-for="color in baseColorOptions"
                  :key="color.value"
                  class="color-button"
                  :class="{ active: selectedBaseColor === color.value }"
                  :style="{ '--button-color': color.color }"
                  type="button"
                  @click="changeBaseColor(color.value)"
                >
                  <span class="color-dot"></span>

                  <span>
                    {{ color.label }}
                  </span>
                </button>
              </div>
            </div>

            <n-divider />

            <div class="setting-actions">
              <n-button type="primary" round @click="saveTheme"> 設定を保存 </n-button>

              <n-button round @click="resetTheme"> デフォルトに戻す </n-button>
            </div>
          </n-card>

          <n-card class="setting-card" :bordered="false">
            <div class="card-title">
              <span>Presets</span>
              <strong>テーマ一覧</strong>
            </div>

            <div class="preset-grid">
              <button
                v-for="theme in colorThemeOptions"
                :key="theme.value"
                class="preset-card"
                :class="{ active: userStore.colorTheme === theme.value }"
                :style="getPresetStyle(theme.value)"
                type="button"
                @click="selectTheme(theme.value)"
              >
                <div class="preset-top">
                  <span class="preset-color"></span>
                  <n-tag
                    round
                    size="small"
                    :type="userStore.colorTheme === theme.value ? 'primary' : 'default'"
                  >
                    {{ isPresetDark(theme.value) ? 'Dark' : 'Light' }}
                  </n-tag>
                </div>

                <strong>{{ theme.label }}</strong>

                <span class="preset-value">
                  {{ theme.value }}
                </span>
              </button>
            </div>
          </n-card>
        </div>

        <aside class="setting-preview">
          <n-card class="preview-card" :bordered="false">
            <div class="card-title">
              <span>Preview</span>
              <strong>表示プレビュー</strong>
            </div>

            <div class="preview-window">
              <div class="preview-nav">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div class="preview-hero">
                <n-tag round type="primary" size="small"> Portfolio </n-tag>

                <h3>宮田 太郎</h3>

                <p>Vue / Naive UI を使って、見やすく使いやすいWebサイトを制作します。</p>

                <div class="preview-buttons">
                  <n-button type="primary" round size="small"> Contact </n-button>

                  <n-button round size="small"> Projects </n-button>
                </div>
              </div>

              <div class="preview-cards">
                <div class="preview-mini-card">
                  <strong>Skills</strong>
                  <span>Vue / JavaScript</span>
                </div>

                <div class="preview-mini-card">
                  <strong>Projects</strong>
                  <span>Web App / UI</span>
                </div>
              </div>
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
        </aside>
      </div>
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
  {
    label: 'Blue',
    value: 'blue',
    color: '#2080f0',
  },
  {
    label: 'Green',
    value: 'green',
    color: '#18a058',
  },
  {
    label: 'Purple',
    value: 'purple',
    color: '#8a2be2',
  },
  {
    label: 'Orange',
    value: 'orange',
    color: '#f0a020',
  },
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
  return userStore.colorTheme.split('-')[1] || 'blue'
})

const darkMode = computed({
  get() {
    return userStore.colorTheme.startsWith('dark')
  },
  set(value) {
    const mode = value ? 'dark' : 'light'
    const color = selectedBaseColor.value

    selectTheme(`${mode}-${color}`)
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

const currentThemeLabel = computed(() => {
  return (
    colorThemeOptions.find((theme) => theme.value === userStore.colorTheme)?.label ||
    userStore.colorTheme
  )
})

const settingThemeStyle = computed(() => {
  const primaryRgb = hexToRgb(primaryColor.value)

  if (isDarkTheme.value) {
    return {
      '--setting-primary': primaryColor.value,
      '--setting-primary-rgb': primaryRgb,
      '--setting-bg-1': '#050816',
      '--setting-bg-2': '#0f172a',
      '--setting-bg-3': '#020617',
      '--setting-card-bg': 'rgba(15, 23, 42, 0.74)',
      '--setting-card-bg-hover': 'rgba(15, 23, 42, 0.92)',
      '--setting-text': 'rgba(255, 255, 255, 0.92)',
      '--setting-muted': 'rgba(255, 255, 255, 0.66)',
      '--setting-border': 'rgba(255, 255, 255, 0.1)',
      '--setting-grid': 'rgba(255, 255, 255, 0.04)',
    }
  }

  return {
    '--setting-primary': primaryColor.value,
    '--setting-primary-rgb': primaryRgb,
    '--setting-bg-1': '#f8fbff',
    '--setting-bg-2': '#eef6ff',
    '--setting-bg-3': '#ffffff',
    '--setting-card-bg': 'rgba(255, 255, 255, 0.82)',
    '--setting-card-bg-hover': 'rgba(255, 255, 255, 0.96)',
    '--setting-text': 'rgba(15, 23, 42, 0.92)',
    '--setting-muted': 'rgba(15, 23, 42, 0.62)',
    '--setting-border': 'rgba(15, 23, 42, 0.1)',
    '--setting-grid': 'rgba(15, 23, 42, 0.055)',
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
  message.success('デフォルト設定に戻しました')
}

const getThemeLabel = (value) => {
  return colorThemeOptions.find((theme) => theme.value === value)?.label || value
}

const isPresetDark = (value) => {
  return value.startsWith('dark')
}

const getPresetStyle = (value) => {
  const theme = colorThemeMap[value]
  const color = theme?.overrides?.common?.primaryColor || '#2080f0'
  const rgb = hexToRgb(color)
  const dark = value.startsWith('dark')

  return {
    '--preset-color': color,
    '--preset-color-rgb': rgb,
    '--preset-bg': dark ? 'rgba(15, 23, 42, 0.86)' : 'rgba(255, 255, 255, 0.9)',
    '--preset-text': dark ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 23, 42, 0.92)',
    '--preset-muted': dark ? 'rgba(255, 255, 255, 0.58)' : 'rgba(15, 23, 42, 0.58)',
  }
}

const hexToRgb = (hex) => {
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
.setting-section {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  padding: 120px 24px;
  color: var(--setting-text);
  background:
    radial-gradient(circle at 12% 12%, rgb(var(--setting-primary-rgb) / 0.25), transparent 34%),
    radial-gradient(circle at 88% 20%, rgb(var(--setting-primary-rgb) / 0.16), transparent 32%),
    linear-gradient(
      135deg,
      var(--setting-bg-1) 0%,
      var(--setting-bg-2) 48%,
      var(--setting-bg-3) 100%
    );
}

.setting-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--setting-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--setting-grid) 1px, transparent 1px);
  background-size: 46px 46px;
  mask-image: linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent);
  pointer-events: none;
}

.setting-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.setting-bg::before,
.setting-bg::after {
  content: '';
  position: absolute;
  border-radius: 999px;
  background: rgb(var(--setting-primary-rgb) / 0.14);
  filter: blur(90px);
}

.setting-bg::before {
  top: 20%;
  left: -120px;
  width: 380px;
  height: 380px;
}

.setting-bg::after {
  right: -140px;
  bottom: 12%;
  width: 440px;
  height: 440px;
}

.setting-container {
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
}

.setting-header {
  max-width: 880px;
  margin: 0 auto 64px;
  text-align: center;
}

.setting-header h2 {
  margin: 24px 0 16px;
  font-size: clamp(42px, 7vw, 86px);
  line-height: 1;
  letter-spacing: 0.04em;
}

.setting-header p {
  margin: 0;
  color: var(--setting-muted);
  font-size: 16px;
  line-height: 1.9;
}

.setting-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 28px;
  align-items: start;
}

.setting-main {
  display: grid;
  gap: 28px;
}

.setting-card,
.preview-card {
  position: relative;
  overflow: hidden;
  border-radius: 26px;
  background: var(--setting-card-bg);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 var(--setting-border);
  backdrop-filter: blur(18px);
}

.setting-card::before,
.preview-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgb(var(--setting-primary-rgb) / 0.66),
    rgb(var(--setting-primary-rgb) / 0.12),
    var(--setting-border)
  );
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  pointer-events: none;
}

.setting-card :deep(.n-card__content),
.preview-card :deep(.n-card__content) {
  position: relative;
  z-index: 1;
}

.card-title {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 28px;
}

.card-title span {
  color: var(--setting-primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.card-title strong {
  color: var(--setting-text);
  font-size: 28px;
}

.setting-item {
  display: grid;
  gap: 18px;
}

.setting-item-head {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
}

.setting-item h3 {
  margin: 0 0 6px;
  color: var(--setting-text);
  font-size: 18px;
}

.setting-item p {
  margin: 0;
  color: var(--setting-muted);
  font-size: 14px;
  line-height: 1.7;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.color-button {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  min-height: 54px;
  border: 1px solid var(--setting-border);
  border-radius: 18px;
  color: var(--setting-text);
  background: rgb(var(--setting-primary-rgb) / 0.04);
  cursor: pointer;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
}

.color-button:hover,
.color-button.active {
  transform: translateY(-3px);
  border-color: var(--button-color);
  background: color-mix(in srgb, var(--button-color) 14%, transparent);
  box-shadow: 0 12px 30px color-mix(in srgb, var(--button-color) 24%, transparent);
}

.color-dot {
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: var(--button-color);
  box-shadow: 0 0 18px var(--button-color);
}

.setting-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.preset-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.preset-card {
  position: relative;
  overflow: hidden;
  min-height: 128px;
  padding: 18px;
  border: 1px solid rgb(var(--preset-color-rgb) / 0.18);
  border-radius: 22px;
  color: var(--preset-text);
  background:
    radial-gradient(circle at top right, rgb(var(--preset-color-rgb) / 0.22), transparent 44%),
    var(--preset-bg);
  text-align: left;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.preset-card:hover,
.preset-card.active {
  transform: translateY(-4px);
  border-color: rgb(var(--preset-color-rgb) / 0.75);
  box-shadow: 0 18px 42px rgb(var(--preset-color-rgb) / 0.18);
}

.preset-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.preset-color {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: var(--preset-color);
  box-shadow: 0 0 24px var(--preset-color);
}

.preset-card strong {
  display: block;
  font-size: 17px;
}

.preset-value {
  display: block;
  margin-top: 6px;
  color: var(--preset-muted);
  font-size: 12px;
}

.setting-preview {
  position: sticky;
  top: 90px;
}

.preview-window {
  overflow: hidden;
  border: 1px solid var(--setting-border);
  border-radius: 24px;
  background:
    radial-gradient(circle at 20% 10%, rgb(var(--setting-primary-rgb) / 0.24), transparent 34%),
    linear-gradient(135deg, var(--setting-bg-1), var(--setting-bg-2), var(--setting-bg-3));
}

.preview-nav {
  display: flex;
  gap: 7px;
  padding: 16px;
  border-bottom: 1px solid var(--setting-border);
}

.preview-nav span {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: rgb(var(--setting-primary-rgb) / 0.8);
}

.preview-hero {
  padding: 28px 22px;
}

.preview-hero h3 {
  margin: 16px 0 10px;
  color: var(--setting-text);
  font-size: 30px;
  line-height: 1.2;
}

.preview-hero p {
  margin: 0;
  color: var(--setting-muted);
  font-size: 13px;
  line-height: 1.8;
}

.preview-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.preview-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  padding: 0 16px 16px;
}

.preview-mini-card {
  padding: 16px;
  border: 1px solid var(--setting-border);
  border-radius: 18px;
  background: rgb(var(--setting-primary-rgb) / 0.08);
}

.preview-mini-card strong {
  display: block;
  color: var(--setting-text);
  font-size: 14px;
}

.preview-mini-card span {
  display: block;
  margin-top: 5px;
  color: var(--setting-muted);
  font-size: 11px;
}

.theme-info {
  display: grid;
  gap: 12px;
  margin-top: 22px;
}

.theme-info div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border: 1px solid var(--setting-border);
  border-radius: 16px;
  background: rgb(var(--setting-primary-rgb) / 0.06);
}

.theme-info span {
  color: var(--setting-muted);
  font-size: 13px;
}

.theme-info strong {
  color: var(--setting-text);
  font-size: 13px;
}

@media (max-width: 980px) {
  .setting-layout {
    grid-template-columns: 1fr;
  }

  .setting-preview {
    position: static;
  }
}

@media (max-width: 640px) {
  .setting-section {
    padding: 88px 18px;
  }

  .setting-header {
    text-align: left;
  }

  .setting-header h2 {
    font-size: clamp(40px, 12vw, 64px);
  }

  .setting-item-head {
    flex-direction: column;
  }

  .color-grid,
  .preset-grid,
  .preview-cards {
    grid-template-columns: 1fr;
  }

  .setting-card,
  .preview-card {
    border-radius: 22px;
  }

  .setting-actions {
    flex-direction: column;
  }

  .setting-actions .n-button {
    width: 100%;
  }
}
</style>
