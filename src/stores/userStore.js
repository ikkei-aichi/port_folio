import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    colorTheme: localStorage.getItem('colorTheme') || 'dark-blue',
  }),

  actions: {
    setUserStore(payload) {
      Object.assign(this, payload)

      if (payload.colorTheme) {
        localStorage.setItem('colorTheme', payload.colorTheme)
      }
    },
  },
})
