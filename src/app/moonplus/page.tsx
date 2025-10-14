'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown, Building2, ArrowRight } from 'lucide-react';

type KV = { t?: string; d?: string; v?: string; l?: string };
type QA = { q?: string; a?: string };

const fade = (i = 0, y = 16) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, delay: 0.07 * i, ease: 'easeOut' }
});

const Section = (
  { children, className = '' }: React.PropsWithChildren<{ className?: string }>
) => <section className={`max-w-[1200px] mx-auto px-5 ${className}`}>{children}</section>;

export default function MoonPlusPageClean() {
  const { t } = useTranslation('moonplus');

  // helpers i18n sem fallback de texto
  const tx = (k: string) => {
    const v = t(k, { defaultValue: '' }) as unknown;
    return typeof v === 'string' ? v : '';
  };
  const txArr = <T,>(k: string): T[] => {
    const v = t(k, { returnObjects: true }) as unknown;
    return Array.isArray(v) ? (v as T[]) : [];
  };

  // dados
  const preop = tx('notice.preop');
  const target = tx('start.target');

  const kicker = tx('hero.kicker');
  const titleL1 = tx('hero.title.l1');
  const titleL2 = tx('hero.title.l2');
  const subtitle = tx('hero.subtitle');
  const legalLine = tx('hero.legalLine');

  const communityUrl = tx('links.community_url');
  const supportUrl = tx('links.support_url');

  const ctaCommunity = tx('cta.community');
  const ctaSupport = tx('cta.support');
  const ctaJoin = tx('cta.join');
  const ctaContact = tx('cta.contact');

  const valueTitle = tx('value.title');
  const values = txArr<KV>('value.cards');

  const howTitle = tx('how.title');
  const steps = txArr<KV>('how.steps');
  const howNote = tx('how.note');

  const relationTitle = tx('relation.title');
  const relationDesc = tx('relation.desc');

  const roadmapTitle = tx('roadmap.title');
  const roadmap = txArr<KV>('roadmap.items');

  const faqTitle = tx('faq.title');
  const faqs = txArr<QA>('faq.items');

  const disclaimer = tx('disclaimer');

  const legalName = tx('legal.moonplus_name');
  const legalJur = tx('legal.moonplus_jurisdiction');
  const legalNote = tx('legal.moonrise_note');
  const rights = tx('legal.rights');

  const linkLblTransparency = tx('legal.links.transparency');
  const linkLblTerms = tx('legal.links.terms');
  const linkLblPrivacy = tx('legal.links.privacy');
  const linkLblContact = tx('legal.links.contact');

  return (
    <main className="relative bg-[#0A0A0B] text-white">
      {/* BG */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_10%,rgba(168,85,247,0.10)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_0%_90%,rgba(251,191,36,0.08)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(#ffffff12_1px,transparent_1px)] bg-[length:72px_72px] opacity-[0.06]" />
      </div>

      {/* Ribbon */}
      {(preop || target) && (
        <div className="border-b border-white/10 bg-white/5/5">
          <Section className="py-3 flex flex-wrap items-center gap-3 text-sm">
            {preop && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-400 text-black">
                {preop}
              </span>
            )}
            {target && <span className="text-gray-200">{target}</span>}
          </Section>
        </div>
      )}

      {/* HERO */}
      <Section className="py-16 md:py-24">
        <motion.header {...fade(0)} className="max-w-3xl space-y-6">
          {kicker && (
            <p className="text-[11px] uppercase tracking-[0.25em] text-purple-300/80">
              {kicker}
            </p>
          )}

          {(titleL1 || titleL2) && (
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05]">
              {titleL1 && <span>{titleL1} </span>}
              {titleL2 && (
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-amber-300">
                  {titleL2}
                </span>
              )}
            </h1>
          )}

          {subtitle && (
            <p className="text-lg md:text-xl text-gray-200">{subtitle}</p>
          )}

          {legalLine && (
            <div className="text-sm text-gray-300 bg-white/5 rounded-xl p-4 border border-white/10">
              {legalLine}
            </div>
          )}

          {(communityUrl && ctaCommunity) || (supportUrl && ctaSupport) ? (
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {communityUrl && ctaCommunity && (
                <Link
                  href={communityUrl}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-amber-400 text-black font-semibold hover:bg-amber-300 transition"
                >
                  {ctaCommunity} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {supportUrl && ctaSupport && (
                <Link
                  href={supportUrl}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-white/5 text-white hover:bg-white/10 transition"
                >
                  {ctaSupport}
                </Link>
              )}
            </div>
          ) : null}
        </motion.header>
      </Section>

      {/* O que entregamos */}
      {(valueTitle || values.length) && (
        <Section className="py-6 md:py-10">
          <motion.div {...fade(0)}>
            {valueTitle && (
              <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
                <Building2 className="h-6 w-6 text-purple-300" />
                {valueTitle}
              </h2>
            )}
            {values.length > 0 && (
              <ul className="grid md:grid-cols-3 gap-6">
                {values.slice(0, 6).map((c, i) => (
                  <li key={i} className="space-y-2">
                    {c.t && <div className="font-semibold text-base leading-tight">{c.t}</div>}
                    {c.d && <div className="text-sm text-gray-300 leading-relaxed">{c.d}</div>}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </Section>
      )}

      {/* Como operamos */}
      {(howTitle || steps.length) && (
        <Section className="py-10 md:py-14">
          <motion.div {...fade(0)}>
            {howTitle && <h2 className="text-2xl md:text-3xl font-bold mb-6">{howTitle}</h2>}
            {steps.length > 0 && (
              <div className="grid md:grid-cols-4 gap-6">
                {steps.slice(0, 4).map((s, i) => (
                  <div key={i} className="min-w-[220px]">
                    <div className="text-xs text-gray-400">{String(i + 1).padStart(2, '0')}</div>
                    {s.t && <div className="font-semibold mb-1">{s.t}</div>}
                    {s.d && <div className="text-sm text-gray-300 leading-relaxed">{s.d}</div>}
                  </div>
                ))}
              </div>
            )}
            {howNote && <p className="text-gray-400 text-xs mt-6">{howNote}</p>}
          </motion.div>
        </Section>
      )}

      {/* Relação & independência */}
      {(relationTitle || relationDesc) && (
        <Section className="py-10 md:py-14">
          <motion.div {...fade(0)} className="max-w-4xl">
            {relationTitle && <h3 className="text-2xl md:text-3xl font-bold">{relationTitle}</h3>}
            {relationDesc && <p className="text-gray-300 mt-3 leading-relaxed">{relationDesc}</p>}
          </motion.div>
        </Section>
      )}

      {/* Roadmap */}
      {(roadmapTitle || roadmap.length) && (
        <Section className="py-8 md:py-12">
          <motion.div {...fade(0)}>
            {roadmapTitle && <h2 className="text-2xl md:text-3xl font-bold mb-6">{roadmapTitle}</h2>}
            {roadmap.length > 0 && (
              <ol className="relative pl-5">
                <span className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/70 via-white/15 to-amber-400/70" />
                {roadmap.slice(0, 3).map((r, i) => (
                  <li key={i} className="relative mb-6">
                    <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full bg-gradient-to-r from-purple-500 to-amber-400" />
                    {r.t && <div className="text-sm text-gray-400">{r.t}</div>}
                    {r.d && <div className="text-sm text-gray-300 mt-1 leading-relaxed">{r.d}</div>}
                  </li>
                ))}
              </ol>
            )}
          </motion.div>
        </Section>
      )}

      {/* FAQ */}
      {(faqTitle || faqs.length) && (
        <Section className="py-8 md:py-12">
          <motion.div {...fade(0)}>
            {faqTitle && <h2 className="text-2xl md:text-3xl font-bold mb-4">{faqTitle}</h2>}
            {faqs.length > 0 && (
              <div className="divide-y divide-white/10">
                {faqs.slice(0, 3).map((qa, i) => (
                  <details key={i} className="group py-3">
                    <summary className="flex cursor-pointer items-center justify-between font-medium">
                      <span>{qa.q}</span>
                      <ChevronDown className="h-4 w-4 text-gray-400 group-open:rotate-180 transition" />
                    </summary>
                    {qa.a && <p className="mt-2 text-sm text-gray-300 leading-relaxed">{qa.a}</p>}
                  </details>
                ))}
              </div>
            )}
          </motion.div>
        </Section>
      )}

      {/* Legal + CTAs finais */}
      {(disclaimer || (communityUrl && ctaJoin) || (supportUrl && ctaContact)) && (
        <Section className="py-10 md:py-14 text-center">
          {disclaimer && (
            <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
              {disclaimer}
            </p>
          )}
          {(communityUrl && ctaJoin) || (supportUrl && ctaContact) ? (
            <div className="mt-6 flex gap-3 justify-center">
              {communityUrl && ctaJoin && (
                <Link
                  href={communityUrl}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-400 text-black font-semibold hover:bg-amber-300 transition"
                >
                  {ctaJoin}
                </Link>
              )}
              {supportUrl && ctaContact && (
                <Link
                  href={supportUrl}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 text-white hover:bg-white/10 transition"
                >
                  {ctaContact}
                </Link>
              )}
            </div>
          ) : null}
        </Section>
      )}

      {/* Footer (sem links) */}
{(legalName || legalJur || legalNote || rights) && (
  <Section className="pb-16">
    <div className="border-t border-white/10 pt-6 grid gap-2 text-sm text-gray-400 text-center md:text-left">
      {(legalName || legalJur || legalNote) && (
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-3">
          <div>
            {legalName && <strong className="text-gray-200">{legalName}</strong>}
            {legalJur && <div>{legalJur}</div>}
          </div>
          {legalNote && <div className="text-gray-400">{legalNote}</div>}
        </div>
      )}

      {rights && (
        <div className="mt-2 text-xs">
          © {new Date().getFullYear()} {rights}
        </div>
      )}
    </div>
  </Section>
)}

    </main>
  );
}
