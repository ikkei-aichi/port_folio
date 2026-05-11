<template>
  <section
    class="skills-section"
    :class="{
      'is-dark': isDarkTheme,
      'is-light': !isDarkTheme,
    }"
    :style="skillsThemeStyle"
  >
    <div class="skills-bg"></div>

    <div class="skills-container">
      <div class="skills-header">
        <n-tag round type="primary" size="large"> Skills </n-tag>

        <h2>
          <n-gradient-text type="primary"> Skill Set </n-gradient-text>
        </h2>

        <p>
          フロントエンド開発を中心に、UI設計、状態管理、API連携、
          レスポンシブ対応まで、Web制作・開発に必要なスキルを磨いてきました。
        </p>
      </div>

      <div class="skills-summary">
        <n-card
          v-for="summary in summaries"
          :key="summary.label"
          class="summary-card skill-reveal"
          :bordered="false"
          :ref="setSkillRef"
        >
          <div class="summary-icon">
            {{ summary.icon }}
          </div>

          <strong>{{ summary.value }}</strong>
          <span>{{ summary.label }}</span>
        </n-card>
      </div>

      <div class="skill-filter">
        <n-space justify="center" :wrap="true">
          <n-button
            v-for="category in categories"
            :key="category.value"
            round
            :type="selectedCategory === category.value ? 'primary' : 'default'"
            @click="selectedCategory = category.value"
          >
            {{ category.label }}
          </n-button>
        </n-space>
      </div>

      <div class="skills-layout">
        <div class="skills-main">
          <n-card
            v-for="(skill, index) in filteredSkills"
            :key="skill.name"
            class="skill-card skill-reveal"
            :bordered="false"
            :ref="setSkillRef"
            :style="{ '--delay': `${index * 65}ms` }"
          >
            <div class="skill-card-header">
              <div>
                <div class="skill-category">
                  {{ getCategoryLabel(skill.category) }}
                </div>

                <h3>{{ skill.name }}</h3>
              </div>

              <div class="skill-level-badge">{{ skill.level }}%</div>
            </div>

            <p>
              {{ skill.description }}
            </p>

            <div class="skill-progress">
              <n-progress
                type="line"
                :percentage="skill.level"
                :height="8"
                :border-radius="999"
                :fill-border-radius="999"
                :show-indicator="false"
              />
            </div>

            <div class="skill-tags">
              <n-tag v-for="tag in skill.tags" :key="tag" round size="small">
                {{ tag }}
              </n-tag>
            </div>
          </n-card>
        </div>

        <aside class="skills-side">
          <n-card class="side-card skill-reveal" :bordered="false" :ref="setSkillRef">
            <div class="side-card-title">
              <span>得意なこと</span>
              <strong>Strengths</strong>
            </div>

            <ul class="strength-list">
              <li v-for="strength in strengths" :key="strength">
                {{ strength }}
              </li>
            </ul>
          </n-card>

          <n-card class="side-card skill-reveal" :bordered="false" :ref="setSkillRef">
            <div class="side-card-title">
              <span>よく使うツール</span>
              <strong>Tools</strong>
            </div>

            <div class="tool-list">
              <n-tag v-for="tool in tools" :key="tool" round type="primary">
                {{ tool }}
              </n-tag>
            </div>
          </n-card>

          <n-card class="side-card skill-reveal" :bordered="false" :ref="setSkillRef">
            <div class="side-card-title">
              <span>学習中</span>
              <strong>Learning</strong>
            </div>

            <div class="learning-list">
              <div v-for="item in learning" :key="item.name" class="learning-item">
                <div>
                  <strong>{{ item.name }}</strong>
                  <span>{{ item.memo }}</span>
                </div>

                <n-progress
                  type="circle"
                  :percentage="item.progress"
                  :width="58"
                  :stroke-width="8"
                />
              </div>
            </div>
          </n-card>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount, onBeforeUpdate, nextTick, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { colorThemeMap } from '@/theme/colorThemes'

const userStore = useUserStore()

const selectedCategory = ref('all')

const categories = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Frontend',
    value: 'frontend',
  },
  {
    label: 'Framework',
    value: 'framework',
  },
  {
    label: 'UI / Design',
    value: 'design',
  },
  {
    label: 'Backend',
    value: 'backend',
  },
  {
    label: 'Tools',
    value: 'tools',
  },
]

const summaries = [
  {
    icon: '💻',
    value: 'Frontend',
    label: 'Vueを中心とした画面開発',
  },
  {
    icon: '🎨',
    value: 'UI Design',
    label: '見やすく使いやすいUI設計',
  },
  {
    icon: '⚙️',
    value: 'State',
    label: 'Piniaなどの状態管理',
  },
  {
    icon: '🚀',
    value: 'Improve',
    label: '改善し続ける実装スタイル',
  },
]

const skills = [
  {
    name: 'HTML',
    category: 'frontend',
    level: 90,
    description:
      'セマンティックな構造を意識し、SEOやアクセシビリティにも配慮したマークアップができます。',
    tags: ['Semantic', 'SEO', 'Accessibility'],
  },
  {
    name: 'CSS / SCSS',
    category: 'frontend',
    level: 88,
    description:
      'レスポンシブ対応、アニメーション、余白設計、コンポーネント単位のスタイリングが得意です。',
    tags: ['Responsive', 'Animation', 'SCSS'],
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    level: 82,
    description:
      'DOM操作、非同期処理、配列操作、API連携など、Webアプリに必要な基本実装ができます。',
    tags: ['ES6+', 'Async', 'API'],
  },
  {
    name: 'Vue 3',
    category: 'framework',
    level: 86,
    description:
      'Composition APIを使ったコンポーネント設計、props/emits、computed、watchを活用した実装ができます。',
    tags: ['Composition API', 'Component', 'SPA'],
  },
  {
    name: 'Pinia',
    category: 'framework',
    level: 78,
    description:
      'アプリ全体で扱う状態をStoreで管理し、テーマ設定やユーザー情報、アプリデータの共有に活用できます。',
    tags: ['Store', 'State Management', 'LocalStorage'],
  },
  {
    name: 'Naive UI',
    category: 'framework',
    level: 84,
    description:
      'Naive UIのコンポーネントを活用しながら、テーマカスタマイズや独自デザインとの統合ができます。',
    tags: ['Theme', 'Component', 'Customize'],
  },
  {
    name: 'Vue Router',
    category: 'framework',
    level: 74,
    description:
      'ページ遷移、ルーティング設定、レイアウト切り替えなど、SPAに必要な基本構成を組むことができます。',
    tags: ['Routing', 'SPA', 'Layout'],
  },
  {
    name: 'UI Design',
    category: 'design',
    level: 78,
    description:
      '色、余白、文字サイズ、視線誘導を意識して、見た目だけでなく使いやすさを考えたUIを設計します。',
    tags: ['Layout', 'Color', 'Typography'],
  },
  {
    name: 'Responsive Design',
    category: 'design',
    level: 86,
    description: 'PC、タブレット、スマートフォンで自然に見えるレイアウトを設計し、実装できます。',
    tags: ['Mobile First', 'Media Query', 'Grid'],
  },
  {
    name: 'Figma',
    category: 'design',
    level: 70,
    description:
      'ワイヤーフレーム作成、UIデザイン確認、コンポーネント整理、デザイン共有に使用しています。',
    tags: ['Wireframe', 'Prototype', 'Design'],
  },
  {
    name: 'REST API',
    category: 'backend',
    level: 68,
    description:
      'API仕様を確認し、フロントエンドからデータ取得・送信・エラーハンドリングを行う実装ができます。',
    tags: ['Fetch', 'Axios', 'Error Handling'],
  },
  {
    name: 'Firebase',
    category: 'backend',
    level: 62,
    description: '個人開発で認証、データ保存、簡易的なバックエンドとして利用した経験があります。',
    tags: ['Auth', 'Firestore', 'Hosting'],
  },
  {
    name: 'Git / GitHub',
    category: 'tools',
    level: 80,
    description:
      'ブランチ作成、コミット、Pull Request、コードレビューなど、基本的な開発フローで利用できます。',
    tags: ['Git Flow', 'Pull Request', 'Review'],
  },
  {
    name: 'Vite',
    category: 'tools',
    level: 76,
    description:
      'Vueプロジェクトの作成、開発サーバー、ビルド設定など、モダンなフロントエンド環境で利用しています。',
    tags: ['Build', 'Dev Server', 'Vue'],
  },
  {
    name: 'npm',
    category: 'tools',
    level: 72,
    description:
      'パッケージ管理、scripts実行、ライブラリ導入など、日常的な開発作業で使用しています。',
    tags: ['Package', 'Scripts', 'Library'],
  },
]

const strengths = [
  'ユーザーが迷わない画面構成を考えること',
  'テーマカラーや余白を揃えて統一感を出すこと',
  'Vueコンポーネントを小さく整理して実装すること',
  'スクロールアニメーションなどの動きで印象を作ること',
  'デザインと実装のバランスを取りながら形にすること',
]

const tools = ['VS Code', 'GitHub', 'Figma', 'Chrome DevTools', 'Vite', 'npm', 'Notion', 'Slack']

const learning = [
  {
    name: 'TypeScript',
    memo: '型安全なVue開発を学習中',
    progress: 55,
  },
  {
    name: 'Nuxt',
    memo: 'SSR/SSG構成を学習中',
    progress: 45,
  },
  {
    name: 'Testing',
    memo: '保守性を高めるテストを学習中',
    progress: 38,
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

const skillsThemeStyle = computed(() => {
  const primaryRgb = hexToRgb(primaryColor.value)

  if (isDarkTheme.value) {
    return {
      '--skills-primary': primaryColor.value,
      '--skills-primary-rgb': primaryRgb,
      '--skills-bg-1': '#050816',
      '--skills-bg-2': '#0f172a',
      '--skills-bg-3': '#020617',
      '--skills-card-bg': 'rgba(15, 23, 42, 0.72)',
      '--skills-card-bg-hover': 'rgba(15, 23, 42, 0.9)',
      '--skills-text': 'rgba(255, 255, 255, 0.92)',
      '--skills-muted': 'rgba(255, 255, 255, 0.66)',
      '--skills-border': 'rgba(255, 255, 255, 0.1)',
      '--skills-grid': 'rgba(255, 255, 255, 0.04)',
    }
  }

  return {
    '--skills-primary': primaryColor.value,
    '--skills-primary-rgb': primaryRgb,
    '--skills-bg-1': '#f8fbff',
    '--skills-bg-2': '#eef6ff',
    '--skills-bg-3': '#ffffff',
    '--skills-card-bg': 'rgba(255, 255, 255, 0.78)',
    '--skills-card-bg-hover': 'rgba(255, 255, 255, 0.96)',
    '--skills-text': 'rgba(15, 23, 42, 0.92)',
    '--skills-muted': 'rgba(15, 23, 42, 0.62)',
    '--skills-border': 'rgba(15, 23, 42, 0.1)',
    '--skills-grid': 'rgba(15, 23, 42, 0.055)',
  }
})

const filteredSkills = computed(() => {
  if (selectedCategory.value === 'all') {
    return skills
  }

  return skills.filter((skill) => skill.category === selectedCategory.value)
})

const getCategoryLabel = (value) => {
  return categories.find((category) => category.value === value)?.label || value
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

const skillRefs = ref([])
let observer = null

const setSkillRef = (el) => {
  if (el) {
    skillRefs.value.push(el.$el || el)
  }
}

const setupObserver = () => {
  if (observer) {
    observer.disconnect()
  }

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
      threshold: 0.14,
      rootMargin: '0px 0px -10% 0px',
    },
  )

  skillRefs.value.forEach((el) => {
    observer.observe(el)
  })
}

onBeforeUpdate(() => {
  skillRefs.value = []
})

onMounted(() => {
  setupObserver()
})

watch(selectedCategory, async () => {
  await nextTick()
  setupObserver()
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.skills-section {
  position: relative;
  overflow: hidden;
  padding: 120px 24px;
  color: var(--skills-text);
  background:
    radial-gradient(circle at 14% 12%, rgb(var(--skills-primary-rgb) / 0.24), transparent 34%),
    radial-gradient(circle at 86% 22%, rgb(var(--skills-primary-rgb) / 0.16), transparent 31%),
    radial-gradient(circle at 50% 95%, rgb(var(--skills-primary-rgb) / 0.14), transparent 38%),
    linear-gradient(135deg, var(--skills-bg-1) 0%, var(--skills-bg-2) 48%, var(--skills-bg-3) 100%);
}

.skills-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--skills-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--skills-grid) 1px, transparent 1px);
  background-size: 46px 46px;
  mask-image: linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent);
  pointer-events: none;
}

.skills-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.skills-bg::before,
.skills-bg::after {
  content: '';
  position: absolute;
  border-radius: 999px;
  background: rgb(var(--skills-primary-rgb) / 0.14);
  filter: blur(90px);
}

.skills-bg::before {
  top: 20%;
  left: -120px;
  width: 360px;
  height: 360px;
}

.skills-bg::after {
  right: -140px;
  bottom: 14%;
  width: 430px;
  height: 430px;
}

.skills-container {
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
}

.skills-header {
  max-width: 880px;
  margin: 0 auto 48px;
  text-align: center;
}

.skills-header h2 {
  margin: 24px 0 16px;
  font-size: clamp(42px, 7vw, 86px);
  line-height: 1;
  letter-spacing: 0.04em;
}

.skills-header p {
  margin: 0;
  color: var(--skills-muted);
  font-size: 16px;
  line-height: 1.9;
}

.skills-summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 44px;
}

.summary-card,
.skill-card,
.side-card {
  position: relative;
  overflow: hidden;
  border-radius: 26px;
  background: var(--skills-card-bg);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 var(--skills-border);
  backdrop-filter: blur(18px);
}

.summary-card::before,
.skill-card::before,
.side-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgb(var(--skills-primary-rgb) / 0.66),
    rgb(var(--skills-primary-rgb) / 0.12),
    var(--skills-border)
  );
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  pointer-events: none;
}

.summary-card :deep(.n-card__content),
.skill-card :deep(.n-card__content),
.side-card :deep(.n-card__content) {
  position: relative;
  z-index: 1;
}

.summary-card {
  text-align: center;
}

.summary-icon {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  margin: 0 auto 14px;
  border-radius: 18px;
  background: rgb(var(--skills-primary-rgb) / 0.12);
  font-size: 26px;
  box-shadow: 0 0 30px rgb(var(--skills-primary-rgb) / 0.12);
}

.summary-card strong {
  display: block;
  color: var(--skills-text);
  font-size: 20px;
  letter-spacing: 0.02em;
}

.summary-card span {
  display: block;
  margin-top: 6px;
  color: var(--skills-muted);
  font-size: 13px;
  line-height: 1.6;
}

.skill-filter {
  margin-bottom: 48px;
}

.skills-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 28px;
  align-items: start;
}

.skills-main {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.skill-card {
  transition:
    background 0.35s ease,
    transform 0.35s ease,
    box-shadow 0.35s ease;
}

.skill-card:hover {
  background: var(--skills-card-bg-hover);
  transform: translateY(-6px);
  box-shadow:
    0 30px 90px rgba(0, 0, 0, 0.26),
    0 0 36px rgb(var(--skills-primary-rgb) / 0.12);
}

.skill-card-header {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
}

.skill-category {
  margin-bottom: 8px;
  color: var(--skills-primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.skill-card h3 {
  margin: 0;
  color: var(--skills-text);
  font-size: 28px;
  line-height: 1.25;
}

.skill-level-badge {
  flex: 0 0 auto;
  padding: 8px 12px;
  border: 1px solid rgb(var(--skills-primary-rgb) / 0.32);
  border-radius: 999px;
  color: var(--skills-text);
  background: rgb(var(--skills-primary-rgb) / 0.1);
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 0 24px rgb(var(--skills-primary-rgb) / 0.12);
}

.skill-card p {
  margin: 16px 0 18px;
  color: var(--skills-muted);
  font-size: 14px;
  line-height: 1.8;
}

.skill-progress {
  margin-bottom: 18px;
}

.skill-progress :deep(.n-progress-graph-line-fill) {
  box-shadow: 0 0 18px rgb(var(--skills-primary-rgb) / 0.5);
}

.skill-tags,
.tool-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skills-side {
  display: grid;
  gap: 22px;
  position: sticky;
  top: 90px;
}

.side-card-title {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
}

.side-card-title span {
  color: var(--skills-primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.side-card-title strong {
  color: var(--skills-text);
  font-size: 25px;
}

.strength-list {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.strength-list li {
  position: relative;
  padding-left: 20px;
  color: var(--skills-muted);
  font-size: 14px;
  line-height: 1.7;
}

.strength-list li::before {
  content: '';
  position: absolute;
  top: 0.7em;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--skills-primary);
  box-shadow: 0 0 16px rgb(var(--skills-primary-rgb) / 0.7);
}

.learning-list {
  display: grid;
  gap: 18px;
}

.learning-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px;
  border: 1px solid var(--skills-border);
  border-radius: 18px;
  background: rgb(var(--skills-primary-rgb) / 0.06);
}

.learning-item strong {
  display: block;
  color: var(--skills-text);
  font-size: 15px;
}

.learning-item span {
  display: block;
  margin-top: 5px;
  color: var(--skills-muted);
  font-size: 12px;
  line-height: 1.5;
}

.skill-reveal {
  opacity: 0;
  transform: translateY(52px) scale(0.97);
  filter: blur(10px);
  transition:
    opacity 0.8s ease,
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.8s ease,
    background 0.35s ease,
    box-shadow 0.35s ease;
  transition-delay: var(--delay, 0ms);
}

.skill-reveal.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

@media (max-width: 1080px) {
  .skills-summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .skills-layout {
    grid-template-columns: 1fr;
  }

  .skills-side {
    position: static;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 820px) {
  .skills-main {
    grid-template-columns: 1fr;
  }

  .skills-side {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .skills-section {
    padding: 88px 18px;
  }

  .skills-header {
    text-align: left;
  }

  .skills-header h2 {
    font-size: clamp(40px, 12vw, 64px);
  }

  .skills-summary {
    grid-template-columns: 1fr;
  }

  .skill-filter :deep(.n-space) {
    justify-content: flex-start !important;
  }

  .skill-card h3 {
    font-size: 24px;
  }

  .summary-card,
  .skill-card,
  .side-card {
    border-radius: 22px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skill-reveal,
  .skill-card {
    transition: none;
  }

  .skill-reveal {
    opacity: 1;
    transform: none;
    filter: none;
  }
}
</style>
