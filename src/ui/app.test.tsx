/**
 * App flow tests on the new experience (jsdom + @testing-library): the guided first run (three taps → spray →
 * result → city with a badge), a returning player's city → briefing → training → challenge → dispatch → result →
 * Why?, challenge interactions (undo / redo / clear, detector highlight, secrecy, stand-down), tap-to-predict
 * training, save v1 → v2 migration, the language toggle and rapid taps (attempts counted exactly once).
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { SAVE_KEY } from '../game';
import { App } from './App';

function stubFrames() {
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => globalThis.setTimeout(() => cb(performance.now()), 16) as unknown as number);
  vi.stubGlobal('cancelAnimationFrame', (id: number) => globalThis.clearTimeout(id));
}

const v2 = (progress: Record<string, { stars: number; attempts: number; completed: boolean }>, extra: Record<string, unknown> = {}) =>
  JSON.stringify({ version: 2, progress, settings: { sound: false, reducedMotion: true, language: 'en', freeRoam: false }, tutorialDone: true, ...extra });

beforeEach(() => {
  stubFrames();
  localStorage.clear();
});
afterEach(() => {
  vi.unstubAllGlobals();
  localStorage.clear();
});

const user = () => userEvent.setup();

async function finishSpray(u: ReturnType<typeof userEvent.setup>) {
  expect(await screen.findByTestId('spray-player')).toBeInTheDocument();
  await u.click(screen.getByTestId('spray-skip'));
  expect(await screen.findByTestId('result-overlay')).toBeInTheDocument();
}

describe('App · guided first run (R5)', () => {
  it('Play → city → Rowhouse Lane → tutorial scene (callouts follow the taps) → Spray! → result → city with the chapter badge', async () => {
    const u = user();
    render(<App storage="memory" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Q11 Emergency');
    expect(screen.getByTestId('title-kicker')).toHaveTextContent('Quantum Emergency Response');
    expect(screen.getByTestId('play')).toHaveTextContent('Play');
    await u.click(screen.getByTestId('play'));
    // Play opens the city map even on a fresh save; the first dispatch of Rowhouse Lane is the guided scene.
    expect(await screen.findByTestId('city-map')).toBeInTheDocument();
    expect(screen.getByTestId('mission-1')).toHaveAttribute('data-status', 'available');
    await u.click(screen.getByTestId('mission-1'));
    await u.click(screen.getByTestId('dispatch-go'));
    await u.click(await screen.findByTestId('travel-skip'));
    // Straight into the planning scene of Rowhouse Lane in tutorial mode (no briefing).
    expect(await screen.findByTestId('tutorial-bar')).toBeInTheDocument();
    expect(screen.getByTestId('confirm')).toHaveTextContent('Spray!');
    expect(screen.getByTestId('tutorial-callout-1')).toHaveAttribute('data-active', 'true');
    expect(screen.getByTestId('tutorial-callout-2')).toHaveAttribute('data-active', 'false');
    // Fog on every house, both alarms ringing.
    expect(screen.getByTestId('block-1')).toHaveAttribute('aria-label', expect.stringContaining('hidden'));
    expect(document.querySelectorAll('[data-check][data-ringing="1"]')).toHaveLength(2);
    await u.click(screen.getByTestId('palette-X'));
    expect(screen.getByTestId('tutorial-callout-1')).toHaveAttribute('data-done', 'true');
    expect(screen.getByTestId('tutorial-callout-2')).toHaveAttribute('data-active', 'true');
    await u.click(screen.getByTestId('block-1'));
    expect(screen.getByTestId('budget')).toHaveTextContent('Crews: 1 / 1');
    expect(screen.getByTestId('tutorial-callout-3')).toHaveAttribute('data-active', 'true');
    await u.click(screen.getByTestId('confirm'));
    await finishSpray(u);
    expect(screen.getByTestId('result-overlay')).toHaveAttribute('data-result', 'restored');
    expect(screen.getByTestId('result-title')).toHaveFocus();
    expect(screen.getByTestId('result-next')).toHaveTextContent('Back to the city');
    await u.click(screen.getByTestId('result-next'));
    expect(await screen.findByTestId('city-map')).toBeInTheDocument();
    expect(screen.getByTestId('toast-badge')).toHaveTextContent('Alarm Reader earned!');
    expect(screen.getByTestId('mission-1')).toHaveAttribute('data-status', 'solved');
    expect(screen.getByTestId('mission-2')).toHaveAttribute('data-status', 'available');
    expect(screen.getByTestId('storage-note')).toHaveTextContent('On Qollab, progress lasts for one Run.');
  });

  it('Skip tutorial goes to the city and the tutorial never returns', async () => {
    const u = user();
    render(<App storage="memory" />);
    await u.click(screen.getByTestId('play'));
    await u.click(await screen.findByTestId('mission-1'));
    await u.click(screen.getByTestId('dispatch-go'));
    await u.click(await screen.findByTestId('travel-skip'));
    await u.click(await screen.findByTestId('tutorial-skip'));
    expect(await screen.findByTestId('city-map')).toBeInTheDocument();
    await u.click(screen.getByTestId('city-title'));
    expect(screen.getByTestId('play')).toHaveTextContent('Play');
  });
});

describe('App · returning player', () => {
  it('city → briefing → training → challenge → dispatch → result overlay → Why? → result screen → next district', async () => {
    localStorage.setItem(SAVE_KEY, v2({}));
    const u = user();
    render(<App />);
    expect(screen.getByTestId('play')).toHaveTextContent('Play');
    await u.click(screen.getByTestId('play'));
    expect(await screen.findByTestId('city-map')).toBeInTheDocument();
    expect(document.title).toBe('Q11 Emergency — City map');
    await u.click(screen.getByTestId('mission-1'));
    await u.click(screen.getByTestId('dispatch-go')); // reduced motion → no truck drive
    expect(await screen.findByTestId('briefing')).toBeInTheDocument();
    expect(screen.getByTestId('briefing-goal')).toHaveTextContent('Two alarms ring');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Rowhouse Lane');
    await u.click(screen.getByTestId('start-mission'));
    // Training: the true fire is visible on house 0 and Z0 rings.
    expect(await screen.findByTestId('training-caption')).toBeInTheDocument();
    expect(screen.getByTestId('block-0')).toHaveAttribute('aria-label', expect.stringContaining('red (X) fire'));
    expect(document.querySelector('[data-check="Z0"]')).toHaveAttribute('data-ringing', '1');
    expect(document.querySelector('[data-check="Z1"]')).toHaveAttribute('data-ringing', '0');
    await u.click(screen.getByTestId('training-next'));
    expect(await screen.findByTestId('confirm')).toBeInTheDocument();
    await u.click(screen.getByTestId('block-1'));
    await u.click(screen.getByTestId('confirm'));
    // Reduced motion: the spray is a stepper; the last step finishes it.
    expect(await screen.findByTestId('spray-player')).toHaveAttribute('data-reduced-motion', 'true');
    for (let i = 0; i < 12 && screen.queryByTestId('result-overlay') === null; i++) await u.click(screen.getByTestId('spray-next'));
    expect(screen.getByTestId('result-overlay')).toHaveAttribute('data-result', 'restored');
    expect(screen.getByTestId('result-reaction')).toHaveTextContent('Both alarms went quiet');
    // Details hold the raw residual, decision quality + cost and the cloud panel with its labels.
    expect(screen.getByTestId('residual')).toHaveTextContent('III');
    expect(screen.getByTestId('decision')).toHaveTextContent('Optimal call');
    expect(screen.getByTestId('cloud-panel')).toHaveTextContent('No cloud result recorded for this dispatch');
    await u.click(screen.getByTestId('result-why'));
    expect(await screen.findByTestId('why-compare')).toBeInTheDocument();
    expect(screen.getByTestId('why-heading')).toHaveFocus();
    expect(screen.getByTestId('why-short')).toHaveTextContent('Only the middle house is watched by both');
    expect(screen.getByTestId('step-details')).toBeInTheDocument();
    await u.click(screen.getByTestId('to-result'));
    expect(await screen.findByTestId('result')).toBeInTheDocument();
    expect(screen.getByTestId('result')).toHaveTextContent('Flawless dispatch');
    expect(screen.getByTestId('result-attempts')).toHaveTextContent('1');
    await u.click(screen.getByTestId('next-mission'));
    // Next district returns to the city: the solved district celebrates (badge toast) and the next one is pre-selected.
    expect(await screen.findByTestId('city-map')).toBeInTheDocument();
    expect(screen.getByTestId('toast-badge')).toHaveTextContent('Alarm Reader earned!');
    expect(screen.getByTestId('mission-1')).toHaveAttribute('data-status', 'solved');
    expect(screen.getByTestId('city-panel')).toBeVisible();
    expect(within(screen.getByTestId('city-panel')).getByRole('heading', { name: 'Harbor Bridge' })).toBeInTheDocument();
    expect(screen.getByTestId('mission-2')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('heading', { level: 1 })).toHaveFocus();
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY) ?? '{}') as { version: number; progress: Record<string, { attempts: number }> };
    expect(saved.version).toBe(2);
    expect(saved.progress['first-alarm']?.attempts).toBe(1);
  });

  it('challenge: undo / redo / clear, detector highlight toggles, budget, secrecy and the stand-down dialog', async () => {
    localStorage.setItem(SAVE_KEY, v2({}, { settings: { sound: false, reducedMotion: true, language: 'en', freeRoam: true } }));
    const u = user();
    render(<App />);
    await u.click(screen.getByTestId('play'));
    await u.click(await screen.findByTestId('mission-5'));
    await u.click(screen.getByTestId('dispatch-go'));
    await u.click(await screen.findByTestId('start-mission')); // no training → straight to the challenge
    expect(await screen.findByTestId('confirm')).toBeInTheDocument();
    // Secrecy: every fogged house serialises identically once its index is stripped; the hidden fire never appears.
    const strip = (q: number) => (screen.getByTestId(`block-${String(q)}`).outerHTML ?? '').replaceAll(`block-${String(q)}`, 'block-N').replaceAll(`data-q="${String(q)}"`, 'data-q="N"').replaceAll(`House ${String(q)},`, 'House N,');
    const first = strip(0);
    for (let q = 1; q < 9; q++) expect(strip(q)).toBe(first);
    const sceneHtml = document.querySelector('[data-scene]')?.innerHTML ?? '';
    expect(sceneHtml).not.toMatch(/fire/i);
    expect(sceneHtml).not.toContain('IXIIIIZII');
    // Detector highlight: tap Z0 → houses 0, 1, 3, 4 tinted; tap again → clear.
    await u.click(screen.getByTestId('detector-Z0'));
    expect(screen.getByTestId('detector-Z0')).toHaveAttribute('aria-pressed', 'true');
    expect(document.querySelectorAll('.watch-tint')).toHaveLength(4);
    expect(screen.getByTestId('detector-watch')).toHaveTextContent('Z0 watches houses 0, 1, 3, 4.');
    await u.click(screen.getByTestId('detector-Z0'));
    expect(document.querySelectorAll('.watch-tint')).toHaveLength(0);
    // Plan: place, undo, redo, clear; budget enforced.
    await u.click(screen.getByTestId('block-1'));
    await u.click(screen.getByTestId('palette-Z'));
    await u.click(screen.getByTestId('block-7'));
    expect(screen.getByTestId('budget')).toHaveTextContent('Crews: 2 / 2');
    await u.click(screen.getByTestId('block-4'));
    expect(screen.getByTestId('budget')).toHaveTextContent('Crews: 2 / 2');
    await u.click(screen.getByTestId('undo'));
    expect(screen.getByTestId('budget')).toHaveTextContent('Crews: 1 / 2');
    await u.click(screen.getByTestId('redo'));
    expect(screen.getByTestId('budget')).toHaveTextContent('Crews: 2 / 2');
    expect(screen.getByTestId('block-7')).toHaveAttribute('aria-pressed', 'true');
    await u.click(screen.getByTestId('clear'));
    expect(screen.getByTestId('budget')).toHaveTextContent('Crews: 0 / 2');
    // Stand down with no crews asks first; cancel keeps the challenge; confirm → still burning.
    await u.click(screen.getByTestId('confirm'));
    expect(screen.getByRole('alertdialog')).toHaveTextContent('Stand down with no crews?');
    expect(document.querySelector('[data-inert-root]')).toHaveAttribute('inert');
    await u.click(screen.getByRole('button', { name: 'Keep dispatching' }));
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    await u.click(screen.getByTestId('confirm'));
    await u.click(screen.getByRole('button', { name: 'Stand down' }));
    expect(await screen.findByTestId('spray-player')).toBeInTheDocument();
    for (let i = 0; i < 12 && screen.queryByTestId('result-overlay') === null; i++) await u.click(screen.getByTestId('spray-next'));
    expect(screen.getByTestId('result-overlay')).toHaveAttribute('data-result', 'still-burning');
  });

  it('propagation training asks for a tap-to-predict before each gate step reveals (R10)', async () => {
    localStorage.setItem(SAVE_KEY, v2({ 'first-alarm': { stars: 3, attempts: 1, completed: true } }));
    const u = user();
    render(<App />);
    await u.click(screen.getByTestId('play'));
    await u.click(await screen.findByTestId('mission-2'));
    await u.click(screen.getByTestId('dispatch-go'));
    await u.click(await screen.findByTestId('start-mission'));
    expect(await screen.findByTestId('predict-prompt')).toHaveTextContent('Which house burns next? Tap it!');
    expect(screen.getByTestId('training-next')).toBeDisabled();
    expect(screen.getByTestId('block-1')).toHaveAttribute('aria-label', expect.stringContaining('press to predict'));
    await u.click(screen.getByTestId('block-1'));
    // XI through CNOT → XX: house 1 burns, the prediction was right and the frame advanced to "after gate 1".
    expect(screen.getByTestId('predict-reaction')).toHaveTextContent('Yes! House 1 burns after this gate.');
    expect(screen.getByTestId('training-caption')).toHaveTextContent('After gate 1 of 1: XX');
    expect(screen.queryByTestId('predict-prompt')).not.toBeInTheDocument();
    expect(screen.getByTestId('training-next')).toBeEnabled();
    await u.click(screen.getByTestId('training-next')); // next lesson (IZ)
    expect(await screen.findByTestId('predict-prompt')).toBeInTheDocument();
    await u.click(screen.getByTestId('block-1'));
    expect(screen.getByTestId('predict-reaction')).toHaveTextContent('House 1 burns');
    await u.click(screen.getByTestId('training-next')); // start dispatch
    expect(await screen.findByTestId('confirm')).toBeInTheDocument();
  });

  it('migrates a v1 save: progress and settings kept, tutorial derived, no reset notice, save rewritten as v2', async () => {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ version: 1, progress: { 'first-alarm': { stars: 3, attempts: 2, completed: true } }, settings: { sound: true, reducedMotion: false } }));
    const u = user();
    render(<App />);
    expect(screen.queryByTestId('notice')).not.toBeInTheDocument();
    expect(screen.getByTestId('title-progress')).toHaveTextContent('Progress: 3 of 16 stars.');
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY) ?? '{}') as Record<string, unknown>;
    expect(saved).toMatchObject({ version: 2, tutorialDone: true, settings: { sound: true, reducedMotion: false, language: 'en', freeRoam: false } });
    await u.click(screen.getByTestId('play'));
    expect(await screen.findByTestId('city-map')).toBeInTheDocument();
    expect(screen.getByTestId('mission-1')).toHaveAttribute('data-status', 'solved');
  });

  it('language toggle switches headings, document.title and <html lang> to Japanese and persists', async () => {
    const u = user();
    render(<App storage="memory" />);
    await u.click(screen.getByTestId('lang-toggle'));
    // In Japan the emergency number is 119, so the Japanese brand is "11Q" (the English "Q11" comes from 911).
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('11Q Emergency');
    expect(screen.getByTestId('title-kicker')).toHaveTextContent('量子エラー訂正の消防ゲーム');
    const lettering = Array.from(screen.getByRole('img', { name: /11Q Emergency のマーク/ }).querySelectorAll('text'), (n) => n.textContent);
    expect(lettering).toContain('11Q');
    expect(lettering).not.toContain('Q11');
    expect(document.documentElement.lang).toBe('ja');
    await act(async () => {
      await new Promise((r) => setTimeout(r, 80));
    });
    expect(document.title).toBe('11Q Emergency — 量子エラー訂正の消防ゲーム');
    expect(screen.getByTestId('play')).not.toHaveTextContent('Play');
    await u.click(screen.getByTestId('settings'));
    expect(screen.getByTestId('lang-ja')).toHaveAttribute('aria-pressed', 'true');
    await u.click(screen.getByTestId('lang-en'));
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Settings');
  });

  it('rapid taps: triple Spray!, double Skip and Try again during the spray count exactly one attempt each', async () => {
    localStorage.setItem(SAVE_KEY, v2({}, { settings: { sound: false, reducedMotion: false, language: 'en', freeRoam: true } }));
    const u = user();
    render(<App />);
    await u.click(screen.getByTestId('play'));
    await u.click(await screen.findByTestId('mission-4'));
    await u.click(screen.getByTestId('dispatch-go'));
    await u.click(await screen.findByTestId('travel-skip'));
    await u.click(await screen.findByTestId('briefing-skip'));
    await u.click(await screen.findByTestId('block-4'));
    const confirm = screen.getByTestId('confirm');
    await u.tripleClick(confirm);
    expect(await screen.findByTestId('spray-player')).toBeInTheDocument();
    const attempts = () => (JSON.parse(localStorage.getItem(SAVE_KEY) ?? '{}') as { progress: Record<string, { attempts: number }> }).progress['blind-dispatch']?.attempts ?? 0;
    expect(attempts()).toBe(1);
    const skip = screen.getByTestId('spray-skip');
    await u.dblClick(skip);
    expect(await screen.findByTestId('result-overlay')).toBeInTheDocument();
    expect(attempts()).toBe(1);
    // Try again, then leave mid-spray: still one more attempt only.
    await u.click(screen.getByTestId('result-retry'));
    await u.click(await screen.findByTestId('block-4'));
    await u.click(screen.getByTestId('confirm'));
    expect(await screen.findByTestId('spray-player')).toBeInTheDocument();
    expect(attempts()).toBe(2);
    await u.click(screen.getByTestId('topbar-city'));
    expect(await screen.findByTestId('city-map')).toBeInTheDocument();
    expect(attempts()).toBe(2);
    expect(within(screen.getByTestId('city-map')).getByTestId('mission-4')).toHaveAttribute('data-status', 'solved');
  });
});
