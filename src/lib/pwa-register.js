import { Workbox } from 'workbox-window'

export function registerPWA() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    const wb = new Workbox('/sw.js')

    wb.register()

    wb.addEventListener('installed', (event) => {
      if (event.isUpdate) {
        if (confirm('New content is available!. Click OK to refresh.')) {
          window.location.reload()
        }
      }
    })
  }
}
