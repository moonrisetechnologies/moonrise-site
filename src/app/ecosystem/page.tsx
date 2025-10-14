'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';

type Item = {
  key: string;
  highlight?: boolean;
  href?: string;
};

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay: 0.06 * i, ease: 'easeOut' },
});

const isArray = (v: unknown): v is unknown[] => Array.isArray(v);

function Card({ item, i = 0 }: { item: Item; i?: number }) {
  const { t } = useTranslation('ecosystem');
  const isHighlight = !!item.highlight;

  // i18n lookups
  const baseKey = `items.${item.key}`;
  const title = t(`${baseKey}.title`) as string;
  const badge = (t(`${baseKey}.badge`, { defaultValue: '' }) as string) || undefined;
  const rawDesc = t(`${baseKey}.desc`, { returnObjects: true }) as unknown;
  const bullets = isArray(rawDesc) ? (rawDesc as string[]) : null;
  const paragraph = !bullets ? (t(`${baseKey}.desc`) as string) : null;

  const Wrapper = (item.href ? Link : 'div') as any;
  const wrapperProps: any = item.href ? { href: item.href, prefetch: false, 'aria-label': title } : {};

  return (
    <motion.div {...fade(i)}>
      <Wrapper
        className={[
          'relative block h-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur-[1px] p-6 transition',
          'hover:scale-[1.015] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          isHighlight ? 'ring-1 ring-amber-400/30' : '',
        ].join(' ')}
        {...wrapperProps}
      >
        {/* linha gradiente inferior */}
        <span className="pointer-events-none absolute left-0 right-0 -bottom-px h-[2px] bg-gradient-to-r from-purple-500 via-amber-400 to-purple-500 opacity-80 rounded-b-2xl" />

        {/* badge */}
        {badge && (
          <span
            className={[
              'absolute -top-3 left-4 text-[11px] tracking-wide px-2 py-0.5 rounded-full',
              isHighlight ? 'bg-yellow-500 text-black' : 'bg-purple-600/30 text-purple-200 border border-purple-500/40',
            ].join(' ')}
          >
            {badge}
          </span>
        )}

        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

        {bullets ? (
          <ul className="text-gray-300 text-sm leading-relaxed list-disc pl-5 space-y-1">
            {bullets.slice(0, 2).map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300 text-sm leading-relaxed">{paragraph}</p>
        )}
      </Wrapper>
    </motion.div>
  );
}

export default function Ecosystem() {
  const { t } = useTranslation('ecosystem');

  // 3 cards de topo + 1 central
  const top: Item[] = [
    { key: 'moonplus', highlight: true, href: '/moonplus' },
    { key: 'MRS', highlight: true, href: '/tokenomics' },
    { key: 'transparency', highlight: true, href: '/transparency' },
  ];
  const bottom: Item[] = [{ key: 'moonwallet', href: '/moonwallet' }];

  return (
    <main className="relative w-full bg-black text-white overflow-hidden">
      {/* BACKDROP */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-40 -left-40 h-[720px] w-[720px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side,#a855f7 0%,transparent 70%)', opacity: 0.18 }}
        />
        <div
          className="absolute -bottom-64 -right-40 h-[640px] w-[640px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(closest-side,#f59e0b 0%,transparent 70%)', opacity: 0.14 }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.25)_60%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      <section className="w-full py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm uppercase text-purple-300 font-semibold tracking-[0.2em] mb-4">
            {t('tagline')}
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            <Trans
              i18nKey="title"
              t={t}
              components={{
                1: <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-amber-300" />,
                3: <span className="text-yellow-400" />,
                br: <br />,
              }}
            />
          </h1>

          <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            {t('description')}
          </p>

          {/* Linha de cima — 3 colunas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {top.map((it, i) => (
              <Card key={it.key} item={it} i={i} />
            ))}
          </div>

          {/* Linha de baixo — 1 card central */}
          <div className="mt-10 grid place-items-center">
            <div className="w-full max-w-xl">
              <Card item={bottom[0]} i={top.length} />
            </div>
          </div>

          {/* CTAs */}
          <motion.div {...fade(6)} className="mt-14">
            <p className="text-gray-300 text-lg">{t('cta.subtitle')}</p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/presales"
                prefetch={false}
                className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition shadow-[0_10px_30px_rgba(245,158,11,0.25)]"
                aria-label={t('cta.presale')}
              >
                {t('cta.presale')}
              </Link>
              <Link
                href="/transparency"
                prefetch={false}
                className="inline-block border border-white/10 bg-white/5 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition"
                aria-label={t('cta.transparency')}
              >
                {t('cta.transparency')}
              </Link>
            </div>
          </motion.div>
        </div>

        <footer className="w-full mt-20 py-6 text-center text-sm text-gray-500">
          {new Date().getFullYear()} © MOONRISE TECHNOLOGIES LLC (WY, USA). All rights reserved.
        </footer>
      </section>
    </main>
  );
}
