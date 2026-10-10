/**
 * i18n tests: EN/JA key parity and placeholder parity, no empty strings, interpolation, plural pairs, language
 * detection, the React provider/hooks, mission copy constraints for all six districts in both languages, and the
 * Japanese fixture translations (caption counts and physics tokens exactly as fixtures/missions.json).
 */
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import missionsJson from '../../../fixtures/missions.json';
import { OUTCOME_LABEL, PROPAGATION_MISS_LABEL, QUALITY_LABEL } from '../../game/scoring';
import { SOURCE_LABEL } from '../../game/bridge';
import { CREW_LABEL } from '../theme';
import { en, type Key } from './en';
import { ja } from './ja';
import { DEFAULT_LANG, DICTIONARIES, LANGS, LANGUAGE_NAMES, interpolate, isLang, languageFromTag, plural, translate, translator, type Lang } from './core';
import { LanguageProvider } from './LanguageProvider';
import { useLanguage, useT } from './hooks';
import { MISSION_IDS, briefingText, debriefNarrative, fixtureCopyJa, isMissionId, missionCopy, reactionFor, trainingCaption, type MissionCopy, type ResultType } from './missions';
import * as barrel from './index';

const KEYS = Object.keys(en) as Key[];
const NAMESPACES = ['app', 'doc', 'title', 'how', 'city', 'briefing', 'training', 'challenge', 'plan', 'tutorial', 'dispatch', 'spray', 'result', 'why', 'debrief', 'details', 'cloud', 'settings', 'motion', 'notice', 'summary', 'mission', 'crew', 'fire', 'palette', 'alarms', 'legend', 'a11y', 'common'];

function placeholders(s: string): string[] {
  return Array.from(s.matchAll(/\{([A-Za-z][A-Za-z0-9_]*)\}/g), (m) => m[1] ?? '').sort();
}

/** Station ids (Z0, X1…), multi-letter Pauli strings (XI, YY, XXX…) and plain numbers that must survive translation. */
function physicsTokens(s: string): string[] {
  return Array.from(new Set(Array.from(s.matchAll(/\b[XYZ][0-3]\b|\b[XYZI]{2,9}\b|\b\d+\b/g), (m) => m[0])));
}

const sentencesEn = (s: string) => (s.match(/[.!?](?=\s|$)/g) ?? []).length;
const sentencesJa = (s: string) => (s.match(/[。！？]/g) ?? []).length;

/* ------------------------------------------------------------------ dictionaries */

describe('dictionaries', () => {
  it('ja has exactly the keys of en (parity, no extras, no gaps)', () => {
    expect(Object.keys(ja).sort()).toEqual([...KEYS].sort());
    expect(KEYS.length).toBeGreaterThan(300);
  });

  it('has no empty or whitespace-only strings in any language', () => {
    for (const lang of LANGS) {
      for (const k of KEYS) {
        const v = DICTIONARIES[lang][k];
        expect(typeof v, `${lang}.${k}`).toBe('string');
        expect(v.trim().length, `${lang}.${k} is empty`).toBeGreaterThan(0);
        expect(v, `${lang}.${k} has stray whitespace`).toBe(v.replace(/\s+$/, '').replace(/^\n/, ''));
      }
    }
  });

  it('uses the same {placeholders} in both languages for every key', () => {
    for (const k of KEYS) expect(placeholders(ja[k]), k).toEqual(placeholders(en[k]));
  });

  it('keys are namespaced (namespace.name[.more]) with a known namespace', () => {
    for (const k of KEYS) {
      expect(k, k).toMatch(/^[a-z0-9]+(\.[A-Za-z0-9]+)+$/);
      expect(NAMESPACES, `namespace of ${k}`).toContain(k.split('.')[0]);
    }
  });

  it('keeps the legacy English labels verbatim (crews, decision quality, outcomes, cloud sources)', () => {
    expect(en['crew.X']).toBe(CREW_LABEL.X);
    expect(en['crew.Z']).toBe(CREW_LABEL.Z);
    expect(en['crew.Y']).toBe(CREW_LABEL.Y);
    expect(en['result.quality.optimal']).toBe(QUALITY_LABEL.optimal);
    expect(en['result.quality.valid']).toBe(QUALITY_LABEL.valid);
    expect(en['result.quality.unlucky']).toBe(QUALITY_LABEL.unlucky);
    expect(en['result.quality.lucky']).toBe(QUALITY_LABEL.lucky);
    expect(en['result.quality.off']).toBe(QUALITY_LABEL.off);
    expect(en['result.outcome.success']).toBe(OUTCOME_LABEL.success);
    expect(en['result.outcome.logicalError']).toBe(OUTCOME_LABEL['logical-error']);
    expect(en['result.outcome.detectable']).toBe(OUTCOME_LABEL.detectable);
    expect(en['result.outcome.propagationMiss']).toBe(PROPAGATION_MISS_LABEL);
    expect(en['cloud.source.local']).toBe(SOURCE_LABEL['local-simulator']);
    expect(en['cloud.source.cached']).toBe(SOURCE_LABEL['cached-cloud']);
    expect(en['cloud.source.live']).toBe(SOURCE_LABEL['live-cloud']);
    // Japanese keeps the Local / Cached / Live words visible next to the translation.
    expect(ja['cloud.source.local']).toContain('Local');
    expect(ja['cloud.source.cached']).toContain('Cached');
    expect(ja['cloud.source.live']).toContain('Live');
  });

  it('states the science the same way in both languages', () => {
    // Z stations (diamonds) see red X fires, X stations (squares) see blue Z fires, on an ODD count.
    expect(en['how.alarms.desc']).toMatch(/diamond Z station .* odd number .* red \(X or Y\)/);
    expect(en['how.alarms.desc']).toMatch(/square X station .* odd number of blue \(Z or Y\)/);
    expect(ja['how.alarms.desc']).toMatch(/ひし形の Z ステーション.*赤い火 \(X か Y\) が奇数/);
    expect(ja['how.alarms.desc']).toMatch(/四角の X ステーション.*青い火 \(Z か Y\) が奇数/);
    // XOR, not "more is better"; success = stabilizer membership, not quiet alarms.
    expect(en['how.crews.desc']).toContain('XOR');
    expect(ja['how.crews.desc']).toContain('XOR');
    expect(en['how.verdict.desc']).toMatch(/stabilizer/);
    expect(ja['how.verdict.desc']).toMatch(/スタビライザー \(stabilizer\)/);
    expect(en['details.notSyndromeZero']).toMatch(/not by “syndrome = 0”/);
    expect(ja['details.notSyndromeZero']).toMatch(/「シンドローム = 0」では決まりません/);
    // The one-line quantum-rules note and the one-shot correction note exist in both languages.
    expect(en['spray.quantumRules']).toBe('Same crew puts a fire out. A different crew changes it. A crew on an empty house starts one. Quantum rules!');
    expect(ja['spray.quantumRules']).toContain('量子のルール');
    expect(en['spray.oneShot']).toMatch(/one correction/);
    // Water is not a blue Z fire.
    expect(en['legend.water']).toMatch(/not a blue fire/);
    expect(ja['legend.water']).toContain('青い火ではありません');
    // Qollab storage note.
    expect(en['city.hud.storage.qollab']).toContain('progress lasts for one Run');
    expect(ja['city.hud.storage.qollab']).toContain('1 回の Run');
  });

  it('exposes the tutorial, planning, four results, beacon, why, language and reduced-motion keys the redesign needs', () => {
    const needed: Key[] = [
      'tutorial.step1',
      'tutorial.step2',
      'tutorial.step3',
      'plan.undo',
      'plan.redo',
      'plan.clear',
      'plan.preview',
      'city.dispatch',
      'city.truck.travel',
      'city.status.locked',
      'city.status.available',
      'city.status.selected',
      'city.status.solved',
      'city.hud.freeRoam',
      'spray.crewsRunning',
      'spray.waterOn',
      'spray.splash',
      'spray.extinguished',
      'spray.changed',
      'spray.ignited',
      'result.type.restored.title',
      'result.type.safePattern.title',
      'result.type.stillBurning.title',
      'result.type.logicalFailure.title',
      'result.beacon.logicalX',
      'result.beacon.logicalZ',
      'result.beacon.pattern',
      'why.title',
      'details.show',
      'details.hide',
      'settings.language',
      'motion.stepper.next',
      'dispatch.answerCheck',
    ];
    for (const k of needed) expect(en[k].length).toBeGreaterThan(0);
    expect(en['tutorial.step1']).toBe('Pick a crew');
    expect(en['tutorial.step2']).toBe('Tap a house');
    expect(en['tutorial.step3']).toBe('Spray!');
    expect(en['dispatch.answerCheck']).toBe('Training replay: answer check');
    expect(ja['dispatch.answerCheck']).toBe('訓練リプレイ：答え合わせ');
  });

  it('brands the Japanese version "11Q" (119) and the English one "Q11" (911), truck lettering included', () => {
    expect(en['app.name']).toBe('Q11 Emergency');
    expect(en['app.lettering']).toBe('Q11');
    expect(ja['app.name']).toBe('11Q Emergency');
    expect(ja['app.lettering']).toBe('11Q');
    expect(translate('ja', 'doc.title', { app: ja['app.name'] })).toBe('11Q Emergency — 量子エラー訂正の消防ゲーム');
    expect(translate('ja', 'doc.city', { app: ja['app.name'] })).toBe('11Q Emergency — 街の地図');
    expect(translate('ja', 'doc.mission', { app: ja['app.name'], n: 4, title: 'Blind Dispatch' })).toBe('11Q Emergency — ミッション 4 · Blind Dispatch');
    // The title kicker is a plain Japanese line that says what the game is, not a katakana transliteration.
    expect(ja['title.heading']).toBe('量子エラー訂正の消防ゲーム');
    expect(ja['title.heading']).not.toMatch(/[ァ-ヶ]・/);
    expect(ja['app.tagline']).toBe(ja['title.heading']);
  });

  it('no Japanese string says "Q11": every human-facing brand mention in JA is "11Q"', () => {
    const offenders: string[] = [];
    for (const k of KEYS) if (ja[k].includes('Q11')) offenders.push(`ja.${k}`);
    for (const id of MISSION_IDS) {
      for (const [name, value] of fields(missionCopy(id, 'ja'))) if (value.includes('Q11')) offenders.push(`missions.ja ${id}.${name}`);
      const f = fixtureCopyJa(id);
      for (const [name, value] of [['briefing', f.briefing], ...f.training.map((c, i) => [`training[${String(i)}]`, c] as const), ...(['success', 'logical-error', 'detectable'] as const).map((v) => [`debrief.${v}`, f.debrief[v]] as const)]) {
        if (value.includes('Q11')) offenders.push(`fixtures.ja ${id}.${name}`);
      }
    }
    expect(offenders).toEqual([]);
    // …and the brand does appear, as 11Q, where the English says Q11.
    const brandKeys = KEYS.filter((k) => en[k].includes('Q11'));
    expect(brandKeys.length).toBeGreaterThanOrEqual(5);
    for (const k of brandKeys) expect(ja[k], k).toContain('11Q');
  });
});

/* ------------------------------------------------------------------ core */

describe('interpolate / translate', () => {
  it('fills {name} placeholders with strings and numbers', () => {
    expect(interpolate('{a} and {b}', { a: 1, b: 'x' })).toBe('1 and x');
    expect(interpolate('{n} {n}', { n: 2 })).toBe('2 2');
  });

  it('leaves unknown placeholders visible and returns the template untouched without params', () => {
    expect(interpolate('{a} {missing}', { a: 'ok' })).toBe('ok {missing}');
    expect(interpolate('{a}')).toBe('{a}');
    expect(interpolate('no braces', { a: 1 })).toBe('no braces');
  });

  it('translates with params in both languages and binds a translator', () => {
    expect(translate('en', 'title.progress', { stars: 3, max: 16 })).toBe('Progress: 3 of 16 stars.');
    expect(translate('ja', 'title.progress', { stars: 3, max: 16 })).toBe('進み具合：星 3 / 16');
    expect(translate('en', 'doc.mission', { app: 'Q11 Emergency', n: 4, title: 'Blind Dispatch' })).toBe('Q11 Emergency — Mission 4 · Blind Dispatch');
    const t = translator('ja');
    expect(t('city.dispatch')).toBe('出動！');
    expect(t('city.truck.travel', { district: '中央地区' })).toBe('消防車が中央地区へ向かっています…');
  });

  it('picks .one / .other plural variants and fills {n}', () => {
    expect(plural('en', 'briefing.budget', 1)).toBe('1 crew');
    expect(plural('en', 'briefing.budget', 2)).toBe('2 crews');
    expect(plural('ja', 'briefing.budget', 2)).toBe('2 隊');
    expect(plural('en', 'mission.status.attempts', 3)).toBe('3 attempts');
    expect(plural('en', 'result.costText', 1, { min: 1 })).toBe('1 crew used · minimum 1');
    expect(plural('en', 'result.costText', 2, { used: 2, min: 1 })).toBe('2 crews used · minimum 1');
  });

  it('recognises languages and maps browser tags', () => {
    expect(LANGS).toEqual(['en', 'ja']);
    expect(DEFAULT_LANG).toBe('en');
    expect(LANGUAGE_NAMES.ja).toBe('日本語');
    expect(isLang('ja')).toBe(true);
    expect(isLang('fr')).toBe(false);
    expect(isLang(undefined)).toBe(false);
    expect(languageFromTag('ja')).toBe('ja');
    expect(languageFromTag('ja-JP')).toBe('ja');
    expect(languageFromTag(' JA_jp ')).toBe('ja');
    expect(languageFromTag('jam')).toBe('en');
    expect(languageFromTag('en-US')).toBe('en');
    expect(languageFromTag(null)).toBe('en');
    expect(languageFromTag(undefined)).toBe('en');
  });
});

/* ------------------------------------------------------------------ React */

function Probe({ params }: { readonly params?: Readonly<Record<string, string | number>> }) {
  const t = useT();
  const lang = useLanguage();
  return (
    <p>
      <span data-testid="lang">{lang}</span>
      <span data-testid="text">{params === undefined ? t('city.dispatch') : t('title.progress', params)}</span>
    </p>
  );
}

describe('LanguageProvider / useT / useLanguage', () => {
  it('defaults to English without a provider', () => {
    render(<Probe />);
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    expect(screen.getByTestId('text')).toHaveTextContent('Dispatch!');
  });

  it('provides the language, interpolates, switches live and mirrors <html lang>', () => {
    const { rerender } = render(
      <LanguageProvider language="ja">
        <Probe params={{ stars: 2, max: 16 }} />
      </LanguageProvider>,
    );
    expect(screen.getByTestId('lang')).toHaveTextContent('ja');
    expect(screen.getByTestId('text')).toHaveTextContent('進み具合：星 2 / 16');
    expect(document.documentElement.lang).toBe('ja');
    rerender(
      <LanguageProvider language="en">
        <Probe params={{ stars: 2, max: 16 }} />
      </LanguageProvider>,
    );
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
    expect(screen.getByTestId('text')).toHaveTextContent('Progress: 2 of 16 stars.');
    expect(document.documentElement.lang).toBe('en');
  });

  it('is re-exported from the barrel', () => {
    expect(barrel.LanguageProvider).toBe(LanguageProvider);
    expect(barrel.useT).toBe(useT);
    expect(barrel.useLanguage).toBe(useLanguage);
    expect(barrel.missionCopy).toBe(missionCopy);
    expect(barrel.fixtureCopyJa).toBe(fixtureCopyJa);
    expect(barrel.en).toBe(en);
    expect(barrel.ja).toBe(ja);
  });
});

/* ------------------------------------------------------------------ mission copy */

const RESULT_TYPES: readonly ResultType[] = ['restored', 'safe-pattern', 'still-burning', 'logical-failure'];
const NO_BLAME_EN = /\b(you failed|your fault|wrong answer|stupid|bad job)\b/i;
const NO_BLAME_JA = /(失敗です|まちがいです|だめです|ざんねん)/;

function fields(c: MissionCopy): readonly (readonly [string, string])[] {
  return [
    ['districtName', c.districtName],
    ['kidTitle', c.kidTitle],
    ['goal', c.goal],
    ['beginnerHint', c.beginnerHint],
    ['lessonOneLiner', c.lessonOneLiner],
    ['reactions.restored', c.reactions.restored],
    ['reactions.safePattern', c.reactions.safePattern],
    ['reactions.stillBurning', c.reactions.stillBurning],
    ['reactions.logicalFailure', c.reactions.logicalFailure],
    ['whyShort', c.whyShort],
    ['detailsTitle', c.detailsTitle],
  ];
}

describe('missionCopy', () => {
  it('covers the six fixture missions, in fixture order, and rejects unknown ids', () => {
    expect([...MISSION_IDS]).toEqual(missionsJson.map((m) => m.id));
    expect(isMissionId('first-alarm')).toBe(true);
    expect(isMissionId('nope')).toBe(false);
    expect(() => missionCopy('nope', 'en')).toThrow(/unknown mission 'nope'/);
    expect(() => fixtureCopyJa('nope')).toThrow(/unknown mission/);
  });

  it.each(MISSION_IDS)('%s: every field is filled in EN and JA', (id) => {
    for (const lang of LANGS) {
      for (const [name, value] of fields(missionCopy(id, lang))) expect(value.trim().length, `${lang} ${id} ${name}`).toBeGreaterThan(0);
    }
  });

  it.each(MISSION_IDS)('%s: goal is one short sentence (≤ 90 characters) in both languages', (id) => {
    const enGoal = missionCopy(id, 'en').goal;
    const jaGoal = missionCopy(id, 'ja').goal;
    expect(enGoal.length, enGoal).toBeLessThanOrEqual(90);
    expect(jaGoal.length, jaGoal).toBeLessThanOrEqual(90);
    expect(sentencesEn(enGoal), enGoal).toBe(1);
    expect(sentencesJa(jaGoal), jaGoal).toBe(1);
  });

  it.each(MISSION_IDS)('%s: each reaction is two short sentences without blame', (id) => {
    const enR = missionCopy(id, 'en').reactions;
    const jaR = missionCopy(id, 'ja').reactions;
    for (const r of [enR.restored, enR.safePattern, enR.stillBurning, enR.logicalFailure]) {
      expect(sentencesEn(r), r).toBe(2);
      expect(r.length, r).toBeLessThanOrEqual(170);
      expect(r).not.toMatch(NO_BLAME_EN);
    }
    for (const r of [jaR.restored, jaR.safePattern, jaR.stillBurning, jaR.logicalFailure]) {
      expect(sentencesJa(r), r).toBe(2);
      expect(r).not.toMatch(NO_BLAME_JA);
    }
  });

  it.each(MISSION_IDS)('%s: Japanese keeps station ids, Pauli strings and numbers from the English copy; district name is a Japanese place name', (id) => {
    const enC = missionCopy(id, 'en');
    const jaC = missionCopy(id, 'ja');
    const enF = fields(enC);
    const jaF = fields(jaC);
    enF.forEach(([name, enText], i) => {
      const jaText = jaF[i]?.[1] ?? '';
      if (name === 'districtName' || name === 'kidTitle') return; // kid titles may be free translations
      for (const tok of physicsTokens(enText)) expect(jaText, `${id} ${name}: token ${tok}`).toContain(tok);
    });
    // A toy-city Japanese place name, no English in parentheses, short enough for the map label.
    expect(jaC.districtName).not.toMatch(/[A-Za-z()（）]/);
    expect(jaC.districtName.length).toBeLessThanOrEqual(6);
    expect(jaC.detailsTitle).toMatch(/^詳細/);
    expect(enC.detailsTitle).toMatch(/^Details/);
  });

  it('reactionFor maps the four board results to the four reactions; a bare-wire prediction miss reuses the "fire left on the wire" line', () => {
    const c = missionCopy('silent-failure', 'en');
    expect(RESULT_TYPES.map((r) => reactionFor(c, r))).toEqual([c.reactions.restored, c.reactions.safePattern, c.reactions.stillBurning, c.reactions.logicalFailure]);
    const bridge = missionCopy('red-forward-blue-backward', 'en');
    expect(reactionFor(bridge, 'prediction-miss')).toBe(bridge.reactions.logicalFailure);
    expect(reactionFor(bridge, 'prediction-miss')).toMatch(/prediction missed/);
    expect(en['result.type.predictionMiss.title']).toBe('Prediction missed');
    expect(ja['result.type.predictionMiss.title']).toBe('予想がはずれた');
    expect(en['result.type.predictionMiss.body']).not.toMatch(/beacon|alarm station|silent/i);
    // Central District: a blue crew on a red fire makes a Y fire (never "cannot touch").
    expect(missionCopy('blind-dispatch', 'en').reactions.stillBurning).toMatch(/turns it into a Y fire/);
    expect(missionCopy('blind-dispatch', 'en').reactions.stillBurning).not.toMatch(/cannot touch/);
    expect(missionCopy('blind-dispatch', 'ja').reactions.stillBurning).toContain('Y の火');
    // The summary scopes "single fires are always caught" to the surface-code districts.
    expect(en['summary.lead']).toMatch(/surface-code districts a single fire is always caught/);
    expect(ja['summary.lead']).toContain('表面符号の地区');
    expect(reactionFor(c, 'logical-failure')).toMatch(/Investigation complete/);
    expect(reactionFor(missionCopy('silent-failure', 'ja'), 'logical-failure')).toContain('調査完了');
  });

  it('silent-failure teaches "alarms alone cannot decide" and distance 3 in both languages', () => {
    expect(missionCopy('silent-failure', 'en').whyShort).toMatch(/Alarms alone cannot decide/);
    expect(missionCopy('silent-failure', 'en').whyShort).toMatch(/distance 3/);
    expect(missionCopy('silent-failure', 'ja').whyShort).toMatch(/警報だけでは決められない/);
    expect(missionCopy('silent-failure', 'ja').whyShort).toMatch(/距離 3/);
    // Causality runs the right way: indistinguishable alarms → undecidable; distance 3 → one fire always fixed, two can fool.
    expect(missionCopy('silent-failure', 'ja').whyShort).not.toMatch(/決められないので、/);
    expect(missionCopy('silent-failure', 'ja').whyShort).toMatch(/火 1 つまで.*火 2 つ/);
    expect(missionCopy('blind-dispatch', 'en').lessonOneLiner).toBe('Red stations (Z checks) notice red fires; blue stations (X checks) notice blue fires.');
  });
});

/* ------------------------------------------------------------------ fixture translations */

describe('fixtureCopyJa', () => {
  it.each(missionsJson.map((m) => [m.id, m] as const))('%s: has one caption per training lesson and every debrief text', (_id, m) => {
    const ja = fixtureCopyJa(m.id);
    expect(ja.training).toHaveLength(m.training.length);
    ja.training.forEach((c) => expect(c.trim().length).toBeGreaterThan(0));
    expect(ja.briefing.trim().length).toBeGreaterThan(0);
    for (const k of ['success', 'logical-error', 'detectable'] as const) expect(ja.debrief[k].trim().length, `${m.id} ${k}`).toBeGreaterThan(0);
  });

  it.each(missionsJson.map((m) => [m.id, m] as const))('%s: keeps every station id, Pauli string and number of the English fixture text', (_id, m) => {
    const ja = fixtureCopyJa(m.id);
    const pairs: (readonly [string, string, string])[] = [['briefing', m.briefing, ja.briefing]];
    m.training.forEach((t, i) => pairs.push([`training[${String(i)}]`, t.caption, ja.training[i] ?? '']));
    for (const k of ['success', 'logical-error', 'detectable'] as const) pairs.push([`debrief.${k}`, m.debrief[k], ja.debrief[k]]);
    for (const [name, enText, jaText] of pairs) {
      for (const tok of physicsTokens(enText)) expect(jaText, `${m.id} ${name}: token ${tok}`).toContain(tok);
    }
  });

  it('keeps the physics statements exact in the translations', () => {
    const m1 = fixtureCopyJa('first-alarm');
    expect(m1.briefing).toContain('赤い火 (X エラー) しかつけません');
    expect(m1.briefing).toContain('ちょうど 1 つが燃えているときに鳴ります');
    expect(m1.debrief.success).toContain('(X·X = I)');
    expect(m1.debrief['logical-error']).toContain('(XXX)');
    const m4 = fixtureCopyJa('blind-dispatch');
    expect(m4.briefing).toMatch(/赤いステーション \(Z 検査、ひし形\) は赤い火/);
    expect(m4.briefing).toMatch(/青いステーション \(X 検査、四角\) は青い火/);
    expect(m4.training[0]).toContain('スタビライザー (stabilizer)');
    const m6 = fixtureCopyJa('silent-failure');
    expect(m6.debrief['logical-error']).toContain('距離 (distance) は 3');
    expect(m6.debrief['logical-error']).toContain('論理 X');
    expect(m6.debrief.success).toContain('星は最大 1 つ');
  });

  it('language helpers return the English text for en and the translation for ja, with safe fallbacks', () => {
    const m = missionsJson[1];
    if (m === undefined) throw new Error('fixture missing');
    expect(briefingText(m.id, 'en', m.briefing)).toBe(m.briefing);
    expect(briefingText(m.id, 'ja', m.briefing)).toBe(fixtureCopyJa(m.id).briefing);
    const cap = m.training[0]?.caption ?? '';
    expect(trainingCaption(m.id, 0, 'en', cap)).toBe(cap);
    expect(trainingCaption(m.id, 0, 'ja', cap)).toBe(fixtureCopyJa(m.id).training[0]);
    expect(trainingCaption(m.id, 99, 'ja', cap)).toBe(cap); // out of range → English
    expect(debriefNarrative(m.id, 'success', 'ja', m.debrief.success)).toBe(fixtureCopyJa(m.id).debrief.success);
    expect(debriefNarrative(m.id, 'detectable', 'en', m.debrief.detectable)).toBe(m.debrief.detectable);
  });
});

/* ------------------------------------------------------------------ type-level */

describe('types', () => {
  it('Lang is exactly en | ja', () => {
    const langs: Lang[] = ['en', 'ja'];
    expect(langs).toHaveLength(2);
  });
});
