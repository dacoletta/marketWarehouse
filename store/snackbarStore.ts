import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore({
  id: 'snackbarStore',
  state: () => ({
    snack: {
      content: '',
      color: '',
      show: false
    }
  }),
  actions: {
    showSnackbar(type: string, text: string) {
      this.snack = {
        content: text,
        color: type,
        show: true
      }
    }
  }
})