import { useCallback, useContext } from 'react';
import { LanguageContext } from './context';
import { translate, type Lang, type Params, type Translate } from './core';
import type { Key } from './en';

/** Current UI language (defaults to 'en' outside a LanguageProvider). */
export function useLanguage(): Lang {
  return useContext(LanguageContext);
}

/** `const t = useT(); t('city.dispatch'); t('title.progress', { stars: 3, max: 16 })` — stable per language. */
export function useT(): Translate {
  const lang = useLanguage();
  return useCallback((key: Key, params?: Params) => translate(lang, key, params), [lang]);
}
