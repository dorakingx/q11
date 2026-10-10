/**
 * Component tests (jsdom + @testing-library): the board places/removes crews, enforces the budget,
 * the Challenge view confirms, asks before standing down, and never receives the true error.
 */
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { useReducer } from 'react';
import { getPublicMission, initialState, reducer, type Action, type GameState } from '../game';
import { Board } from './Board';
import { ChallengeScreen } from './play';
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
    expect(screen.getByRole('button', { name: /^Block 4, press to send red \(X\) crew/ })).toBeInTheDocument();
    rerender(<Board codeId="rsc3" circuit={[]} fires="IIIIXIIII" crews={null} residual={null} syndrome={[1, 1, 0, 0, 0, 0, 0, 0]} interactive={false} />);
    expect(within(screen.getByRole('group')).queryAllByRole('button')).toHaveLength(0);
    expect(screen.getByRole('img', { name: 'Block 4, red (X) fire' })).toBeInTheDocument();
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
    expect(screen.getByRole('img', { name: 'Block 0, residual red (X) fire, red (X) crew' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Block 1, fire out, red (X) crew' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Block 2' })).toBeInTheDocument();
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

  it('keyboard: 1/2 select crews, Backspace clears, C confirms', async () => {
    const user = userEvent.setup();
    renderChallenge('two-kinds-of-trouble');
    await user.keyboard('2');
    expect(screen.getByTestId('palette-Z')).toHaveAttribute('aria-checked', 'true');
    await user.click(screen.getByTestId('block-7'));
    await user.keyboard('1');
    await user.click(screen.getByTestId('block-1'));
    expect(screen.getByTestId('budget')).toHaveTextContent('Crews: 2 / 2');
    await user.keyboard('{Backspace}');
    expect(screen.getByTestId('budget')).toHaveTextContent('Crews: 0 / 2');
    await user.click(screen.getByTestId('block-1'));
    await user.keyboard('c');
    expect(screen.getByTestId('debriefed')).toHaveTextContent('detectable');
  });

  it('never renders fire glyphs or the hidden Pauli string before confirm', () => {
    const { container } = renderChallenge('silent-failure');
    expect(container.querySelectorAll('.glyph-flame')).toHaveLength(0);
    expect(container.innerHTML).not.toContain('IXXIIIIII');
    expect(container.querySelectorAll('[data-ringing="1"]')).toHaveLength(1);
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
    await user.click(screen.getByRole('button', { name: /^Back$/ }));
    expect(screen.getByRole('heading', { name: 'Missions' })).toBeInTheDocument();
  });
});
