import { View, Text, Pressable } from 'react-native';
import { MultipleChoiceQuestion } from '@/types/game';

interface Props {
  question: MultipleChoiceQuestion;
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
  revealIndex?: number | null;  // set after answer to highlight correct/wrong
  selectedIndex?: number | null;
}

const LABELS = ['A', 'B', 'C', 'D'];

export default function MultipleChoice({ question, onAnswer, disabled, revealIndex, selectedIndex }: Props) {
  function bgClass(i: number) {
    if (revealIndex === null || revealIndex === undefined) return 'bg-white border-slate-200';
    if (i === question.correctIndex) return 'bg-green-50 border-green-400';
    if (i === selectedIndex && i !== question.correctIndex) return 'bg-red-50 border-red-400';
    return 'bg-white border-slate-200';
  }

  return (
    <View className="gap-3">
      {question.options.map((option, i) => (
        <Pressable
          key={i}
          disabled={disabled}
          className={`flex-row items-center gap-3 rounded-2xl border-2 px-4 py-4 active:opacity-70 ${bgClass(i)}`}
          onPress={() => onAnswer(i === question.correctIndex)}
        >
          <View className="w-8 h-8 rounded-full bg-primary-100 items-center justify-center">
            <Text className="text-primary-700 font-bold text-sm">{LABELS[i]}</Text>
          </View>
          <Text className="flex-1 text-slate-800 text-base">{option}</Text>
        </Pressable>
      ))}
    </View>
  );
}
