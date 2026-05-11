<template>
  <section
    class="history-section"
    :class="{
      'is-dark': isDarkTheme,
      'is-light': !isDarkTheme,
    }"
    :style="historyThemeStyle"
  >
    <div class="history-header">
      <n-tag round type="primary" size="large"> My History </n-tag>

      <h2>
        <n-gradient-text type="primary"> 私のこれまで </n-gradient-text>
      </h2>

      <p>スクロールしながら、私の人生の出来事を時系列で紹介します。</p>
    </div>

    <div class="timeline">
      <div class="timeline-line"></div>

      <article
        v-for="(item, index) in histories"
        :key="`${item.date}-${index}`"
        :ref="setItemRef"
        class="history-item"
        :class="{ reverse: index % 2 === 1 }"
        :style="{ '--delay': `${index * 90}ms` }"
      >
        <div class="timeline-dot">
          <span></span>
        </div>

        <n-card class="history-card" :bordered="false" embedded>
          <div class="card-inner">
            <div v-if="item.img" class="image-wrap">
              <n-image :src="item.img" :alt="item.title" object-fit="cover" class="history-image" />
            </div>

            <div class="text-wrap">
              <n-tag round type="primary">
                {{ formatDate(item.date) }}
              </n-tag>

              <h3>{{ item.title }}</h3>

              <p>
                {{ item.description }}
              </p>
            </div>
          </div>
        </n-card>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount, onBeforeUpdate } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { colorThemeMap } from '@/theme/colorThemes'

const userStore = useUserStore()

const histories = [
  {
    date: '1995-08-12',
    title: 'おギャー',
    description:
      '私、宮田太郎は1995年8月12日にこの世に生を受けました。両親は私をとても大切に育ててくれました。',
    img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=1200',
  },
  {
    date: '1998-04-10',
    title: '好奇心いっぱいの幼少期',
    description:
      '家の中のものを分解したり、外で虫を追いかけたり、気になるものには何でも手を伸ばす子どもでした。この頃から「なぜ？」と考えることが好きでした。',
    img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200',
  },
  {
    date: '2001-04-01',
    title: '小学校入学',
    description:
      '新しいランドセルを背負って、小学校生活が始まりました。友達と遊ぶことが大好きで、毎日が新しい発見の連続でした。',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200',
  },
  {
    date: '2003-07-20',
    title: '初めての自由研究',
    description:
      '夏休みの自由研究で、身近な植物の成長を観察しました。毎日記録をつけることで、小さな変化を見つける楽しさを知りました。',
    img: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200',
  },
  {
    date: '2005-10-15',
    title: 'ものづくりに夢中になる',
    description:
      '図工や工作が好きで、段ボールや紙を使って秘密基地やロボットのようなものを作っていました。頭の中にあるものを形にする楽しさを覚えました。',
    img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200',
  },
  {
    date: '2008-04-01',
    title: '中学校入学',
    description:
      '環境が大きく変わり、部活動や勉強、人間関係など新しい経験が一気に増えました。失敗しながらも、継続することの大切さを学びました。',
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200',
  },
  {
    date: '2009-06-12',
    title: '初めての挫折',
    description:
      '部活動や勉強で思うような結果が出ず、悔しい思いをしました。しかし、その経験が「できない理由を探すより、できる方法を考える」姿勢につながりました。',
    img: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1200',
  },
  {
    date: '2011-03-15',
    title: '卒業と新しい一歩',
    description:
      '中学校を卒業し、友人や先生との別れを経験しました。慣れ親しんだ場所を離れる寂しさと同時に、新しい環境への期待も感じていました。',
    img: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200',
  },
  {
    date: '2011-04-01',
    title: '高校入学',
    description:
      '高校生活が始まり、より広い世界に触れるようになりました。自分の得意なこと、苦手なこと、将来やりたいことについて少しずつ考えるようになりました。',
    img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200',
  },
  {
    date: '2012-09-01',
    title: 'パソコンに興味を持つ',
    description:
      '授業や趣味を通じてパソコンを触る機会が増えました。インターネットで調べれば何でも学べることに驚き、情報技術の面白さを感じ始めました。',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200',
  },
  {
    date: '2013-11-20',
    title: 'Webサイトに感動する',
    description:
      'おしゃれなWebサイトや便利なサービスを見て、「自分もこんなものを作れるようになりたい」と思うようになりました。これがWeb制作への最初の興味でした。',
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200',
  },
  {
    date: '2014-03-15',
    title: '高校卒業',
    description:
      '高校生活を通じて、多くの友人や経験に恵まれました。将来に対する不安もありましたが、新しい学びへの期待を胸に次のステージへ進みました。',
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200',
  },
  {
    date: '2014-04-01',
    title: 'プログラミングとの出会い',
    description:
      '大学で初めてプログラミングに触れ、ものづくりの楽しさを知りました。最初はエラーばかりでしたが、動いた瞬間の感動が忘れられません。',
    img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200',
  },
  {
    date: '2014-08-10',
    title: '初めてのHello World',
    description:
      '画面に「Hello World」と表示されただけなのに、自分の書いたコードが動いたことに大きな感動を覚えました。この小さな成功体験が学習の原動力になりました。',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200',
  },
  {
    date: '2015-02-20',
    title: 'HTMLとCSSを学び始める',
    description:
      'Webページの構造やデザインを自分で作れることに魅力を感じ、HTMLとCSSを学び始めました。見た目がすぐに変わる楽しさに夢中になりました。',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200',
  },
  {
    date: '2015-09-12',
    title: '初めての個人サイト制作',
    description:
      '自己紹介ページのような簡単なWebサイトを作りました。完成度は高くありませんでしたが、公開できたことが大きな自信になりました。',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
  },
  {
    date: '2016-04-05',
    title: 'JavaScriptに挑戦',
    description:
      'Webページに動きをつけるため、JavaScriptを学び始めました。最初は文法に苦戦しましたが、クリックやスクロールで画面が変化する面白さに引き込まれました。',
    img: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=1200',
  },
  {
    date: '2016-12-18',
    title: '初めてのチーム制作',
    description:
      '友人と一緒に小さなアプリを制作しました。自分一人で作る時とは違い、役割分担やコミュニケーションの重要性を学びました。',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200',
  },
  {
    date: '2017-05-10',
    title: 'GitとGitHubを使い始める',
    description:
      'コードの履歴管理や共同開発のためにGitとGitHubを学びました。最初はコマンドに戸惑いましたが、開発に欠かせない道具だと実感しました。',
    img: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200',
  },
  {
    date: '2017-10-01',
    title: 'デザインにも興味を持つ',
    description:
      'ただ動くだけではなく、使いやすく美しい画面を作りたいと思うようになりました。配色、余白、フォント、導線などUIデザインの基本を学び始めました。',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200',
  },
  {
    date: '2018-03-20',
    title: '大学卒業',
    description:
      '学業や制作活動を通じて、技術だけでなく課題解決の考え方を学びました。これからは実社会で価値を生み出せる人になりたいと思いました。',
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200',
  },
  {
    date: '2018-04-01',
    title: '社会人としてのスタート',
    description:
      '新社会人として働き始めました。学生時代とは違う責任感やスピード感に戸惑いながらも、日々新しいことを吸収していきました。',
    img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200',
  },
  {
    date: '2018-08-25',
    title: '実務の厳しさを知る',
    description:
      '納期、品質、チーム連携、ユーザー視点など、実務ならではの難しさを経験しました。完成させるだけでなく、使われ続けるものを作る大切さを学びました。',
    img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200',
  },
  {
    date: '2019-01-15',
    title: 'フロントエンドを本格的に学ぶ',
    description:
      'HTML、CSS、JavaScriptを改めて基礎から学び直し、ブラウザの仕組みやレスポンシブ対応、アクセシビリティにも関心を持つようになりました。',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200',
  },
  {
    date: '2019-07-01',
    title: 'Vue.jsとの出会い',
    description:
      'Vue.jsを使い始め、コンポーネントベースの開発に魅力を感じました。画面を部品として整理できることで、開発がより楽しく効率的になりました。',
    img: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200',
  },
  {
    date: '2020-02-10',
    title: 'リモートワークを経験',
    description:
      '働き方が大きく変わり、オンラインでのコミュニケーションや自己管理の重要性を実感しました。場所に縛られず成果を出す働き方を考えるきっかけになりました。',
    img: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=1200',
  },
  {
    date: '2020-09-18',
    title: '個人開発に挑戦',
    description:
      '業務外の時間を使って、自分が欲しいと思う小さなWebアプリを作り始めました。企画、設計、実装、改善まで一通り経験することで視野が広がりました。',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
  },
  {
    date: '2021-03-05',
    title: 'UIコンポーネントライブラリを活用',
    description:
      'Naive UIなどのUIライブラリを使うことで、品質の高い画面を効率よく作れることを知りました。同時に、ライブラリに頼りすぎずカスタマイズする力も大切だと感じました。',
    img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200',
  },
  {
    date: '2021-10-12',
    title: '状態管理を学ぶ',
    description:
      'PiniaやVuexなどの状態管理を学び、アプリケーション全体でデータを扱う設計について理解を深めました。画面が増えるほど設計の重要性を実感しました。',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
  },
  {
    date: '2022-04-20',
    title: 'バックエンドにも関心を持つ',
    description:
      'フロントエンドだけでなく、APIやデータベース、認証などにも興味を持つようになりました。サービス全体を理解することで、より良い実装判断ができるようになりました。',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
  },
  {
    date: '2022-11-08',
    title: '制作物を人に見てもらう',
    description:
      '作ったものを友人や知人に見てもらい、率直なフィードバックをもらいました。自分では気づけない使いづらさや改善点を知る貴重な経験になりました。',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200',
  },
  {
    date: '2023-02-14',
    title: '学びを発信し始める',
    description:
      '学んだことを記事やメモとしてまとめるようになりました。発信することで理解が深まり、同じように学ぶ人の役に立てる喜びも感じました。',
    img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200',
  },
  {
    date: '2023-08-01',
    title: 'より良いUXを意識する',
    description:
      '見た目の美しさだけでなく、使う人が迷わず気持ちよく操作できる体験を意識するようになりました。細かなアニメーションや余白の調整にもこだわるようになりました。',
    img: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200',
  },
  {
    date: '2024-01-01',
    title: 'ポートフォリオ制作',
    description:
      'これまでの経験や制作物をまとめるために、自分らしいポートフォリオサイトを作り始めました。デザイン、アニメーション、テーマ切り替えにもこだわりました。',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
  },
  {
    date: '2024-04-10',
    title: 'テーマ切り替え機能を実装',
    description:
      'ユーザーが好みに合わせてカラーを選べるよう、Naive UIとPiniaを使ってテーマ切り替え機能を実装しました。UI全体に統一感を出すことを意識しました。',
    img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200',
  },
  {
    date: '2024-08-12',
    title: '自分の歩みを振り返る',
    description:
      '誕生から現在までの出来事を振り返り、自分がどんな経験から今の価値観を持つようになったのかを整理しました。過去を見つめることで、未来の方向性も見えてきました。',
    img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200',
  },
  {
    date: '2025-01-05',
    title: '次のステージへ',
    description:
      'これまで培ってきた技術と経験を活かし、より多くの人に価値を届けられるエンジニアを目指しています。挑戦を楽しみながら、成長を続けていきます。',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200',
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

const historyThemeStyle = computed(() => {
  const primaryRgb = hexToRgb(primaryColor.value)

  if (isDarkTheme.value) {
    return {
      '--history-primary': primaryColor.value,
      '--history-primary-rgb': primaryRgb,
      '--history-bg-1': '#080a16',
      '--history-bg-2': '#111827',
      '--history-bg-3': '#020617',
      '--history-card-bg': 'rgba(15, 23, 42, 0.72)',
      '--history-text': 'rgba(255, 255, 255, 0.92)',
      '--history-muted': 'rgba(255, 255, 255, 0.68)',
      '--history-grid': 'rgba(255, 255, 255, 0.04)',
      '--history-card-border': 'rgba(255, 255, 255, 0.1)',
    }
  }

  return {
    '--history-primary': primaryColor.value,
    '--history-primary-rgb': primaryRgb,
    '--history-bg-1': '#f8fbff',
    '--history-bg-2': '#eef6ff',
    '--history-bg-3': '#ffffff',
    '--history-card-bg': 'rgba(255, 255, 255, 0.78)',
    '--history-text': 'rgba(15, 23, 42, 0.92)',
    '--history-muted': 'rgba(15, 23, 42, 0.64)',
    '--history-grid': 'rgba(15, 23, 42, 0.055)',
    '--history-card-border': 'rgba(15, 23, 42, 0.08)',
  }
})

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

const itemRefs = ref([])
let observer = null

const setItemRef = (el) => {
  if (el) {
    itemRefs.value.push(el)
  }
}

onBeforeUpdate(() => {
  itemRefs.value = []
})

onMounted(() => {
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
      threshold: 0.25,
      rootMargin: '0px 0px -12% 0px',
    },
  )

  itemRefs.value.forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)

  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
</script>

<style scoped>
.history-section {
  position: relative;
  overflow: hidden;
  padding: 120px 24px;
  color: var(--history-text);
  background:
    radial-gradient(circle at top left, rgb(var(--history-primary-rgb) / 0.28), transparent 34%),
    radial-gradient(circle at bottom right, rgb(var(--history-primary-rgb) / 0.2), transparent 38%),
    linear-gradient(
      135deg,
      var(--history-bg-1) 0%,
      var(--history-bg-2) 48%,
      var(--history-bg-3) 100%
    );
}

.history-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--history-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--history-grid) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent);
  pointer-events: none;
}

.history-section::after {
  content: '';
  position: absolute;
  top: 10%;
  left: 50%;
  width: 420px;
  height: 420px;
  border-radius: 999px;
  background: rgb(var(--history-primary-rgb) / 0.12);
  filter: blur(100px);
  transform: translateX(-50%);
  pointer-events: none;
}

.history-header {
  position: relative;
  z-index: 1;
  max-width: 860px;
  margin: 0 auto 96px;
  text-align: center;
}

.history-header h2 {
  margin: 24px 0 16px;
  font-size: clamp(40px, 7vw, 88px);
  line-height: 1;
  letter-spacing: 0.04em;
}

.history-header p {
  margin: 0;
  color: var(--history-muted);
  font-size: 16px;
  line-height: 1.9;
}

.timeline {
  position: relative;
  z-index: 1;
  max-width: 1120px;
  margin: 0 auto;
}

.timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(
    to bottom,
    transparent,
    rgb(var(--history-primary-rgb) / 0.75),
    rgb(var(--history-primary-rgb) / 0.35),
    transparent
  );
}

.history-item {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 88px 1fr;
  align-items: center;
  margin-bottom: 96px;
}

.history-item:last-child {
  margin-bottom: 0;
}

.timeline-dot {
  grid-column: 2;
  grid-row: 1;
  display: grid;
  place-items: center;
  opacity: 0;
  transform: scale(0.4);
  transition:
    opacity 0.7s ease,
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--delay);
}

.timeline-dot span {
  position: relative;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: var(--history-primary);
  box-shadow:
    0 0 0 8px rgb(var(--history-primary-rgb) / 0.16),
    0 0 34px rgb(var(--history-primary-rgb) / 0.9);
}

.timeline-dot span::after {
  content: '';
  position: absolute;
  inset: -12px;
  border-radius: inherit;
  border: 1px solid rgb(var(--history-primary-rgb) / 0.45);
  animation: pulse 2.4s infinite;
}

.history-card {
  grid-column: 1;
  grid-row: 1;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(56px) scale(0.96);
  filter: blur(10px);
  transition:
    opacity 0.8s ease,
    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.8s ease;
  transition-delay: var(--delay);
  background: var(--history-card-bg);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 var(--history-card-border);
  backdrop-filter: blur(18px);
}

.history-item.reverse .history-card {
  grid-column: 3;
}

.history-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgb(var(--history-primary-rgb) / 0.75),
    rgb(var(--history-primary-rgb) / 0.18),
    var(--history-card-border)
  );
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  pointer-events: none;
}

.card-inner {
  display: grid;
  gap: 24px;
}

.image-wrap {
  overflow: hidden;
  height: 240px;
  border-radius: 20px;
}

.history-image {
  width: 100%;
  height: 100%;
}

.image-wrap :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.08);
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.text-wrap {
  padding: 4px 4px 8px;
}

.text-wrap h3 {
  margin: 18px 0 12px;
  color: var(--history-text);
  font-size: clamp(24px, 3vw, 36px);
  line-height: 1.25;
  letter-spacing: 0.04em;
}

.text-wrap p {
  margin: 0;
  color: var(--history-muted);
  font-size: 15px;
  line-height: 2;
}

.history-item.is-visible .history-card {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.history-item.is-visible .timeline-dot {
  opacity: 1;
  transform: scale(1);
}

.history-item.is-visible .image-wrap :deep(img) {
  transform: scale(1);
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.7;
  }

  100% {
    transform: scale(1.45);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .history-section {
    padding: 88px 18px;
  }

  .history-header {
    margin-bottom: 64px;
    text-align: left;
  }

  .timeline-line {
    left: 21px;
  }

  .history-item,
  .history-item.reverse {
    grid-template-columns: 44px 1fr;
    gap: 0;
    margin-bottom: 56px;
  }

  .timeline-dot {
    grid-column: 1;
  }

  .history-card,
  .history-item.reverse .history-card {
    grid-column: 2;
  }

  .image-wrap {
    height: 190px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .history-card,
  .timeline-dot,
  .image-wrap :deep(img),
  .timeline-dot span::after {
    animation: none;
    transition: none;
  }

  .history-card,
  .timeline-dot {
    opacity: 1;
    transform: none;
    filter: none;
  }
}
</style>
