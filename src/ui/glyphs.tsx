/**
 * Small UI glyphs that the art library (src/ui/art) does not cover: the star, the settings gear and the Q11 brand
 * mark. Fires, crews, detectors and houses are drawn by src/ui/art.
 */
import { BrandMark } from './art';
export function StarIcon({ filled, size = 22 }: { readonly filled: boolean; readonly size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={filled ? 'star is-filled' : 'star'}>
      <path d="M12 2.5l2.9 6.2 6.7.8-5 4.6 1.4 6.7L12 17.4 6 20.8l1.4-6.7-5-4.6 6.7-.8Z" fill={filled ? 'var(--alarm)' : 'var(--panel)'} stroke="var(--outline)" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function GearIcon({ size = 22 }: { readonly size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8.3 2.2-1.9-.4a6.9 6.9 0 0 0-.7-1.7l1.1-1.6-1.8-1.8-1.6 1.1a6.9 6.9 0 0 0-1.7-.7l-.4-1.9h-2.6l-.4 1.9a6.9 6.9 0 0 0-1.7.7L7 5.2 5.2 7l1.1 1.6a6.9 6.9 0 0 0-.7 1.7l-1.9.4v2.6l1.9.4a6.9 6.9 0 0 0 .7 1.7L5.2 17 7 18.8l1.6-1.1a6.9 6.9 0 0 0 1.7.7l.4 1.9h2.6l.4-1.9a6.9 6.9 0 0 0 1.7-.7l1.6 1.1 1.8-1.8-1.1-1.6a6.9 6.9 0 0 0 .7-1.7l1.9-.4Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

/** The Q11 Emergency mark (the fire truck with its Q11 plate), shared with public/icon.svg through src/ui/art/brandMark.tsx. */
export function Q11Mark({ size = 72, label, lettering }: { readonly size?: number; readonly label?: string; readonly lettering?: string }) {
  return <BrandMark size={size} label={label} lettering={lettering} />;
}
