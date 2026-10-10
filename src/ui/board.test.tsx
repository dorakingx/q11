/**
 * Component tests (jsdom + @testing-library): the board places/removes crews, enforces the budget,
 * the Challenge view confirms, asks before standing down, and never receives the true error.
 */
import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { useReducer, useState } from 'react';
import { getPublicMission, initialState, noneBridge, reducer, type Action, type CloudResultOk, type GameState } from '../game';
import { Board } from './Board';
import { ChallengeScreen, CloudPanel } from './play';
import { Dialog } from './panels';
import { App } from './App';

function Harness({ missionId, children }: { readonly missionId: string; readonly children: (s: GameState, d: (a: Action) => void) => JSX.Element }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    let s = initialState();
    s = reducer(s, { type: 'SELECT_MISSION', id: missionId });
    s = reducer(s, { type: 'START_MISSION' });
    s = reducer(s, { type: 'START_CHALLENGE' });
    return s;
  });
  return children(state, dispatch);
}

function renderChallenge(missionId: string) {
  return render(
    <Harness missionId={missionId}>
      {(state, dispatch) => {
        const m = getPublicMission(missionId);
        if (state.screen === 'debrief') return <div data-testid="debriefed">{state.debrief?.verdict}</div>;
        return <ChallengeScreen mission={m} placements={state.placements} selected={state.selected} standDownDialog={state.standDownDialog} dispatch={dispatch} />;
      }}
    </Harness>,
  );
}

describe('Board', () => {
  it('renders one button per block with accessible labels; non-interactive boards use images', () => {
    const { rerender } = render(<Board codeId="rsc3" circuit={[]} fires={null} crews={null} residual={null} syndrome={[1, 1, 0, 0, 0, 0, 0, 0]} interactive onToggle={() => undefined} selected="X" />);
    const group = screen.getByRole('group');
    expect(within(group).getAllByRole('button')).toHaveLength(9);
    expect(screen.getByRole('button', { name: /^Block 4, watched by Z0, Z1, X0, X1, press to send red \(X\) crew/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Block 0, watched by Z0, X2, / })).toBeInTheDocument();
    rerender(<Board codeId="rsc3" circuit={[]} fires="IIIIXIIII" crews={null} residual={null} syndrome={[1, 1, 0, 0, 0, 0, 0, 0]} interactive={false} />);
    expect(within(screen.getByRole('group')).queryAllByRole('button')).toHaveLength(0);
    expect(screen.getByRole('img', { name: 'Block 4, watched by Z0, Z1, X0, X1, red (X) fire' })).toBeInTheDocument();
  });

  it('draws ringing stations with the "!" glyph and quiet ones with their letter', () => {
    const { container } = render(<Board codeId="rep3" circuit={[]} fires={null} crews={null} residual={null} syndrome={[1, 0]} interactive={false} />);
    const stations = container.querySelectorAll('.station');
    expect(stations).toHaveLength(2);
    expect(stations[0]?.textContent).toBe('!');
    expect(stations[1]?.textContent).toBe('Z');
  });

  it('shows residual fires with the R outline and a tick for cancelled fires in the debrief', () => {
    render(<Board codeId="rep3" circuit={[]} fires="IXI" crews="XXI" residual="XII" syndrome={[1, 0]} interactive={false} />);
    expect(screen.getByRole('img', { name: 'Block 0, watched by Z0, residual red (X) fire, red (X) crew' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Block 1, watched by Z0, Z1, fire out, red (X) crew' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Block 2, watched by Z1' })).toBeInTheDocument();
  });

  it('wires board: tokens travel with the cursor and land in the output blocks at the end', () => {
    const circuit = [{ kind: 'CNOT', c: 0, t: 1 } as const];
    const { container, rerender } = render(<Board codeId="trivial2" circuit={circuit} fires="XI" crews={null} residual={null} syndrome={null} interactive={false} gateCursor={-1} inputFires="XI" />);
    // one pinned input token + one travelling token before the gate
    expect(container.querySelectorAll('.token')).toHaveLength(2);
    rerender(<Board codeId="trivial2" circuit={circuit} fires="XX" crews={null} residual={null} syndrome={null} interactive={false} gateCursor={1} inputFires="XI" />);
    // after the circuit only the pinned input token remains; fires sit in the output blocks
    expect(container.querySelectorAll('.token')).toHaveLength(1);
    expect(screen.getByRole('img', { name: 'Block 0, red (X) fire' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Block 1, red (X) fire' })).toBeInTheDocument();
  });
});

describe('ChallengeScreen', () => {
  it('places and removes crews, enforces the budget, swaps colour, confirms', async () => {
    const user = userEvent.setup();
    renderChallenge('blind-dispatch'); // budget 1, X/Z
    expect(screen.getByTestId('budget')).toHaveTextContent('Crews: 0 / 1');
    await user.click(screen.getByTestId('block-4'));
    expect(screen.getByTestId('budget')).toHaveTextContent('Crews: 1 / 1');
    expect(screen.getByTestId('block-4')).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByTestId('block-5')); // over budget
    expect(screen.getByTestId('block-5')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('budget')).toHaveTextContent('Crews: 1 / 1');
    await user.click(screen.getByTestId('palette-Z'));
    await user.click(screen.getByTestId('block-4')); // swap colour, still 1 crew
    expect(screen.getByText(/Z crew → block 4/)).toBeInTheDocument();
    await user.click(screen.getByTestId('block-4')); // remove
    expect(screen.getByTestId('budget')).toHaveTextContent('Crews: 0 / 1');
    await user.click(screen.getByTestId('palette-X'));
    await user.click(screen.getByTestId('block-4'));
    await user.click(screen.getByTestId('confirm'));
    expect(screen.getByTestId('debriefed')).toHaveTextContent('success');
  });

  it('asks "Stand down with no crews?" before confirming zero crews; cancel keeps the challenge', async () => {
    const user = userEvent.setup();
    renderChallenge('first-alarm');
    await user.click(screen.getByTestId('confirm'));
    expect(screen.getByRole('alertdialog')).toHaveTextContent('Stand down with no crews?');
    await user.click(screen.getByRole('button', { name: 'Keep dispatching' }));
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    await user.click(screen.getByTestId('confirm'));
    await user.click(screen.getByRole('button', { name: 'Stand down' }));
    expect(screen.getByTestId('debriefed')).toHaveTextContent('detectable');
  });

  it('keyboard: 1/2 select crews, Backspace recalls the focused block or clears, C confirms — only while focus is inside the dispatch screen', async () => {
    const user = userEvent.setup();
    renderChallenge('two-kinds-of-trouble');
    // Focus on the body: shortcuts are inert.
    await user.keyboard('2');
    expect(screen.getByTestId('palette-Z')).toHaveAttribute('aria-checked', 'false');
    await user.click(screen.getByTestId('palette-X')); // focus now inside the screen
    await user.keyboard('2');
    expect(screen.getByTestId('palette-Z')).toHaveAttribute('aria-checked', 'true');
    await user.click(screen.getByTestId('block-7'));
    await user.keyboard('1');
    await user.click(screen.getByTestId('block-1'));
    expect(screen.getByTestId('budget')).toHaveTextContent('Crews: 2 / 2');
    // Backspace with block 1 focused recalls only block 1.
    await user.keyboard('{Backspace}');
    expect(screen.getByTestId('budget')).toHaveTextContent('Crews: 1 / 2');
    expect(screen.getByText(/Z crew → block 7/)).toBeInTheDocument();
    // Backspace from the palette (no block focused) clears every crew.
    await user.click(screen.getByTestId('palette-X'));
    await user.keyboard('{Backspace}');
    expect(screen.getByTestId('budget')).toHaveTextContent('Crews: 0 / 2');
    await user.click(screen.getByTestId('block-1'));
    await user.keyboard('c');
    expect(screen.getByTestId('debriefed')).toHaveTextContent('detectable');
  });

  it('palette: one Tab stop (roving tabindex) and arrow keys move the selection', async () => {
    const user = userEvent.setup();
    renderChallenge('red-forward-blue-backward'); // X, Z, Y
    expect(screen.getByTestId('palette-X')).toHaveAttribute('tabindex', '0');
    expect(screen.getByTestId('palette-Z')).toHaveAttribute('tabindex', '-1');
    expect(screen.getByTestId('palette-X')).toHaveAccessibleName(/^X crew/);
    screen.getByTestId('palette-X').focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByTestId('palette-Z')).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByTestId('palette-Z')).toHaveFocus();
    await user.keyboard('{ArrowUp}{ArrowUp}');
    expect(screen.getByTestId('palette-Y')).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByTestId('palette-Y')).toHaveAttribute('tabindex', '0');
  });

  it('DOM order is palette → blocks → actions', () => {
    const { container } = renderChallenge('blind-dispatch');
    const order = Array.from(container.querySelectorAll<HTMLElement>('[data-testid="palette-X"], [data-testid="block-0"], [data-testid="confirm"]')).map((e) => e.dataset['testid']);
    expect(order).toEqual(['palette-X', 'block-0', 'confirm']);
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    expect(container.querySelectorAll('h3')).toHaveLength(0);
  });

  it('never renders fire glyphs or the hidden Pauli string before confirm', () => {
    const { container } = renderChallenge('silent-failure');
    expect(container.querySelectorAll('.glyph-flame')).toHaveLength(0);
    expect(container.innerHTML).not.toContain('IXXIIIIII');
    expect(container.querySelectorAll('[data-ringing="1"]')).toHaveLength(1);
  });
});

describe('Dialog', () => {
  function Host({ onCancel, onConfirm }: { readonly onCancel: () => void; readonly onConfirm: () => void }) {
    return (
      <div data-inert-root>
        <button type="button">Opener</button>
        <Dialog title="Sure?" confirmLabel="Yes" onCancel={onCancel} onConfirm={onConfirm}>
          <p>Body</p>
        </Dialog>
      </div>
    );
  }

  it('is modal: inert app content, focus trapped with Tab/Shift+Tab, Escape cancels, focus restored to the opener', async () => {
    const user = userEvent.setup();
    const cancel = vi.fn();
    const confirm = vi.fn();
    const Shell = () => {
      const [open, setOpen] = useState(false);
      return (
        <div data-inert-root>
          <button type="button" onClick={() => setOpen(true)}>
            Opener
          </button>
          {open ? (
            <Dialog
              title="Sure?"
              confirmLabel="Yes"
              onCancel={() => {
                cancel();
                setOpen(false);
              }}
              onConfirm={confirm}
            >
              <p>Body</p>
            </Dialog>
          ) : null}
        </div>
      );
    };
    const { container } = render(<Shell />);
    const opener = screen.getByRole('button', { name: 'Opener' });
    await user.click(opener);
    const root = container.querySelector('[data-inert-root]');
    expect(root).toHaveAttribute('inert');
    const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
    const yes = screen.getByRole('button', { name: 'Yes' });
    expect(cancelBtn).toHaveFocus();
    await user.tab();
    expect(yes).toHaveFocus();
    await user.tab();
    expect(cancelBtn).toHaveFocus(); // wrapped
    await user.tab({ shift: true });
    expect(yes).toHaveFocus(); // wrapped backwards
    // The dialog lives in a portal outside the inert root.
    expect(root?.contains(screen.getByRole('alertdialog'))).toBe(false);
    await user.keyboard('{Escape}');
    expect(cancel).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    expect(root).not.toHaveAttribute('inert');
    expect(opener).toHaveFocus();
  });

  it('focuses the cancel button once, not on every re-render', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Host onCancel={() => undefined} onConfirm={() => undefined} />);
    const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
    expect(cancelBtn).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Yes' })).toHaveFocus();
    rerender(<Host onCancel={() => undefined} onConfirm={() => undefined} />);
    expect(screen.getByRole('button', { name: 'Yes' })).toHaveFocus();
  });
});

describe('CloudPanel', () => {
  const rec = (missionId: string, correction: string, jobId: string): CloudResultOk => ({
    status: 'ok',
    source: 'cached-cloud',
    backendName: 'ionq_simulator',
    missionId,
    correction,
    shots: 100,
    counts: { '0000': 90, '0001': 10 },
    analysis: null,
    prediction: null,
    jobId,
    startedAt: '2026-10-10T00:00:00Z',
    finishedAt: '2026-10-10T00:00:05Z',
  });

  it('shows a card only for the recorded dispatch (or an equivalent one), with the recorded crews and job id', () => {
    const bridge = noneBridge([rec('blind-dispatch', 'IIIIXIIII', 'job-4')]);
    const { rerender } = render(<CloudPanel bridge={bridge} missionId="blind-dispatch" correction="IIIIXIIII" />);
    expect(screen.getByTestId('cloud-card')).toHaveTextContent('Recorded crews: IIIIXIIII');
    expect(screen.getByTestId('cloud-card')).toHaveTextContent('Job id: job-4');
    rerender(<CloudPanel bridge={bridge} missionId="blind-dispatch" correction="XIIIIIIII" />);
    expect(screen.queryByTestId('cloud-card')).not.toBeInTheDocument();
    expect(screen.getByTestId('cloud-empty')).toHaveTextContent('No cloud result recorded for this dispatch (recorded dispatches: IIIIXIIII).');
    rerender(<CloudPanel bridge={bridge} missionId="first-alarm" correction="IXI" />);
    expect(screen.getByTestId('cloud-empty')).toHaveTextContent('No cloud result recorded for this dispatch.');
  });

  it('filters in the UI even when a bridge ignores the correction argument (Qollab live path)', () => {
    const results = [rec('silent-failure', 'XIIIIIIII', 'job-6')];
    const bridge = { kind: 'qollab' as const, cached: (missionId: string) => results.filter((r) => r.missionId === missionId) };
    render(<CloudPanel bridge={bridge} missionId="silent-failure" correction="IXXIIIIII" />);
    expect(screen.queryByTestId('cloud-card')).not.toBeInTheDocument();
    expect(screen.getByTestId('cloud-empty')).toHaveTextContent('recorded dispatches: XIIIIIIII');
  });
});

describe('App', () => {
  it('boots to the title, plays to the mission list and back, with sound off by default', async () => {
    const user = userEvent.setup();
    render(<App storage="memory" />);
    expect(screen.getByRole('heading', { name: /Quantum Emergency Response/ })).toBeInTheDocument();
    await user.click(screen.getByTestId('play'));
    expect(screen.getByRole('heading', { name: 'Missions' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Settings' }));
    expect(screen.getByTestId('switch-sound')).toHaveAttribute('aria-checked', 'false');
    expect(screen.getByText(/kept in memory/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close settings' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /^Back$/ }));
    expect(screen.getByRole('heading', { name: 'Missions' })).toBeInTheDocument();
  });

  it('moves focus to the new screen heading (debrief: the verdict banner), sets document.title and announces each screen', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      render(<App storage="memory" />);
      await vi.advanceTimersByTimeAsync(100);
      // Initial load is not a screen change: no programmatic focus (so the title never shows a stray focus ring).
      expect(screen.getByRole('heading', { name: /Quantum Emergency Response/ })).not.toHaveFocus();
      expect(document.title).toBe('Q11 — Quantum Emergency Response');
      expect(screen.getByTestId('announcer')).toHaveTextContent('Q11 title screen.');
      await user.click(screen.getByTestId('play'));
      await vi.advanceTimersByTimeAsync(100);
      expect(screen.getByRole('heading', { name: 'Missions' })).toHaveFocus();
      expect(document.title).toBe('Q11 — Missions');
      expect(screen.getByTestId('announcer')).toHaveTextContent('Mission list.');
      await user.click(screen.getByTestId('mission-4'));
      await vi.advanceTimersByTimeAsync(100);
      expect(document.title).toBe('Q11 — Mission 4 · Blind Dispatch');
      expect(screen.getByTestId('announcer')).toHaveTextContent('Mission 4 briefing.');
      await user.click(screen.getByRole('button', { name: 'Skip to dispatch' }));
      await vi.advanceTimersByTimeAsync(100);
      expect(screen.getByRole('heading', { name: /Mission 4/ })).toHaveFocus();
      expect(screen.getByTestId('announcer')).toHaveTextContent('Mission 4 dispatch. 2 of 8 stations ringing: Z0, Z1.');
      await user.click(screen.getByTestId('block-4'));
      await user.click(screen.getByTestId('confirm'));
      await vi.advanceTimersByTimeAsync(100);
      expect(screen.getByTestId('verdict')).toHaveFocus();
      expect(screen.getByTestId('announcer')).toHaveTextContent('Mission 4 debrief. Logical qubit safe.');
      // The replay auto-plays from step 1; the banner is visible from the start.
      expect(screen.getByTestId('replay-caption')).toHaveTextContent('Step 1 of 5');
      expect(screen.getByTestId('replay-auto')).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByTestId('replay-auto')).toHaveTextContent('Auto-play');
      await vi.advanceTimersByTimeAsync(1700);
      expect(screen.getByTestId('replay-caption')).toHaveTextContent('Step 2 of 5');
    } finally {
      vi.useRealTimers();
    }
  });

  it('"Progress reset." notice disappears on the next screen change and the stand-down dialog makes the app inert', async () => {
    const user = userEvent.setup();
    const { container } = render(<App storage="memory" />);
    await user.click(screen.getByTestId('play'));
    await user.click(screen.getByRole('button', { name: 'Settings' }));
    await user.click(screen.getByTestId('reset-progress'));
    expect(container.querySelector('[data-inert-root]')).toHaveAttribute('inert');
    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(container.querySelector('[data-inert-root]')).not.toHaveAttribute('inert');
    expect(screen.getByTestId('notice')).toHaveTextContent('Progress reset.');
    await user.click(screen.getByRole('button', { name: /^Back$/ }));
    expect(screen.queryByTestId('notice')).not.toBeInTheDocument();
    await user.click(screen.getByTestId('mission-5'));
    await user.click(screen.getByTestId('start-mission'));
    await user.click(screen.getByTestId('confirm'));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(container.querySelector('[data-inert-root]')).toHaveAttribute('inert');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    expect(screen.getByTestId('confirm')).toHaveFocus();
  });
});
