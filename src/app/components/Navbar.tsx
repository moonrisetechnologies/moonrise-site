'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes, FaGlobe, FaFileAlt, FaCopy, FaExternalLinkAlt, FaCheck } from 'react-icons/fa';
import translator from '@/lib/Translator';
import PresalePanel from './presalepanel';

/** ====== CONFIG ====== **/
const WHITEPAPER_URL = '/whitepaper_EN.pdf';
const TOKEN_ADDRESS = '0x8169A998A15142C94d3F03E5C51c216870FBE157';
const MASTERVAULT_ADDRESS = '0x732Dde35D139F764FCd642Ad7CDc633C2ED60DE6';
/** ===================== **/

const bscTokenUrl = (addr: string) => `https://bscscan.com/token/${addr}`;
const bscAddressUrl = (addr: string) => `https://bscscan.com/address/${addr}`;

const languages = [
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'en', label: 'English',  flag: '🇺🇸' },
  { code: 'es', label: 'Español',  flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch',  flag: '🇩🇪' },
  { code: 'zh', label: '中文',       flag: '🇨🇳' },
  { code: 'ru', label: 'Русский',  flag: '🇷🇺' },
  { code: 'hi', label: 'हिन्दी',     flag: '🇮🇳' }
];

function DocumentsModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation('navbar');
  const [copied, setCopied] = useState<null | 'token' | 'master'>(null);

  const closeSoon = (ms = 0) => setTimeout(onClose, ms);

  const copy = async (value: string, key: 'token' | 'master') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 200);
      closeSoon(250);
    } catch {
      closeSoon(0);
    }
  };

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4"
      onClick={onBackdropClick}
    >
      <div className="w-full max-w-xl rounded-2xl border border-white/15 bg-zinc-950 p-5 shadow-2xl">
        <div className="flex items-center gap-3 mb-3">
          <FaFileAlt className="text-white/90" />
          <h3 className="text-white text-lg font-semibold">{t('documents.title')}</h3>
        </div>

        <p className="text-sm text-zinc-400 mb-4">
          {t('documents.leadMin')}
        </p>

        {/* Whitepaper */}
        <div className="mb-4 rounded-lg border border-white/10 p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-white font-medium">Whitepaper</span>
            <a
              href={WHITEPAPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => closeSoon(0)}
              className="inline-flex items-center gap-2 rounded bg-white text-black px-3 py-2 text-sm font-semibold hover:bg-zinc-200"
            >
              {t('documents.actions.openPdf')}
              <FaExternalLinkAlt />
            </a>
          </div>
        </div>

        {/* Token */}
        <div className="mb-3 rounded-lg border border-white/10 p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-white font-medium">{t('documents.labels.token')}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copy(TOKEN_ADDRESS, 'token')}
                className="inline-flex items-center gap-2 rounded bg-white/10 text-white px-3 py-2 text-sm hover:bg-white/15"
              >
                {copied === 'token' ? <FaCheck /> : <FaCopy />}
                {copied === 'token' ? t('documents.actions.copied') : t('documents.actions.copy')}
              </button>
              <a
                href={bscTokenUrl(TOKEN_ADDRESS)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => closeSoon(0)}
                className="inline-flex items-center gap-2 rounded bg-white text-black px-3 py-2 text-sm font-semibold hover:bg-zinc-200"
              >
                BscScan
                <FaExternalLinkAlt />
              </a>
            </div>
          </div>
          <div className="mt-2 text-xs text-zinc-400 font-mono break-all">{TOKEN_ADDRESS}</div>
        </div>

        {/* MasterVault */}
        <div className="mb-5 rounded-lg border border-white/10 p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-white font-medium">{t('documents.labels.master')}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copy(MASTERVAULT_ADDRESS, 'master')}
                className="inline-flex items-center gap-2 rounded bg-white/10 text-white px-3 py-2 text-sm hover:bg-white/15"
              >
                {copied === 'master' ? <FaCheck /> : <FaCopy />}
                {copied === 'master' ? t('documents.actions.copied') : t('documents.actions.copy')}
              </button>
              <a
                href={bscAddressUrl(MASTERVAULT_ADDRESS)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => closeSoon(0)}
                className="inline-flex items-center gap-2 rounded bg-white text-black px-3 py-2 text-sm font-semibold hover:bg-zinc-200"
              >
                BscScan
                <FaExternalLinkAlt />
              </a>
            </div>
          </div>
          <div className="mt-2 text-xs text-zinc-400 font-mono break-all">{MASTERVAULT_ADDRESS}</div>
        </div>

        <p className="text-[12px] text-zinc-500 mb-5">
          {t('documents.noteMin')}
        </p>

        <div className="flex items-center justify-between">
          <Link
            href="/transparency"
            onClick={() => closeSoon(0)}
            className="text-sm text-white/90 underline underline-offset-4 hover:opacity-80"
          >
            {t('documents.actions.goTransparency')}
          </Link>

          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
            aria-label="Close"
          >
            {t('closeButton')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { t, i18n } = useTranslation('navbar');
  const pathname = usePathname();

  // visibilidade
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showPresale, setShowPresale] = useState(false);
  const [showDocs, setShowDocs] = useState(false);

  // acordeão (mobile) — apenas idiomas
  const [mLangOpen, setMLangOpen] = useState(false);

  // ref pra fechar idioma ao clicar fora
  const langRef = useRef<HTMLDivElement | null>(null);

  // language
  const switchLanguage = (selectedLang: string) => {
    translator.setLanguage(selectedLang);
    i18n.changeLanguage(selectedLang);
    try { localStorage.setItem('lang', selectedLang); } catch {}
    setShowLangMenu(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lang');
      if (!stored) {
        const browserLang = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : '';
        const matched = languages.find(l => browserLang.startsWith(l.code));
        translator.setLanguage(matched?.code || 'pt');
        i18n.changeLanguage(matched?.code || 'pt');
      } else {
        i18n.changeLanguage(stored);
      }
    } catch {
      i18n.changeLanguage('pt');
    }
  }, [i18n]);

  // fecha dropdown de idiomas ao clicar fora / ESC
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setShowLangMenu(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowLangMenu(false);
        setIsMobileMenuOpen(false);
        setShowDocs(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  // Links principais (inclui "Sobre")
  const desktopLinks = useMemo(() => ([
    { href: '/',             label: t('menu.home') },
    { href: '/moonplus',     label: t('menu.moonplus') },
    { href: '/moonwallet',   label: t('menu.wallet') },
    { href: '/tokenomics',   label: t('menu.tokenomics') },
    { href: '/transparency', label: t('menu.transparency') },
    { href: '/about',        label: t('menu.about') },
  ]), [t]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <nav className="w-full bg-black/90 backdrop-blur border-b border-white/10 py-3 px-4 sticky top-0 z-50">
        <div className="mx-auto max-w-[1300px] flex items-center justify-between">
          {/* Brand */}
          <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
            <img src="/moonrise-logo.png" alt="MoonRise Logo" width={32} height={32} />
            <span className="text-white font-bold text-lg tracking-wide">{t('brand')}</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-5 text-sm font-medium">
            {desktopLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`transition-colors ${isActive(l.href) ? 'text-white' : 'text-zinc-300 hover:text-white'}`}
              >
                {l.label}
              </Link>
            ))}

            {/* DOCUMENTOS (abre modal) */}
            <button
              onClick={() => setShowDocs(true)}
              className="inline-flex items-center gap-2 rounded bg-white/10 text-white px-3 py-1 hover:bg-white/15"
              aria-label={t('aria.openDocuments')}
              title={t('menu.documents')}
            >
              <FaFileAlt />
              {t('menu.documents')}
            </button>

            {/* CTAs */}
            <a
              href="https://t.me/moonriseofficialcommunity"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-black px-3 py-1 rounded hover:bg-green-400"
            >
              {t('buttons.community')}
            </a>
            <button
              onClick={() => setShowPresale(true)}
              className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300"
            >
              {t('buttons.presale')}
            </button>

            {/* Idiomas (dropdown) */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setShowLangMenu(v => !v)}
                className="p-2 rounded"
                aria-label={t('aria.language')}
              >
                <FaGlobe className="text-white" />
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-md shadow-lg text-sm max-h-96 overflow-y-auto z-50">
                  {languages.map(({ code, label, flag }) => (
                    <button
                      key={code}
                      onClick={() => switchLanguage(code)}
                      className="block w-full px-4 py-2 text-white text-left hover:bg-white/10"
                    >
                      {flag} {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="text-white md:hidden text-2xl"
            onClick={() => setIsMobileMenuOpen(v => !v)}
            aria-label={t('aria.menu')}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-3 mt-4 text-white text-sm px-2 pb-28">
            {desktopLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className={`px-2 py-2 rounded ${isActive(l.href) ? 'bg-white/10 text-white' : 'text-zinc-300 hover:bg-white/5'}`}
              >
                {l.label}
              </Link>
            ))}

            {/* DOCUMENTOS (mobile) */}
            <button
              onClick={() => { setShowDocs(true); }}
              className="flex items-center gap-2 px-3 py-2 rounded bg-white/10 hover:bg-white/15"
              aria-label={t('aria.openDocuments')}
            >
              <FaFileAlt />
              {t('menu.documents')}
            </button>

            {/* Idiomas (acordeão) */}
            <div className="rounded border border-white/15 overflow-hidden">
              <button
                onClick={() => { setMLangOpen(v => !v); }}
                className="w-full flex items-center justify-between px-3 py-2 text-zinc-200 bg-white/5"
                aria-expanded={mLangOpen}
              >
                <span className="flex items-center gap-2">
                  <span>🌐</span>
                  <span>{t('aria.language')}</span>
                </span>
                <span className={`transition-transform ${mLangOpen ? 'rotate-90' : ''}`}>›</span>
              </button>

              {mLangOpen && (
                <div className="max-h-80 overflow-y-auto">
                  {languages.map(({ code, label, flag }) => (
                    <button
                      key={code}
                      onClick={() => switchLanguage(code)}
                      className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-white/10"
                    >
                      <span>{flag}</span>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Comunidade (mobile) */}
            <a
              href="https://t.me/moonriseofficialcommunity"
              onClick={closeMenu}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-black px-3 py-2 rounded text-center"
            >
              {t('buttons.community')}
            </a>
          </div>
        )}

        {/* Sticky Presale (mobile) */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-4 pt-2 bg-gradient-to-t from-black/95 to-black/40 backdrop-blur">
            <button
              onClick={() => { setShowPresale(true); }}
              className="w-full bg-yellow-400 text-black px-4 py-3 rounded-lg text-base font-semibold hover:bg-yellow-300"
            >
              {t('buttons.presale')}
            </button>
          </div>
        )}
      </nav>

      {/* MODAL DE PRÉ-VENDA */}
      {showPresale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <PresalePanel />
          <button
            onClick={() => setShowPresale(false)}
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
            aria-label={t('aria.close')}
          >
            {t('closeButton')}
          </button>
        </div>
      )}

      {/* MODAL DE DOCUMENTOS */}
      {showDocs && <DocumentsModal onClose={() => setShowDocs(false)} />}
    </>
  );
}
