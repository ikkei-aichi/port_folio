<template>
  <section
    class="projects-section"
    :class="{
      'is-dark': isDarkTheme,
      'is-light': !isDarkTheme,
    }"
    :style="projectsThemeStyle"
  >
    <div class="projects-bg"></div>

    <div class="projects-container">
      <div class="projects-header">
        <n-tag round type="primary" size="large"> Projects </n-tag>

        <h2>
          <n-gradient-text type="primary"> かかわったProject </n-gradient-text>
        </h2>

        <p>
          これまでに制作・開発・改善に携わったプロジェクトを紹介します。
          企画、設計、実装、UI改善など、さまざまな形でものづくりに関わってきました。
        </p>
      </div>

      <div class="project-filter">
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

      <div class="featured-project" v-if="featuredProject">
        <n-card class="featured-card project-reveal" :bordered="false" :ref="setProjectRef">
          <div class="featured-grid">
            <div class="featured-image-wrap">
              <n-image
                :src="featuredProject.img"
                :alt="featuredProject.title"
                class="featured-image"
                object-fit="cover"
              />
            </div>

            <div class="featured-content">
              <div class="project-meta">
                <n-tag round type="primary"> Featured </n-tag>

                <span>{{ featuredProject.period }}</span>
              </div>

              <h3>{{ featuredProject.title }}</h3>

              <p class="project-description">
                {{ featuredProject.description }}
              </p>

              <div class="project-role">
                <span>担当</span>
                <strong>{{ featuredProject.role }}</strong>
              </div>

              <div class="project-techs">
                <n-tag
                  v-for="tech in featuredProject.techs"
                  :key="tech"
                  round
                  size="small"
                  type="info"
                >
                  {{ tech }}
                </n-tag>
              </div>

              <ul class="project-highlights">
                <li v-for="highlight in featuredProject.highlights" :key="highlight">
                  {{ highlight }}
                </li>
              </ul>

              <div class="project-actions">
                <n-button
                  v-if="featuredProject.demoUrl"
                  tag="a"
                  :href="featuredProject.demoUrl"
                  target="_blank"
                  type="primary"
                  round
                >
                  Demo
                </n-button>

                <n-button
                  v-if="featuredProject.githubUrl"
                  tag="a"
                  :href="featuredProject.githubUrl"
                  target="_blank"
                  round
                >
                  GitHub
                </n-button>

                <n-button
                  v-if="featuredProject.detailUrl"
                  tag="a"
                  :href="featuredProject.detailUrl"
                  target="_blank"
                  quaternary
                  round
                >
                  Detail
                </n-button>
              </div>
            </div>
          </div>
        </n-card>
      </div>

      <div class="projects-grid">
        <n-card
          v-for="(project, index) in normalProjects"
          :key="project.id"
          class="project-card project-reveal"
          :class="{ featured: project.featured }"
          :bordered="false"
          :ref="setProjectRef"
          :style="{ '--delay': `${index * 70}ms` }"
        >
          <div class="project-image-wrap">
            <n-image
              :src="project.img"
              :alt="project.title"
              class="project-image"
              object-fit="cover"
            />
          </div>

          <div class="project-body">
            <div class="project-meta">
              <n-tag round type="primary" size="small">
                {{ getCategoryLabel(project.category) }}
              </n-tag>

              <span>{{ project.period }}</span>
            </div>

            <h3>{{ project.title }}</h3>

            <p class="project-description">
              {{ project.description }}
            </p>

            <div class="project-role">
              <span>担当</span>
              <strong>{{ project.role }}</strong>
            </div>

            <div class="project-techs">
              <n-tag v-for="tech in project.techs" :key="tech" round size="small">
                {{ tech }}
              </n-tag>
            </div>

            <ul class="project-highlights">
              <li v-for="highlight in project.highlights" :key="highlight">
                {{ highlight }}
              </li>
            </ul>

            <div class="project-actions">
              <n-button
                v-if="project.demoUrl"
                tag="a"
                :href="project.demoUrl"
                target="_blank"
                type="primary"
                size="small"
                round
              >
                Demo
              </n-button>

              <n-button
                v-if="project.githubUrl"
                tag="a"
                :href="project.githubUrl"
                target="_blank"
                size="small"
                round
              >
                GitHub
              </n-button>

              <n-button
                v-if="project.detailUrl"
                tag="a"
                :href="project.detailUrl"
                target="_blank"
                quaternary
                size="small"
                round
              >
                Detail
              </n-button>
            </div>
          </div>
        </n-card>
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
    label: 'Web App',
    value: 'web-app',
  },
  {
    label: 'Portfolio',
    value: 'portfolio',
  },
  {
    label: 'Corporate',
    value: 'corporate',
  },
  {
    label: 'UI/UX',
    value: 'uiux',
  },
  {
    label: 'Team',
    value: 'team',
  },
]

const projects = [
  {
    id: 1,
    title: 'Personal Portfolio',
    category: 'portfolio',
    period: '2024.01 - 2024.04',
    role: '企画 / UIデザイン / フロントエンド実装',
    description:
      '自身の経歴、制作物、スキルを紹介するためのポートフォリオサイトです。テーマ切り替え、スクロールアニメーション、レスポンシブ対応にこだわりました。',
    techs: ['Vue 3', 'Naive UI', 'Pinia', 'CSS Animation'],
    highlights: [
      'Naive UIとPiniaを使ったテーマ切り替え機能を実装',
      'Intersection Observerでスクロール連動アニメーションを実装',
      'スマートフォンでも見やすいレスポンシブデザインを設計',
    ],
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    detailUrl: '',
    featured: true,
  },
  {
    id: 2,
    title: 'Task Management App',
    category: 'web-app',
    period: '2023.08 - 2023.10',
    role: 'フロントエンド実装 / 状態管理 / UI改善',
    description:
      '日々のタスクを管理するためのWebアプリです。タスクの追加、編集、削除、ステータス変更、絞り込み機能を実装しました。',
    techs: ['Vue 3', 'Pinia', 'Naive UI', 'LocalStorage'],
    highlights: [
      'Piniaでタスク状態を一元管理',
      'LocalStorageを利用してデータを永続化',
      'ドラッグやフィルターで直感的に操作できるUIを設計',
    ],
    img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200',
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    detailUrl: '',
    featured: false,
  },
  {
    id: 3,
    title: 'Corporate Website Renewal',
    category: 'corporate',
    period: '2022.11 - 2023.02',
    role: 'コーディング / レスポンシブ対応 / パフォーマンス改善',
    description:
      '企業サイトのリニューアル案件です。既存サイトの情報設計を見直し、ブランドイメージに合わせたデザインと実装を行いました。',
    techs: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    highlights: [
      'PC、タブレット、スマートフォンに対応',
      '画像最適化により表示速度を改善',
      'コンテンツの優先順位を整理し、導線を改善',
    ],
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200',
    demoUrl: '',
    githubUrl: '',
    detailUrl: '',
    featured: false,
  },
  {
    id: 4,
    title: 'Dashboard UI',
    category: 'uiux',
    period: '2023.04 - 2023.06',
    role: 'UI設計 / コンポーネント設計 / フロントエンド実装',
    description:
      '売上やユーザー情報を可視化する管理画面UIです。複雑な情報を見やすく整理し、カード、グラフ、テーブルを組み合わせて構成しました。',
    techs: ['Vue 3', 'Naive UI', 'Chart.js', 'CSS Grid'],
    highlights: [
      '情報量の多い画面でも視認性を保つレイアウトを設計',
      'カード型UIで重要指標を分かりやすく表示',
      'コンポーネント単位で再利用しやすい構成に整理',
    ],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
    demoUrl: 'https://example.com',
    githubUrl: '',
    detailUrl: '',
    featured: false,
  },
  {
    id: 5,
    title: 'Team Development Project',
    category: 'team',
    period: '2022.05 - 2022.08',
    role: 'フロントエンド担当 / Git運用 / レビュー対応',
    description:
      '複数人で開発したWebサービスです。GitHubを使ったブランチ運用、Pull Request、コードレビューを経験しました。',
    techs: ['Vue', 'GitHub', 'REST API', 'Figma'],
    highlights: [
      'GitHub Flowを意識したチーム開発を経験',
      'API仕様を確認しながら画面側の実装を担当',
      'レビューで指摘を受けながら保守性の高いコードを意識',
    ],
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200',
    demoUrl: '',
    githubUrl: 'https://github.com',
    detailUrl: '',
    featured: false,
  },
  {
    id: 6,
    title: 'Landing Page Design',
    category: 'corporate',
    period: '2021.09 - 2021.10',
    role: 'LP設計 / コーディング / アニメーション実装',
    description:
      'サービス紹介用のランディングページです。ファーストビューの印象、CTAへの導線、スクロール時の演出を意識して制作しました。',
    techs: ['HTML', 'SCSS', 'JavaScript', 'GSAP'],
    highlights: [
      'CTAボタンまで自然に誘導する構成を設計',
      'スクロールアニメーションで印象的な体験を演出',
      'フォーム導線を分かりやすく整理',
    ],
    img: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200',
    demoUrl: 'https://example.com',
    githubUrl: '',
    detailUrl: '',
    featured: false,
  },
  {
    id: 7,
    title: 'Study Memo App',
    category: 'web-app',
    period: '2021.03 - 2021.05',
    role: '個人開発 / 設計 / 実装',
    description:
      '学習内容をメモとして記録するためのアプリです。カテゴリ分け、検索、タグ付け機能を実装し、学習ログとして使えるようにしました。',
    techs: ['Vue', 'Firebase', 'CSS', 'JavaScript'],
    highlights: [
      'Firebaseを利用してメモデータを保存',
      'タグ検索で目的のメモを探しやすく改善',
      'シンプルで継続利用しやすいUIを意識',
    ],
    img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200',
    demoUrl: '',
    githubUrl: 'https://github.com',
    detailUrl: '',
    featured: false,
  },
  {
    id: 8,
    title: 'Design System Trial',
    category: 'uiux',
    period: '2024.05 - 2024.06',
    role: 'UIルール設計 / コンポーネント整理 / ドキュメント作成',
    description:
      'デザインの一貫性を保つための小さなデザインシステムを試作しました。色、余白、ボタン、カードなどのルールを整理しました。',
    techs: ['Figma', 'Vue 3', 'Naive UI', 'Design Token'],
    highlights: [
      '色や余白のルールを定義してUIのばらつきを削減',
      '再利用しやすいコンポーネント構造を検討',
      '開発者が使いやすい命名とドキュメントを意識',
    ],
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200',
    demoUrl: '',
    githubUrl: '',
    detailUrl: '',
    featured: false,
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

const projectsThemeStyle = computed(() => {
  const primaryRgb = hexToRgb(primaryColor.value)

  if (isDarkTheme.value) {
    return {
      '--projects-primary': primaryColor.value,
      '--projects-primary-rgb': primaryRgb,
      '--projects-bg-1': '#050816',
      '--projects-bg-2': '#0f172a',
      '--projects-bg-3': '#020617',
      '--projects-card-bg': 'rgba(15, 23, 42, 0.72)',
      '--projects-card-bg-hover': 'rgba(15, 23, 42, 0.9)',
      '--projects-text': 'rgba(255, 255, 255, 0.92)',
      '--projects-muted': 'rgba(255, 255, 255, 0.66)',
      '--projects-border': 'rgba(255, 255, 255, 0.1)',
      '--projects-grid': 'rgba(255, 255, 255, 0.04)',
    }
  }

  return {
    '--projects-primary': primaryColor.value,
    '--projects-primary-rgb': primaryRgb,
    '--projects-bg-1': '#f8fbff',
    '--projects-bg-2': '#eef6ff',
    '--projects-bg-3': '#ffffff',
    '--projects-card-bg': 'rgba(255, 255, 255, 0.78)',
    '--projects-card-bg-hover': 'rgba(255, 255, 255, 0.95)',
    '--projects-text': 'rgba(15, 23, 42, 0.92)',
    '--projects-muted': 'rgba(15, 23, 42, 0.62)',
    '--projects-border': 'rgba(15, 23, 42, 0.1)',
    '--projects-grid': 'rgba(15, 23, 42, 0.055)',
  }
})

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') {
    return projects
  }

  return projects.filter((project) => project.category === selectedCategory.value)
})

const featuredProject = computed(() => {
  return filteredProjects.value.find((project) => project.featured)
})

const normalProjects = computed(() => {
  return filteredProjects.value.filter((project) => !project.featured)
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

const projectRefs = ref([])
let observer = null

const setProjectRef = (el) => {
  if (el) {
    projectRefs.value.push(el.$el || el)
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
      threshold: 0.16,
      rootMargin: '0px 0px -10% 0px',
    },
  )

  projectRefs.value.forEach((el) => {
    observer.observe(el)
  })
}

onBeforeUpdate(() => {
  projectRefs.value = []
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
.projects-section {
  position: relative;
  overflow: hidden;
  padding: 120px 24px;
  color: var(--projects-text);
  background:
    radial-gradient(circle at 10% 10%, rgb(var(--projects-primary-rgb) / 0.24), transparent 34%),
    radial-gradient(circle at 90% 24%, rgb(var(--projects-primary-rgb) / 0.16), transparent 30%),
    linear-gradient(
      135deg,
      var(--projects-bg-1) 0%,
      var(--projects-bg-2) 48%,
      var(--projects-bg-3) 100%
    );
}

.projects-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--projects-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--projects-grid) 1px, transparent 1px);
  background-size: 46px 46px;
  mask-image: linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent);
  pointer-events: none;
}

.projects-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.projects-bg::before,
.projects-bg::after {
  content: '';
  position: absolute;
  border-radius: 999px;
  background: rgb(var(--projects-primary-rgb) / 0.14);
  filter: blur(90px);
}

.projects-bg::before {
  top: 18%;
  left: -120px;
  width: 360px;
  height: 360px;
}

.projects-bg::after {
  right: -140px;
  bottom: 16%;
  width: 420px;
  height: 420px;
}

.projects-container {
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
}

.projects-header {
  max-width: 880px;
  margin: 0 auto 40px;
  text-align: center;
}

.projects-header h2 {
  margin: 24px 0 16px;
  font-size: clamp(40px, 7vw, 84px);
  line-height: 1;
  letter-spacing: 0.04em;
}

.projects-header p {
  margin: 0;
  color: var(--projects-muted);
  font-size: 16px;
  line-height: 1.9;
}

.project-filter {
  margin-bottom: 56px;
}

.featured-project {
  margin-bottom: 34px;
}

.featured-card,
.project-card {
  position: relative;
  overflow: hidden;
  border-radius: 26px;
  background: var(--projects-card-bg);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 var(--projects-border);
  backdrop-filter: blur(18px);
}

.featured-card::before,
.project-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgb(var(--projects-primary-rgb) / 0.68),
    rgb(var(--projects-primary-rgb) / 0.12),
    var(--projects-border)
  );
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  pointer-events: none;
}

.featured-card :deep(.n-card__content),
.project-card :deep(.n-card__content) {
  position: relative;
  z-index: 1;
}

.featured-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: 34px;
  align-items: center;
}

.featured-image-wrap,
.project-image-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  background: rgb(var(--projects-primary-rgb) / 0.08);
}

.featured-image-wrap {
  min-height: 390px;
}

.project-image-wrap {
  height: 220px;
  margin-bottom: 24px;
}

.featured-image,
.project-image {
  width: 100%;
  height: 100%;
}

.featured-image-wrap :deep(img),
.project-image-wrap :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.08);
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.featured-content,
.project-body {
  min-width: 0;
}

.project-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  color: var(--projects-muted);
  font-size: 13px;
}

.featured-content h3,
.project-body h3 {
  margin: 18px 0 12px;
  color: var(--projects-text);
  line-height: 1.25;
  letter-spacing: 0.03em;
}

.featured-content h3 {
  font-size: clamp(30px, 4vw, 52px);
}

.project-body h3 {
  font-size: 25px;
}

.project-description {
  margin: 0;
  color: var(--projects-muted);
  font-size: 15px;
  line-height: 1.9;
}

.project-role {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 20px;
  padding: 14px 16px;
  border: 1px solid var(--projects-border);
  border-radius: 16px;
  background: rgb(var(--projects-primary-rgb) / 0.06);
}

.project-role span {
  color: var(--projects-muted);
  font-size: 12px;
}

.project-role strong {
  color: var(--projects-text);
  font-size: 14px;
  line-height: 1.5;
}

.project-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.project-highlights {
  display: grid;
  gap: 8px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.project-highlights li {
  position: relative;
  padding-left: 18px;
  color: var(--projects-muted);
  font-size: 14px;
  line-height: 1.7;
}

.project-highlights li::before {
  content: '';
  position: absolute;
  top: 0.7em;
  left: 0;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--projects-primary);
  box-shadow: 0 0 16px rgb(var(--projects-primary-rgb) / 0.7);
}

.project-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
}

.project-card {
  transition:
    background 0.35s ease,
    transform 0.35s ease,
    box-shadow 0.35s ease;
}

.project-card:hover {
  background: var(--projects-card-bg-hover);
  transform: translateY(-6px);
  box-shadow:
    0 30px 90px rgba(0, 0, 0, 0.28),
    0 0 36px rgb(var(--projects-primary-rgb) / 0.12);
}

.project-card:hover .project-image-wrap :deep(img),
.featured-card:hover .featured-image-wrap :deep(img) {
  transform: scale(1);
}

.project-reveal {
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

.project-reveal.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

@media (max-width: 900px) {
  .featured-grid {
    grid-template-columns: 1fr;
  }

  .featured-image-wrap {
    min-height: 280px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .projects-section {
    padding: 88px 18px;
  }

  .projects-header {
    text-align: left;
  }

  .projects-header h2 {
    font-size: clamp(38px, 12vw, 62px);
  }

  .project-filter :deep(.n-space) {
    justify-content: flex-start !important;
  }

  .featured-image-wrap {
    min-height: 220px;
  }

  .project-image-wrap {
    height: 190px;
  }

  .featured-card,
  .project-card {
    border-radius: 22px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-reveal,
  .project-card,
  .featured-image-wrap :deep(img),
  .project-image-wrap :deep(img) {
    transition: none;
  }

  .project-reveal {
    opacity: 1;
    transform: none;
    filter: none;
  }
}
</style>
