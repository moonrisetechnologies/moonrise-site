// SPDX-License-Identifier: MIT
'use client'

import React, { useMemo } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { FaNetworkWired, FaHome, FaPiggyBank, FaProjectDiagram, FaChartPie } from 'react-icons/fa'
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'

export default function TokenomicsPage() {
  const { t, i18n } = useTranslation('tokenomics')
  type Fund = { title: string; desc: string }

  /* ======================= VALORES (alinhados ao contrato) ======================= */
  // Total inicialmente mintado no deploy
  const TOTAL_MINTED = 9_700_000_000

  // Burn efetuado no deploy
  const BURNED = 1_700_000_000 // 17.53% do TOTAL_MINTED

  // Supply pós-burn (é o que on-chain costuma reportar como totalSupply())
  const TOTAL_SUPPLY = TOTAL_MINTED - BURNED // 8,000,000,000

  // Liquidez total (inclui a pré-venda)
  const LIQUIDITY_TOTAL = 6_000_000_000

  // *** NOVO *** Pré-venda
  const PRESALE = 2_500_000_000

  // Pool de liquidez (liquidez total - pré-venda)
  const LIQUIDITY_POOL = LIQUIDITY_TOTAL - PRESALE // 3,500,000,000

  // Demais alocações (iguais ao contrato da sua screenshot)
  const MARKETING = 750_000_000
  const DEVELOPMENT = 630_000_000
  const ECOSYSTEM = 350_000_000
  const STRATEGIC_RESERVE = 250_000_000
  const FOUNDER_LOCKED = 20_000_000

  // Para exibir no quadro “Supply em Circulação”
  const CIRCULATING = TOTAL_SUPPLY // (descontos de locks podem ser aplicados se quiser)

  // *** IMPORTANTE: base de % do gráfico = TOTAL_MINTED ***
  const BASE_FOR_PIE = TOTAL_MINTED
  const pct = (amt: number) => (amt / BASE_FOR_PIE) * 100

  const nf = new Intl.NumberFormat(i18n.language)
  const pf = (n: number) =>
    `${new Intl.NumberFormat(i18n.language, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)}%`

  /* ======================= Rótulos (i18n) ======================= */
  const SLICE = {
    pool: t('slices.pool'),
    presale: t('slices.presale'),
    burned: t('slices.burned'),
    marketing: t('slices.marketing'),
    dev: t('slices.dev'),
    ecosystem: t('slices.ecosystem'),
    reserve: t('slices.reserve'),
    founder: t('slices.founder'),
  }

  /* =========================== Dados do gráfico =========================== */
  const chartData = [
    { name: SLICE.pool,      value: pct(LIQUIDITY_POOL),    amount: LIQUIDITY_POOL,    key: 'pool' },
    { name: SLICE.presale,   value: pct(PRESALE),           amount: PRESALE,           key: 'presale' },
    { name: SLICE.burned,    value: pct(BURNED),            amount: BURNED,            key: 'burned' },
    { name: SLICE.marketing, value: pct(MARKETING),         amount: MARKETING,         key: 'marketing' },
    { name: SLICE.dev,       value: pct(DEVELOPMENT),       amount: DEVELOPMENT,       key: 'dev' },
    { name: SLICE.ecosystem, value: pct(ECOSYSTEM),         amount: ECOSYSTEM,         key: 'ecosystem' },
    { name: SLICE.reserve,   value: pct(STRATEGIC_RESERVE), amount: STRATEGIC_RESERVE, key: 'reserve' },
    { name: SLICE.founder,   value: pct(FOUNDER_LOCKED),    amount: FOUNDER_LOCKED,    key: 'founder' },
  ]

  // Cores mapeadas por chave para garantir o vermelho do fundador
  const COLOR_BY_KEY: Record<string, string> = {
    pool: '#a855f7',
    presale: '#38bdf8',
    burned: '#22c55e',
    marketing: '#facc15',
    dev: '#0ea5e9',
    ecosystem: '#aa4a06',
    reserve: '#ff8585',
    founder: '#ef4444', // vermelho
  }

  const totalPercent = useMemo(
    () => chartData.reduce((acc, i) => acc + (Number(i.value) || 0), 0),
    [chartData]
  )

  // Tooltip custom (alto contraste)
  const TooltipContent = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null
    const p = payload[0]?.payload
    return (
      <div className="rounded-lg border border-purple-400/60 bg-[#111827]/95 text-white shadow-xl px-3 py-2">
        <div className="font-semibold">{p.name}</div>
        <div className="text-sm text-purple-200">{pf(p.value)}</div>
        <div className="text-xs text-gray-300">{t('labels.amount')}: {nf.format(p.amount)}</div>
      </div>
    )
  }

  /* =============================== Visual ================================ */
  const cardBase = 'relative rounded-xl bg-white/3 border border-white/10 backdrop-blur-[1px] text-center'
  const brandTitle = 'font-extrabold tracking-tight bg-gradient-to-r from-purple-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent'

  // Grade: último item full-row se sobrar 1 + Founder sempre full-row
  const remainder = (chartData.length - 1) % 3
  const spanClassForIndex = (idx: number, lastIndex: number, key?: string) => {
    if (idx === 0) return 'col-span-1 md:col-span-3'
    if (key === 'founder') return 'col-span-1 md:col-span-3'
    if (idx === lastIndex && remainder === 1) return 'col-span-1 md:col-span-3'
    return 'col-span-1'
  }

  return (
    <main className="relative bg-black text-white overflow-hidden">
      {/* BACKDROP */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-40 -left-40 h-[720px] w-[720px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side,#a855f7 0%,transparent 70%)', opacity: .18 }}
        />
        <div
          className="absolute -bottom-64 -right-40 h-[640px] w-[640px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side,#f59e0b 0%,transparent 70%)', opacity: .14 }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_60%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-14 space-y-16">
        {/* TÍTULO */}
        <section className="text-center">
          <h1 className={`text-3xl md:text-4xl lg:text-5xl ${brandTitle} mb-4 drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]`}>
            {t('title')}
          </h1>
          <p className="text-gray-300 mx-auto max-w-3xl text-base md:text-lg leading-relaxed">
            <Trans t={t} i18nKey="intro" components={{ strong: <strong /> }} />
          </p>
        </section>

        {/* SUPPLY */}
        <section className={`${cardBase} mx-auto w-full max-w-5xl p-6 md:p-8 text-sm`}>
          <span className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-t-xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left md:text-left">
            <p><strong>🧱 {t('supplyLabels.name')}:</strong> {t('supply.name')}</p>
            <p><strong>🪙 {t('supplyLabels.symbol')}:</strong> {t('supply.symbol')}</p>
            <p><strong><FaNetworkWired className="inline mr-2" aria-hidden="true" />{t('supplyLabels.network')}:</strong> {t('supply.network')}</p>

            {/* Aqui: total mintado, queimados e circulação (pós-burn) */}
            <p><strong>📦 {t('supplyLabels.total')}:</strong> {nf.format(TOTAL_MINTED)}</p>
            <p><strong>🔥 {t('supplyLabels.burned')}:</strong> {nf.format(BURNED)}</p>
            <p><strong>🔄 {t('supplyLabels.circulating')}:</strong> {nf.format(CIRCULATING)}</p>

            {/* Liquidez (pool + pré-venda nova) */}
            <p><strong>🟣 {SLICE.pool}:</strong> {nf.format(LIQUIDITY_POOL)}</p>
            <p><strong>🟡 {SLICE.presale}:</strong> {nf.format(PRESALE)}</p>
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/transparency" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition">
              🔎 {t('buttons.transparency')}
            </a>
            <a
              href="https://bscscan.com/token/0x178A7Ef67fCBC4c3a1a7d4dAee511F21271b6908"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
              target="_blank" rel="noreferrer"
            >
              🧾 {t('buttons.contract')}
            </a>
          </div>
        </section>

        {/* DISTRIBUIÇÃO */}
        <section className="w-full max-w-7xl mx-auto text-center space-y-8">
          <h2 className={`text-2xl md:text-3xl ${brandTitle}`}>{t('distributionTitle')}</h2>

          <div className="mx-auto" style={{ width: '100%', maxWidth: 640, height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart role="img" aria-label={t('distributionTitle')}>
                <defs>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.25" />
                  </filter>
                </defs>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={86}
                  outerRadius={124}
                  paddingAngle={1}     // gap menor
                  minAngle={2}         // garante fatias mínimas visíveis (fundador!)
                  dataKey="value"
                  isAnimationActive
                  stroke="#0b0b0f"
                  strokeWidth={2}
                  filter="url(#shadow)"
                  labelLine={false}
                >
                  {chartData.map((item, index) => (
                    <Cell key={`cell-${index}`} fill={COLOR_BY_KEY[item.key]} />
                  ))}
                </Pie>

                <Tooltip content={<TooltipContent />} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#e5e7eb', fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p className="text-gray-400 text-sm max-w-2xl mx-auto">{t('distributionNote')}</p>
          {Math.abs(totalPercent - 100) > 0.1 && (
            <p className="text-amber-300 text-xs">⚠️ {t('warnings.totalNot100', { total: pf(totalPercent) })}</p>
          )}

          {/* Cards resumidos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm font-bold max-w-5xl mx-auto">
            {chartData.map((item, idx) => {
              const isFounder = item.key === 'founder'
              return (
                <div
                  key={idx}
                  className={`${cardBase} px-5 py-6 transition ${spanClassForIndex(idx, chartData.length - 1, item.key)} ${isFounder ? 'ring-2 ring-amber-300/60 shadow-[0_0_35px_rgba(245,158,11,0.15)]' : 'hover:scale-[1.015]'}`}
                >
                  <span className={`pointer-events-none absolute left-0 right-0 -bottom-px h-[2px] ${isFounder ? 'bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300' : 'bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500'} opacity-80 rounded-b-xl`} />
                  <p className={`${isFounder ? 'text-amber-200' : 'text-purple-300'} text-lg`}>{pf(item.value)}</p>
                  <div className="mt-1 flex items-center justify-center gap-2">
                    <p className="text-gray-200 text-sm">{item.name}</p>
                    {isFounder && (
                      <span className="rounded-full border border-amber-300/50 bg-amber-300/10 px-2 py-0.5 text-[11px] font-semibold text-amber-200">
                        {t('badges.founderLock')}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* USO DOS FUNDOS */}
        <section className="max-w-6xl mx-auto text-center">
          <h2 className={`mb-4 text-2xl md:text-3xl ${brandTitle}`}>{t('fundsTitle')}</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed text-base">{t('fundsText')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {(t('funds', { returnObjects: true }) as Fund[]).map((f, idx) => {
              const Icon = [FaHome, FaPiggyBank, FaProjectDiagram, FaChartPie][idx] || FaHome
              return (
                <div key={idx} className="relative rounded-xl bg-white/3 border border-white/10 backdrop-blur-[1px] p-6 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,85,247,0.12)] transition">
                  <Icon className="text-purple-300 text-4xl mb-4 mx-auto" aria-hidden="true" />
                  <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ENCERRAMENTO */}
        <section className="text-center">
          <p className="text-gray-400 mt-2 max-w-xl mx-auto text-base leading-relaxed">
            {t('closing.phrase')}
          </p>
        </section>

        <footer className="w-full mt-16 py-6 text-center text-sm text-gray-500">
          {new Date().getFullYear()} © MOONRISE TECHNOLOGIES LLC (WY, USA). All rights reserved.
        </footer>
      </div>
    </main>
  )
}
