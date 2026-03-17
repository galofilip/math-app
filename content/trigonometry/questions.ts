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

// Known sin/cos/tan values at common angles
const TRIG_TABLE: Record<number, { sin: string; cos: string; tan: string }> = {
  0:   { sin: '0',          cos: '1',          tan: '0' },
  30:  { sin: '1/2',        cos: '√3/2',       tan: '1/√3' },
  45:  { sin: '√2/2',       cos: '√2/2',       tan: '1' },
  60:  { sin: '√3/2',       cos: '1/2',        tan: '√3' },
  90:  { sin: '1',          cos: '0',          tan: 'undefined' },
};

export function sinValueMC(): MultipleChoiceQuestion {
  const angles = [0, 30, 45, 60, 90];
  const angle = angles[randInt(0, 4)];
  const correct = TRIG_TABLE[angle].sin;
  const allValues = Object.values(TRIG_TABLE).map(v => v.sin);
  const wrongs = shuffle(allValues.filter(v => v !== correct)).slice(0, 3);
  const { options, correctIndex } = mcOptions(correct, wrongs);
  return {
    type: 'multiple-choice', id: qid(),
    prompt: `What is sin(${angle}°)?`,
    options, correctIndex,
    explanation: `sin(${angle}°) = ${correct}`,
  };
}

export function cosValueMC(): MultipleChoiceQuestion {
  const angles = [0, 30, 45, 60, 90];
  const angle = angles[randInt(0, 4)];
  const correct = TRIG_TABLE[angle].cos;
  const allValues = Object.values(TRIG_TABLE).map(v => v.cos);
  const wrongs = shuffle(allValues.filter(v => v !== correct)).slice(0, 3);
  const { options, correctIndex } = mcOptions(correct, wrongs);
  return {
    type: 'multiple-choice', id: qid(),
    prompt: `What is cos(${angle}°)?`,
    options, correctIndex,
    explanation: `cos(${angle}°) = ${correct}`,
  };
}

export function rightTriangleSideMC(): MultipleChoiceQuestion {
  // SOHCAHTOA: opposite = hyp × sin(angle)
  const hyp = randInt(5, 20);
  const angleDeg = [30, 45, 60][randInt(0, 2)];
  const sinApprox = angleDeg === 30 ? 0.5 : angleDeg === 45 ? 0.707 : 0.866;
  const opp = Math.round(hyp * sinApprox * 10) / 10;
  const correct = `${opp}`;
  const { options, correctIndex } = mcOptions(correct, [
    String(opp + 1), String(opp - 1), String(Math.round(hyp * Math.cos(angleDeg * Math.PI / 180) * 10) / 10)
  ]);
  return {
    type: 'multiple-choice', id: qid(),
    prompt: `In a right triangle, hypotenuse = ${hyp} and one angle = ${angleDeg}°.\nFind the opposite side (to 1 d.p.)`,
    options, correctIndex,
    explanation: `opp = hyp × sin(${angleDeg}°) = ${hyp} × ${sinApprox} ≈ ${opp}`,
  };
}

export function degreesToRadiansMC(): MultipleChoiceQuestion {
  const degrees = [30, 45, 60, 90, 120, 180, 270, 360][randInt(0, 7)];
  const radMap: Record<number, string> = {
    30: 'π/6', 45: 'π/4', 60: 'π/3', 90: 'π/2',
    120: '2π/3', 180: 'π', 270: '3π/2', 360: '2π',
  };
  const correct = radMap[degrees];
  const allRads = Object.values(radMap);
  const wrongs = shuffle(allRads.filter(r => r !== correct)).slice(0, 3);
  const { options, correctIndex } = mcOptions(correct, wrongs);
  return {
    type: 'multiple-choice', id: qid(),
    prompt: `Convert ${degrees}° to radians`,
    options, correctIndex,
    explanation: `${degrees}° × (π/180) = ${correct}`,
  };
}

export function buildTier1Questions(): Question[] {
  return Array.from({ length: 10 }, (_, i) =>
    i % 2 === 0 ? sinValueMC() : cosValueMC()
  );
}
export function buildTier2Questions(): Question[] {
  return Array.from({ length: 10 }, (_, i) =>
    i % 2 === 0 ? rightTriangleSideMC() : sinValueMC()
  );
}
export function buildTier3Questions(): Question[] {
  return Array.from({ length: 10 }, (_, i) =>
    i % 2 === 0 ? degreesToRadiansMC() : cosValueMC()
  );
}
export function buildTier4Questions(): Question[] {
  return Array.from({ length: 10 }, (_, i) =>
    i % 3 === 0 ? rightTriangleSideMC() : i % 3 === 1 ? degreesToRadiansMC() : sinValueMC()
  );
}
