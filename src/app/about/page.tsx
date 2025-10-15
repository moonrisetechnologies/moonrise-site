// SPDX-License-Identifier: MIT
'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaInstagram, FaTiktok, FaXTwitter } from 'react-icons/fa6';
import LegalDisclaimer from '../components/LegalDisclaimer';

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay: 0.1 * i, ease: 'easeOut' },
});

export default function AboutCompanyPage() {
  const { t } = useTranslation('about');
  const { t: tTransp } = useTranslation('transparencia');

  const [showFounder, setShowFounder] = useState(false);

  const stats = t('stats', { returnObjects: true }) as { value: string; label: string }[];
  const whoParas = t('who.paragraphs', { returnObjects: true }) as string[];
  const purposeItems = t('purpose.items', { returnObjects: true }) as string[];
  const valueItems = t('values.items', { returnObjects: true }) as string[];
  const xpItems = t('experience.items', { returnObjects: true }) as string[];

  const EMAIL = 'contact@moonrise.finance';
  const EMAIL_HREF = `mailto:${EMAIL}`;
  const TELEGRAM_SUPPORT = 'https://t.me/moonrisesupport';
  const TELEGRAM_COMMUNITY = 'https://t.me/moonriseofficialcommunity';
  const IG_BR = 'https://www.instagram.com/moonriseoficial';
  const TIKTOK = 'https://www.tiktok.com/@moonriseoficial';
  const TWITTER = 'https://twitter.com/moonriseoficial';

  // >>> Link do fundador fica no page (não no i18n)
  const IG_FOUNDER = 'https://www.instagram.com/eufeelipearaujo';

  const cardBase =
    'relative rounded-2xl bg-white/3 border border-white/10 backdrop-blur-[1px]';
  const lineTop =
    'absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-t-2xl';

  return (
    <main className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* BG */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-40 -left-40 h-[720px] w-[720px] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side,#a855f7 0%,transparent 70%)',
            opacity: 0.18,
          }}
        />
        <div
          className="absolute -bottom-64 -right-40 h-[640px] w-[640px] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side,#f59e0b 0%,transparent 70%)',
            opacity: 0.14,
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_60%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        {/* HERO */}
        <motion.div {...fade(0)} className="text-center space-y-6">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-purple-300/80">
            {t('hero.tag')}
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05]">
            <span className="text-white">{t('title')}{' '}</span>
            <span className="bg-gradient-to-r from-purple-500 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg md:text-xl text-gray-300">
            {t('hero.lead')}
          </p>

          {/* STATS */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s, i) => (
              <motion.div key={i} {...fade(i)} className={`${cardBase} py-4 px-5 text-center`}>
                <span className="pointer-events-none absolute left-0 right-0 -bottom-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-b-2xl" />
                <div className="text-2xl md:text-3xl font-bold">{s.value}</div>
                <div className="text-xs md:text-sm text-gray-400">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* QUEM SOMOS */}
        <motion.section {...fade(1)} className="mt-20 md:mt-28">
          <h2 className="text-3xl md:4xl font-bold text-center mb-6">{t('who.title')}</h2>
          <div className="mx-auto max-w-3xl space-y-6 text-gray-300 text-lg">
            {(whoParas || []).map((p, i) => (
              <div key={i}>
                <p>{p}</p>
                <div className="mt-6 h-px bg-gradient-to-r from-white/12 to-transparent" />
              </div>
            ))}
          </div>

          {/* Botão: Fundador */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowFounder(true)}
              className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 text-sm font-semibold"
              aria-haspopup="dialog"
              aria-controls="founder-modal"
            >
              {t('founder.open_btn')}
            </button>
          </div>
        </motion.section>

        {/* PARA QUE VIEMOS & VALORES */}
        <section className="mt-16 grid md:grid-cols-2 gap-6">
          <motion.div {...fade(0)} className={`${cardBase} p-6 md:p-8`}>
            <span className={lineTop} />
            <h3 className="text-2xl font-semibold mb-3">{t('purpose.title')}</h3>
            <ul className="space-y-2 text-gray-300">
              {purposeItems.map((it, i) => <li key={i}>• {it}</li>)}
            </ul>
          </motion.div>

          <motion.div {...fade(1)} className={`${cardBase} p-6 md:p-8`}>
            <span className={lineTop} />
            <h3 className="text-2xl font-semibold mb-3">{t('values.title')}</h3>
            <ul className="space-y-2 text-gray-300">
              {valueItems.map((it, i) => <li key={i}>• {it}</li>)}
            </ul>
          </motion.div>
        </section>

        {/* EXPERIÊNCIA */}
        <motion.section {...fade(2)} className="mt-16">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">{t('experience.title')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {xpItems.map((it, i) => (
              <motion.div key={i} {...fade(i)} className={`${cardBase} p-6 text-gray-300`}>
                <span className={lineTop} />
                {it}
              </motion.div>
            ))}
          </div>
        </motion.section>



        {/* CONTATO */}
        <motion.section {...fade(4)} className="mt-24">
          <ContactBlock
            t={t}
            tTransp={tTransp}
            emailHref={EMAIL_HREF}
            telegramSupport={TELEGRAM_SUPPORT}
            telegramCommunity={TELEGRAM_COMMUNITY}
            igBR={IG_BR}
            tiktok={TIKTOK}
            twitter={TWITTER}
            cardBase={cardBase}
            lineTop={lineTop}
          />
        </motion.section>

        <footer className="w-full mt-20 py-6 text-center text-sm text-gray-500">
          {new Date().getFullYear()} © MOONRISE. All rights reserved.
        </footer>
      </section>

      {/* MODAL: Fundador */}
      {showFounder && (
        <FounderModal onClose={() => setShowFounder(false)} igFounderUrl={IG_FOUNDER} />
      )}
    </main>
  );
}

/* ====== Subcomponentes ====== */

function ContactBlock({
  t,
  tTransp,
  emailHref,
  telegramSupport,
  telegramCommunity,
  igBR,
  tiktok,
  twitter,
  cardBase,
  lineTop,
}: any) {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <div className={`${cardBase} ring-1 ring-purple-500/10 shadow-[0_0_25px_rgba(168,85,247,0.08)]`}>
        <span className={lineTop} />
        <div className="py-10 px-6 text-center space-y-5">
          <h3 className="text-3xl md:text-4xl font-extrabold">
            <span className="bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
              {t('contact.title')}
            </span>
          </h3>

          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
            {t('contact.summary')}
          </p>

          <a
            href={emailHref}
            className="inline-block text-blue-300 hover:text-blue-200 underline break-words"
          >
            contact@moonrise.finance
          </a>

          <div>
            <a
              href={telegramSupport}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold text-black
                         bg-yellow-500 hover:bg-yellow-400 transition shadow-[0_10px_30px_rgba(245,158,11,0.25)]
                         focus:outline-none focus:ring-2 focus:ring-purple-400"
              aria-label={t('cta.contact')}
            >
              <FaTelegramPlane className="text-base translate-y-[0.5px]" />
              {t('cta.contact')}
            </a>
          </div>

          <div className="h-px bg-white/10 my-2" />

          <div className="text-[12px] text-gray-400 flex items-center justify-center gap-2">
            <LegalDisclaimer
              label={tTransp('docs_links.termo_link')}
              className="text-[12px] text-purple-300 underline underline-offset-4 hover:text-purple-100"
            />
          </div>

          {/* Redes */}
          <div className="pt-6">
            <p className="text-sm text-gray-400 mb-4">{t('contact.channels_title')}</p>
            <div className="flex justify-center gap-6 text-xl">
              <a
                href={telegramCommunity}
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram"
                aria-label="Telegram oficial MoonRise"
                className="hover:text-purple-300 transition"
              >
                <FaTelegramPlane />
              </a>

              <a
                href={igBR}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                aria-label="Instagram oficial MoonRise"
                className="hover:text-purple-300 transition"
              >
                <FaInstagram />
              </a>

              <a
                href={tiktok}
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
                aria-label="TikTok oficial MoonRise"
                className="hover:text-purple-300 transition"
              >
                <FaTiktok />
              </a>

              <a
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                title="X (Twitter)"
                aria-label="Perfil no X (Twitter)"
                className="hover:text-purple-300 transition"
              >
                <FaXTwitter />
              </a>
            </div>
          </div>

          <p className="text-xs text-gray-500 pt-2">{t('contact.hours')}</p>
        </div>
      </div>
    </div>
  );
}

/* ====== FounderModal ====== */
function FounderModal({
  onClose,
  igFounderUrl,
}: {
  onClose: () => void;
  igFounderUrl?: string;
}) {
  const { t } = useTranslation('about');

  const title = (t('founder.modal.title', { defaultValue: '' }) as string) || '';

  // Corpo com parágrafos separados por \n\n no JSON
  const bodyRaw = (t('founder.modal.body', { defaultValue: '' }) as string) || '';
  const paragraphs = bodyRaw
    .split(/\n\s*\n/g)
    .map((s) => s.trim())
    .filter(Boolean);

  const rawHighlights = t('founder.modal.highlights', {
    returnObjects: true,
    defaultValue: [],
  }) as unknown;
  const highlights: string[] = Array.isArray(rawHighlights)
    ? rawHighlights.map(String).filter(Boolean)
    : [];

  const closing = (t('founder.modal.closing', { defaultValue: '' }) as string) || '';
  const verse = (t('founder.modal.verse', { defaultValue: '' }) as string) || '';

  // Só label no i18n; URL vem por prop
  const ctaLabel = (t('founder.modal.cta_label', { defaultValue: '' }) as string) || '';
  const closeLabel = (t('founder.modal.close', { defaultValue: 'Fechar' }) as string);
  const ariaClose = (t('founder.modal.aria_close', { defaultValue: closeLabel }) as string);

  const handleCta = () => {
    if (!igFounderUrl) return;
    window.open(igFounderUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="founder-modal"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4"
    >
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-zinc-950/95 p-6 md:p-8 text-white shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-3 top-2 text-2xl text-gray-400 hover:text-white focus:outline-none"
          aria-label={ariaClose}
        >
          &times;
        </button>

        {/* Header */}
        <div className="mb-4">
          <div className="h-[2px] w-24 bg-gradient-to-r from-purple-500 via-fuchsia-400 to-amber-300 rounded-full mb-3" />
          <h2 className="text-xl md:text-2xl font-bold leading-snug tracking-tight">{title}</h2>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto pr-1 custom-scroll">
          <div className="space-y-4 text-[15px] md:text-[15.5px] leading-relaxed text-gray-200">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            {!!highlights.length && (
              <ul className="mt-2 list-disc pl-5 space-y-2 text-gray-200/90">
                {highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}

            {closing && <p className="pt-2 text-gray-300">{closing}</p>}

            {verse && (
              <blockquote className="mt-2 border-l-2 border-white/15 pl-4 italic text-gray-300">
                {verse}
              </blockquote>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
          {!!igFounderUrl && !!ctaLabel && (
            <button
              onClick={handleCta}
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-black
                         bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 hover:brightness-110
                         shadow-[0_10px_30px_rgba(245,158,11,0.25)] transition focus:outline-none focus:ring-2 focus:ring-amber-300"
              aria-label={ctaLabel}
            >
              {ctaLabel}
            </button>
          )}

          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold
                       bg-white/5 hover:bg-white/10 border border-white/10 transition focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            {closeLabel}
          </button>
        </div>
      </div>

      {/* Scrollbar leve */}
      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 8px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); border-radius: 999px; }
        .custom-scroll:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,.22); }
      `}</style>
    </div>
  );
}
