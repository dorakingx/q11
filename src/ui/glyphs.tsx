/**
 * Small UI glyphs that the art library (src/ui/art) does not cover: the star, the settings gear and the Q11 brand
 * mark. Fires, crews, detectors and houses are drawn by src/ui/art.
 */
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

/** The Q11 Emergency mark (same geometry as public/icon.svg), inlined so the Qollab bundle needs no asset URL. */
export function Q11Mark({ size = 72, label }: { readonly size?: number; readonly label?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" role="img" aria-label={label ?? 'Q11 Emergency mark: a Q-shaped ring with a flame inside; the tail of the Q is a check mark'} focusable="false">
      {/* the Q ring = the protected qubit, the flame = the error, the check-mark tail = the correction (same geometry as public/icon.svg) */}
      <circle cx="228" cy="228" r="158" fill="none" stroke="#3b7dff" strokeWidth="54" />
      <polyline points="330,330 378,396 476,296" fill="none" stroke="#1f9d55" strokeWidth="54" strokeLinecap="round" strokeLinejoin="round" />
      <path fill="#ff5a3c" transform="translate(180 136) scale(0.8)" d="M116 14 C128 58 160 102 160 190 A60 60 0 0 1 40 190 C40 150 66 134 66 104 C66 90 60 80 56 72 C76 80 84 96 86 108 C98 86 100 56 116 14 Z" />
    </svg>
  );
}
