import { useEffect, type ReactNode } from 'react';
import { LanguageContext } from './context';
import type { Lang } from './core';

export interface LanguageProviderProps {
  readonly language: Lang;
  readonly children: ReactNode;
}

/**
 * Provides the current language to `useT()` / `useLanguage()` and mirrors it onto `<html lang>` so screen readers
 * switch pronunciation with the UI. The language itself is game state (Settings.language); this component only
 * distributes it.
 */
export function LanguageProvider({ language, children }: LanguageProviderProps) {
  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {
      /* no document (SSR / tests without DOM) */
    }
  }, [language]);
  return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>;
}
