import { Question, MultipleChoiceQuestion, FillInBlankQuestion } from '@/types/game';

let _id = 0;
function qid() { return `q-${++_id}`; }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function mcOptions(correct: string, wrongs: string[]) {
  const pool = shuffle([correct, ...wrongs.slice(0, 3)]);
  return { options: pool, correctIndex: pool.indexOf(correct) };
}

export function triangleAreaQuestion(): FillInBlankQuestion {
  const base = randInt(2, 20);
  const height = randInt(2, 20);
  const area = (base * height) / 2;
  return {
    type: 'fill-in-blank', id: qid(),
    prompt: `A triangle has base = ${base} and height = ${height}.\nWhat is its area?`,
    correctAnswer: area, tolerance: 0.1,
    explanation: `Area = ½ × base × height = ½ × ${base} × ${height} = ${area}`,
  };
}

export function rectangleAreaMC(): MultipleChoiceQuestion {
  const l = randInt(3, 15);
  const w = randInt(2, 10);
  const area = l * w;
  const { options, correctIndex } = mcOptions(String(area), [String(area + l), String(2 * (l + w)), String(l + w)]);
  return {
    type: 'multiple-choice', id: qid(),
    prompt: `What is the area of a rectangle with length ${l} and width ${w}?`,
    options, correctIndex,
    explanation: `Area = length × width = ${l} × ${w} = ${area}`,
  };
}

export function circleAreaMC(): MultipleChoiceQuestion {
  const r = randInt(1, 10);
  const area = Math.round(Math.PI * r * r * 100) / 100;
  const { options, correctIndex } = mcOptions(
    `≈ ${Math.round(area)}`,
    [`≈ ${Math.round(area) + 5}`, `≈ ${Math.round(Math.PI * 2 * r)}`, `≈ ${Math.round(area) - 3}`]
  );
  return {
    type: 'multiple-choice', id: qid(),
    prompt: `What is the area of a circle with radius ${r}?\n(Use π ≈ 3.14)`,
    options, correctIndex,
    explanation: `Area = π r² = 3.14 × ${r}² ≈ ${Math.round(area)}`,
  };
}

export function pythagoreanQuestion(): FillInBlankQuestion {
  // 3-4-5 family: (3k, 4k, 5k)
  const k = randInt(1, 5);
  const a = 3 * k, b = 4 * k, c = 5 * k;
  return {
    type: 'fill-in-blank', id: qid(),
    prompt: `A right triangle has legs ${a} and ${b}.\nWhat is the length of the hypotenuse?`,
    correctAnswer: c, tolerance: 0.1,
    explanation: `c = √(${a}² + ${b}²) = √(${a * a + b * b}) = ${c}`,
  };
}

export function angleSumMC(): MultipleChoiceQuestion {
  const a1 = randInt(30, 80);
  const a2 = randInt(30, 80);
  const a3 = 180 - a1 - a2;
  const { options, correctIndex } = mcOptions(String(a3), [String(a3 + 5), String(a3 - 5), String(360 - a1 - a2)]);
  return {
    type: 'multiple-choice', id: qid(),
    prompt: `A triangle has angles ${a1}° and ${a2}°.\nWhat is the third angle?`,
    options: options.map(o => o + '°'), correctIndex,
    explanation: `Angles sum to 180°: ${a1} + ${a2} + ? = 180 → ? = ${a3}°`,
  };
}

export function buildTier1Questions(): Question[] {
  return Array.from({ length: 10 }, (_, i) =>
    i % 2 === 0 ? rectangleAreaMC() : triangleAreaQuestion()
  );
}
export function buildTier2Questions(): Question[] {
  return Array.from({ length: 10 }, (_, i) =>
    i % 2 === 0 ? circleAreaMC() : triangleAreaQuestion()
  );
}
export function buildTier3Questions(): Question[] {
  return Array.from({ length: 10 }, (_, i) =>
    i % 2 === 0 ? pythagoreanQuestion() : angleSumMC()
  );
}
export function buildTier4Questions(): Question[] {
  return Array.from({ length: 10 }, (_, i) =>
    i % 3 === 0 ? pythagoreanQuestion() : i % 3 === 1 ? circleAreaMC() : angleSumMC()
  );
}
