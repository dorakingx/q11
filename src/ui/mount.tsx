/**
 * mountQ11 — the one entry point used by both the web build (src/main.tsx) and the Qollab bundle.
 * Qollab's main.js calls `mountQ11(root, { bridge, storage: 'memory' })`.
 */
import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import type { QuantumBridge } from '../game';
import { App } from './App';
import './styles.css';

export interface MountOptions {
  readonly bridge?: QuantumBridge;
  readonly storage?: 'local' | 'memory';
}

export function mountQ11(root: HTMLElement, options: MountOptions = {}): Root {
  root.replaceChildren();
  const r = createRoot(root);
  const appProps = {
    ...(options.bridge === undefined ? {} : { bridge: options.bridge }),
    ...(options.storage === undefined ? {} : { storage: options.storage }),
  };
  r.render(
    <StrictMode>
      <App {...appProps} />
    </StrictMode>,
  );
  return r;
}
