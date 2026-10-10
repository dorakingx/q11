/** The language context lives in its own file so component files stay fast-refresh clean. */
import { createContext } from 'react';
import { DEFAULT_LANG, type Lang } from './core';

export const LanguageContext = createContext<Lang>(DEFAULT_LANG);
