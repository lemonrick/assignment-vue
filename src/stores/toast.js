import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    active: false
  }),
  getters: {
    status: (state) => state.active,
  },
  actions: {
    activate() {
      this.active = true
      setTimeout(() => {
        this.active = false
      }, 5000)
    },
  },
});
