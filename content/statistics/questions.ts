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

export function meanQuestion(): FillInBlankQuestion {
  const count = randInt(3, 6);
  const values = Array.from({ length: count }, () => randInt(1, 20));
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / count;
  return {
    type: 'fill-in-blank', id: qid(),
    prompt: `Find the mean of: ${values.join(', ')}`,
    correctAnswer: mean, tolerance: 0.1,
    explanation: `Mean = (${values.join(' + ')}) / ${count} = ${sum} / ${count} = ${mean.toFixed(2)}`,
  };
}

export function medianMC(): MultipleChoiceQuestion {
  const values = Array.from({ length: 5 }, () => randInt(1, 20)).sort((a, b) => a - b);
  const median = values[2];
  const { options, correctIndex } = mcOptions(String(median), [
    String(values[1]), String(values[3]), String(Math.round(values.reduce((a, b) => a + b, 0) / 5))
  ]);
  return {
    type: 'multiple-choice', id: qid(),
    prompt: `Find the median of: ${values.join(', ')}`,
    options, correctIndex,
    explanation: `Sorted: ${values.join(', ')} → middle value is ${median}`,
  };
}

export function probabilityMC(): MultipleChoiceQuestion {
  const total = randInt(5, 20);
  const favorable = randInt(1, total - 1);
  const correct = `${favorable}/${total}`;
  const { options, correctIndex } = mcOptions(correct, [
    `${favorable + 1}/${total}`, `${total - favorable}/${total}`, `${favorable}/${total + 1}`
  ]);
  return {
    type: 'multiple-choice', id: qid(),
    prompt: `A bag has ${total} balls, ${favorable} of which are red.\nWhat is the probability of picking a red ball?`,
    options, correctIndex,
    explanation: `P(red) = favorable / total = ${favorable}/${total}`,
  };
}

export function rangeQuestion(): FillInBlankQuestion {
  const values = Array.from({ length: 5 }, () => randInt(1, 30));
  const range = Math.max(...values) - Math.min(...values);
  return {
    type: 'fill-in-blank', id: qid(),
    prompt: `Find the range of: ${values.join(', ')}`,
    correctAnswer: range, tolerance: 0,
    explanation: `Range = max − min = ${Math.max(...values)} − ${Math.min(...values)} = ${range}`,
  };
}

export function buildTier1Questions(): Question[] {
  return Array.from({ length: 10 }, (_, i) =>
    i % 2 === 0 ? meanQuestion() : medianMC()
  );
}
export function buildTier2Questions(): Question[] {
  return Array.from({ length: 10 }, (_, i) =>
    i % 2 === 0 ? probabilityMC() : rangeQuestion()
  );
}
export function buildTier3Questions(): Question[] {
  return Array.from({ length: 10 }, (_, i) =>
    i % 2 === 0 ? meanQuestion() : probabilityMC()
  );
}
export function buildTier4Questions(): Question[] {
  return Array.from({ length: 10 }, (_, i) =>
    i % 3 === 0 ? meanQuestion() : i % 3 === 1 ? probabilityMC() : medianMC()
  );
}
