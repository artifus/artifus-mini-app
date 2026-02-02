import {MiniAppEventName} from './types'
import {getInvoiceSlugFromUrl} from './url'
import {onEvent, postEvent} from './events'

export function createInvoiceModule() {
  const webAppInvoices: Record<string, { url: string; callback?: (result: unknown) => void }> = {}

  const openInvoice = (url: string, callback?: (result: unknown) => void) => {
    const slug = getInvoiceSlugFromUrl(url)
    if (!slug) {
      console.error('[Artifus.WebApp] Invoice url is invalid', url)
      throw Error('WebAppInvoiceUrlInvalid')
    }

    if (webAppInvoices[slug]) {
      console.error('[Artifus.WebApp] Invoice is already opened')
      throw Error('WebAppInvoiceOpened')
    }

    webAppInvoices[slug] = {url, callback}
    postEvent({
      event: MiniAppEventName.OPEN_INVOICE,
      timestamp: Date.now(),
      payload: {slug},
    })
  }

  onEvent(MiniAppEventName.INVOICE_CLOSED, (event) => {
    const payload = event.payload as { slug?: string } | undefined
    const slug = payload?.slug
    if (!slug) return

    const entry = webAppInvoices[slug]
    if (!entry) return

    delete webAppInvoices[slug]
    try {
      entry.callback?.(event.payload)
    } catch {
      // ignore
    }
  })

  return {openInvoice}
}
