<template>
  <section class="projects-section app-page" :style="pageThemeStyle">
    <div class="projects-container app-container">
      <div class="page-header">
        <n-tag round type="primary" size="large"> Projects </n-tag>

        <h2>
          <n-gradient-text type="primary"> かかわったProject </n-gradient-text>
        </h2>

        <p>制作・開発・改善に携わったプロジェクトを紹介します。</p>
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

      <n-grid responsive="screen" cols="1 m:2 l:3" :x-gap="24" :y-gap="24">
        <n-gi v-for="(project, index) in filteredProjects" :key="project.id">
          <n-card
            class="project-card reveal"
            :bordered="false"
            :style="{ '--delay': `${index * 70}ms` }"
          >
            <div class="image-wrap">
              <n-image
                :src="project.img"
                :alt="project.title"
                object-fit="cover"
                class="project-image"
              />
            </div>

            <div class="project-meta">
              <n-tag round type="primary" size="small">
                {{ getCategoryLabel(project.category) }}
              </n-tag>

              <span>{{ project.period }}</span>
            </div>

            <h3>{{ project.title }}</h3>

            <p>{{ project.description }}</p>

            <div class="role-box">
              <span>担当</span>
              <strong>{{ project.role }}</strong>
            </div>

            <n-space :wrap="true" class="techs">
              <n-tag v-for="tech in project.techs" :key="tech" round size="small">
                {{ tech }}
              </n-tag>
            </n-space>

            <ul>
              <li v-for="item in project.highlights" :key="item">
                {{ item }}
              </li>
            </ul>

            <n-space :wrap="true" class="actions">
              <n-button
                v-if="project.demoUrl"
                tag="a"
                :href="project.demoUrl"
                target="_blank"
                type="primary"
                round
                size="small"
              >
                Demo
              </n-button>

              <n-button
                v-if="project.githubUrl"
                tag="a"
                :href="project.githubUrl"
                target="_blank"
                round
                size="small"
              >
                GitHub
              </n-button>
            </n-space>
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
  { label: 'Web App', value: 'web-app' },
  { label: 'Portfolio', value: 'portfolio' },
  { label: 'Corporate', value: 'corporate' },
  { label: 'UI/UX', value: 'uiux' },
]

const projects = [
  {
    id: 1,
    title: 'Personal Portfolio',
    category: 'portfolio',
    period: '2024.01 - 2024.04',
    role: '企画 / UIデザイン / フロントエンド実装',
    description: '自身の経歴、制作物、スキルを紹介するポートフォリオサイトです。',
    techs: ['Vue 3', 'Naive UI', 'Pinia', 'CSS Animation'],
    highlights: ['テーマ切り替え機能を実装', '各ページにアニメーションを追加', 'レスポンシブ対応'],
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: 2,
    title: 'Task Management App',
    category: 'web-app',
    period: '2023.08 - 2023.10',
    role: 'フロントエンド実装 / 状態管理',
    description: 'タスクの追加、編集、削除、ステータス変更ができるWebアプリです。',
    techs: ['Vue 3', 'Pinia', 'Naive UI', 'LocalStorage'],
    highlights: ['Piniaで状態管理', 'LocalStorageでデータ保存', '直感的なUIを意識'],
    img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    id: 3,
    title: 'Corporate Website Renewal',
    category: 'corporate',
    period: '2022.11 - 2023.02',
    role: 'コーディング / レスポンシブ対応',
    description: '企業サイトの情報設計を見直し、ブランドイメージに合わせて実装しました。',
    techs: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    highlights: ['スマホ対応', '画像最適化', '導線改善'],
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200',
    demoUrl: '',
    githubUrl: '',
  },
  {
    id: 4,
    title: 'Dashboard UI',
    category: 'uiux',
    period: '2023.04 - 2023.06',
    role: 'UI設計 / フロントエンド実装',
    description: '売上やユーザー情報を可視化する管理画面UIを制作しました。',
    techs: ['Vue 3', 'Naive UI', 'Chart.js'],
    highlights: ['情報をカードで整理', '視認性を重視', '再利用可能な部品設計'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
    demoUrl: 'https://example.com',
    githubUrl: '',
  },
  {
    id: 5,
    title: 'Study Memo App',
    category: 'web-app',
    period: '2021.03 - 2021.05',
    role: '個人開発 / 設計 / 実装',
    description: '学習内容をカテゴリやタグで記録できるメモアプリです。',
    techs: ['Vue', 'Firebase', 'JavaScript'],
    highlights: ['タグ検索機能', 'Firebase連携', '継続しやすいUI'],
    img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200',
    demoUrl: '',
    githubUrl: 'https://github.com',
  },
]

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') return projects

  return projects.filter((project) => project.category === selectedCategory.value)
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
.projects-section {
  width: 100%;
  padding: var(--app-section-y) var(--app-page-x);
  color: var(--page-text);
}

.projects-container {
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

.project-card {
  height: 100%;
  border-radius: 24px;
  background: var(--page-card);
  border: 1px solid var(--page-border);
  backdrop-filter: blur(16px);
  transition:
    transform 0.3s ease,
    background 0.3s ease;
}

.project-card:hover {
  transform: translateY(-8px);
  background: var(--page-card-hover);
}

.image-wrap {
  overflow: hidden;
  height: 210px;
  margin-bottom: 20px;
  border-radius: 18px;
}

.project-image {
  width: 100%;
  height: 100%;
}

.image-wrap :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  color: var(--page-muted);
  font-size: 13px;
}

.project-card h3 {
  margin: 18px 0 12px;
  color: var(--page-text);
  font-size: 24px;
}

.project-card p,
.project-card li {
  color: var(--page-muted);
  line-height: 1.8;
}

.role-box {
  margin: 18px 0;
  padding: 14px;
  border-radius: 16px;
  background: rgb(var(--page-primary-rgb) / 0.08);
  border: 1px solid var(--page-border);
}

.role-box span {
  display: block;
  color: var(--page-muted);
  font-size: 12px;
}

.role-box strong {
  color: var(--page-text);
}

.techs {
  margin-bottom: 16px;
}

.project-card ul {
  padding-left: 18px;
}

.actions {
  margin-top: 18px;
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
