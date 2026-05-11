<template>
  <main
    class="home-page"
    :class="{
      'is-dark': isDarkTheme,
      'is-light': !isDarkTheme,
    }"
    :style="homeThemeStyle"
    @mousemove="handleMouseMove"
  >
    <div class="home-bg">
      <span class="orb orb-1"></span>
      <span class="orb orb-2"></span>
      <span class="orb orb-3"></span>
      <span class="grid-light"></span>
    </div>

    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content reveal-item" :ref="setRevealRef">
          <n-tag round type="primary" size="large" class="hero-badge">
            Welcome to my portfolio
          </n-tag>

          <h1>
            <span>想いを、</span>
            <span>
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
            </span>
          </h1>

          <div class="hero-role">
            <span class="role-label">I create</span>

            <transition name="word-fade" mode="out-in">
              <strong :key="currentWord">
                {{ currentWord }}
              </strong>
            </transition>
          </div>

          <p class="hero-description">
            Vue / Naive UI / JavaScript を中心に、見た目の美しさだけでなく、
            使う人が迷わず気持ちよく操作できるWebサイト・Webアプリを制作します。
          </p>

          <div class="hero-actions">
            <n-button type="primary" size="large" round tag="router-link" to="/projects">
              Projectsを見る
            </n-button>

            <n-button size="large" round tag="router-link" to="/contact"> Contact </n-button>
          </div>

          <div class="hero-stats">
            <div v-for="stat in stats" :key="stat.label" class="stat-card">
              <strong>
                <n-number-animation :from="0" :to="stat.value" :duration="1800" />
                <span>{{ stat.suffix }}</span>
              </strong>

              <small>{{ stat.label }}</small>
            </div>
          </div>
        </div>

        <div class="hero-visual reveal-item" :ref="setRevealRef">
          <div class="visual-ring ring-1"></div>
          <div class="visual-ring ring-2"></div>
          <div class="visual-ring ring-3"></div>

          <div class="profile-card">
            <div class="profile-top">
              <div class="profile-avatar">
                <span>一</span>
              </div>

              <div>
                <strong>Ikkei Miyata</strong>
                <small>Frontend Developer</small>
              </div>
            </div>

            <div class="profile-code">
              <div>
                <span class="code-key">const</span>
                <span class="code-name"> mindset </span>
                <span>=</span>
              </div>

              <div>
                <span class="code-string">'楽しく、丁寧に、使いやすく'</span>
              </div>
            </div>

            <div class="profile-meter">
              <div class="meter-head">
                <span>Creative Energy</span>
                <strong>98%</strong>
              </div>

              <div class="meter-bar">
                <span></span>
              </div>
            </div>
          </div>

          <div
            v-for="chip in floatingChips"
            :key="chip.label"
            class="floating-chip"
            :class="chip.class"
          >
            <span>{{ chip.icon }}</span>
            {{ chip.label }}
          </div>
        </div>
      </div>

      <div class="scroll-guide">
        <span>Scroll</span>
        <div></div>
      </div>
    </section>

    <section class="quick-section">
      <div class="section-heading reveal-item" :ref="setRevealRef">
        <n-tag round type="primary"> Explore </n-tag>

        <h2>
          <n-gradient-text type="primary"> このポートフォリオで見てほしいこと </n-gradient-text>
        </h2>

        <p>私の歩み、制作物、スキル、そしてこれからの挑戦をまとめています。</p>
      </div>

      <div class="quick-grid">
        <RouterLink
          v-for="(item, index) in quickLinks"
          :key="item.to"
          :to="item.to"
          class="quick-card reveal-item"
          :ref="setRevealRef"
          :style="{ '--delay': `${index * 90}ms` }"
        >
          <div class="quick-icon">
            {{ item.icon }}
          </div>

          <div>
            <span>{{ item.en }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>

          <strong class="quick-arrow">→</strong>
        </RouterLink>
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

    <section class="feature-section">
      <div class="feature-container">
        <div class="feature-copy reveal-item" :ref="setRevealRef">
          <n-tag round type="primary"> Philosophy </n-tag>

          <h2>
            見た目の良さと、<br />
            使いやすさのちょうど真ん中。
          </h2>

          <p>
            ただ派手なだけではなく、ユーザーが自然に理解できる構成、
            気持ちよく操作できる余白、目的地へ迷わず進める導線を大切にしています。
            小さなアニメーションや色の変化にも意味を持たせ、印象に残る体験を作ります。
          </p>

          <div class="feature-actions">
            <n-button type="primary" round size="large" tag="router-link" to="/skills">
              Skill Set
            </n-button>

            <n-button round size="large" tag="router-link" to="/history"> History </n-button>
          </div>
        </div>

        <div class="feature-cards">
          <n-card
            v-for="(feature, index) in features"
            :key="feature.title"
            class="feature-card reveal-item"
            :bordered="false"
            :ref="setRevealRef"
            :style="{ '--delay': `${index * 100}ms` }"
          >
            <div class="feature-icon">
              {{ feature.icon }}
            </div>

            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </n-card>
        </div>
      </div>
    </section>

    <section class="cta-section reveal-item" :ref="setRevealRef">
      <div class="cta-card">
        <div>
          <n-tag round type="primary"> Let's build something </n-tag>

          <h2>一緒に、いいものを作りませんか？</h2>

          <p>
            制作の相談、採用について、ポートフォリオの感想など、
            どんなことでもお気軽にご連絡ください。
          </p>
        </div>

        <div class="cta-actions">
          <n-button type="primary" size="large" round tag="router-link" to="/contact">
            お問い合わせ
          </n-button>

          <n-button size="large" round tag="router-link" to="/projects"> 制作物を見る </n-button>
        </div>
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

const words = [
  'Beautiful UI',
  'Smooth Animation',
  'Useful Web Apps',
  'Portfolio Design',
  'User Experience',
]

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

const floatingChips = [
  {
    icon: '⚡',
    label: 'Vue 3',
    class: 'chip-vue',
  },
  {
    icon: '🎨',
    label: 'Naive UI',
    class: 'chip-ui',
  },
  {
    icon: '🧠',
    label: 'Pinia',
    class: 'chip-pinia',
  },
  {
    icon: '🚀',
    label: 'Animation',
    class: 'chip-animation',
  },
]

const quickLinks = [
  {
    icon: '📖',
    en: 'History',
    title: 'これまでの歩み',
    description: '誕生から現在まで、どんな経験を通して今の自分になったのかを紹介します。',
    to: '/history',
  },
  {
    icon: '💻',
    en: 'Projects',
    title: 'かかわったProject',
    description: '制作・開発・改善に携わったプロジェクトを、担当範囲や技術と一緒に紹介します。',
    to: '/projects',
  },
  {
    icon: '🛠️',
    en: 'Skills',
    title: 'スキルセット',
    description: 'フロントエンド、UI設計、状態管理、ツールなど、扱える技術をまとめています。',
    to: '/skills',
  },
  {
    icon: '✉️',
    en: 'Contact',
    title: 'お問い合わせ',
    description: '制作のご相談、採用、感想などはこちらからお気軽にご連絡ください。',
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
    description:
      '配色、余白、フォント、アニメーションを丁寧に整え、第一印象で惹きつけるUIを目指します。',
  },
  {
    icon: '🧭',
    title: '迷わせない導線',
    description: 'どこを見ればよいか、次に何をすればよいかが自然に伝わる画面設計を大切にします。',
  },
  {
    icon: '📱',
    title: 'レスポンシブ対応',
    description: 'PCでもスマホでも気持ちよく閲覧できるよう、画面幅に合わせて最適化します。',
  },
  {
    icon: '⚙️',
    title: '保守しやすい実装',
    description: 'Vueのコンポーネント設計やPiniaの状態管理を活用し、拡張しやすい構成を意識します。',
  },
]

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
      '--home-card-bg': 'rgba(15, 23, 42, 0.72)',
      '--home-card-bg-hover': 'rgba(15, 23, 42, 0.92)',
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
    '--home-card-bg': 'rgba(255, 255, 255, 0.78)',
    '--home-card-bg-hover': 'rgba(255, 255, 255, 0.96)',
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
  min-height: 100vh;
  color: var(--home-text);
  background:
    radial-gradient(
      circle at var(--home-mouse-x) var(--home-mouse-y),
      rgb(var(--home-primary-rgb) / 0.2),
      transparent 28%
    ),
    linear-gradient(135deg, var(--home-bg-1) 0%, var(--home-bg-2) 48%, var(--home-bg-3) 100%);
}

.home-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.home-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--home-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--home-grid) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent);
}

.grid-light {
  position: absolute;
  left: var(--home-mouse-x);
  top: var(--home-mouse-y);
  width: 360px;
  height: 360px;
  border-radius: 999px;
  background: rgb(var(--home-primary-rgb) / 0.14);
  filter: blur(80px);
  transform: translate(-50%, -50%);
  transition:
    left 0.18s ease,
    top 0.18s ease;
}

.orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(70px);
  opacity: 0.7;
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
  left: 38%;
  bottom: 6%;
  width: 320px;
  height: 320px;
  background: rgb(var(--home-primary-rgb) / 0.14);
  animation-delay: -6s;
}

.hero-section,
.quick-section,
.feature-section,
.cta-section,
.marquee-section {
  position: relative;
  z-index: 1;
}

.hero-section {
  min-height: calc(100vh - 76px);
  padding: 112px 24px 88px;
  display: grid;
  align-items: center;
}

.hero-container {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
  gap: 64px;
  align-items: center;
  max-width: 1220px;
  width: 100%;
  margin: 0 auto;
}

.hero-badge {
  margin-bottom: 26px;
}

.hero-content h1 {
  margin: 0;
  color: var(--home-text);
  font-size: clamp(48px, 7.4vw, 104px);
  line-height: 1.03;
  letter-spacing: -0.05em;
}

.hero-content h1 span {
  display: block;
}

.hero-role {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-top: 26px;
  font-size: clamp(22px, 3vw, 34px);
}

.role-label {
  color: var(--home-muted);
  font-weight: 800;
}

.hero-role strong {
  color: var(--home-primary);
  text-shadow: 0 0 28px rgb(var(--home-primary-rgb) / 0.35);
}

.hero-description {
  max-width: 680px;
  margin: 26px 0 0;
  color: var(--home-muted);
  font-size: 17px;
  line-height: 2;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 34px;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  max-width: 560px;
  margin-top: 42px;
}

.stat-card {
  padding: 18px;
  border: 1px solid var(--home-border);
  border-radius: 22px;
  background: var(--home-card-bg);
  backdrop-filter: blur(18px);
  box-shadow:
    0 18px 60px rgba(0, 0, 0, 0.16),
    inset 0 1px 0 var(--home-border);
}

.stat-card strong {
  display: block;
  color: var(--home-text);
  font-size: 30px;
  line-height: 1;
}

.stat-card small {
  display: block;
  margin-top: 8px;
  color: var(--home-muted);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-visual {
  position: relative;
  min-height: 560px;
  display: grid;
  place-items: center;
}

.visual-ring {
  position: absolute;
  border: 1px solid rgb(var(--home-primary-rgb) / 0.22);
  border-radius: 999px;
  animation: rotateRing 20s linear infinite;
}

.ring-1 {
  width: 500px;
  height: 500px;
}

.ring-2 {
  width: 390px;
  height: 390px;
  border-style: dashed;
  animation-duration: 28s;
  animation-direction: reverse;
}

.ring-3 {
  width: 270px;
  height: 270px;
  border-color: rgb(var(--home-secondary-rgb) / 0.24);
  animation-duration: 16s;
}

.profile-card {
  position: relative;
  z-index: 2;
  width: min(100%, 380px);
  padding: 26px;
  border: 1px solid var(--home-border);
  border-radius: 32px;
  background:
    linear-gradient(135deg, rgb(var(--home-primary-rgb) / 0.16), transparent), var(--home-card-bg);
  box-shadow:
    0 32px 100px rgba(0, 0, 0, 0.28),
    0 0 60px rgb(var(--home-primary-rgb) / 0.12),
    inset 0 1px 0 var(--home-border);
  backdrop-filter: blur(22px);
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
  box-shadow: 0 16px 36px rgb(var(--home-primary-rgb) / 0.28);
}

.profile-top strong {
  display: block;
  color: var(--home-text);
  font-size: 20px;
}

.profile-top small {
  display: block;
  margin-top: 5px;
  color: var(--home-muted);
  font-size: 13px;
}

.profile-code {
  margin-top: 28px;
  padding: 20px;
  border: 1px solid var(--home-border);
  border-radius: 22px;
  background: rgba(0, 0, 0, 0.16);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  line-height: 1.8;
}

.code-key {
  color: var(--home-primary);
}

.code-name {
  color: var(--home-text);
}

.code-string {
  color: var(--home-secondary);
}

.profile-meter {
  margin-top: 24px;
}

.meter-head {
  display: flex;
  justify-content: space-between;
  color: var(--home-muted);
  font-size: 13px;
  font-weight: 700;
}

.meter-head strong {
  color: var(--home-text);
}

.meter-bar {
  overflow: hidden;
  height: 10px;
  margin-top: 10px;
  border-radius: 999px;
  background: rgb(var(--home-primary-rgb) / 0.12);
}

.meter-bar span {
  display: block;
  width: 98%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--home-primary), var(--home-secondary));
  box-shadow: 0 0 22px rgb(var(--home-primary-rgb) / 0.55);
  animation: meterGrow 1.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.floating-chip {
  position: absolute;
  z-index: 3;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid var(--home-border);
  border-radius: 999px;
  color: var(--home-text);
  background: var(--home-card-bg);
  box-shadow:
    0 18px 50px rgba(0, 0, 0, 0.18),
    0 0 28px rgb(var(--home-primary-rgb) / 0.1);
  backdrop-filter: blur(18px);
  font-size: 13px;
  font-weight: 900;
  animation: floatChip 4.5s ease-in-out infinite;
}

.chip-vue {
  top: 72px;
  left: 22px;
}

.chip-ui {
  top: 120px;
  right: 6px;
  animation-delay: -1s;
}

.chip-pinia {
  bottom: 126px;
  left: 0;
  animation-delay: -2s;
}

.chip-animation {
  right: 28px;
  bottom: 76px;
  animation-delay: -3s;
}

.scroll-guide {
  position: absolute;
  left: 50%;
  bottom: 28px;
  display: grid;
  place-items: center;
  gap: 8px;
  color: var(--home-muted);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transform: translateX(-50%);
}

.scroll-guide div {
  position: relative;
  width: 2px;
  height: 42px;
  overflow: hidden;
  border-radius: 999px;
  background: rgb(var(--home-primary-rgb) / 0.18);
}

.scroll-guide div::before {
  content: '';
  position: absolute;
  top: -50%;
  left: 0;
  width: 100%;
  height: 50%;
  border-radius: inherit;
  background: var(--home-primary);
  animation: scrollLine 1.6s ease-in-out infinite;
}

.quick-section,
.feature-section {
  padding: 112px 24px;
}

.section-heading {
  max-width: 820px;
  margin: 0 auto 56px;
  text-align: center;
}

.section-heading h2 {
  margin: 22px 0 14px;
  font-size: clamp(34px, 5vw, 68px);
  line-height: 1.12;
}

.section-heading p {
  margin: 0;
  color: var(--home-muted);
  font-size: 16px;
  line-height: 1.9;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
  max-width: 1220px;
  margin: 0 auto;
}

.quick-card {
  position: relative;
  overflow: hidden;
  min-height: 280px;
  padding: 26px;
  border: 1px solid var(--home-border);
  border-radius: 30px;
  color: inherit;
  background: var(--home-card-bg);
  text-decoration: none;
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 var(--home-border);
  backdrop-filter: blur(18px);
  transition:
    transform 0.35s ease,
    background 0.35s ease,
    box-shadow 0.35s ease;
}

.quick-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at top right,
    rgb(var(--home-primary-rgb) / 0.18),
    transparent 42%
  );
  opacity: 0;
  transition: opacity 0.35s ease;
}

.quick-card:hover {
  transform: translateY(-10px) rotateX(2deg);
  background: var(--home-card-bg-hover);
  box-shadow:
    0 34px 100px rgba(0, 0, 0, 0.28),
    0 0 40px rgb(var(--home-primary-rgb) / 0.14);
}

.quick-card:hover::before {
  opacity: 1;
}

.quick-icon {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  margin-bottom: 24px;
  border-radius: 20px;
  background: rgb(var(--home-primary-rgb) / 0.12);
  font-size: 28px;
}

.quick-card span,
.quick-card h3,
.quick-card p,
.quick-arrow {
  position: relative;
  z-index: 1;
}

.quick-card span {
  color: var(--home-primary);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.quick-card h3 {
  margin: 10px 0 12px;
  color: var(--home-text);
  font-size: 24px;
}

.quick-card p {
  margin: 0;
  color: var(--home-muted);
  font-size: 14px;
  line-height: 1.8;
}

.quick-arrow {
  position: absolute;
  right: 24px;
  bottom: 20px;
  color: var(--home-primary);
  font-size: 28px;
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.quick-card:hover .quick-arrow {
  transform: translateX(6px);
}

.marquee-section {
  overflow: hidden;
  padding: 28px 0;
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
  color: var(--home-text);
  background: var(--home-card-bg);
  font-size: 14px;
  font-weight: 900;
  white-space: nowrap;
}

.feature-container {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 52px;
  align-items: center;
  max-width: 1220px;
  margin: 0 auto;
}

.feature-copy h2 {
  margin: 24px 0 20px;
  color: var(--home-text);
  font-size: clamp(38px, 5vw, 72px);
  line-height: 1.12;
  letter-spacing: -0.04em;
}

.feature-copy p {
  margin: 0;
  color: var(--home-muted);
  font-size: 16px;
  line-height: 2;
}

.feature-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 32px;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.feature-card {
  border-radius: 28px;
  background: var(--home-card-bg);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 var(--home-border);
  backdrop-filter: blur(18px);
  transition:
    transform 0.35s ease,
    background 0.35s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  background: var(--home-card-bg-hover);
}

.feature-icon {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  margin-bottom: 18px;
  border-radius: 18px;
  background: rgb(var(--home-primary-rgb) / 0.12);
  font-size: 26px;
}

.feature-card h3 {
  margin: 0 0 12px;
  color: var(--home-text);
  font-size: 22px;
}

.feature-card p {
  margin: 0;
  color: var(--home-muted);
  font-size: 14px;
  line-height: 1.8;
}

.cta-section {
  padding: 40px 24px 120px;
}

.cta-card {
  display: flex;
  justify-content: space-between;
  gap: 32px;
  align-items: center;
  max-width: 1220px;
  margin: 0 auto;
  padding: 42px;
  border: 1px solid var(--home-border);
  border-radius: 34px;
  background:
    radial-gradient(circle at top right, rgb(var(--home-primary-rgb) / 0.22), transparent 38%),
    var(--home-card-bg);
  box-shadow:
    0 34px 110px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 var(--home-border);
  backdrop-filter: blur(22px);
}

.cta-card h2 {
  margin: 20px 0 12px;
  color: var(--home-text);
  font-size: clamp(30px, 4vw, 54px);
  line-height: 1.18;
}

.cta-card p {
  max-width: 680px;
  margin: 0;
  color: var(--home-muted);
  font-size: 15px;
  line-height: 1.9;
}

.cta-actions {
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  gap: 12px;
}

.reveal-item {
  opacity: 0;
  transform: translateY(52px) scale(0.97);
  filter: blur(10px);
  transition:
    opacity 0.8s ease,
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.8s ease;
  transition-delay: var(--delay, 0ms);
}

.reveal-item.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.word-fade-enter-active,
.word-fade-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease,
    filter 0.35s ease;
}

.word-fade-enter-from {
  opacity: 0;
  transform: translateY(14px);
  filter: blur(8px);
}

.word-fade-leave-to {
  opacity: 0;
  transform: translateY(-14px);
  filter: blur(8px);
}

@keyframes floatOrb {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }

  to {
    transform: translate3d(40px, -30px, 0) scale(1.08);
  }
}

@keyframes rotateRing {
  to {
    transform: rotate(360deg);
  }
}

@keyframes floatCard {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-16px) rotate(1deg);
  }
}

@keyframes floatChip {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-14px);
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

@keyframes scrollLine {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(220%);
  }
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 1080px) {
  .hero-container,
  .feature-container {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    min-height: 500px;
  }

  .quick-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cta-card {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 760px) {
  .hero-section {
    min-height: auto;
    padding: 86px 18px 72px;
  }

  .quick-section,
  .feature-section {
    padding: 86px 18px;
  }

  .cta-section {
    padding: 20px 18px 86px;
  }

  .hero-container {
    gap: 42px;
  }

  .hero-description {
    font-size: 15px;
  }

  .hero-actions,
  .feature-actions,
  .cta-actions {
    flex-direction: column;
  }

  .hero-actions .n-button,
  .feature-actions .n-button,
  .cta-actions .n-button {
    width: 100%;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    min-height: 420px;
  }

  .ring-1 {
    width: 360px;
    height: 360px;
  }

  .ring-2 {
    width: 290px;
    height: 290px;
  }

  .ring-3 {
    width: 210px;
    height: 210px;
  }

  .floating-chip {
    padding: 10px 13px;
    font-size: 12px;
  }

  .chip-vue {
    top: 34px;
    left: 0;
  }

  .chip-ui {
    top: 72px;
    right: 0;
  }

  .chip-pinia {
    bottom: 86px;
  }

  .chip-animation {
    right: 0;
    bottom: 42px;
  }

  .quick-grid,
  .feature-cards {
    grid-template-columns: 1fr;
  }

  .section-heading {
    text-align: left;
  }

  .cta-card {
    padding: 28px;
    border-radius: 28px;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: clamp(42px, 15vw, 58px);
  }

  .hero-role {
    font-size: 22px;
  }

  .profile-card {
    padding: 22px;
    border-radius: 28px;
  }

  .profile-code {
    font-size: 12px;
  }

  .scroll-guide {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .orb,
  .visual-ring,
  .profile-card,
  .floating-chip,
  .scroll-guide div::before,
  .marquee-track {
    animation: none;
  }

  .reveal-item,
  .quick-card,
  .feature-card,
  .word-fade-enter-active,
  .word-fade-leave-active {
    transition: none;
  }

  .reveal-item {
    opacity: 1;
    transform: none;
    filter: none;
  }
}
</style>
