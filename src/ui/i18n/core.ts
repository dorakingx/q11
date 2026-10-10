/**
 * Pure i18n core (no React): languages, dictionaries, interpolation and the `translate` function the hooks wrap.
 * Keeping this React-free lets `src/ui/text.ts`-style helpers and tests translate without a component tree.
 */
import { en, type Key } from './en';
import { ja } from './ja';

export type Lang = 'en' | 'ja';
export type Params = Readonly<Record<string, string | number>>;
export type Translate = (key: Key, params?: Params) => string;

export const LANGS: readonly Lang[] = ['en', 'ja'];
export const DEFAULT_LANG: Lang = 'en';
/** Native names for the language switch (each language shows its own name). */
export const LANGUAGE_NAMES: Readonly<Record<Lang, string>> = { en: 'English', ja: '日本語' };
export const DICTIONARIES: Readonly<Record<Lang, Readonly<Record<Key, string>>>> = { en, ja };

export function isLang(v: unknown): v is Lang {
  return v === 'en' || v === 'ja';
}

const PLACEHOLDER = /\{([A-Za-z][A-Za-z0-9_]*)\}/g;

/**
 * Fills `{name}` placeholders from `params`. Numbers are stringified; a placeholder with no matching param is left
 * in place (visible in tests and screenshots instead of silently vanishing). No escaping syntax: a literal brace in
 * copy is not a placeholder unless it looks like `{identifier}`.
 */
export function interpolate(template: string, params?: Params): string {
  if (params === undefined) return template;
  return template.replace(PLACEHOLDER, (match: string, name: string) => {
    const v = params[name];
    return v === undefined ? match : String(v);
  });
}

/** Translate one key in one language. An (unexpected) empty string in a dictionary falls back to English. */
export function translate(lang: Lang, key: Key, params?: Params): string {
  const raw = DICTIONARIES[lang][key];
  const text = raw.length > 0 ? raw : en[key];
  return interpolate(text, params);
}

/** A bound `t` for a language, for code outside React (document.title, announcer text, tests). */
export function translator(lang: Lang): Translate {
  return (key, params) => translate(lang, key, params);
}

/** Maps a BCP-47 tag (navigator.language) to a supported language: ja / ja-JP → 'ja', everything else → 'en'. */
export function languageFromTag(tag: string | null | undefined): Lang {
  if (typeof tag !== 'string') return DEFAULT_LANG;
  return /^ja(?:$|[-_])/i.test(tag.trim()) ? 'ja' : 'en';
}

/** Keys that come as a `.one` / `.other` pair (English plurals; Japanese repeats the same text). */
export type PluralBase = { [K in Key]: K extends `${infer B}.one` ? (`${B}.other` extends Key ? B : never) : never }[Key];

/** `plural(lang, 'briefing.budget', 2)` → "2 crews" / "2 隊". `{n}` is filled from the count. */
export function plural(lang: Lang, base: PluralBase, n: number, params?: Params): string {
  const key: Key = n === 1 ? `${base}.one` : `${base}.other`;
  return translate(lang, key, { n, ...params });
}
