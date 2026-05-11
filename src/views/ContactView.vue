<template>
  <section class="contact-section app-page" :style="pageThemeStyle">
    <div class="contact-container app-container">
      <div class="page-header">
        <n-tag round type="primary" size="large"> Contact </n-tag>

        <h2>
          <n-gradient-text type="primary"> お問い合わせ </n-gradient-text>
        </h2>

        <p>制作のご相談、採用について、ポートフォリオの感想など、お気軽にご連絡ください。</p>
      </div>

      <n-grid responsive="screen" cols="1 m:2" :x-gap="28" :y-gap="28">
        <n-gi>
          <n-card class="info-card reveal" :bordered="false">
            <n-tag round type="primary"> Message </n-tag>

            <h3>一緒に、いいものを作りましょう。</h3>

            <p>
              フロントエンド開発、Vueを使ったWebアプリ制作、UI改善などに興味があります。
              小さな相談でも歓迎です。
            </p>

            <div class="mail-box">
              <span>Email</span>
              <strong>{{ contactEmail }}</strong>

              <n-space :wrap="true" class="mail-actions">
                <n-button type="primary" round @click="copyEmail"> メールをコピー </n-button>

                <n-button round tag="a" :href="`mailto:${contactEmail}`"> メールを開く </n-button>
              </n-space>
            </div>
          </n-card>

          <n-grid responsive="screen" cols="1 s:2" :x-gap="16" :y-gap="16" class="links-grid">
            <n-gi v-for="link in contactLinks" :key="link.label">
              <a class="link-card" :href="link.url" target="_blank">
                <span>{{ link.icon }}</span>
                <div>
                  <strong>{{ link.label }}</strong>
                  <small>{{ link.text }}</small>
                </div>
              </a>
            </n-gi>
          </n-grid>
        </n-gi>

        <n-gi>
          <n-card class="form-card reveal" :bordered="false">
            <h3>ご連絡フォーム</h3>

            <n-form ref="formRef" :model="formValue" :rules="rules" label-placement="top">
              <n-form-item label="お名前" path="name">
                <n-input v-model:value="formValue.name" placeholder="例：宮田 太郎" size="large" />
              </n-form-item>

              <n-form-item label="メールアドレス" path="email">
                <n-input
                  v-model:value="formValue.email"
                  placeholder="example@example.com"
                  size="large"
                />
              </n-form-item>

              <n-form-item label="件名" path="subject">
                <n-input
                  v-model:value="formValue.subject"
                  placeholder="お問い合わせの件名"
                  size="large"
                />
              </n-form-item>

              <n-form-item label="お問い合わせ内容" path="message">
                <n-input
                  v-model:value="formValue.message"
                  type="textarea"
                  placeholder="ご相談内容を入力してください"
                  :autosize="{ minRows: 6, maxRows: 10 }"
                />
              </n-form-item>

              <n-button
                type="primary"
                size="large"
                round
                block
                :loading="sending"
                @click="handleSubmit"
              >
                送信する
              </n-button>
            </n-form>
          </n-card>
        </n-gi>
      </n-grid>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useUserStore } from '@/stores/userStore'
import { colorThemeMap } from '@/theme/colorThemes'

const userStore = useUserStore()
const message = useMessage()

const contactEmail = 'taro.miyata@example.com'

const contactLinks = [
  {
    icon: '🐙',
    label: 'GitHub',
    text: 'コードや個人開発',
    url: 'https://github.com',
  },
  {
    icon: '𝕏',
    label: 'X',
    text: '日々の学び',
    url: 'https://x.com',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    text: '職務経歴',
    url: 'https://linkedin.com',
  },
  {
    icon: '📝',
    label: 'Blog',
    text: '技術記事',
    url: 'https://example.com',
  },
]

const formRef = ref(null)
const sending = ref(false)

const formValue = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const rules = {
  name: [
    {
      required: true,
      message: 'お名前を入力してください',
      trigger: ['input', 'blur'],
    },
  ],
  email: [
    {
      required: true,
      message: 'メールアドレスを入力してください',
      trigger: ['input', 'blur'],
    },
    {
      type: 'email',
      message: '正しいメールアドレスを入力してください',
      trigger: ['input', 'blur'],
    },
  ],
  subject: [
    {
      required: true,
      message: '件名を入力してください',
      trigger: ['input', 'blur'],
    },
  ],
  message: [
    {
      required: true,
      message: 'お問い合わせ内容を入力してください',
      trigger: ['input', 'blur'],
    },
  ],
}

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()

    sending.value = true

    const body = `
お名前：${formValue.name}
メールアドレス：${formValue.email}

お問い合わせ内容：
${formValue.message}
`.trim()

    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(
      formValue.subject,
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailtoUrl

    message.success('メールアプリを起動します')

    setTimeout(() => {
      sending.value = false
    }, 800)
  } catch {
    message.error('入力内容を確認してください')
  }
}

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(contactEmail)
    message.success('メールアドレスをコピーしました')
  } catch {
    message.error('コピーに失敗しました')
  }
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
.contact-section {
  width: 100vw;
  padding: var(--app-section-y) var(--app-page-x);
  color: var(--page-text);
}

.contact-container {
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

.info-card,
.form-card,
.link-card {
  border-radius: 24px;
  background: var(--page-card);
  border: 1px solid var(--page-border);
  backdrop-filter: blur(16px);
}

.info-card h3,
.form-card h3 {
  margin: 20px 0 14px;
  color: var(--page-text);
  font-size: clamp(28px, 4vw, 44px);
}

.info-card p {
  color: var(--page-muted);
  line-height: 1.9;
}

.mail-box {
  margin-top: 28px;
  padding: 18px;
  border-radius: 18px;
  background: rgb(var(--page-primary-rgb) / 0.08);
  border: 1px solid var(--page-border);
}

.mail-box span {
  display: block;
  color: var(--page-muted);
}

.mail-box strong {
  display: block;
  margin-top: 8px;
  color: var(--page-text);
  word-break: break-all;
}

.mail-actions {
  margin-top: 16px;
}

.links-grid {
  margin-top: 16px;
}

.link-card {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 18px;
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.3s ease,
    background 0.3s ease;
}

.link-card:hover {
  transform: translateY(-6px);
  background: var(--page-card-hover);
}

.link-card > span {
  font-size: 26px;
}

.link-card strong {
  display: block;
  color: var(--page-text);
}

.link-card small {
  color: var(--page-muted);
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
