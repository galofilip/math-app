import { Question, MultipleChoiceQuestion, FillInBlankQuestion } from '@/types/game';

let _idCounter = 0;
function qid() { return `q-${++_idCounter}`; }

/** Random integer between min and max inclusive */
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Shuffle an array (Fisher-Yates) */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Build MC options: correct + 3 wrong distractors, shuffled */
function mcOptions(correct: string, wrongs: string[]): { options: string[]; correctIndex: number } {
  const pool = shuffle([correct, ...wrongs.slice(0, 3)]);
  return { options: pool, correctIndex: pool.indexOf(correct) };
}

// ─── Tier 1: Linear equations (ax + b = c, solve for x) ──────────────────────

export function linearEquationQuestion(): FillInBlankQuestion {
  const a = randInt(1, 9);
  const x = randInt(-10, 10);
  const b = randInt(-10, 10);
  const c = a * x + b;
  return {
    type: 'fill-in-blank',
    id: qid(),
    prompt: `Solve for x:\n${a}x + (${b}) = ${c}`,
    correctAnswer: x,
    tolerance: 0.01,
    explanation: `${a}x = ${c} − (${b}) = ${c - b}   →   x = ${x}`,
  };
}

export function variableExpressionMC(): MultipleChoiceQuestion {
  const a = randInt(2, 8);
  const x = randInt(1, 10);
  const result = a * x;
  const wrong = [result + 1, result - 1, result + a].map(String);
  const { options, correctIndex } = mcOptions(String(result), wrong);
  return {
    type: 'multiple-choice',
    id: qid(),
    prompt: `If x = ${x}, what is ${a}x?`,
    options,
    correctIndex,
    explanation: `${a} × ${x} = ${result}`,
  };
}

// ─── Tier 2: Two-step equations, substitution ────────────────────────────────

export function twoStepEquationQuestion(): FillInBlankQuestion {
  const a = randInt(2, 6);
  const b = randInt(1, 8);
  const x = randInt(-8, 8);
  const c = a * x + b;
  return {
    type: 'fill-in-blank',
    id: qid(),
    prompt: `Solve for x:\n${a}x + ${b} = ${c}`,
    correctAnswer: x,
    tolerance: 0.01,
    explanation: `${a}x = ${c - b}   →   x = ${x}`,
  };
}

export function substitutionMC(): MultipleChoiceQuestion {
  const a = randInt(2, 5);
  const b = randInt(-5, 5);
  const x = randInt(1, 6);
  const result = a * x * x + b;
  const wrong = [result + 2, result - 2, result + a].map(String);
  const { options, correctIndex } = mcOptions(String(result), wrong);
  return {
    type: 'multiple-choice',
    id: qid(),
    prompt: `Evaluate ${a}x² + ${b} when x = ${x}`,
    options,
    correctIndex,
    explanation: `${a}(${x})² + ${b} = ${a * x * x} + ${b} = ${result}`,
  };
}

// ─── Tier 3: Inequalities, word problems ─────────────────────────────────────

export function inequalityMC(): MultipleChoiceQuestion {
  const a = randInt(2, 6);
  const b = randInt(1, 20);
  const xThreshold = Math.ceil(b / a);  // smallest integer satisfying ax > b
  const correct = `x > ${b / a % 1 === 0 ? b / a : (b / a).toFixed(2)}`;
  const wrongs = [
    `x < ${(b / a).toFixed(2)}`,
    `x ≥ ${(b / a).toFixed(2)}`,
    `x ≤ ${(b / a).toFixed(2)}`,
  ];
  const { options, correctIndex } = mcOptions(correct, wrongs);
  return {
    type: 'multiple-choice',
    id: qid(),
    prompt: `Solve the inequality:\n${a}x > ${b}`,
    options,
    correctIndex,
    explanation: `Divide both sides by ${a}: x > ${b}/${a} = ${(b / a).toFixed(2)}`,
  };
}

// ─── Tier 4: Systems of equations ────────────────────────────────────────────

export function systemOfEquationsMC(): MultipleChoiceQuestion {
  // x + y = s, x - y = d  → x = (s+d)/2, y = (s-d)/2
  const x = randInt(1, 8);
  const y = randInt(1, 8);
  const s = x + y;
  const d = x - y;
  const correct = `(${x}, ${y})`;
  const wrongs = [`(${x + 1}, ${y})`, `(${x}, ${y + 1})`, `(${y}, ${x})`];
  const { options, correctIndex } = mcOptions(correct, wrongs);
  return {
    type: 'multiple-choice',
    id: qid(),
    prompt: `Solve the system:\nx + y = ${s}\nx − y = ${d}`,
    options,
    correctIndex,
    explanation: `Add the equations: 2x = ${s + d} → x = ${x}. Then y = ${s} − ${x} = ${y}.`,
  };
}

// ─── Level question set builders ─────────────────────────────────────────────

export function buildTier1Questions(): Question[] {
  return Array.from({ length: 10 }, (_, i) =>
    i % 2 === 0 ? linearEquationQuestion() : variableExpressionMC()
  );
}

export function buildTier2Questions(): Question[] {
  return Array.from({ length: 10 }, (_, i) =>
    i % 2 === 0 ? twoStepEquationQuestion() : substitutionMC()
  );
}

export function buildTier3Questions(): Question[] {
  return Array.from({ length: 10 }, (_, i) =>
    i % 2 === 0 ? twoStepEquationQuestion() : inequalityMC()
  );
}

export function buildTier4Questions(): Question[] {
  return Array.from({ length: 10 }, (_, i) =>
    i % 2 === 0 ? systemOfEquationsMC() : substitutionMC()
  );
}
