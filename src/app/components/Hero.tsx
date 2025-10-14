// SPDX-License-Identifier: MIT
'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { Trans, useTranslation } from 'react-i18next'
import { motion, useInView, useReducedMotion } from 'framer-motion'

type Kpi = {
  label: string
  value?: string
  countTo?: number
  prefix?: string
  suffix?: string
  decimals?: number
  icon?: React.ReactNode
}

/* ---------- Helpers ---------- */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

function useCountUp(target: number, play: boolean, durationMs = 1200, decimals = 0) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!play) return
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs)
      setVal(parseFloat((target * easeOutCubic(p)).toFixed(decimals)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, play, durationMs, decimals])
  return val
}

function Counter({ to, play, decimals = 0 }: { to: number; play: boolean; decimals?: number }) {
  const val = useCountUp(to, play, 1200, decimals)
  return <>{val.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</>
}

function KpiStat({ item, play, emphasize }: { item: Kpi; play: boolean; emphasize?: boolean }) {
  const hasCounter = typeof item.countTo === 'number'
  const number = hasCounter ? undefined : (item.value ?? '')
  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-2">
        <span className="text-lg" aria-hidden>
          {item.icon}
        </span>
        <div
          className={[
            emphasize ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl',
            'font-extrabold leading-none tracking-tight',
            'bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent',
          ].join(' ')}
        >
          {item.prefix}
          {hasCounter ? <Counter to={item.countTo as number} play={play} decimals={item.decimals ?? 0} /> : number}
          {item.suffix}
        </div>
      </div>
      <div className="text-xs md:text-sm text-gray-400">{item.label}</div>
    </div>
  )
}

const arr = <T,>(v: unknown, fb: T[] = []): T[] => (Array.isArray(v) ? (v as T[]) : fb)

/* ---------- HERO ---------- */
export default function Hero() {
  const { t } = useTranslation('hero')
  const prefersReducedMotion = useReducedMotion()

  // i18n data
  const rawKpis = arr<Kpi>(t('kpis', { returnObjects: true }))
  const kpis = useMemo<Kpi[]>(
    () => [
      { ...(rawKpis[0] ?? {}), icon: '🔒' },
      { ...(rawKpis[1] ?? {}), icon: '🏦' },
      { ...(rawKpis[2] ?? {}), icon: '🇺🇸' },
    ],
    [rawKpis]
  )
  const kpisAriaLabel = (t('kpisAriaLabel', { defaultValue: '' }) as string) || undefined
  const trustBadge = (t('trustBadge', { defaultValue: '' }) as string) || undefined

  const kpiRef = useRef<HTMLDivElement | null>(null)
  const kpisInView = useInView(kpiRef, { once: true, amount: 0.35 })

  return (
    <section
      className="relative w-full bg-black text-white overflow-hidden"
      aria-labelledby="hero-title"
      role="region"
    >
      {/* Fundo dinâmico (respeita prefers-reduced-motion) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, #a855f7 0%, transparent 70%)' }}
          initial={{ opacity: 0.14, scale: 0.95 }}
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0.14, 0.22, 0.14], scale: [0.95, 1.02, 0.95] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -right-32 h-[480px] w-[480px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side, #f59e0b 0%, transparent 70%)' }}
          initial={{ opacity: 0.12, scale: 1.02 }}
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0.12, 0.18, 0.12], scale: [1.02, 0.96, 1.02] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-10 md:pt-16 pb-8">
        {/* Eyebrow */}
        <motion.p
          className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-purple-300/80"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('eyebrow')}
        </motion.p>

        {/* Trust badge (opcional) */}
        {trustBadge && (
          <motion.span
            className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-gray-200"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <span aria-hidden>✅</span>
            {trustBadge}
          </motion.span>
        )}

        {/* Headline */}
        <motion.h1
          id="hero-title"
          className="mt-3 font-extrabold tracking-tight text-2xl md:text-4xl lg:text-5xl leading-[1.22] max-w-[28ch]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Trans
            i18nKey="headline"
            t={t}
            components={{
              1: <span className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent" />,
              3: <span className="bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent" />,
              br: <br />,
            }}
          />
        </motion.h1>

        {/* Slogan + Subhead */}
        <motion.p
          className="mt-4 text-base md:text-lg text-gray-200 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          {t('slogan')}
        </motion.p>
        <motion.p
          className="mt-2 text-sm md:text-base text-gray-300 max-w-xl leading-relaxed"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t('subhead')}
        </motion.p>

        {/* KPIs */}
        <motion.section
          ref={kpiRef}
          className="mt-6"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
          aria-label={kpisAriaLabel}
        >
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {kpis.map((item, i) => (
              <motion.li
                key={`kpi-${i}`}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                className={[
                  'group relative rounded-lg px-5 py-4',
                  'bg-white/5 backdrop-blur-[1px]',
                  'border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.04)]',
                  i === 1 && 'hover:shadow-[0_0_22px_rgba(168,85,247,0.25)]',
                ].join(' ')}
              >
                <span className="pointer-events-none absolute left-0 right-0 -bottom-[1px] h-[2px] opacity-80 bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500" />
                <KpiStat item={item} play={!!kpisInView} emphasize={i === 1} />
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* Linha institucional */}
        <motion.div
          className="mt-4 text-xs md:text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {t('institutionalLine')}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="mt-6 flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            prefetch={false}
            href="/ecosystem"
            className="inline-flex items-center gap-2 justify-center rounded-lg px-6 py-2.5 font-semibold
            bg-white text-black hover:opacity-95 hover:scale-[1.02] active:scale-[0.99]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 focus-visible:ring-offset-black
            transition will-change-transform border border-white/20"
          >
            {t('cta.ecosystem')} <span aria-hidden>↗</span>
          </Link>
          <Link
            prefetch={false}
            href="/presales"
            className="inline-flex items-center gap-2 justify-center rounded-lg px-6 py-2.5 font-semibold
            bg-yellow-500 text-black hover:bg-yellow-400 hover:scale-[1.02] active:scale-[0.99]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-400/70 focus-visible:ring-offset-black
            transition will-change-transform shadow-[0_6px_18px_rgba(245,158,11,0.22)]"
          >
            {t('cta.presale')} <span aria-hidden>↗</span>
          </Link>
        </motion.div>
      </div>

      {/* Divisor */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />
    </section>
  )
}
