<template>
  <main class="home-page" :style="homeThemeStyle" @mousemove="handleMouseMove">
    <div class="home-bg">
      <span class="orb orb-1"></span>
      <span class="orb orb-2"></span>
      <span class="orb orb-3"></span>
    </div>

    <section class="hero-section">
      <div class="container">
        <n-grid
          responsive="screen"
          cols="1 m:2"
          :x-gap="40"
          :y-gap="40"
          item-responsive
          class="hero-grid"
        >
          <n-gi>
            <div class="hero-copy reveal-item" :ref="setRevealRef">
              <n-tag round type="primary" size="large"> Welcome to my portfolio </n-tag>

              <h1>
                想いを、<br />
                使いやすい
                <n-gradient-text
                  :gradient="{
                    from: primaryColor,
                    to: secondaryColor,
                  }"
                >
                  Web体験
                </n-gradient-text>
                に。
              </h1>

              <div class="hero-role">
                <span>I create</span>

                <transition name="word-fade" mode="out-in">
                  <strong :key="currentWord">
                    {{ currentWord }}
                  </strong>
                </transition>
              </div>

              <p>
                Vue / Naive UI / JavaScript を中心に、見た目の美しさだけでなく、
                使う人が迷わず気持ちよく操作できるWebサイト・Webアプリを制作します。
              </p>

              <n-space class="hero-actions" :size="14" :wrap="true">
                <n-button type="primary" size="large" round tag="router-link" to="/projects">
                  Projectsを見る
                </n-button>

                <n-button size="large" round tag="router-link" to="/contact"> Contact </n-button>
              </n-space>

              <n-grid responsive="screen" cols="1 s:3" :x-gap="14" :y-gap="14" class="stats-grid">
                <n-gi v-for="stat in stats" :key="stat.label">
                  <div class="stat-card">
                    <strong>
                      <n-number-animation :from="0" :to="stat.value" :duration="1600" />
                      {{ stat.suffix }}
                    </strong>

                    <span>{{ stat.label }}</span>
                  </div>
                </n-gi>
              </n-grid>
            </div>
          </n-gi>

          <n-gi>
            <div class="hero-visual reveal-item" :ref="setRevealRef">
              <div class="ring ring-1"></div>
              <div class="ring ring-2"></div>

              <div class="profile-card">
                <div class="profile-top">
                  <div class="profile-avatar">一</div>

                  <div>
                    <strong>Ikkei Miyata</strong>
                    <span>Frontend Developer</span>
                  </div>
                </div>

                <div class="code-box">
                  <span class="code-primary">const</span>
                  mindset =
                  <span class="code-secondary">'楽しく、丁寧に、使いやすく'</span>
                </div>

                <div class="meter">
                  <div>
                    <span>Creative Energy</span>
                    <strong>98%</strong>
                  </div>

                  <div class="meter-line">
                    <span></span>
                  </div>
                </div>
              </div>

              <div v-for="chip in chips" :key="chip.label" class="chip" :class="chip.class">
                {{ chip.icon }} {{ chip.label }}
              </div>
            </div>
          </n-gi>
        </n-grid>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-title reveal-item" :ref="setRevealRef">
          <n-tag round type="primary"> Explore </n-tag>

          <h2>
            <n-gradient-text type="primary"> このポートフォリオで見てほしいこと </n-gradient-text>
          </h2>

          <p>私の歩み、制作物、スキル、そしてこれからの挑戦をまとめています。</p>
        </div>

        <n-grid responsive="screen" cols="1 s:2 l:4" :x-gap="22" :y-gap="22">
          <n-gi v-for="(item, index) in quickLinks" :key="item.to">
            <RouterLink
              :to="item.to"
              class="quick-card reveal-item"
              :ref="setRevealRef"
              :style="{ '--delay': `${index * 80}ms` }"
            >
              <div class="quick-icon">
                {{ item.icon }}
              </div>

              <span>{{ item.en }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>

              <strong>→</strong>
            </RouterLink>
          </n-gi>
        </n-grid>
      </div>
    </section>

    <section class="marquee-section">
      <div class="marquee-track">
        <div v-for="loop in 2" :key="loop" class="marquee-content">
          <span v-for="tech in techStacks" :key="`${loop}-${tech}`">
            {{ tech }}
          </span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <n-grid responsive="screen" cols="1 m:2" :x-gap="42" :y-gap="32" item-responsive>
          <n-gi>
            <div class="feature-copy reveal-item" :ref="setRevealRef">
              <n-tag round type="primary"> Philosophy </n-tag>

              <h2>
                見た目の良さと、<br />
                使いやすさのちょうど真ん中。
              </h2>

              <p>
                ただ派手なだけではなく、ユーザーが自然に理解できる構成、
                気持ちよく操作できる余白、目的地へ迷わず進める導線を大切にしています。
              </p>

              <n-space :size="14" :wrap="true">
                <n-button type="primary" round size="large" tag="router-link" to="/skills">
                  Skill Set
                </n-button>

                <n-button round size="large" tag="router-link" to="/history"> History </n-button>
              </n-space>
            </div>
          </n-gi>

          <n-gi>
            <n-grid responsive="screen" cols="1 s:2" :x-gap="20" :y-gap="20">
              <n-gi v-for="(feature, index) in features" :key="feature.title">
                <n-card
                  class="feature-card reveal-item"
                  :bordered="false"
                  :ref="setRevealRef"
                  :style="{ '--delay': `${index * 80}ms` }"
                >
                  <div class="feature-icon">
                    {{ feature.icon }}
                  </div>

                  <h3>{{ feature.title }}</h3>
                  <p>{{ feature.description }}</p>
                </n-card>
              </n-gi>
            </n-grid>
          </n-gi>
        </n-grid>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <n-card class="cta-card reveal-item" :bordered="false" :ref="setRevealRef">
          <n-grid responsive="screen" cols="1 m:2" :x-gap="28" :y-gap="24" item-responsive>
            <n-gi>
              <n-tag round type="primary"> Let's build something </n-tag>

              <h2>一緒に、いいものを作りませんか？</h2>

              <p>
                制作の相談、採用について、ポートフォリオの感想など、
                どんなことでもお気軽にご連絡ください。
              </p>
            </n-gi>

            <n-gi>
              <n-space justify="end" align="center" :size="14" :wrap="true" class="cta-actions">
                <n-button type="primary" size="large" round tag="router-link" to="/contact">
                  お問い合わせ
                </n-button>

                <n-button size="large" round tag="router-link" to="/projects">
                  制作物を見る
                </n-button>
              </n-space>
            </n-gi>
          </n-grid>
        </n-card>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount, onBeforeUpdate } from 'vue'
import { RouterLink } from 'vue-router'

import { useUserStore } from '@/stores/userStore'
import { colorThemeMap } from '@/theme/colorThemes'

const userStore = useUserStore()

const mouseX = ref(50)
const mouseY = ref(50)

const words = ['Beautiful UI', 'Smooth Animation', 'Useful Web Apps', 'User Experience']

const currentWordIndex = ref(0)
let wordTimer = null

const currentWord = computed(() => {
  return words[currentWordIndex.value]
})

const stats = [
  {
    value: 30,
    suffix: '+',
    label: 'Ideas',
  },
  {
    value: 12,
    suffix: '+',
    label: 'Projects',
  },
  {
    value: 8,
    suffix: '+',
    label: 'Skills',
  },
]

const chips = [
  {
    icon: '⚡',
    label: 'Vue 3',
    class: 'chip-1',
  },
  {
    icon: '🎨',
    label: 'Naive UI',
    class: 'chip-2',
  },
  {
    icon: '🧠',
    label: 'Pinia',
    class: 'chip-3',
  },
  {
    icon: '🚀',
    label: 'Animation',
    class: 'chip-4',
  },
]

const quickLinks = [
  {
    icon: '📖',
    en: 'History',
    title: 'これまでの歩み',
    description: 'どんな経験を通して今の自分になったのかを紹介します。',
    to: '/history',
  },
  {
    icon: '💻',
    en: 'Projects',
    title: 'かかわったProject',
    description: '制作・開発・改善に携わったプロジェクトを紹介します。',
    to: '/projects',
  },
  {
    icon: '🛠️',
    en: 'Skills',
    title: 'スキルセット',
    description: '扱える技術や得意な領域をまとめています。',
    to: '/skills',
  },
  {
    icon: '✉️',
    en: 'Contact',
    title: 'お問い合わせ',
    description: '制作の相談、採用、感想などはこちらから。',
    to: '/contact',
  },
]

const techStacks = [
  'Vue',
  'JavaScript',
  'Naive UI',
  'Pinia',
  'Vite',
  'CSS Animation',
  'Responsive Design',
  'UI Design',
  'GitHub',
  'Figma',
]

const features = [
  {
    icon: '💎',
    title: '見た目にこだわる',
    description: '配色、余白、フォント、アニメーションを丁寧に整えます。',
  },
  {
    icon: '🧭',
    title: '迷わせない導線',
    description: '次に何をすればよいかが自然に伝わる画面を目指します。',
  },
  {
    icon: '📱',
    title: 'レスポンシブ対応',
    description: 'PCでもスマホでも気持ちよく閲覧できるようにします。',
  },
  {
    icon: '⚙️',
    title: '保守しやすい実装',
    description: 'Vueのコンポーネント設計で拡張しやすい構成にします。',
  },
]

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

const homeThemeStyle = computed(() => {
  const primaryRgb = hexToRgb(primaryColor.value)
  const secondaryRgb = hexToRgb(secondaryColor.value)

  if (isDarkTheme.value) {
    return {
      '--home-primary': primaryColor.value,
      '--home-secondary': secondaryColor.value,
      '--home-primary-rgb': primaryRgb,
      '--home-secondary-rgb': secondaryRgb,
      '--home-mouse-x': `${mouseX.value}%`,
      '--home-mouse-y': `${mouseY.value}%`,
      '--home-bg-1': '#050816',
      '--home-bg-2': '#0f172a',
      '--home-bg-3': '#020617',
      '--home-card': 'rgba(15, 23, 42, 0.72)',
      '--home-card-hover': 'rgba(15, 23, 42, 0.9)',
      '--home-text': 'rgba(255, 255, 255, 0.94)',
      '--home-muted': 'rgba(255, 255, 255, 0.66)',
      '--home-border': 'rgba(255, 255, 255, 0.1)',
      '--home-grid': 'rgba(255, 255, 255, 0.04)',
    }
  }

  return {
    '--home-primary': primaryColor.value,
    '--home-secondary': secondaryColor.value,
    '--home-primary-rgb': primaryRgb,
    '--home-secondary-rgb': secondaryRgb,
    '--home-mouse-x': `${mouseX.value}%`,
    '--home-mouse-y': `${mouseY.value}%`,
    '--home-bg-1': '#f8fbff',
    '--home-bg-2': '#eef6ff',
    '--home-bg-3': '#ffffff',
    '--home-card': 'rgba(255, 255, 255, 0.78)',
    '--home-card-hover': 'rgba(255, 255, 255, 0.96)',
    '--home-text': 'rgba(15, 23, 42, 0.94)',
    '--home-muted': 'rgba(15, 23, 42, 0.64)',
    '--home-border': 'rgba(15, 23, 42, 0.1)',
    '--home-grid': 'rgba(15, 23, 42, 0.055)',
  }
})

const handleMouseMove = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()

  mouseX.value = ((event.clientX - rect.left) / rect.width) * 100
  mouseY.value = ((event.clientY - rect.top) / rect.height) * 100
}

const revealRefs = ref([])
let observer = null

const setRevealRef = (el) => {
  if (el) {
    revealRefs.value.push(el.$el || el)
  }
}

onBeforeUpdate(() => {
  revealRefs.value = []
})

onMounted(() => {
  wordTimer = setInterval(() => {
    currentWordIndex.value = (currentWordIndex.value + 1) % words.length
  }, 2200)

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -10% 0px',
    },
  )

  revealRefs.value.forEach((el) => {
    observer.observe(el)
  })
})

onBeforeUnmount(() => {
  if (wordTimer) {
    clearInterval(wordTimer)
  }

  if (observer) {
    observer.disconnect()
  }
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
.home-page {
  position: relative;
  overflow: hidden;
  min-height: calc(100dvh - var(--app-header-height));
  color: var(--home-text);
}

.home-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.home-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--home-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--home-grid) 1px, transparent 1px);
  background-size: 48px 48px;
}

.orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(70px);
  animation: floatOrb 10s ease-in-out infinite alternate;
}

.orb-1 {
  top: 8%;
  left: -120px;
  width: 360px;
  height: 360px;
  background: rgb(var(--home-primary-rgb) / 0.25);
}

.orb-2 {
  top: 18%;
  right: -130px;
  width: 420px;
  height: 420px;
  background: rgb(var(--home-secondary-rgb) / 0.2);
  animation-delay: -3s;
}

.orb-3 {
  left: 36%;
  bottom: 4%;
  width: 320px;
  height: 320px;
  background: rgb(var(--home-primary-rgb) / 0.14);
  animation-delay: -6s;
}

.hero-section,
.section,
.cta-section {
  position: relative;
  z-index: 1;
  padding: var(--app-section-y) var(--app-page-x);
}

.hero-section {
  min-height: calc(100dvh - var(--app-header-height));
  display: grid;
  align-items: center;
}

.container {
  width: 100%;
  max-width: var(--app-container-width);
  margin: 0 auto;
}

.hero-grid {
  align-items: center;
}

.hero-copy h1 {
  margin: 24px 0 0;
  color: var(--home-text);
  font-size: clamp(44px, 8vw, 104px);
  line-height: 1.04;
  letter-spacing: -0.05em;
}

.hero-copy p,
.section-title p,
.feature-copy p,
.cta-card p {
  color: var(--home-muted);
  font-size: clamp(14px, 1.7vw, 17px);
  line-height: 1.9;
}

.hero-role {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
  font-size: clamp(21px, 3vw, 34px);
  font-weight: 900;
}

.hero-role span {
  color: var(--home-muted);
}

.hero-role strong {
  color: var(--home-primary);
}

.hero-actions {
  margin-top: 32px;
}

.stats-grid {
  margin-top: 40px;
}

.stat-card,
.quick-card,
.feature-card,
.cta-card,
.profile-card,
.chip {
  border: 1px solid var(--home-border);
  background: var(--home-card);
  backdrop-filter: blur(18px);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 var(--home-border);
}

.stat-card {
  padding: 18px;
  border-radius: 22px;
}

.stat-card strong {
  display: block;
  color: var(--home-text);
  font-size: 30px;
}

.stat-card span {
  color: var(--home-muted);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.hero-visual {
  position: relative;
  min-height: clamp(360px, 48vw, 560px);
  display: grid;
  place-items: center;
}

.ring {
  position: absolute;
  border: 1px solid rgb(var(--home-primary-rgb) / 0.22);
  border-radius: 999px;
  animation: rotateRing 22s linear infinite;
}

.ring-1 {
  width: min(90vw, 500px);
  height: min(90vw, 500px);
}

.ring-2 {
  width: min(70vw, 380px);
  height: min(70vw, 380px);
  border-style: dashed;
  animation-direction: reverse;
}

.profile-card {
  position: relative;
  z-index: 2;
  width: min(100%, 380px);
  padding: clamp(22px, 4vw, 28px);
  border-radius: 32px;
  animation: floatCard 5s ease-in-out infinite;
}

.profile-top {
  display: flex;
  gap: 16px;
  align-items: center;
}

.profile-avatar {
  display: grid;
  place-items: center;
  width: 62px;
  height: 62px;
  border-radius: 22px;
  color: #fff;
  font-size: 26px;
  font-weight: 900;
  background: linear-gradient(135deg, var(--home-primary), var(--home-secondary));
}

.profile-top strong {
  display: block;
  color: var(--home-text);
  font-size: 20px;
}

.profile-top span {
  color: var(--home-muted);
  font-size: 13px;
}

.code-box {
  margin-top: 24px;
  padding: 18px;
  border-radius: 20px;
  color: var(--home-text);
  background: rgba(0, 0, 0, 0.16);
  font-family: monospace;
  line-height: 1.8;
}

.code-primary {
  color: var(--home-primary);
}

.code-secondary {
  color: var(--home-secondary);
}

.meter {
  margin-top: 22px;
}

.meter > div:first-child {
  display: flex;
  justify-content: space-between;
  color: var(--home-muted);
  font-size: 13px;
  font-weight: 800;
}

.meter-line {
  overflow: hidden;
  height: 10px;
  margin-top: 10px;
  border-radius: 999px;
  background: rgb(var(--home-primary-rgb) / 0.12);
}

.meter-line span {
  display: block;
  width: 98%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--home-primary), var(--home-secondary));
  animation: meterGrow 1.6s ease;
}

.chip {
  position: absolute;
  z-index: 3;
  padding: 10px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 900;
  animation: floatChip 4.5s ease-in-out infinite;
}

.chip-1 {
  top: 10%;
  left: 0;
}

.chip-2 {
  top: 20%;
  right: 0;
  animation-delay: -1s;
}

.chip-3 {
  bottom: 22%;
  left: 4%;
  animation-delay: -2s;
}

.chip-4 {
  right: 4%;
  bottom: 12%;
  animation-delay: -3s;
}

.section-title {
  max-width: 820px;
  margin: 0 auto 56px;
  text-align: center;
}

.section-title h2,
.feature-copy h2,
.cta-card h2 {
  margin: 22px 0 14px;
  color: var(--home-text);
  font-size: clamp(34px, 5vw, 68px);
  line-height: 1.12;
  letter-spacing: -0.04em;
}

.quick-card {
  position: relative;
  display: block;
  min-height: 270px;
  padding: 26px;
  border-radius: 30px;
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.3s ease,
    background 0.3s ease;
}

.quick-card:hover,
.feature-card:hover {
  transform: translateY(-8px);
  background: var(--home-card-hover);
}

.quick-icon,
.feature-icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin-bottom: 20px;
  border-radius: 20px;
  background: rgb(var(--home-primary-rgb) / 0.12);
  font-size: 28px;
}

.quick-card span {
  color: var(--home-primary);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.quick-card h3,
.feature-card h3 {
  margin: 10px 0 12px;
  color: var(--home-text);
  font-size: 23px;
}

.quick-card p,
.feature-card p {
  color: var(--home-muted);
  line-height: 1.8;
}

.quick-card strong {
  position: absolute;
  right: 24px;
  bottom: 20px;
  color: var(--home-primary);
  font-size: 28px;
}

.marquee-section {
  position: relative;
  z-index: 1;
  overflow: hidden;
  padding: 26px 0;
  border-block: 1px solid var(--home-border);
  background: rgb(var(--home-primary-rgb) / 0.055);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 28s linear infinite;
}

.marquee-content {
  display: flex;
  gap: 18px;
  padding-right: 18px;
}

.marquee-content span {
  display: inline-flex;
  align-items: center;
  height: 42px;
  padding: 0 22px;
  border: 1px solid var(--home-border);
  border-radius: 999px;
  background: var(--home-card);
  font-weight: 900;
  white-space: nowrap;
}

.feature-card {
  border-radius: 28px;
}

.cta-section {
  padding-top: 32px;
}

.cta-card {
  border-radius: 34px;
}

.cta-actions {
  height: 100%;
}

.reveal-item {
  opacity: 0;
  transform: translateY(44px);
  filter: blur(8px);
  transition:
    opacity 0.8s ease,
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.8s ease;
  transition-delay: var(--delay, 0ms);
}

.reveal-item.is-visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

.word-fade-enter-active,
.word-fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.word-fade-enter-from,
.word-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

@keyframes floatOrb {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }

  to {
    transform: translate3d(34px, -28px, 0) scale(1.08);
  }
}

@keyframes rotateRing {
  to {
    transform: rotate(360deg);
  }
}

@keyframes floatCard {
  50% {
    transform: translateY(-14px);
  }
}

@keyframes floatChip {
  50% {
    transform: translateY(-12px);
  }
}

@keyframes meterGrow {
  from {
    width: 0;
  }

  to {
    width: 98%;
  }
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}
</style>
