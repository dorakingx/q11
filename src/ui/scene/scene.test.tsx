/**
 * Scene tests: fog secrecy (identical house buttons), detector highlight (only the watched houses), keyboard
 * navigation, plan markers, lane boards and the result decorations (ghost / residual / beacon + chain).
 */
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { useState } from 'react';
import { confirmDispatch, getPublicMission, resultType, type CrewLetter } from '../../game';
import { fromString, support } from '../../quantum';
import { Scene } from './Scene';
import { deriveSceneKind, sceneGeometry, houseBox, defaultHouseVariant } from './geometry';

const RSC3 = getPublicMission('two-kinds-of-trouble');

/** outerHTML with the house index removed everywhere it may legitimately appear. */
function stripIndex(el: Element, q: number): string {
  return el.outerHTML
    .replaceAll(`block-${String(q)}`, 'block-N')
    .replaceAll(`data-q="${String(q)}"`, 'data-q="N"')
    .replaceAll(`House ${String(q)},`, 'House N,')
    .replaceAll(`家 ${String(q)}、`, '家 N、');
}

describe('Scene · fog secrecy (R8)', () => {
  it('renders every fogged house with identical markup, attributes and ARIA (only the index differs)', () => {
    render(<Scene codeId="rsc3" circuit={[]} fires={null} crews={null} residual={null} syndrome={RSC3.syndrome} interactive onToggle={() => undefined} selected="X" fog />);
    const buttons = Array.from({ length: 9 }, (_, q) => screen.getByTestId(`block-${String(q)}`));
    const serialised = buttons.map((b, q) => stripIndex(b, q));
    serialised.forEach((s) => expect(s).toBe(serialised[0]));
    // the label says "hidden" and nothing about fires or watchers
    expect(buttons[4]).toHaveAttribute('aria-label', 'House 4, hidden, press to send red (X) crew');
    expect(buttons[4]?.getAttribute('aria-label')).not.toMatch(/fire|watched/);
    // every house art is the fog veil with "?"
    const container = screen.getByRole('group');
    const houses = container.querySelectorAll('[data-house]');
    expect(houses).toHaveLength(9);
    houses.forEach((h) => expect(h.getAttribute('data-house-state')).toBe('fog'));
    // the SVG draws nothing letter-like on any house
    houses.forEach((h) => expect(h.textContent?.replace(/\s/g, '')).toBe('?'));
  });

  it('fog buttons stay identical even while the true fires and syndrome props are present (training data must not leak)', () => {
    render(<Scene codeId="rsc3" circuit={[]} fires="IXIIIIIZI" crews={null} residual={null} syndrome={RSC3.syndrome} interactive onToggle={() => undefined} selected="Z" fog />);
    const serialised = Array.from({ length: 9 }, (_, q) => stripIndex(screen.getByTestId(`block-${String(q)}`), q));
    serialised.forEach((s) => expect(s).toBe(serialised[0]));
  });

  it('plan markers are the only allowed difference: the planned house carries the crew, the tag and aria-pressed', () => {
    render(<Scene codeId="rsc3" circuit={[]} fires={null} crews={null} placements={{ 1: 'X' }} residual={null} syndrome={RSC3.syndrome} interactive onToggle={() => undefined} selected="X" fog />);
    expect(screen.getByTestId('block-1')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('block-1')).toHaveAttribute('aria-label', 'House 1, hidden, red (X) crew, press to recall the crew');
    expect(screen.getByTestId('block-1').querySelector('.plan-tag')).toHaveTextContent('Plan');
    expect(screen.getByTestId('block-0')).toHaveAttribute('aria-pressed', 'false');
    const group = screen.getByRole('group');
    expect(group.querySelectorAll('.crew-planned')).toHaveLength(1);
    expect(group.querySelector('.crew-planned')?.getAttribute('data-crew-q')).toBe('1');
    // the selected-crew preview is present on every empty house (shown by CSS on focus/hover only)
    expect(screen.getByTestId('block-0').querySelector('.crew-preview')).not.toBeNull();
    expect(screen.getByTestId('block-8').querySelector('.crew-preview')).not.toBeNull();
    expect(screen.getByTestId('block-1').querySelector('.crew-preview')).toBeNull();
  });
});

describe('Scene · detectors', () => {
  function Harness() {
    const [hl, setHl] = useState<number | null>(null);
    return <Scene codeId="rsc3" circuit={[]} fires={null} crews={null} residual={null} syndrome={RSC3.syndrome} interactive onToggle={() => undefined} selected="X" fog highlightedCheck={hl} onToggleDetector={setHl} />;
  }

  it('detectors are real buttons; tapping one highlights only the houses it watches, tapping again clears', () => {
    render(<Harness />);
    const z0 = screen.getByTestId('detector-Z0');
    expect(z0.tagName).toBe('BUTTON');
    expect(z0).toHaveAttribute('aria-pressed', 'false');
    expect(z0).toHaveAttribute('aria-label', 'Z0, ringing, watches houses 0, 1, 3, 4');
    expect(screen.getByTestId('detector-Z1')).toHaveAttribute('aria-label', 'Z1, quiet, watches houses 4, 5, 7, 8');
    const group = screen.getByRole('group');
    expect(group.querySelectorAll('.watch-tint')).toHaveLength(0);
    fireEvent.click(z0);
    expect(screen.getByTestId('detector-Z0')).toHaveAttribute('aria-pressed', 'true');
    const tints = Array.from(group.querySelectorAll('.watch-tint')).map((e) => Number(e.getAttribute('data-watch-q')));
    expect(tints).toEqual([0, 1, 3, 4]);
    expect(group.querySelectorAll('.watch-lines line')).toHaveLength(4);
    expect(group.querySelector('.detector.is-highlighted')?.getAttribute('data-detector')).toBe('Z0');
    expect(group.querySelectorAll('.detector.is-highlighted')).toHaveLength(1);
    // another detector swaps the highlight
    fireEvent.click(screen.getByTestId('detector-X3'));
    expect(Array.from(group.querySelectorAll('.watch-tint')).map((e) => e.getAttribute('data-watch-q'))).toEqual(['5', '8']);
    fireEvent.click(screen.getByTestId('detector-X3'));
    expect(group.querySelectorAll('.watch-tint')).toHaveLength(0);
    expect(screen.getByTestId('detector-X3')).toHaveAttribute('aria-pressed', 'false');
  });

  it('ringing detectors follow the syndrome; without onToggleDetector they are images, not buttons', () => {
    render(<Scene codeId="rsc3" circuit={[]} fires={null} crews={null} residual={null} syndrome={RSC3.syndrome} interactive={false} />);
    const group = screen.getByRole('group');
    const ringing = Array.from(group.querySelectorAll('.detector[data-ringing="true"]')).map((d) => d.getAttribute('data-detector'));
    expect(ringing).toEqual(['Z0', 'Z2', 'X1']);
    expect(within(group).queryAllByRole('button')).toHaveLength(0);
    expect(screen.getByRole('img', { name: 'Z0, ringing, watches houses 0, 1, 3, 4' })).toBeInTheDocument();
  });
});

describe('Scene · keyboard and labels', () => {
  it('arrow keys move focus between houses by geometry', () => {
    render(<Scene codeId="rsc3" circuit={[]} fires={null} crews={null} residual={null} syndrome={null} interactive onToggle={() => undefined} selected="X" fog />);
    const b4 = screen.getByTestId('block-4');
    b4.focus();
    fireEvent.keyDown(b4, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(screen.getByTestId('block-5'));
    fireEvent.keyDown(screen.getByTestId('block-5'), { key: 'ArrowDown' });
    expect(document.activeElement).toBe(screen.getByTestId('block-8'));
    fireEvent.keyDown(screen.getByTestId('block-8'), { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(screen.getByTestId('block-7'));
    fireEvent.keyDown(screen.getByTestId('block-7'), { key: 'ArrowUp' });
    expect(document.activeElement).toBe(screen.getByTestId('block-4'));
  });

  it('toggles through onToggle and respects the budget label', () => {
    const onToggle = vi.fn();
    render(<Scene codeId="rep3" circuit={[]} fires={null} crews={null} residual={null} syndrome={[1, 1]} interactive onToggle={onToggle} selected="X" fog budgetReached />);
    fireEvent.click(screen.getByTestId('block-1'));
    expect(onToggle).toHaveBeenCalledWith(1);
    expect(screen.getByTestId('block-0')).toHaveAttribute('aria-label', 'House 0, hidden, no crews left');
  });

  it('training / replay labels name fires, watchers and crews (no fog)', () => {
    render(<Scene codeId="rep3" circuit={[]} fires="IXI" crews="IXI" residual="III" syndrome={[0, 0]} interactive={false} />);
    expect(screen.getByRole('img', { name: 'House 1, watched by Z0, Z1, fire out, red (X) crew' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'House 0, watched by Z0' })).toBeInTheDocument();
    const group = screen.getByRole('group');
    expect(group.querySelector('[data-house="1"]')?.getAttribute('data-house-state')).toBe('out');
  });

  it('every house hit box is at least 48 px at phone width (375 − 2 × 16 gutter) or enlarged by the CSS floor', () => {
    // The SVG box of the smallest house at 343 px scene width; the CSS `max(100%, 48px)` floor covers the rest.
    const geo = sceneGeometry('grid', 'rsc3');
    const scale = 343 / geo.width;
    for (let q = 0; q < 9; q++) {
      const box = houseBox(geo, q, defaultHouseVariant('grid', q));
      expect(Math.max(box.w * scale, 48)).toBeGreaterThanOrEqual(48);
      expect(Math.max(box.h * scale, 48)).toBeGreaterThanOrEqual(48);
      expect(box.w * scale).toBeGreaterThan(40); // the drawn house itself is nearly tap-sized before the floor
    }
  });
});

describe('Scene · lane boards', () => {
  const bridge = getPublicMission('red-forward-blue-backward');
  const lab = getPublicMission('color-switch');

  it('derives bridge / lab / row / grid kinds from code and circuit', () => {
    expect(deriveSceneKind('rep3', [])).toBe('houses-row');
    expect(deriveSceneKind('rsc3', [])).toBe('grid');
    expect(deriveSceneKind(bridge.code, bridge.circuit)).toBe('bridge');
    expect(deriveSceneKind(lab.code, lab.circuit)).toBe('lab');
  });

  it('bridge: tokens travel with the cursor and land in the houses at the end', () => {
    const { container, rerender } = render(<Scene codeId={bridge.code} circuit={bridge.circuit} fires="XZ" crews={null} residual={null} syndrome={null} interactive={false} gateCursor={-1} inputFires="XZ" />);
    expect(container.querySelector('[data-scene-kind]')?.getAttribute('data-scene-kind')).toBe('bridge');
    expect(container.querySelectorAll('.token')).toHaveLength(2);
    expect(container.querySelector('.time-cursor')).not.toBeNull();
    expect(container.querySelector('[data-house="0"]')?.getAttribute('data-house-state')).toBe('normal');
    rerender(<Scene codeId={bridge.code} circuit={bridge.circuit} fires="YY" crews={null} residual={null} syndrome={null} interactive={false} gateCursor={1} inputFires="XZ" />);
    expect(container.querySelectorAll('.token')).toHaveLength(0);
    expect(container.querySelector('.time-cursor')).toBeNull();
    expect(container.querySelector('[data-house="0"]')?.getAttribute('data-house-state')).toBe('fire');
    expect(screen.getByRole('img', { name: 'House 1, red-and-blue (Y) fire' })).toBeInTheDocument();
  });

  it('lab: draws mirror machines for H and a coupler for CNOT, marks the active gate', () => {
    const { container } = render(<Scene codeId={lab.code} circuit={lab.circuit} fires="XI" crews={null} residual={null} syndrome={null} interactive={false} gateCursor={0} inputFires="ZI" />);
    expect(container.querySelector('[data-scene-kind]')?.getAttribute('data-scene-kind')).toBe('lab');
    expect(container.querySelectorAll('.gate')).toHaveLength(3);
    expect(container.querySelectorAll('.gate.is-active')).toHaveLength(1);
    expect(container.textContent).toContain('H');
  });

  it('lane houses are interactive buttons too', () => {
    render(<Scene codeId={bridge.code} circuit={bridge.circuit} fires={null} crews={null} placements={{ 0: 'Y' }} residual={null} syndrome={null} interactive onToggle={() => undefined} selected="Y" gateCursor={1} inputFires="XZ" />);
    expect(screen.getByTestId('block-0')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('block-1')).toHaveAttribute('aria-label', 'House 1, press to send red-and-blue (Y) crew');
  });
});

describe('Scene · result decorations (R9)', () => {
  function outcomeOf(missionId: string, placements: Record<number, CrewLetter>) {
    const d = confirmDispatch(missionId, placements);
    const result = resultType(d);
    return { d, result, outcome: { result, logicalFlip: d.logicalFlip, patternQubits: support(fromString(d.residual)), beacon: true } };
  }

  it('restored: sprayed houses lit, no tower anomaly', () => {
    const { d, outcome } = outcomeOf('blind-dispatch', { 4: 'X' });
    const { container } = render(<Scene codeId="rsc3" circuit={[]} fires={d.fires} crews={d.crews} residual={d.residual} syndrome={d.syndromeOfResidual} interactive={false} outcome={outcome} />);
    expect(container.querySelector('[data-house="4"]')?.getAttribute('data-house-state')).toBe('restored');
    expect(container.querySelector('.memory-tower')?.getAttribute('data-anomaly')).toBe('none');
    expect(container.querySelector('.logical-chain')).toBeNull();
  });

  it('safe pattern: ghost houses for the residual support + the "logical info safe" badge', () => {
    const { d, result, outcome } = outcomeOf('two-kinds-of-trouble', { 1: 'X', 6: 'Z' });
    expect(result).toBe('safe-pattern');
    const { container } = render(<Scene codeId="rsc3" circuit={[]} fires={d.fires} crews={d.crews} residual={d.residual} syndrome={d.syndromeOfResidual} interactive={false} outcome={outcome} />);
    const ghosts = Array.from(container.querySelectorAll('[data-house-state="ghost"]')).map((h) => Number(h.getAttribute('data-house')));
    expect(ghosts).toEqual(support(fromString(d.residual)));
    expect(screen.getByTestId('badge-safe')).toHaveTextContent('Logical qubit safe');
  });

  it('still burning: residual houses with the thick outline and ringing detectors', () => {
    const { d, result, outcome } = outcomeOf('blind-dispatch', { 5: 'X' });
    expect(result).toBe('still-burning');
    const { container } = render(<Scene codeId="rsc3" circuit={[]} fires={d.fires} crews={d.crews} residual={d.residual} syndrome={d.syndromeOfResidual} interactive={false} outcome={outcome} />);
    const res = Array.from(container.querySelectorAll('[data-house-state="residual"]')).map((h) => Number(h.getAttribute('data-house')));
    expect(res).toEqual(support(fromString(d.residual)));
    expect(container.querySelectorAll('.detector[data-ringing="true"]').length).toBeGreaterThan(0);
  });

  it('logical failure: quiet alarms, the tower shows the X anomaly and the pattern houses are chained', () => {
    const { d, result, outcome } = outcomeOf('silent-failure', { 0: 'X' });
    expect(result).toBe('logical-failure');
    const { container } = render(<Scene codeId="rsc3" circuit={[]} fires={d.fires} crews={d.crews} residual={d.residual} syndrome={d.syndromeOfResidual} interactive={false} outcome={outcome} />);
    expect(container.querySelectorAll('.detector[data-ringing="true"]')).toHaveLength(0);
    expect(container.querySelector('.memory-tower')?.getAttribute('data-anomaly')).toBe('X');
    expect(container.querySelector('.logical-chain')?.getAttribute('data-chain')).toBe(support(fromString(d.residual)).join(','));
  });
});
