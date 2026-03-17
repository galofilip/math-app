import { View, Text } from 'react-native';
import { AnswerRecord } from '@/types/game';

interface Props {
  total: number;
  answers: AnswerRecord[];
  currentIndex: number;
}

export default function ProgressBar({ total, answers, currentIndex }: Props) {
  return (
    <View className="flex-row gap-1 items-center">
      {Array.from({ length: total }).map((_, i) => {
        const answered = answers[i];
        let color = 'bg-slate-200';
        if (answered) color = answered.correct ? 'bg-green-400' : 'bg-red-400';
        else if (i === currentIndex) color = 'bg-primary-400';
        return <View key={i} className={`flex-1 h-2 rounded-full ${color}`} />;
      })}
    </View>
  );
}
