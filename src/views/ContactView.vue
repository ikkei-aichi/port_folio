<template>
  <section
    class="contact-section"
    :class="{
      'is-dark': isDarkTheme,
      'is-light': !isDarkTheme,
    }"
    :style="contactThemeStyle"
  >
    <div class="contact-bg"></div>

    <div class="contact-container">
      <div class="contact-header contact-reveal" :ref="setContactRef">
        <n-tag round type="primary" size="large"> Contact </n-tag>

        <h2>
          <n-gradient-text type="primary"> お問い合わせ </n-gradient-text>
        </h2>

        <p>制作のご相談、採用について、ポートフォリオの感想など、 お気軽にご連絡ください。</p>
      </div>

      <div class="contact-layout">
        <div class="contact-info">
          <n-card class="contact-card contact-reveal" :bordered="false" :ref="setContactRef">
            <div class="info-label">Message</div>

            <h3>一緒に、いいものを作りましょう。</h3>

            <p>
              フロントエンド開発、Vueを使ったWebアプリ制作、
              UI改善、ポートフォリオ制作などに興味があります。 小さな相談でも歓迎です。
            </p>

            <div class="contact-mail-box">
              <span>Email</span>

              <strong>{{ contactEmail }}</strong>

              <div class="mail-actions">
                <n-button type="primary" round @click="copyEmail"> メールをコピー </n-button>

                <n-button round tag="a" :href="`mailto:${contactEmail}`"> メールを開く </n-button>
              </div>
            </div>
          </n-card>

          <div class="contact-links">
            <n-card
              v-for="(link, index) in contactLinks"
              :key="link.label"
              class="link-card contact-reveal"
              :bordered="false"
              :ref="setContactRef"
              :style="{ '--delay': `${index * 70}ms` }"
              tag="a"
              :href="link.url"
              target="_blank"
            >
              <div class="link-icon">
                {{ link.icon }}
              </div>

              <div>
                <strong>{{ link.label }}</strong>
                <span>{{ link.text }}</span>
              </div>
            </n-card>
          </div>
        </div>

        <n-card class="form-card contact-reveal" :bordered="false" :ref="setContactRef">
          <div class="form-title">
            <span>Send Message</span>
            <strong>ご連絡フォーム</strong>
          </div>

          <n-form ref="formRef" :model="formValue" :rules="rules" label-placement="top">
            <n-form-item label="お名前" path="name">
              <n-input
                v-model:value="formValue.name"
                placeholder="例：宮田 太郎"
                size="large"
                round
              />
            </n-form-item>

            <n-form-item label="メールアドレス" path="email">
              <n-input
                v-model:value="formValue.email"
                placeholder="example@example.com"
                size="large"
                round
              />
            </n-form-item>

            <n-form-item label="件名" path="subject">
              <n-input
                v-model:value="formValue.subject"
                placeholder="お問い合わせの件名"
                size="large"
                round
              />
            </n-form-item>

            <n-form-item label="お問い合わせ内容" path="message">
              <n-input
                v-model:value="formValue.message"
                type="textarea"
                placeholder="ご相談内容を入力してください"
                :autosize="{
                  minRows: 6,
                  maxRows: 10,
                }"
              />
            </n-form-item>

            <div class="form-actions">
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

              <p>現在はメールアプリを起動して送信する形式です。</p>
            </div>
          </n-form>
        </n-card>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, reactive, onMounted, onBeforeUnmount, onBeforeUpdate } from 'vue'
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
    text: 'コードや個人開発はこちら',
    url: 'https://github.com',
  },
  {
    icon: '𝕏',
    label: 'X / Twitter',
    text: '日々の学びや制作メモ',
    url: 'https://x.com',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    text: '職務経歴やつながり',
    url: 'https://linkedin.com',
  },
  {
    icon: '📝',
    label: 'Blog',
    text: '技術記事や制作記録',
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
  return colorThemeMap[userStore.colorTheme] || colorThemeMap['dark-blue']
})

const primaryColor = computed(() => {
  return currentTheme.value.overrides.common.primaryColor
})

const isDarkTheme = computed(() => {
  return Boolean(currentTheme.value.naiveTheme)
})

const contactThemeStyle = computed(() => {
  const primaryRgb = hexToRgb(primaryColor.value)

  if (isDarkTheme.value) {
    return {
      '--contact-primary': primaryColor.value,
      '--contact-primary-rgb': primaryRgb,
      '--contact-bg-1': '#050816',
      '--contact-bg-2': '#0f172a',
      '--contact-bg-3': '#020617',
      '--contact-card-bg': 'rgba(15, 23, 42, 0.74)',
      '--contact-card-bg-hover': 'rgba(15, 23, 42, 0.92)',
      '--contact-text': 'rgba(255, 255, 255, 0.92)',
      '--contact-muted': 'rgba(255, 255, 255, 0.66)',
      '--contact-border': 'rgba(255, 255, 255, 0.1)',
      '--contact-grid': 'rgba(255, 255, 255, 0.04)',
    }
  }

  return {
    '--contact-primary': primaryColor.value,
    '--contact-primary-rgb': primaryRgb,
    '--contact-bg-1': '#f8fbff',
    '--contact-bg-2': '#eef6ff',
    '--contact-bg-3': '#ffffff',
    '--contact-card-bg': 'rgba(255, 255, 255, 0.8)',
    '--contact-card-bg-hover': 'rgba(255, 255, 255, 0.96)',
    '--contact-text': 'rgba(15, 23, 42, 0.92)',
    '--contact-muted': 'rgba(15, 23, 42, 0.62)',
    '--contact-border': 'rgba(15, 23, 42, 0.1)',
    '--contact-grid': 'rgba(15, 23, 42, 0.055)',
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

const contactRefs = ref([])
let observer = null

const setContactRef = (el) => {
  if (el) {
    contactRefs.value.push(el.$el || el)
  }
}

onBeforeUpdate(() => {
  contactRefs.value = []
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
      threshold: 0.16,
      rootMargin: '0px 0px -10% 0px',
    },
  )

  contactRefs.value.forEach((el) => {
    observer.observe(el)
  })
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.contact-section {
  position: relative;
  overflow: hidden;
  padding: 120px 24px;
  color: var(--contact-text);
  background:
    radial-gradient(circle at 12% 12%, rgb(var(--contact-primary-rgb) / 0.25), transparent 34%),
    radial-gradient(circle at 90% 20%, rgb(var(--contact-primary-rgb) / 0.16), transparent 32%),
    radial-gradient(circle at 50% 100%, rgb(var(--contact-primary-rgb) / 0.16), transparent 38%),
    linear-gradient(
      135deg,
      var(--contact-bg-1) 0%,
      var(--contact-bg-2) 48%,
      var(--contact-bg-3) 100%
    );
}

.contact-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--contact-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--contact-grid) 1px, transparent 1px);
  background-size: 46px 46px;
  mask-image: linear-gradient(to bottom, transparent, #000 15%, #000 85%, transparent);
  pointer-events: none;
}

.contact-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.contact-bg::before,
.contact-bg::after {
  content: '';
  position: absolute;
  border-radius: 999px;
  background: rgb(var(--contact-primary-rgb) / 0.14);
  filter: blur(90px);
}

.contact-bg::before {
  top: 18%;
  left: -120px;
  width: 380px;
  height: 380px;
}

.contact-bg::after {
  right: -140px;
  bottom: 12%;
  width: 440px;
  height: 440px;
}

.contact-container {
  position: relative;
  z-index: 1;
  max-width: 1180px;
  margin: 0 auto;
}

.contact-header {
  max-width: 880px;
  margin: 0 auto 64px;
  text-align: center;
}

.contact-header h2 {
  margin: 24px 0 16px;
  font-size: clamp(42px, 7vw, 86px);
  line-height: 1;
  letter-spacing: 0.04em;
}

.contact-header p {
  margin: 0;
  color: var(--contact-muted);
  font-size: 16px;
  line-height: 1.9;
}

.contact-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 28px;
  align-items: start;
}

.contact-info {
  display: grid;
  gap: 24px;
}

.contact-card,
.form-card,
.link-card {
  position: relative;
  overflow: hidden;
  border-radius: 26px;
  background: var(--contact-card-bg);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 var(--contact-border);
  backdrop-filter: blur(18px);
}

.contact-card::before,
.form-card::before,
.link-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgb(var(--contact-primary-rgb) / 0.66),
    rgb(var(--contact-primary-rgb) / 0.12),
    var(--contact-border)
  );
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  pointer-events: none;
}

.contact-card :deep(.n-card__content),
.form-card :deep(.n-card__content),
.link-card :deep(.n-card__content) {
  position: relative;
  z-index: 1;
}

.info-label,
.form-title span {
  color: var(--contact-primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.contact-card h3 {
  margin: 16px 0 14px;
  color: var(--contact-text);
  font-size: clamp(28px, 4vw, 44px);
  line-height: 1.25;
  letter-spacing: 0.03em;
}

.contact-card p {
  margin: 0;
  color: var(--contact-muted);
  font-size: 15px;
  line-height: 1.9;
}

.contact-mail-box {
  margin-top: 28px;
  padding: 20px;
  border: 1px solid var(--contact-border);
  border-radius: 22px;
  background: rgb(var(--contact-primary-rgb) / 0.07);
}

.contact-mail-box span {
  display: block;
  color: var(--contact-muted);
  font-size: 13px;
}

.contact-mail-box strong {
  display: block;
  margin-top: 8px;
  color: var(--contact-text);
  font-size: 18px;
  word-break: break-all;
}

.mail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.contact-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.link-card {
  display: block;
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.35s ease,
    background 0.35s ease,
    box-shadow 0.35s ease;
}

.link-card:hover {
  transform: translateY(-6px);
  background: var(--contact-card-bg-hover);
  box-shadow:
    0 30px 90px rgba(0, 0, 0, 0.26),
    0 0 36px rgb(var(--contact-primary-rgb) / 0.14);
}

.link-card :deep(.n-card__content) {
  display: flex;
  gap: 14px;
  align-items: center;
}

.link-icon {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 46px;
  height: 46px;
  border-radius: 16px;
  background: rgb(var(--contact-primary-rgb) / 0.12);
  font-size: 22px;
  box-shadow: 0 0 26px rgb(var(--contact-primary-rgb) / 0.12);
}

.link-card strong {
  display: block;
  color: var(--contact-text);
  font-size: 15px;
}

.link-card span {
  display: block;
  margin-top: 4px;
  color: var(--contact-muted);
  font-size: 12px;
  line-height: 1.5;
}

.form-title {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 26px;
}

.form-title strong {
  color: var(--contact-text);
  font-size: 28px;
}

.form-card :deep(.n-form-item-label) {
  color: var(--contact-text);
  font-weight: 700;
}

.form-card :deep(.n-input) {
  --n-border-radius: 16px;
}

.form-actions {
  margin-top: 8px;
}

.form-actions p {
  margin: 12px 0 0;
  color: var(--contact-muted);
  font-size: 12px;
  text-align: center;
}

.contact-reveal {
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

.contact-reveal.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

@media (max-width: 960px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .contact-section {
    padding: 88px 18px;
  }

  .contact-header {
    text-align: left;
  }

  .contact-header h2 {
    font-size: clamp(40px, 12vw, 64px);
  }

  .contact-links {
    grid-template-columns: 1fr;
  }

  .contact-card,
  .form-card,
  .link-card {
    border-radius: 22px;
  }

  .mail-actions {
    flex-direction: column;
  }

  .mail-actions .n-button {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-reveal,
  .link-card {
    transition: none;
  }

  .contact-reveal {
    opacity: 1;
    transform: none;
    filter: none;
  }
}
</style>
