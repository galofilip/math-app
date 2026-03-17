import { View, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { FillInBlankQuestion } from '@/types/game';

interface Props {
  question: FillInBlankQuestion;
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
}

export default function FillInBlank({ question, onAnswer, disabled }: Props) {
  const [value, setValue] = useState('');

  function submit() {
    const num = parseFloat(value.replace(',', '.'));
    if (isNaN(num)) return;
    const correct = Math.abs(num - question.correctAnswer) <= question.tolerance;
    onAnswer(correct);
  }

  return (
    <View>
      <View className="flex-row items-center gap-2 mb-4">
        <TextInput
          className="flex-1 bg-white border-2 border-slate-200 rounded-2xl px-4 py-4 text-slate-800 text-xl text-center"
          keyboardType="numeric"
          placeholder="?"
          value={value}
          onChangeText={setValue}
          editable={!disabled}
          onSubmitEditing={submit}
          returnKeyType="done"
        />
        {question.unit && (
          <Text className="text-slate-500 text-base">{question.unit}</Text>
        )}
      </View>
      <Pressable
        className="bg-primary-600 rounded-2xl py-4 items-center active:opacity-80 disabled:opacity-40"
        onPress={submit}
        disabled={disabled || value.trim() === ''}
      >
        <Text className="text-white font-bold text-base">Submit</Text>
      </Pressable>
    </View>
  );
}
