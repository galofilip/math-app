import { View, Text } from 'react-native';
import { MotiView } from 'moti';
import { Question } from '@/types/game';

interface Props {
  correct: boolean;
  question: Question;
}

export default function FeedbackOverlay({ correct, question }: Props) {
  const explanation = 'explanation' in question ? question.explanation : '';

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 250 }}
      className={`rounded-2xl p-5 mt-4 ${correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
    >
      <View className="flex-row items-center gap-2 mb-2">
        <Text className="text-2xl">{correct ? '✅' : '❌'}</Text>
        <Text className={`font-bold text-lg ${correct ? 'text-green-700' : 'text-red-700'}`}>
          {correct ? 'Correct!' : 'Not quite'}
        </Text>
      </View>
      {explanation ? (
        <Text className="text-slate-600 text-sm leading-5">{explanation}</Text>
      ) : null}
    </MotiView>
  );
}
