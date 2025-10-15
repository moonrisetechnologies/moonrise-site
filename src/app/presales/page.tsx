// SPDX-License-Identifier: MIT
'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ethers, formatUnits } from 'ethers';
import contractAbi from '../../abi/PresaleABI.json';
import PresalePanel from '../components/presalepanel';
import { FaRocket, FaWater, FaCogs, FaLayerGroup, FaGlobeAmericas } from 'react-icons/fa';

const CONTRACT_ADDRESS = '0xdA89B77ef1770051685039911B64D2C6C2E85891';
const TOTAL_PHASES = 7;                 // contrato novo
const MIN_USDT = 5;                     // mínimo oficial (USDT)
const SHOW_TEST_BURN_NOTICE = true;     // texto vem do i18n (notice.testBurn)

type PhaseInfo = { idx: number; cap: number; sold: number; priceUsd: number };

export default function Presales() {
  const { t, i18n } = useTranslation('presales');
  const [showPresale, setShowPresale] = useState(false);

  const [currentPhase, setCurrentPhase] = useState<number | null>(null);
  const [phases, setPhases] = useState<PhaseInfo[]>([]);

  // Hidrata do cache ANTES da 1ª pintura
  const [totalSold, setTotalSold] = useState<number | null>(() => {
    try {
      const cached = Number(localStorage.getItem('mrs_total_sold') || 'NaN');
      return Number.isFinite(cached) && cached > 0 ? cached : null;
    } catch {
      return null;
    }
  });
  // Não começar em 0 para não “piscar”
  const [animatedSold, setAnimatedSold] = useState<number | null>(null);
  const [loadingSold, setLoadingSold] = useState<boolean>(true);
  const loadStartRef = useRef<number>(performance.now());

  const isPT = i18n.language?.toLowerCase().startsWith('pt');

  // Cotações (somente para exibir min em BNB)
  const [bnbToUSD, setBnbToUSD] = useState<number | null>(null);
  const [bnbToBRL, setBnbToBRL] = useState<number | null>(null);

  const brandTitle =
    'font-extrabold tracking-tight bg-gradient-to-r from-purple-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent';

  /* ---------- Provider/Contract ---------- */
  const provider = useMemo(
    () => new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org'),
    []
  );
  const contract = useMemo(
    () => new ethers.Contract(CONTRACT_ADDRESS, contractAbi, provider),
    [provider]
  );

  /* ---------- Leitura on-chain ---------- */
  const loadAll = async () => {
    try {
      setLoadingSold(true);
      loadStartRef.current = performance.now();

      // currentPhase() => (idx, priceUsd, cap, sold)
      const cur = await contract.currentPhase();
      const curIdx = Number(cur?.[0] ?? 0);
      setCurrentPhase(Number.isFinite(curIdx) ? curIdx : 0);

      // panelPhasesSnapshot() => (caps[7], sold[7], priceUsd[7])
      const snap = await contract.panelPhasesSnapshot();
      const [capsRaw, soldRaw, priceRaw] = snap as [bigint[], bigint[], bigint[]];

      const capsArr  = capsRaw.map((x)  => Number(formatUnits(x, 18)));
      const soldArr  = soldRaw.map((x)  => Number(formatUnits(x, 18)));
      const priceArr = priceRaw.map((x) => Number(formatUnits(x, 18))); // USD (18 decimais)

      const infos: PhaseInfo[] = Array.from({ length: TOTAL_PHASES }, (_, i) => ({
        idx: i,
        cap: capsArr[i] ?? 0,
        sold: soldArr[i] ?? 0,
        priceUsd: priceArr[i] ?? 0,
      }));

      // totalSold() oficial (fallback na soma do snapshot)
      let total = 0;
      try {
        const totalWei = await contract.totalSold();
        total = Math.floor(Number(formatUnits(totalWei, 18)));
      } catch (e) {
        console.warn('totalSold() indisponível, usando snapshot:', e);
        total = infos.reduce((acc, p) => acc + Math.floor(p.sold || 0), 0);
      }

      setPhases(infos);

      // Aplica total calculado (se vier 0 legítimo, mostraremos 0 — mas sem piscar)
      setTotalSold(Number.isFinite(total) ? total : 0);
      localStorage.setItem('mrs_total_sold', String(total));
    } catch (e) {
      console.warn('Falha ao carregar snapshot on-chain:', e);
    } finally {
      // Delay mínimo do skeleton (ex.: 350ms) para evitar flicker
      const elapsed = performance.now() - loadStartRef.current;
      const rest = Math.max(0, 350 - elapsed);
      setTimeout(() => setLoadingSold(false), rest);
    }
  };

  useEffect(() => {
    loadAll();
    const id = setInterval(loadAll, 10_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- Cotações ---------- */
  useEffect(() => {
    let alive = true;
    const loadPrices = async () => {
      try {
        const ctrl = new AbortController();
        const to = setTimeout(() => ctrl.abort(), 7_000);

        const [usdtRes, brlRes] = await Promise.all([
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT', { signal: ctrl.signal }),
          fetch('https://api.binance.com/api/v3/ticker/price?symbol=BNBBRL',  { signal: ctrl.signal }),
        ]);

        clearTimeout(to);

        const pUSDT = Number((await usdtRes.json())?.price);
        const pBRL  = Number((await brlRes.json())?.price);
        if (alive) {
          if (pUSDT > 0) setBnbToUSD(pUSDT);
          if (pBRL  > 0) setBnbToBRL(pBRL);
        }
      } catch (e) {
        console.warn('Falha ao obter cotações BNB:', e);
      }
    };
    loadPrices();
    const id = setInterval(loadPrices, 30_000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  /* ---------- Animação contador ---------- */
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (totalSold === null) return;                 // ainda sem dado
    const start = animatedSold ?? totalSold;        // 1ª vez: pula direto p/ valor
    const end = totalSold;
    if (start === end) { setAnimatedSold(end); return; }

    const dur = 500;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const val = Math.round((start as number) + (end - (start as number)) * p);
      setAnimatedSold(val);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSold]);

  /* ---------- Helpers ---------- */
  const cardBase = 'relative rounded-xl bg-white/3 border border-white/10 backdrop-blur-[1px]';
  const nf = (n: number, d = 0) =>
    Number.isFinite(n) ? n.toLocaleString(isPT ? 'pt-BR' : 'en-US', { maximumFractionDigits: d }) : '0';
  const priceFiat = (bnb: number) => {
    if (!bnb || bnb <= 0) return '';
    if (isPT) {
      return bnbToBRL
        ? ` (≈ ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 5 }).format(bnb * bnbToBRL)})`
        : '';
    }
    return bnbToUSD
      ? ` (≈ ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 5 }).format(bnb * bnbToUSD)})`
      : '';
  };

  const minBnb = bnbToUSD ? MIN_USDT / bnbToUSD : null;

  return (
    <>
      <main className="min-h-screen bg-black text-white px-6 pt-20 md:pt-24 pb-16 max-w-5xl mx-auto">
        {/* HERO */}
        <section className="mb-14 md:mb-16 text-center">
          <h1 className={`text-3xl md:text-4xl lg:text-5xl ${brandTitle} mb-3 drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]`}>
            {t('hero.title')}
          </h1>
          <p className="text-base md:text-lg text-gray-300 mb-7 max-w-3xl mx-auto">{t('hero.description')}</p>
          <button
            onClick={() => setShowPresale(true)}
            className="inline-flex items-center justify-center bg-yellow-500 text-black px-6 py-2.5 rounded-xl font-semibold hover:bg-yellow-400 active:scale-[0.99] transition shadow-[0_10px_22px_rgba(245,158,11,0.22)]"
            aria-label={t('hero.button')}
          >
            {t('hero.button')} ↗
          </button>
        </section>

        {/* CONTADOR (TOTAL VENDIDO) */}
        <section className="mb-16 flex justify-center">
          <div className={`${cardBase} px-7 py-5 text-center w-full max-w-xs`} aria-live="polite" aria-atomic="true">
            <span className="pointer-events-none absolute left-0 right-0 -bottom-[1px] h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-b-xl" />
            <p className="text-xs text-gray-400 mb-1.5 font-medium">{t('phases.counterTitle')}</p>

            {loadingSold || totalSold === null || animatedSold === null ? (
              <div className="h-[38px] md:h-[44px] w-36 mx-auto rounded-md bg-white/10 animate-pulse" />
            ) : (
              <p className="text-3xl md:text-4xl font-extrabold text-yellow-400 tracking-wide mb-1">
                {nf(animatedSold)} MRS
              </p>
            )}

            <a
              href="https://t.me/moonbuynotifications"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-1 block text-center text-[12px] text-gray-400 hover:text-yellow-400 transition underline"
            >
              {t('phases.notificationsLink')}
            </a>
          </div>
        </section>

        {/* BOTÕES – Tokenomics / Transparência */}
        <section className="mb-14">
          <div className="mx-auto w-full max-w-2xl">
            <div className="flex flex-col sm:flex-row justify-center items-stretch gap-3.5">
              <Link href="/tokenomics" className="w-full sm:w-auto" aria-label={t('buttons.tokenomics')}>
                <span className="block w-full text-center px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white font-semibold shadow-lg hover:opacity-90 active:opacity-80 focus:outline-none focus:ring-2 focus:ring-purple-400 transition">
                  📊 {t('buttons.tokenomics')}
                </span>
              </Link>
              <Link href="/transparency" className="w-full sm:w-auto" aria-label={t('buttons.transparency')}>
                <span className="block w-full text-center px-7 py-3 rounded-xl border border-yellow-500 text-yellow-400 font-semibold shadow-lg hover:bg-yellow-500 hover:text-black active:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition">
                  🔎 {t('buttons.transparency')}
                </span>
              </Link>
            </div>
            <p className="mt-3 text-center text-xs md:text-sm text-gray-300">{t('buttons.helper')}</p>
          </div>
        </section>

        {/* REDE (BNB) */}
        <section className="mb-12">
          <h2 className={`text-xl md:text-2xl mb-2 ${brandTitle}`}>{t('network.title')}</h2>
          <p className="text-gray-400 max-w-3xl">{t('network.description1')}</p>
          <p className="text-gray-400 mt-3">{t('network.description2')}</p>
        </section>

        {/* ESTRUTURA */}
        <section className="mb-12">
          <h2 className={`text-xl md:text-2xl mb-2 ${brandTitle}`}>{t('structure.title')}</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2 mb-2">
            <li>{t('structure.token')}</li>
            <li>{t('structure.smart')}</li>
            <li>{t('structure.phases7')}</li>
            <li>{t('structure.delivery')}</li>
            <li>
              Valor mínimo por transação: {MIN_USDT} USDT
              <span className="opacity-60"> ou </span>
              {bnbToUSD
                ? `${(MIN_USDT / bnbToUSD).toLocaleString(isPT ? 'pt-BR' : 'en-US', { maximumFractionDigits: 6 })} BNB${priceFiat(MIN_USDT / (bnbToUSD || 1))}`
                : '— BNB'}
            </li>
            <li>{t('structure.network')}</li>
          </ul>
          <p className="mt-3 text-center">
            <a
              href={`https://bscscan.com/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-sm text-yellow-400 hover:underline transition"
            >
              {t('structure.contractLink')}
            </a>
          </p>
        </section>

        {/* PROPÓSITO */}
        <section className="mb-12">
          <h2 className={`text-xl md:text-2xl mb-2 ${brandTitle}`}>{t('purpose.title')}</h2>
          <p className="text-gray-400 max-w-3xl">{t('purpose.description')}</p>
        </section>

        {/* UTILIDADE */}
        <section className="mb-12">
          <h2 className={`text-xl md:text-2xl mb-2 ${brandTitle}`}>{t('utility.title')}</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>{t('utility.use1')}</li>
            <li>{t('utility.use2')}</li>
            <li>{t('utility.use3')}</li>
            <li>{t('utility.use4')}</li>
            <li>{t('utility.use5')}</li>
          </ul>
        </section>

        {/* SEGURANÇA */}
        <section className="mb-12">
          <h2 className={`text-xl md:text-2xl mb-2 ${brandTitle}`}>{t('security.title')}</h2>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>{t('security.point1')}</li>
            <li>{t('security.point2')}</li>
            <li>{t('security.point3')}</li>
            <li>{t('security.point4')}</li>
          </ul>
        </section>

        {/* ROADMAP */}
        <section className="mb-20">
          <h2 className={`text-xl md:text-2xl mb-5 ${brandTitle}`}>{t('roadmap.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { Icon: FaRocket,        text: t('roadmap.step1') },
              { Icon: FaWater,         text: t('roadmap.step2') },
              { Icon: FaCogs,          text: t('roadmap.step3') },
              { Icon: FaLayerGroup,    text: t('roadmap.step4') },
              { Icon: FaGlobeAmericas, text: t('roadmap.step5') },
            ].map(({ Icon, text }, i) => (
              <div key={i} className="relative rounded-xl bg-white/3 border border-white/10 p-4 text-center hover:translate-y-[-2px] transition">
                <span className="pointer-events-none absolute left-0 right-0 -bottom-[1px] h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-b-xl" />
                <Icon className="mx-auto mb-2 text-2xl text-purple-300" aria-hidden="true" />
                <p className="text-sm font-medium text-white leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CHAMADA FINAL */}
        <section className="mb-12 text-center">
          <p className={`text-lg font-semibold ${brandTitle}`}>{t('call.title')}</p>
          <p className="text-gray-400 mt-3 max-w-3xl mx-auto">{t('call.description')}</p>
        </section>

        {/* DISCLAIMER */}
        <section className="border-t border-neutral-800 pt-6 pb-8">
          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-gray-400">
            {t('legal.disclaimer')}
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-black">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center text-sm text-gray-500">
          {new Date().getFullYear()} © MOONRISE. All rights reserved.
        </div>
      </footer>

      {/* MODAL DE PRÉ-VENDA */}
      {showPresale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <PresalePanel />
          <button
            onClick={() => setShowPresale(false)}
            className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded"
          >
            {t('closeButton')}
          </button>
        </div>
      )}
    </>
  );
}
