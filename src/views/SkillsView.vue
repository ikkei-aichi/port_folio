<template>
  <section class="skills-section app-page" :style="pageThemeStyle">
    <div class="skills-container app-container">
      <div class="page-header">
        <n-tag round type="primary" size="large"> Skills </n-tag>

        <h2>
          <n-gradient-text type="primary"> Skill Set </n-gradient-text>
        </h2>

        <p>フロントエンド開発を中心に、UI設計、状態管理、API連携などを磨いてきました。</p>
      </div>

      <n-space justify="center" :wrap="true" class="filter">
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

      <n-grid responsive="screen" cols="1 m:2 l:3" :x-gap="22" :y-gap="22">
        <n-gi v-for="(skill, index) in filteredSkills" :key="skill.name">
          <n-card
            class="skill-card reveal"
            :bordered="false"
            :style="{ '--delay': `${index * 60}ms` }"
          >
            <div class="skill-head">
              <div>
                <span>{{ getCategoryLabel(skill.category) }}</span>
                <h3>{{ skill.name }}</h3>
              </div>

              <strong>{{ skill.level }}%</strong>
            </div>

            <p>{{ skill.description }}</p>

            <n-progress
              type="line"
              :percentage="skill.level"
              :height="8"
              :border-radius="999"
              :fill-border-radius="999"
              :show-indicator="false"
            />

            <n-space :wrap="true" class="tags">
              <n-tag v-for="tag in skill.tags" :key="tag" round size="small">
                {{ tag }}
              </n-tag>
            </n-space>
          </n-card>
        </n-gi>
      </n-grid>

      <n-grid responsive="screen" cols="1 m:3" :x-gap="22" :y-gap="22" class="bottom-grid">
        <n-gi>
          <n-card class="info-card" :bordered="false">
            <h3>得意なこと</h3>
            <ul>
              <li v-for="item in strengths" :key="item">
                {{ item }}
              </li>
            </ul>
          </n-card>
        </n-gi>

        <n-gi>
          <n-card class="info-card" :bordered="false">
            <h3>よく使うツール</h3>
            <n-space :wrap="true">
              <n-tag v-for="tool in tools" :key="tool" round type="primary">
                {{ tool }}
              </n-tag>
            </n-space>
          </n-card>
        </n-gi>

        <n-gi>
          <n-card class="info-card" :bordered="false">
            <h3>学習中</h3>

            <div v-for="item in learning" :key="item.name" class="learning-item">
              <div>
                <strong>{{ item.name }}</strong>
                <span>{{ item.memo }}</span>
              </div>

              <n-progress type="circle" :percentage="item.progress" :width="56" :stroke-width="8" />
            </div>
          </n-card>
        </n-gi>
      </n-grid>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { colorThemeMap } from '@/theme/colorThemes'

const userStore = useUserStore()

const selectedCategory = ref('all')

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Framework', value: 'framework' },
  { label: 'Design', value: 'design' },
  { label: 'Backend', value: 'backend' },
  { label: 'Tools', value: 'tools' },
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
      'レスポンシブ対応、余白設計、アニメーション、コンポーネント単位のスタイリングが得意です。',
    tags: ['Responsive', 'Animation', 'Layout'],
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    level: 82,
    description: 'DOM操作、非同期処理、配列操作、API連携など基本的なWebアプリ開発ができます。',
    tags: ['ES6+', 'Async', 'API'],
  },
  {
    name: 'Vue 3',
    category: 'framework',
    level: 86,
    description:
      'Composition APIを使ったコンポーネント設計、props/emits、computed、watchを活用できます。',
    tags: ['Composition API', 'Component', 'SPA'],
  },
  {
    name: 'Pinia',
    category: 'framework',
    level: 78,
    description: 'テーマ設定やユーザー情報など、アプリ全体で扱う状態をStoreで管理できます。',
    tags: ['Store', 'State', 'LocalStorage'],
  },
  {
    name: 'Naive UI',
    category: 'framework',
    level: 84,
    description:
      'Naive UIのコンポーネントを活用し、テーマカスタマイズや独自デザインとの統合ができます。',
    tags: ['Theme', 'Component', 'Customize'],
  },
  {
    name: 'UI Design',
    category: 'design',
    level: 78,
    description: '色、余白、文字サイズ、視線誘導を意識して、使いやすいUIを設計します。',
    tags: ['Color', 'Typography', 'UX'],
  },
  {
    name: 'REST API',
    category: 'backend',
    level: 68,
    description: 'API仕様を確認し、フロントエンドからデータ取得・送信・エラー処理を実装できます。',
    tags: ['Fetch', 'Axios', 'Error Handling'],
  },
  {
    name: 'Git / GitHub',
    category: 'tools',
    level: 80,
    description: 'ブランチ作成、コミット、Pull Requestなど基本的な開発フローで利用できます。',
    tags: ['Git Flow', 'Pull Request', 'Review'],
  },
]

const strengths = [
  'ユーザーが迷わない画面構成を考えること',
  'テーマカラーや余白を揃えて統一感を出すこと',
  'Vueコンポーネントを小さく整理して実装すること',
  'デザインと実装のバランスを取ること',
]

const tools = ['VS Code', 'GitHub', 'Figma', 'Vite', 'npm', 'Chrome DevTools']

const learning = [
  { name: 'TypeScript', memo: '型安全なVue開発を学習中', progress: 55 },
  { name: 'Nuxt', memo: 'SSR/SSG構成を学習中', progress: 45 },
  { name: 'Testing', memo: '保守性を高めるテストを学習中', progress: 38 },
]

const filteredSkills = computed(() => {
  if (selectedCategory.value === 'all') return skills

  return skills.filter((skill) => skill.category === selectedCategory.value)
})

const getCategoryLabel = (value) => {
  return categories.find((category) => category.value === value)?.label ?? value
}

const currentTheme = computed(() => {
  return colorThemeMap[userStore.colorTheme] ?? colorThemeMap['dark-blue']
})

const primaryColor = computed(() => {
  return currentTheme.value.overrides.common.primaryColor
})

const isDarkTheme = computed(() => {
  return Boolean(currentTheme.value.naiveTheme)
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

function hexToRgb(hex) {
  const value = hex.replace('#', '')
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)

  return `${r} ${g} ${b}`
}
</script>

<style scoped>
.skills-section {
  width: 100%;
  padding: var(--app-section-y) var(--app-page-x);
  color: var(--page-text);
}

.skills-container {
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

.page-header p {
  margin: 0;
  color: var(--page-muted);
  line-height: 1.9;
}

.filter {
  margin-bottom: 40px;
}

.skill-card,
.info-card {
  height: 100%;
  border-radius: 24px;
  background: var(--page-card);
  border: 1px solid var(--page-border);
  backdrop-filter: blur(16px);
  transition:
    transform 0.3s ease,
    background 0.3s ease;
}

.skill-card:hover,
.info-card:hover {
  transform: translateY(-8px);
  background: var(--page-card-hover);
}

.skill-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.skill-head span {
  color: var(--page-primary);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.skill-head h3,
.info-card h3 {
  margin: 8px 0 12px;
  color: var(--page-text);
  font-size: 24px;
}

.skill-head strong {
  padding: 8px 12px;
  border-radius: 999px;
  color: var(--page-text);
  background: rgb(var(--page-primary-rgb) / 0.12);
}

.skill-card p,
.info-card li,
.learning-item span {
  color: var(--page-muted);
  line-height: 1.8;
}

.tags {
  margin-top: 18px;
}

.bottom-grid {
  margin-top: 24px;
}

.info-card ul {
  margin: 0;
  padding-left: 18px;
}

.learning-item {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid var(--page-border);
}

.learning-item:last-child {
  border-bottom: 0;
}

.learning-item strong {
  display: block;
  color: var(--page-text);
}

.learning-item span {
  display: block;
  font-size: 12px;
}

.reveal {
  animation: fadeUp 0.75s both;
  animation-delay: var(--delay, 0ms);
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
