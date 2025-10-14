// SPDX-License-Identifier: MIT
'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { ethers } from 'ethers'
import {
  useAccount,
  useBalance,
  useDisconnect,
  useChainId,
  useWalletClient,
  useReconnect,
  useSwitchChain,
} from 'wagmi'
import { useTranslation } from 'react-i18next'
import { openWalletModal } from '@/app/providers'

/** ====== LINKS ====== */
const TELEGRAM_GROUP_URL   = 'https://t.me/moonriseofficialcommunity'
const NOTIFS_CHANNEL_URL   = 'https://t.me/moonbuynotifications'

/** ====== ON-CHAIN ====== */
const PRESALE       = '0xdA89B77ef1770051685039911B64D2C6C2E85891'
const TOKEN         = '0x178A7Ef67fCBC4c3a1a7d4dAee511F21271b6908'
const USDT          = '0x55d398326f99059fF775485246999027B3197955'
const SYMBOL        = 'MRS'
const DECIMALS      = 18
const BSC_CHAIN_ID  = 56
const NUM_PHASES    = 7

const PRESALE_ABI = [
  'function panelCurrentPhase() view returns (uint8 idx,uint256 priceUsd18,uint256 capTokens,uint256 soldTokens,uint256 remainingTokens,bool ended)',
  'function panelPhasesSnapshot() view returns (uint256[7] caps,uint256[7] sold,uint256[7] priceUsd)',
  'function currentPrices() view returns (uint8 idx,uint256 priceUsd18,uint256 priceBnbWeiPerToken)',
  'function minUsdPerTx() view returns (uint256)',
  'function maxUsdPerWallet() view returns (uint256)',
  'function contributedUsd18(address) view returns (uint256)',
  'function quoteTokensForBNB(uint256) view returns (uint256,uint8)',
  'function quoteTokensForUSDT(uint256) view returns (uint256,uint8)',
  'function paused() view returns (bool)',
  'function started() view returns (bool)',
  'function presaleEnded() view returns (bool)',
  'function whitelistEnabled() view returns (bool)',
  'function whitelist(address) view returns (bool)',
  'function buyWithBNB() payable',
  'function buyWithUSDT(uint256)',
] as const

const ERC20_ABI = [
  'function decimals() view returns (uint8)',
  'function allowance(address,address) view returns (uint256)',
  'function approve(address,uint256) returns (bool)',
] as const

/** ====== HELPERS ====== */
type PayAsset = 'BNB' | 'USDT'

const sanitize = (v: string) => {
  let s = v.replace(',', '.').replace(/[^0-9.]/g, '')
  const p = s.split('.')
  if (p.length > 2) s = p[0] + '.' + p.slice(1).join('')
  return s
}

const money = (v: number, c: 'USD' | 'BRL', d?: number) =>
  new Intl.NumberFormat(c === 'BRL' ? 'pt-BR' : 'en-US', {
    style: 'currency',
    currency: c,
    minimumFractionDigits: d ?? (v < 1 ? 5 : 2),
    maximumFractionDigits: d ?? (v < 1 ? 5 : 2),
  }).format(isFinite(v) ? v : 0)

const nf = (n: number, d = 2) =>
  isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: d }) : '0'

const RPC_READ = 'https://bsc-dataseed.binance.org'

export default function PresalePanel() {
  const { t } = useTranslation('presale')

  const errToMsg = (e: any): string => {
    const s = String(e?.shortMessage || e?.reason || e?.message || e || 'Erro')
    const low = s.toLowerCase()
    if (low.includes('whitelist')) return t('errors.whitelist')
    if (low.includes('stale oracle') || low.includes('oracle')) return t('errors.oracle')
    if (low.includes('min usd/tx')) return t('errors.min_tx')
    if (low.includes('cap carteira')) return t('errors.wallet_cap')
    if (low.includes('sem alocacao')) return t('errors.no_alloc')
    if (low.includes('paused')) return t('errors.paused')
    if (low.includes('not started')) return t('errors.not_started')
    if (low.includes('insufficient funds')) return t('errors.insufficient')
    return s
  }

  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: walletClient } = useWalletClient()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  useReconnect()

  const { data: balBNB } = useBalance({ address, chainId: BSC_CHAIN_ID })
  const { data: balUSDT } = useBalance({ address, chainId: BSC_CHAIN_ID, token: USDT as `0x${string}` })

  /** ====== STATE ====== */
  const [phase, setPhase] = useState(0)
  const [cap, setCap] = useState(1)
  const [sold, setSold] = useState(0)
  const [remaining, setRemaining] = useState(0)
  const [ended, setEnded] = useState(false)

  const [usdPerTok, setUsdPerTok] = useState(0)
  const [bnbPerTok, setBnbPerTok] = useState(0)
  const [minUsd, setMinUsd] = useState(5)
  const [maxUsdWallet, setMaxUsdWallet] = useState(0)
  const [contribUsd, setContribUsd] = useState(0)

  const [isPaused, setIsPaused] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const [oracleStale, setOracleStale] = useState(false)
  const [wlEnabled, setWlEnabled] = useState(false)
  const [wlAllowed, setWlAllowed] = useState(true)

  const [usdToBrl, setUsdToBrl] = useState<number | null>(null)
  const [usdtDec, setUsdtDec] = useState(18)

  const [asset, setAsset] = useState<PayAsset>('BNB')
  const [amountStr, setAmountStr] = useState('')
  const amount = useMemo(() => parseFloat(sanitize(amountStr)) || 0, [amountStr])

  const [tokensOut, setTokensOut] = useState(0)

  const [loading, setLoading] = useState(true)
  const [buying, setBuying] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const [showSuccess, setShowSuccess] = useState(false)
  const [txHash, setTxHash] = useState<string | undefined>(undefined)

  const [allowanceOk, setAllowanceOk] = useState(false)
  const [checkingAllow, setCheckingAllow] = useState(false)

  const [nextUsd, setNextUsd] = useState(0)
  const [nextPct, setNextPct] = useState(0)

  const soldPct = useMemo(() => (cap ? (sold / cap) * 100 : 0), [cap, sold])
  const progress = Math.min(100, Math.max(0, soldPct))

  /** ====== FX: USD->BRL (cache + fallbacks) ====== */
  useEffect(() => {
    let alive = true
    const readCache = () => {
      try {
        const raw = localStorage.getItem('usd_brl_fx')
        if (!raw) return null
        const { v, at } = JSON.parse(raw)
        if (Date.now() - at < 6 * 60 * 60 * 1000 && Number.isFinite(v)) return v
        return null
      } catch { return null }
    }
    const writeCache = (v: number) => { try { localStorage.setItem('usd_brl_fx', JSON.stringify({ v, at: Date.now() })); } catch {} }
    const fetchUsdBrl = async (): Promise<number | null> => {
      try {
        const r = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=BRL', { cache: 'no-store' })
        const j = await r.json()
        const v = j?.rates?.BRL; if (Number.isFinite(v)) return v
      } catch {}
      try {
        const r = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-store' })
        const j = await r.json()
        const v = j?.rates?.BRL; if (Number.isFinite(v)) return v
      } catch {}
      return null
    }
    ;(async () => {
      const cached = readCache(); if (cached && alive) setUsdToBrl(cached)
      const v = await fetchUsdBrl(); if (alive && Number.isFinite(v)) { setUsdToBrl(v as number); writeCache(v as number) }
    })()
    const id = setInterval(async () => {
      const v = await fetchUsdBrl(); if (alive && Number.isFinite(v)) { setUsdToBrl(v as number); writeCache(v as number) }
    }, 10 * 60 * 1000)
    return () => { alive = false; clearInterval(id) }
  }, [])

  /** ====== LOAD ON-CHAIN ====== */
  useEffect(() => { load() /* eslint-disable-line react-hooks/exhaustive-deps */ }, [address])

  async function load() {
    try {
      setLoading(true)
      setOracleStale(false)
      const p = new ethers.JsonRpcProvider(RPC_READ)
      const c = new ethers.Contract(PRESALE, PRESALE_ABI, p)

      const [idx, priceUsd18, capWei, soldWei, remWei, isEnded] = await c.panelCurrentPhase()
      setPhase(Number(idx))
      setCap(Number(ethers.formatUnits(capWei, DECIMALS)))
      setSold(Number(ethers.formatUnits(soldWei, DECIMALS)))
      setRemaining(Number(ethers.formatUnits(remWei, DECIMALS)))
      setEnded(Boolean(isEnded))

      const [paused, started, endedFlag] = await Promise.all([
        c.paused().catch(() => false),
        c.started().catch(() => false),
        c.presaleEnded().catch(() => false),
      ])
      setIsPaused(Boolean(paused))
      setIsStarted(Boolean(started))
      if (endedFlag) setEnded(true)

      let priceNow = 0
      try {
        const [, usd18, bnbWeiTok] = await c.currentPrices()
        priceNow = Number(ethers.formatUnits(usd18, 18))
        setUsdPerTok(priceNow)
        setBnbPerTok(Number(ethers.formatEther(bnbWeiTok)))
      } catch {
        priceNow = Number(ethers.formatUnits(priceUsd18, 18))
        setUsdPerTok(priceNow)
        setBnbPerTok(0)
        setOracleStale(true)
      }

      setNextUsd(0); setNextPct(0)
      try {
        const snap = await c.panelPhasesSnapshot()
        const priceArr = snap[2] as readonly bigint[]
        const nextIdx = Number(idx) + 1
        if (nextIdx < NUM_PHASES) {
          const nextWei = priceArr[nextIdx]
          const next = Number(ethers.formatUnits(nextWei, 18))
          setNextUsd(next)
          if (priceNow > 0 && next > 0) setNextPct((next / priceNow - 1) * 100)
        }
      } catch {}

      const [min, max] = await Promise.all([
        c.minUsdPerTx().catch(() => ethers.parseUnits('5', 18)),
        c.maxUsdPerWallet().catch(() => ethers.parseUnits('0', 18)),
      ])
      setMinUsd(Number(ethers.formatUnits(min, 18)) || 5)
      setMaxUsdWallet(Number(ethers.formatUnits(max, 18)) || 0)

      if (address) {
        const contributed: bigint = await c
          .contributedUsd18(address)
          .catch(() => ethers.parseUnits('0', 18))
        setContribUsd(Number(ethers.formatUnits(contributed, 18)) || 0)
      } else {
        setContribUsd(0)
      }

      const usdt = new ethers.Contract(USDT, ERC20_ABI, p)
      const dec = await usdt.decimals().catch(() => 18)
      setUsdtDec(Number(dec))

      const [wEnabled, wAllowed] = await Promise.all([
        c.whitelistEnabled().catch(() => false),
        address ? c.whitelist(address).catch(() => true) : Promise.resolve(true),
      ])
      setWlEnabled(Boolean(wEnabled))
      setWlAllowed(Boolean(wAllowed))

      setError('')
    } catch (e: any) {
      setError(errToMsg(e))
    } finally {
      setLoading(false)
    }
  }

  /** ====== AUTO-SELECT PELO SALDO ====== */
  useEffect(() => {
    if (!isConnected) return
    const bnb = Number(balBNB?.formatted || 0)
    const usd = Number(balUSDT?.formatted || 0)
    if (usd > 0 && usd >= (bnb > 0 && bnbPerTok > 0 ? bnb * (usdPerTok / bnbPerTok) : 0)) setAsset('USDT')
    else if (bnb > 0) setAsset('BNB')
  }, [isConnected, balBNB?.formatted, balUSDT?.formatted, usdPerTok, bnbPerTok])

  /** ====== QUOTES ====== */
  useEffect(() => {
    (async () => {
      if (!amount) { setTokensOut(0); return }
      try {
        const p = new ethers.JsonRpcProvider(RPC_READ)
        const c = new ethers.Contract(PRESALE, PRESALE_ABI, p)
        if (asset === 'BNB') {
          const [out] = await c.quoteTokensForBNB(ethers.parseEther(String(amount)))
          setTokensOut(Number(ethers.formatUnits(out, DECIMALS)))
        } else {
          const [out] = await c.quoteTokensForUSDT(ethers.parseUnits(String(amount), usdtDec))
          setTokensOut(Number(ethers.formatUnits(out, DECIMALS)))
        }
      } catch {
        if (asset === 'BNB') setTokensOut(bnbPerTok ? amount / bnbPerTok : 0)
        else setTokensOut(usdPerTok ? amount / usdPerTok : 0)
      }
    })()
  }, [amount, asset, usdtDec, usdPerTok, bnbPerTok])

  /** ====== CHECK ALLOWANCE ====== */
  useEffect(() => { checkAllowance() /* eslint-disable-line react-hooks/exhaustive-deps */ }, [amount, address, isConnected, usdtDec, asset])
  async function checkAllowance() {
    if (!isConnected || !address || !amount || asset !== 'USDT') { setAllowanceOk(false); return }
    try {
      setCheckingAllow(true)
      const p = new ethers.JsonRpcProvider(RPC_READ)
      const usdt = new ethers.Contract(USDT, ERC20_ABI, p)
      const a = await usdt.allowance(address, PRESALE)
      const need = ethers.parseUnits(String(amount), usdtDec)
      setAllowanceOk(a >= need)
    } catch { setAllowanceOk(false) }
    finally { setCheckingAllow(false) }
  }

  /** ====== TIP CONECTADO ====== */
  const connectedTip = useMemo<string | null>(() => {
    if (!isConnected) return null
    const b = Number(balBNB?.formatted || 0)
    const u = Number(balUSDT?.formatted || 0)
    if (b > 0 && u > 0) return t('wallet.tips.both')
    if (b > 0) return t('wallet.tips.bnb')
    if (u > 0) return t('wallet.tips.usdt')
    return null
  }, [isConnected, balBNB?.formatted, balUSDT?.formatted, t])

  /** ====== ESTIMATIVA USD ====== */
  const estUsd = useMemo(() => {
    if (!amount) return 0
    if (asset === 'BNB') return bnbPerTok ? amount * (usdPerTok / bnbPerTok) : 0
    return amount
  }, [amount, asset, usdPerTok, bnbPerTok])

  /** ====== DISABLED REASON ====== */
  const disabledReason = useMemo(() => {
    const active = isStarted && !isPaused && !ended
    if (!isConnected) return t('cta.connect_wallet')
    if (chainId !== BSC_CHAIN_ID) return t('cta.switch_bsc')
    if (loading) return t('misc.loading')
    if (!active) return !isStarted ? t('status.not_started') : (ended ? t('status.ended') : t('status.paused'))
    if (wlEnabled && !wlAllowed) return t('errors.whitelist_short')
    if (!amount) return t('form.enter_amount')
    if (minUsd > 0 && estUsd + 1e-6 < minUsd) return `${t('form.min_prefix')} US$ ${minUsd.toFixed(2)}`
    if (asset === 'USDT' && !allowanceOk) return t('cta.approve_first')
    if (oracleStale && asset === 'BNB') return t('errors.oracle_wait')
    return ''
  }, [t, isConnected, chainId, loading, isPaused, isStarted, ended, wlEnabled, wlAllowed, amount, minUsd, estUsd, asset, allowanceOk, oracleStale])

  const approveUSDT = async () => {
    try {
      setBuying(true); setError('')
      if (!walletClient) throw new Error(t('errors.no_wallet'))
      const provider = new ethers.BrowserProvider((window as any).ethereum)
      const signer = await provider.getSigner()
      const usdt = new ethers.Contract(USDT, ERC20_ABI, signer)
      const amt = ethers.parseUnits(String(amount || 50), usdtDec)
      const tx = await usdt.approve(PRESALE, amt)
      setTxHash(tx.hash); await tx.wait()
      await checkAllowance()
    } catch (e: any) { setError(errToMsg(e)) }
    finally { setBuying(false) }
  }

  const buy = async () => {
    try {
      setBuying(true)
      setError('')
      if (!isConnected) throw new Error(t('errors.must_connect'))
      if (!walletClient) throw new Error(t('errors.no_wallet'))
      if (chainId !== BSC_CHAIN_ID) throw new Error(t('errors.wrong_network'))
      if (amount <= 0) throw new Error(t('form.enter_amount'))

      const provider = new ethers.BrowserProvider((window as any).ethereum)
      const signer = await provider.getSigner()
      const c = new ethers.Contract(PRESALE, PRESALE_ABI, signer)

      let tx: any
      if (asset === 'BNB') {
        const value = ethers.parseEther(Math.max(0, amount).toFixed(6))
        tx = await c.buyWithBNB({ value })
      } else {
        const usdt = new ethers.Contract(USDT, ERC20_ABI, signer)
        const amt = ethers.parseUnits(String(amount), usdtDec)
        const owner = await signer.getAddress()
        const allowance: bigint = await usdt.allowance(owner, PRESALE)
        if (allowance < amt) throw new Error(t('cta.approve_first'))
        tx = await c.buyWithUSDT(amt)
      }

      setTxHash(tx.hash)
      await tx.wait()
      setShowSuccess(true)
      setAmountStr('')
      await load()
    } catch (e: any) {
      setError(errToMsg(e))
    } finally {
      setBuying(false)
    }
  }

  const setMax = () => {
    if (asset === 'BNB') {
      const b = Number(balBNB?.formatted || 0)
      if (!b) return
      const reserve = Math.max(0.00012, Math.min(0.00035, b * 0.004))
      const m = Math.max(0, b - reserve)
      setAmountStr(m > 0 ? m.toFixed(6) : '')
    } else {
      const u = Number(balUSDT?.formatted || 0)
      setAmountStr(u > 0 ? u.toString() : '')
    }
  }

  const copyToClipboard = async (val: string) => {
    try { await navigator.clipboard.writeText(val); setCopied(true); setTimeout(() => setCopied(false), 1000) } catch {}
  }

  const priceUSD = usdPerTok ? money(usdPerTok, 'USD', 6) : '...'
  const priceBRL = usdToBrl && usdPerTok ? money(usdPerTok * usdToBrl, 'BRL', 6) : t('misc.brl_placeholder')
  const nextPriceUSD = nextUsd ? money(nextUsd, 'USD', 6) : null
  const nextPriceBRL = nextUsd && usdToBrl ? money(nextUsd * usdToBrl, 'BRL', 6) : null

  const isActive = isStarted && !isPaused && !ended
  const statusColor = isActive ? 'bg-emerald-500' : 'bg-red-500'
  const statusTitle = isActive ? t('status.active') : (!isStarted ? t('status.not_started') : (ended ? t('status.ended') : t('status.paused')))

  /** ====== PARTES VARIÁVEIS PARA I18N ====== */
  const brlMinPart   = usdToBrl ? ` • ≈ ${money(minUsd * (usdToBrl ?? 0), 'BRL', 2)}` : ''
  const brlTotalPart = usdToBrl ? ` • ${money(estUsd * (usdToBrl ?? 0), 'BRL', 2)}` : ''

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-3 py-8 sm:px-4 sm:py-10">
      <div className="w-full max-w-[380px] sm:max-w-xl rounded-2xl border border-purple-700/50 bg-gradient-to-b from-[#0d0d12] to-[#0a0a0d] p-[6px] shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        <div className="rounded-2xl bg-[#0b0b12] p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Header + status */}
          <div className="flex items-start">
            <div className="flex-1 text-center space-y-1.5 sm:space-y-2">
              <h1 className="text-[20px] sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-amber-300 to-white tracking-wide uppercase leading-tight">
                {t('header.title')}
              </h1>
              <p className="text-[12px] sm:text-base text-yellow-300/90 font-medium leading-snug">
                {t('header.subtitle')}
              </p>
            </div>
            <div className="ml-2 sm:ml-3 mt-1" title={statusTitle}>
              <span className={`inline-block h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full ${statusColor}`} />
            </div>
          </div>

          {/* ======= SUCESSO ======= */}
          {showSuccess ? (
            <>
              <div className="rounded-xl border border-purple-600/60 p-4 sm:p-5 space-y-3 sm:space-y-4 bg-black/30">
                <h3 className="text-xl sm:text-2xl font-bold text-purple-400 text-center">{t('success.title')}</h3>
                <p className="text-xs sm:text-sm text-gray-300 text-center">
                  {t('success.desc', { SYMBOL })}
                </p>

                <div className="bg-black/60 border border-purple-600/50 p-3 rounded-xl text-xs sm:text-sm">
                  <p><span className="text-purple-400">{t('success.network_lbl')}</span> BNB Chain (BSC)</p>
                  <p><span className="text-purple-400">{t('success.token_lbl')}</span> {SYMBOL}</p>
                  <p><span className="text-purple-400">{t('success.decimals_lbl')}</span> {DECIMALS}</p>
                  <div className="flex items-center justify-between break-all text-[11px] sm:text-xs text-white/80 mt-2">
                    <span className="truncate max-w-[85%]">{TOKEN}</span>
                    <button onClick={() => copyToClipboard(TOKEN)} className="bg-purple-600 hover:bg-purple-700 text-[11px] sm:text-xs px-2 py-1 rounded">📋</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={async () => {
                      try {
                        await (window as any).ethereum?.request({
                          method: 'wallet_watchAsset',
                          params: { type: 'ERC20', options: { address: TOKEN, symbol: SYMBOL, decimals: DECIMALS } }
                        })
                      } catch {}
                    }}
                    className="bg-gray-800 hover:bg-gray-700 py-2.5 sm:py-3 text-white font-semibold rounded"
                  >
                    {t('success.add_wallet_btn', { SYMBOL })}
                  </button>

                  <a href={txHash ? `https://bscscan.com/tx/${txHash}` : 'https://bscscan.com'} target="_blank" rel="noreferrer" className="bg-gray-800 hover:bg-gray-700 py-2.5 sm:py-3 text-center text-white font-semibold rounded">🔎 {t('success.view_bscscan')}</a>
                  <a href={TELEGRAM_GROUP_URL} target="_blank" rel="noreferrer" className="bg-gray-800 hover:bg-gray-700 py-2.5 sm:py-3 text-center text-white font-semibold rounded">💬 {t('links.join_group')}</a>
                  <a href={NOTIFS_CHANNEL_URL} target="_blank" rel="noreferrer" className="bg-gray-800 hover:bg-gray-700 py-2.5 sm:py-3 text-center text-white font-semibold rounded">🔔 {t('links.notifications')}</a>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button onClick={() => { setShowSuccess(false) }} className="flex-1 bg-purple-600 hover:bg-purple-700 py-2.5 sm:py-3 text-white font-bold rounded uppercase tracking-wider">{t('success.buy_more')}</button>
                  <button onClick={() => { setShowSuccess(false) }} className="flex-1 bg-white/10 hover:bg-white/20 py-2.5 sm:py-3 text-white font-semibold rounded">{t('success.close')}</button>
                </div>
              </div>

              <p className="text-[10px] sm:text-[11px] text-center text-gray-500 mt-2">{t('footer.legal')}</p>
            </>
          ) : (
            <>
              {/* Infos compactas */}
              <div className="space-y-1 text-[13px] sm:text-sm text-gray-300">
                <div className="flex items-center justify-between">
                  <div>
                    <strong>{t('info.phase')}</strong> {phase + 1}{' '}
                    <span className="text-gray-400">{t('info.of', { NUM_PHASES })}</span>
                  </div>
                  {/* Removido o texto "(x% vendido)" para não poluir no mobile */}
                </div>
                <div className="flex flex-col">
                  <span>
                    <strong>{t('info.price')}</strong> {priceUSD} • {priceBRL}{' '}
                    <span className="text-gray-400">{t('info.per_symbol', { SYMBOL })}</span>
                  </span>
                  {maxUsdWallet > 0 && (
                    <span className="text-[11px] sm:text-xs text-gray-400">
                      {t('info.wallet_cap', { MAX: money(maxUsdWallet, 'USD', 2), CONTRIB: money(contribUsd, 'USD', 2) })}
                    </span>
                  )}
                </div>
                <div>
                  <strong>{t('info.sold')}</strong> {nf(sold, 0)} / {nf(cap, 0)} {SYMBOL}
                </div>
              </div>

              {/* Próxima Fase */}
              {nextUsd > 0 && (
                <div className="rounded-xl border border-purple-700/40 bg-purple-700/10 p-3 text-[13px] sm:text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-gray-300">
                      <div className="font-semibold text-white">{t('next.title')}</div>
                      <div className="text-[11px] sm:text-xs text-gray-400">{t('next.raise', { PCT: nextPct.toFixed(2) })}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{nextPriceUSD}</div>
                      <div className="text-[11px] sm:text-xs text-gray-400">{nextPriceBRL}</div>
                    </div>
                  </div>
                  {remaining > 0 && (
                    <div className="text-[11px] sm:text-xs text-gray-400 mt-1">
                      {t('next.remaining', { AMT: nf(remaining, 0), SYMBOL })}
                    </div>
                  )}
                </div>
              )}

              {/* Barra de progresso (sem texto) */}
              <div
                className="h-2 w-full bg-white/10 rounded-full overflow-hidden"
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={t('info.sold_short')}
                title={`${progress.toFixed(1)}%`}
              >
                <div className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500" style={{ width: `${progress}%` }} />
              </div>

              {/* Mensagem fixa */}
              <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-3 py-2 text-[11px] sm:text-xs text-yellow-300">
                {t('hint.buy_any')}
              </div>

              {/* Carteira + saldos */}
              {isConnected && (
                <>
                  <div className="flex justify-between items-center text-[11px] sm:text-xs text-gray-400">
                    <span>{t('wallet.address')}</span>
                    <span className="flex items-center gap-2">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                      <button onClick={() => copyToClipboard(address!)} className="bg-gray-800 px-2 py-1 rounded text-[11px]">📋</button>
                      {copied && <span className="text-green-400">{t('wallet.copied')}</span>}
                      <button onClick={() => disconnect()} className="bg-red-700/90 px-2 py-1 rounded">{t('wallet.disconnect')}</button>
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs">
                    <span className="px-2 py-1 rounded-full bg-white/10">BNB {balBNB?.formatted ? Number(balBNB.formatted).toFixed(4) : '--'}</span>
                    <span className="px-2 py-1 rounded-full bg-white/10">USDT {balUSDT?.formatted ? Number(balUSDT.formatted).toFixed(2) : '--'}</span>
                  </div>
                  {connectedTip ? (
                    <div className="text-[11px] text-green-400 mt-1">{connectedTip}</div>
                  ) : null}
                </>
              )}

              {/* Campo de valor + seletor */}
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder={t('form.placeholder', { ASSET: asset })}
                    value={amountStr}
                    onChange={(e) => setAmountStr(sanitize(e.target.value))}
                    className="w-full h-11 sm:h-12 px-3 pr-32 sm:pr-36 rounded-full bg-black/70 text-white placeholder-gray-500 border border-white/15 focus:ring-2 focus:ring-purple-600 outline-none"
                    disabled={!isConnected || ended}
                    autoComplete="off"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <button
                      onClick={() => setAsset(asset === 'BNB' ? 'USDT' : 'BNB')}
                      className="px-3 h-9 sm:h-10 rounded-full bg-white text-black text-sm font-semibold min-w-[66px] sm:min-w-[70px]"
                      title={t('form.switch_currency')}
                      disabled={!isConnected}
                    >
                      {asset}
                    </button>
                    <button
                      onClick={setMax}
                      className="px-3 h-9 sm:h-10 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs"
                      disabled={!isConnected}
                    >
                      {t('form.max')}
                    </button>
                  </div>
                </div>

                {/* Mínimo */}
                <div className="text-[11px] sm:text-xs text-gray-400">
                  {t('form.min_note', { MIN_USD: money(minUsd, 'USD', 2), BRL_PART: brlMinPart })}
                </div>
              </div>

              {/* Resumo */}
              {!!amount && (
                <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-sm">
                    {t('summary.you_will_receive', { AMT: nf(tokensOut, 2), SYMBOL })}
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-300 mt-1">
                    {t('summary.estimated_total', { USD: money(estUsd, 'USD', 2), BRL_PART: brlTotalPart })}
                  </div>
                </div>
              )}

              {/* Estados */}
              {loading && <div className="text-center text-sm text-purple-300">{t('misc.loading')}</div>}
              {error && <p className="text-sm text-red-500">{error}</p>}

              {/* Ações */}
              {!isConnected ? (
                <div className="w-full flex justify-center">
                  <button onClick={openWalletModal} className="w-full h-11 sm:h-12 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold">
                    {t('cta.connect_wallet')}
                  </button>
                </div>
              ) : chainId !== BSC_CHAIN_ID ? (
                <button onClick={() => switchChain?.({ chainId: BSC_CHAIN_ID })} className="w-full h-11 sm:h-12 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg">
                  {t('cta.switch_bsc')}
                </button>
              ) : asset === 'USDT' && !allowanceOk ? (
                <button onClick={approveUSDT} disabled={!!disabledReason || checkingAllow || buying} className="w-full h-11 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg disabled:opacity-40">
                  {buying ? t('cta.approving') : t('cta.approve_usdt')}
                </button>
              ) : (
                <button onClick={buy} disabled={!!disabledReason || buying} className="w-full h-11 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg disabled:opacity-40">
                  {buying ? t('cta.processing') : t('cta.confirm', { ASSET: asset })}
                </button>
              )}

              {/* Motivo do disable */}
              {!!disabledReason && isConnected && <p className="text-[11px] sm:text-xs text-center text-gray-400 mt-1">{disabledReason}</p>}

              <p className="text-[10px] sm:text-[11px] text-center text-gray-500">{t('footer.legal')}</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
