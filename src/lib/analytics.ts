// app/lib/analytics.ts
const w: any = typeof window !== 'undefined' ? window : {}

const pushDL = (event: string, props: Record<string, any> = {}) => { try { w.dataLayer?.push({ event, ...props }) } catch {} }
const fbCustom = (event: string, props: Record<string, any> = {}) => { try { w.fbq?.('trackCustom', event, props) } catch {} }
const ttqTrack = (event: string, props: Record<string, any> = {}) => { try { w.ttq?.track?.(event, props) } catch {} }
const twqEvent = (event: string, props: Record<string, any> = {}) => { try { w.twq?.('event', event, props) } catch {} }

export function trackUI(event: string, props: Record<string, any> = {}) {
  fbCustom(event, props)        // Meta
  ttqTrack(event, props)        // TikTok
  twqEvent(event, props)        // X/Twitter
  pushDL(event, props)          // GTM / CAPI
}
