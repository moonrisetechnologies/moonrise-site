// SPDX-License-Identifier: MIT
'use client';

import React, { useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaLock, FaRegCopy, FaCheck } from 'react-icons/fa';

import LegalDisclaimer from '../components/LegalDisclaimer';
import WhitepaperModal from '../components/WhitepaperModal';

/* ============================ ENDEREÇOS / LINKS ============================ */
const TOKEN_ADDR      = '0x8169A998A15142C94d3F03E5C51c216870FBE157';
const TOKEN_URL       = `https://bscscan.com/address/${TOKEN_ADDR}`;
const MASTERVAULT_URL = 'https://bscscan.com/address/0x732Dde35D139F764FCd642Ad7CDc633C2ED60DE6';
const EXPLORER        = 'https://bscscan.com/address';

/* ============================ CALENDÁRIOS (ATUALIZADO) ============================ */
type ScheduleItem = { date: string; amount: string };
const SCHEDULE: Record<string, ScheduleItem[]> = {
  liquidez: [
    { date: '05/04/2026', amount: '400M MRS' },
    { date: '05/05/2026', amount: '400M MRS' },
    { date: '05/06/2026', amount: '400M MRS' },
    { date: '05/07/2026', amount: '400M MRS' },
    { date: '05/08/2026', amount: '400M MRS' },
    { date: '05/09/2026', amount: '400M MRS' },
    { date: '05/10/2026', amount: '400M MRS' },
    { date: '05/11/2026', amount: '400M MRS' },
    { date: '05/12/2026', amount: '400M MRS' },
    { date: '05/01/2027', amount: '400M MRS' }
  ],
  desenvolvimento: [
    { date: '05/05/2026', amount: '120M MRS' },
    { date: '05/07/2026', amount: '120M MRS' },
    { date: '05/09/2026', amount: '120M MRS' },
    { date: '05/11/2026', amount: '120M MRS' },
    { date: '05/01/2027', amount: '120M MRS' }
  ],
  marketing: [
    { date: '05/05/2026', amount: '120M MRS' },
    { date: '05/07/2026', amount: '120M MRS' },
    { date: '05/09/2026', amount: '120M MRS' },
    { date: '05/11/2026', amount: '120M MRS' },
    { date: '05/01/2027', amount: '120M MRS' },
    { date: '05/03/2027', amount: '100M MRS' }
  ],
  ecossistema: [
    { date: '05/06/2026', amount: '100M MRS' },
    { date: '05/09/2026', amount: '100M MRS' },
    { date: '05/12/2026', amount: '100M MRS' },
    { date: '05/03/2027', amount: '50M MRS' }
  ],
  reserva: [
    { date: '05/01/2027', amount: '100M MRS' },
    { date: '05/08/2027', amount: '75M MRS' },
    { date: '05/03/2028', amount: '75M MRS' }
  ]
};

/* ============================ CARTEIRAS ============================ */
type Wallet = { key: string; address: string; founder?: boolean; warnKey?: string; };

// Do seu contrato (mesmos endereços; textos diferenciados via i18n)
const WALLETS: Wallet[] = [
  // PRÉ-VENDA — Distribuição de Recursos Iniciais
  { key: 'ecossistema_presale', address: '0x7c6e0128b390cD108d0D3B1976830943Ab7CDD6E' },
  { key: 'liquidez_presale',    address: '0xf3843Ec0571192EB109D12aba50F54d59a961E30' },
  { key: 'dev_init_ops',        address: '0x9d492BfD7690402acE4707A07dFF1639D4cE4127' },

  // OPERAÇÃO — pós-lançamento
  { key: 'liquidez',            address: '0xB25E9FD517b662CD5740dBB34F569f596E5f9992' },
  { key: 'ecossistema',         address: '0x2C521F6BC51B31EA4a1D366bc2d692Caf8423149' },

  // Demais grupos
  { key: 'desenvolvimento',     address: '0xD9Acf6D88586f363b7732cC3D566121A6c6ff1CF' },
  { key: 'marketing',           address: '0x0286f6AdE4635a736fe62F1355768122f4B282Ed' },
  { key: 'reserva',             address: '0xA91592ffD959110AE5aB1c6826725Cd939E783f8' },
  { key: 'admin',               address: '0x68ed81298FFb2BB260dBd329206186a1Fd41d90e', warnKey: 'wallets_notes.admin' },
  { key: 'fundador',            address: '0x00Ac5b001854Dd5F6c10124E5c1EB2ddF9a0931A', founder: true }
];

/* ============================ HELPERS VISUAIS ============================ */
const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay: 0.08 * i, ease: 'easeOut' }
});

export default function Transparency() {
  const { t } = useTranslation('transparencia');

  const dna         = t('dna', { returnObjects: true }) as string[];
  const proof       = t('proof', { returnObjects: true }) as string[];
  const badges      = t('protection.badges', { returnObjects: true }) as string[];
  const canItems    = t('governance.can.items', { returnObjects: true }) as string[];
  const cannotItems = t('governance.cannot.items', { returnObjects: true }) as string[];

  const cardBase = 'relative rounded-xl bg-white/3 border border-white/10 backdrop-blur-[1px]';

  return (
    <main className="relative bg-black text-white overflow-hidden">
      <Head>
        <title>{(t('seo.meta_title') as string) || ''}</title>
        <meta name="description" content={(t('seo.meta_description') as string) || ''} />
      </Head>

      {/* BACKDROP */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[720px] w-[720px] rounded-full blur-3xl" style={{ background: 'radial-gradient(closest-side,#a855f7 0%,transparent 70%)', opacity: .18 }} />
        <div className="absolute -bottom-64 -right-40 h-[640px] w-[640px] rounded-full blur-3xl" style={{ background: 'radial-gradient(closest-side,#f59e0b 0%,transparent 70%)', opacity: .14 }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_60%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      {/* HERO */}
      <header className="max-w-6xl mx-auto px-6 pt-16 pb-8 text-center">
        <motion.h1 {...fade(0)} className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]">
          {t('title')}
        </motion.h1>
        <motion.p {...fade(1)} className="mt-4 text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
          {t('intro')}
        </motion.p>
      </header>

      {/* DNA */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          {(dna || []).map((item, i) => (
            <motion.div key={i} {...fade(i)} className="text-sm text-gray-200">
              <p>{item}</p>
              <div className="mt-6 h-px bg-gradient-to-r from-white/12 to-transparent" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROVAS */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <motion.h2 {...fade(0)} className="text-3xl font-bold text-purple-300 mb-2">
          {t('proof_title')}
        </motion.h2>
        <motion.p {...fade(1)} className="text-gray-400 max-w-3xl mx-auto">
          {t('proof_intro')}
        </motion.p>

        <div className="mt-8 grid md:grid-cols-2 gap-4 text-left">
          {(proof || []).map((item, i) => (
            <motion.div key={i} {...fade(i)} className={`${cardBase} p-5 text-sm text-gray-200`}>
              <span className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-t-xl" />
              {item}
            </motion.div>
          ))}
        </div>
      </section>

      {/* GOVERNANÇA */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <motion.h2 {...fade(0)} className="text-3xl font-bold text-purple-300 text-center">
          {t('governance.title')}
        </motion.h2>
        <motion.p {...fade(1)} className="text-gray-400 text-center max-w-3xl mx-auto mt-2">
          {t('governance.intro')}
        </motion.p>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <motion.div {...fade(2)} className={`${cardBase} p-6 ring-1 ring-emerald-500/30`}>
            <h4 className="text-lg font-semibold text-emerald-300 mb-2">{t('governance.can.title')}</h4>
            <ul className="list-disc ml-5 space-y-2 text-sm text-gray-300">
              {(canItems || []).map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </motion.div>

          <motion.div {...fade(3)} className={`${cardBase} p-6 ring-1 ring-red-500/30`}>
            <h4 className="text-lg font-semibold text-red-300 mb-2">{t('governance.cannot.title')}</h4>
            <ul className="list-disc ml-5 space-y-2 text-sm text-gray-300">
              {(cannotItems || []).map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* OPERAÇÃO */}
      <section className="max-w-6xl mx-auto px-6 py-10 text-center">
        <motion.h2 {...fade(0)} className="text-3xl font-bold text-purple-300">
          {t('ops.title')}
        </motion.h2>
        <motion.p {...fade(1)} className="text-gray-300 max-w-4xl mx-auto mt-3">
          {t('ops.body')}
        </motion.p>
      </section>

      {/* LIQUIDEZ & DEFESA */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h3 className="text-2xl font-semibold mb-4">{t('liquidity.title')}</h3>
        <div className={`${cardBase} p-6 ring-1 ring-amber-400/30`}>
          <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
            {(t('liquidity.items', { returnObjects: true }) as string[]).map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </div>
      </section>

      {/* ECONOMIA INTERNA */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <motion.p {...fade(0)} className="text-gray-300 max-w-4xl mx-auto">
          {t('protection.summary')}
        </motion.p>

        <motion.div {...fade(1)} className={`${cardBase} mt-6 p-6`}>
          <h4 className="text-xl font-semibold text-purple-300 mb-2">{t('protection.internalEconomyTitle')}</h4>
          <p className="text-sm text-gray-300">{t('protection.internalEconomy')}</p>
        </motion.div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {(badges || []).map((label, i) => (
            <motion.div key={i} {...fade(i)} className="text-center">
              <FaLock className="mx-auto text-purple-300 text-3xl mb-2" aria-hidden />
              <span className="text-sm text-gray-300">{label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CALENDÁRIO */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <motion.h2 {...fade(0)} className="text-3xl font-bold text-purple-300">
          {t('release_schedule.title')}
        </motion.h2>
        <div className="mt-6">
          <ReleaseScheduleTabs t={t} cardBase={cardBase} />
        </div>
      </section>

      {/* LOCK REASON */}
      <section className="max-w-6xl mx-auto px-6 py-14 text-center">
        <motion.h2 {...fade(0)} className="text-3xl font-bold text-purple-300">
          {t('lock_reason.title')}
        </motion.h2>
        <motion.p {...fade(1)} className="text-base text-gray-400 max-w-3xl mx-auto mt-3">
          {t('lock_reason.paragraph_1')}
        </motion.p>
        <motion.p {...fade(2)} className="text-base text-gray-400 max-w-3xl mx-auto mt-2">
          {t('lock_reason.paragraph_2')}
        </motion.p>
        <motion.p {...fade(2)} className="text-base text-gray-400 max-w-3xl mx-auto mt-2">
          {t('lock_reason.paragraph_3')}
        </motion.p>

        <motion.a
          {...fade(3)}
          href={MASTERVAULT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-purple-600 hover:bg-purple-700 transition px-6 py-2 rounded-full text-white font-semibold shadow mt-5 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          {t('lock_reason.button')}
        </motion.a>
      </section>

      {/* CARTEIRAS */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-purple-300 text-center">{t('wallets_title')}</h2>
        <p className="text-center text-base text-gray-400 mt-2">{t('wallets_lead')}</p>
        <WalletsTabs t={t} cardBase={cardBase} wallets={WALLETS} />
      </section>

      {/* DOCUMENTOS */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className={`${cardBase} mx-auto max-w-3xl p-6 text-sm text-gray-300 text-center space-y-4`}>
          <span className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-t-xl" />
          <h2 className="text-xl font-bold text-purple-200">{t('docs_title')}</h2>

          <p>
            {t('docs.token_label')}{' '}
            ({`${TOKEN_ADDR.slice(0,7)}...${TOKEN_ADDR.slice(-5)}`}){' '}
            <a href={TOKEN_URL} className="underline text-blue-400" target="_blank" rel="noopener noreferrer">
              {t('docs_links.token_explorer')}
            </a>
          </p>

          <p className="text-xs">
            <LegalDisclaimer triggerKey="disclaimer.trigger" dot />
          </p>

          <p className="text-[12px]">
            <WhitepaperModal
              label={t('whitepaper.label')}
              className="text-[12px] text-purple-300 underline underline-offset-4 hover:text-purple-100"
            />
          </p>
        </div>
      </section>

      <footer className="w-full py-6 text-center text-sm text-gray-500">
        {t('footer')}
      </footer>
    </main>
  );
}

/* ============================ SUBCOMPONENTES ============================ */
function ScrollingTabs<T extends string>({
  tabs, active, onChange
}: { tabs: { key: T; label: string }[]; active: T; onChange: (k: T) => void; }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      {/* Fade nas bordas, sem setas */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-black to-transparent" />

      <div ref={containerRef} className="no-scrollbar overflow-x-auto -mx-2 px-2" role="tablist" aria-label="tabs">
        <div className="inline-flex gap-1 rounded-full bg-white/5 border border-white/10 p-1 shadow-sm min-w-max">
          {tabs.map(tab => {
            const selected = active === tab.key;
            return (
              <button
                key={String(tab.key)}
                role="tab"
                aria-selected={selected}
                onClick={() => onChange(tab.key)}
                className={`px-3 sm:px-4 py-1.5 text-sm rounded-full transition whitespace-nowrap ${selected ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-white/10'}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ReleaseScheduleTabs({ t, cardBase }: { t: (k: string, o?: any) => any; cardBase: string; }) {
  const order = ['liquidez', 'marketing', 'desenvolvimento', 'ecossistema', 'reserva'] as const;
  type K = typeof order[number];
  const [active, setActive] = useState<K>('liquidez');

  const tabs = order.map(k => ({ key: k, label: t(`wallets.${k}`) as string }));
  const rows = SCHEDULE[active] || [];

  const units = t('release_schedule.units', { returnObjects: true }) as { million?: string; billion?: string; token_suffix?: string; };
  const millionLabel = units?.million || 'milhões';
  const billionLabel = units?.billion || 'bilhões';
  const tokenSuffix  = units?.token_suffix || 'MRS';

  const totalM = rows.reduce((acc, r) => acc + (parseFloat(r.amount.replace(/[^0-9.]/g, '')) || 0), 0);
  const formatHuman = (m: number) => (m >= 1000 ? `${(m/1000).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} ${billionLabel}` : `${m.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} ${millionLabel}`);

  return (
    <div className="mx-auto max-w-3xl">
      <ScrollingTabs tabs={tabs} active={active} onChange={setActive} />
      <div id="scheduleCard" className={`${cardBase} mt-5 p-5 text-left`}>
        <span className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-t-xl" />
        <div className="flex items-center justify-between">
          <h3 className="text-purple-300 font-semibold text-lg">{t(`wallets.${active}`)}</h3>
          <div className="text-xs text-gray-400">
            {t('release_schedule.total_prefix')}{' '}
            <span className="text-gray-2 00 font-medium">{formatHuman(totalM)} {tokenSuffix}</span>
          </div>
        </div>
        <ul className="mt-3 space-y-2">
          {rows.map((row, i) => (
            <li key={i} className="relative pl-6 py-2 border-b border-white/10 last:border-b-0">
              <span className="absolute left-1 top-3 h-2 w-2 rounded-full bg-purple-400" aria-hidden />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">{row.date}</span>
                <span className="font-medium text-gray-100">{row.amount}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WalletsTabs({
  t, cardBase, wallets
}: { t: (k: string, o?: any) => any; cardBase: string; wallets: Wallet[]; }) {
  const groups = [
    { id: 'operacao',    label: t('wallet_groups.operacao') as string,    keys: ['liquidez','ecossistema'] },
    { id: 'crescimento', label: t('wallet_groups.crescimento') as string, keys: ['marketing','desenvolvimento'] },
    { id: 'estabilidade',label: t('wallet_groups.estabilidade') as string,keys: ['reserva','fundador'] },
    // PRÉ-VENDA com textos dedicados
    { id: 'distribuicao',label: t('wallet_groups.distribuicao') as string,keys: ['ecossistema_presale','liquidez_presale','dev_init_ops'] },
    { id: 'controle',    label: t('wallet_groups.controle') as string,    keys: ['admin'] }
  ] as const;

  type G = typeof groups[number]['id'];
  const [active, setActive] = useState<G>('operacao');

  const tabs = groups.map(g => ({ key: g.id, label: g.label }));
  const list = useMemo(() => {
    const g = groups.find(g=>g.id===active)!;
    return g.keys.map(k => wallets.find(w=>w.key===k)!).filter(Boolean);
  }, [active, wallets]);

  return (
    <div className="mt-6">
      <ScrollingTabs tabs={tabs} active={active} onChange={setActive} />
      <div className={`${cardBase} mt-5 p-0 overflow-hidden`}>
        <span className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-t-xl" />
        <ul role="list" className="divide-y divide-white/10">
          {list.map((w) => (
            <WalletRow
              key={w.key}
              label={t(`wallets.${w.key}`) as string}
              desc={t(`wallets_desc.${w.key}`) as string}
              address={w.address}
              founder={w.founder}
              warnText={w.warnKey ? (t(w.warnKey) as string) : ''}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function WalletRow({
  label, desc, address, founder, warnText
}: { label: string; desc: string; address: string; founder?: boolean; warnText?: string; }) {
  const { t } = useTranslation('transparencia');
  const [copied, setCopied] = useState(false);
  const announcerRef = useRef<HTMLDivElement>(null);

  return (
    <li className="px-5 py-4 grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
      <div className="md:col-span-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{label}</h3>
        </div>
        <p className="text-xs text-gray-400 mt-1">{desc || ''}</p>
        {founder && (
          <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
            <FaLock aria-hidden /> {t('wallets_locked_note')}
          </p>
        )}
        {warnText && <p className="text-amber-300/90 text-[11px] mt-1">{warnText}</p>}
      </div>

      <div className="md:col-span-5 font-mono text-sm text-purple-300">
        {formatAddress(address)}
        <button
          onClick={async ()=>{
            try{
              await navigator.clipboard.writeText(address);
              setCopied(true);
              if(announcerRef.current) announcerRef.current.textContent = t('aria.copy_address') as string;
              setTimeout(()=>{
                setCopied(false);
                if(announcerRef.current) announcerRef.current.textContent='';
              },1000);
            }catch{}
          }}
          className="ml-2 p-1 rounded-md border border-white/10 hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label={t('aria.copy_address') as string}
        >
          {copied ? <FaCheck className="text-green-400" /> : <FaRegCopy />}
        </button>
        <div className="sr-only" aria-live="polite" ref={announcerRef} />
      </div>

      <div className="md:col-span-4 text-right">
        <a href={`${EXPLORER}/${address}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-sm">
          {t('wallets.view_on_explorer')}
        </a>
      </div>
    </li>
  );
}

/* ============================ CSS extra ============================ */
/* Adicione no seu CSS global:
.no-scrollbar::-webkit-scrollbar{ display:none; }
.no-scrollbar{ -ms-overflow-style:none; scrollbar-width:none; }
*/
