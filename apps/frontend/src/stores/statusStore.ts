import { defineStore } from 'pinia'

type ToastVariant = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  title: string;
  message: string;
  variant: ToastVariant;
}

export const useStatusStore = defineStore('status', {
  state: () => ({
    toasts: [] as Toast[]
  }),
  actions: {
    pushToast (toast: Omit<Toast, 'id'>) {
      const id = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)
      this.toasts.push({ id, ...toast })
      if (typeof globalThis.setTimeout === 'function') {
        globalThis.setTimeout(() => this.dismissToast(id), 4000)
      }
    },
    dismissToast (id: string) {
      this.toasts = this.toasts.filter(toast => toast.id !== id)
    }
  }
})
