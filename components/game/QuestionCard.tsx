import { View, Text } from 'react-native';
import { Question } from '@/types/game';
import MultipleChoice from './MultipleChoice';
import FillInBlank from './FillInBlank';

interface Props {
  question: Question;
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
  selectedIndex?: number | null;
  revealIndex?: number | null;
}

export default function QuestionCard({ question, onAnswer, disabled, selectedIndex, revealIndex }: Props) {
  return (
    <View>
      <Text className="text-slate-800 text-xl font-semibold mb-6 leading-7">
        {question.prompt}
      </Text>

      {question.type === 'multiple-choice' && (
        <MultipleChoice
          question={question}
          onAnswer={onAnswer}
          disabled={disabled}
          selectedIndex={selectedIndex}
          revealIndex={revealIndex}
        />
      )}

      {question.type === 'fill-in-blank' && (
        <FillInBlank question={question} onAnswer={onAnswer} disabled={disabled} />
      )}

      {/* drag-drop and graph-interactive are placeholders for future implementation */}
      {(question.type === 'drag-drop' || question.type === 'graph-interactive') && (
        <Text className="text-slate-400 italic">Interactive question — coming soon</Text>
      )}
    </View>
  );
}
