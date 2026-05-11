<template>
  <section class="history-section app-page" :style="pageThemeStyle">
    <div class="history-container app-container">
      <div class="page-header">
        <n-tag round type="primary" size="large"> My History </n-tag>

        <h2>
          <n-gradient-text type="primary"> 私のこれまで </n-gradient-text>
        </h2>

        <p>スクロールしながら、私の人生の出来事を時系列で紹介します。</p>
      </div>

      <n-timeline class="history-timeline">
        <n-timeline-item
          v-for="(item, index) in histories"
          :key="`${item.date}-${index}`"
          type="success"
          :title="item.title"
          :time="formatDate(item.date)"
          class="history-item reveal"
          :style="{ '--delay': `${index * 70}ms` }"
        >
          <n-card class="history-card" :bordered="false">
            <n-grid responsive="screen" cols="1 m:2" :x-gap="24" :y-gap="20" item-responsive>
              <n-gi>
                <div class="image-wrap">
                  <n-image
                    :src="item.img"
                    :alt="item.title"
                    object-fit="cover"
                    class="history-image"
                  />
                </div>
              </n-gi>

              <n-gi>
                <div class="history-text">
                  <n-tag round type="primary" size="small">
                    {{ formatDate(item.date) }}
                  </n-tag>

                  <h3>{{ item.title }}</h3>

                  <p>{{ item.description }}</p>
                </div>
              </n-gi>
            </n-grid>
          </n-card>
        </n-timeline-item>
      </n-timeline>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { colorThemeMap } from '@/theme/colorThemes'

const userStore = useUserStore()

const histories = [
  {
    date: '1995-08-12',
    title: 'おギャーa',
    description:
      '私、宮田太郎は1995年8月12日にこの世に生を受けました。両親は私をとても大切に育ててくれました。',
    img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200',
  },
  {
    date: '2001-04-01',
    title: '小学校入学',
    description:
      '新しいランドセルを背負って、小学校生活が始まりました。友達と遊ぶことが大好きで、毎日が新しい発見の連続でした。',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200',
  },
  {
    date: '2011-04-01',
    title: '高校入学',
    description: '高校生活が始まり、自分の得意なことや将来について少しずつ考えるようになりました。',
    img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200',
  },
  {
    date: '2014-04-01',
    title: 'プログラミングとの出会い',
    description:
      '大学で初めてプログラミングに触れ、ものづくりの楽しさを知りました。エラーばかりでしたが、動いた瞬間の感動が忘れられません。',
    img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200',
  },
  {
    date: '2016-04-05',
    title: 'JavaScriptに挑戦',
    description:
      'Webページに動きをつけるため、JavaScriptを学び始めました。クリックやスクロールで画面が変化する面白さに引き込まれました。',
    img: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=1200',
  },
  {
    date: '2019-07-01',
    title: 'Vue.jsとの出会い',
    description:
      'Vue.jsを使い始め、コンポーネントベースの開発に魅力を感じました。開発がより楽しく効率的になりました。',
    img: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200',
  },
  {
    date: '2021-10-12',
    title: '状態管理を学ぶ',
    description:
      'Piniaなどの状態管理を学び、アプリ全体でデータを扱う設計について理解を深めました。',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
  },
  {
    date: '2024-01-01',
    title: 'ポートフォリオ制作',
    description:
      'これまでの経験や制作物をまとめるために、自分らしいポートフォリオサイトを作り始めました。',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
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

const pageThemeStyle = computed(() => {
  const rgb = hexToRgb(primaryColor.value)

  return {
    '--page-primary': primaryColor.value,
    '--page-primary-rgb': rgb,
    '--page-bg': isDarkTheme.value ? '#050816' : '#f8fbff',
    '--page-bg-2': isDarkTheme.value ? '#0f172a' : '#eef6ff',
    '--page-card': isDarkTheme.value ? 'rgba(15, 23, 42, 0.76)' : 'rgba(255,255,255,0.82)',
    '--page-text': isDarkTheme.value ? 'rgba(255,255,255,0.92)' : 'rgba(15,23,42,0.92)',
    '--page-muted': isDarkTheme.value ? 'rgba(255,255,255,0.66)' : 'rgba(15,23,42,0.62)',
    '--page-border': isDarkTheme.value ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.1)',
  }
})

const formatDate = (dateString) => {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString))
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
.history-section {
  width: 100%;
  padding: var(--app-section-y) var(--app-page-x);
  color: var(--page-text);
}

.history-container {
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

.history-timeline {
  width: 100%;
}

.history-card {
  border-radius: 24px;
  background: var(--page-card);
  border: 1px solid var(--page-border);
  backdrop-filter: blur(16px);
}

.image-wrap {
  overflow: hidden;
  height: clamp(180px, 30vw, 280px);
  border-radius: 18px;
}

.history-image {
  width: 100%;
  height: 100%;
}

.image-wrap :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.history-text h3 {
  margin: 18px 0 12px;
  color: var(--page-text);
  font-size: clamp(24px, 3vw, 36px);
}

.history-text p {
  margin: 0;
  color: var(--page-muted);
  line-height: 1.9;
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
