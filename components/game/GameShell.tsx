import { View, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Level } from '@/types/game';
import { useGameSession } from '@/hooks/useGameSession';
import QuestionCard from './QuestionCard';
import FeedbackOverlay from './FeedbackOverlay';
import ProgressBar from './ProgressBar';
import ResultsSummary from './ResultsSummary';
import BadgeUnlockModal from '@/components/rewards/BadgeUnlockModal';
import { useAppStore } from '@/store/appStore';

interface Props {
  level: Level;
  topicSlug: string;
}

export default function GameShell({ level, topicSlug }: Props) {
  const router = useRouter();
  const { gameState, currentQuestion, currentIndex, totalQuestions, answers, lastCorrect, result, startSession, submitAnswer } = useGameSession(level, topicSlug);
  const pendingBadgeIds = useAppStore(s => s.pendingBadgeIds);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    startSession();
  }, []);

  // Reset selected index when moving to next question
  useEffect(() => {
    if (gameState === 'question') setSelectedIdx(null);
  }, [gameState, currentIndex]);

  function handleAnswer(correct: boolean, optionIndex?: number) {
    if (optionIndex !== undefined) setSelectedIdx(optionIndex);
    submitAnswer(correct);
  }

  if (gameState === 'results' && result) {
    return (
      <>
        <ResultsSummary result={result} topicSlug={topicSlug} levelId={level.id} />
        {pendingBadgeIds.length > 0 && <BadgeUnlockModal />}
      </>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 gap-3">
        <Pressable onPress={() => router.back()} className="p-2">
          <Text className="text-2xl">✕</Text>
        </Pressable>
        <View className="flex-1">
          <ProgressBar total={totalQuestions} answers={answers} currentIndex={currentIndex} />
        </View>
        <Text className="text-slate-500 text-sm font-medium">
          {currentIndex + 1}/{totalQuestions}
        </Text>
      </View>

      <View className="flex-1 px-6 pt-4">
        {gameState === 'countdown' && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-6xl font-bold text-primary-600 mb-4">3</Text>
            <Text className="text-slate-500 text-lg">{level.title}</Text>
          </View>
        )}

        {(gameState === 'question' || gameState === 'feedback') && currentQuestion && (
          <View>
            {/* Question number */}
            <Text className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wide">
              Question {currentIndex + 1}
            </Text>

            <QuestionCard
              question={currentQuestion}
              onAnswer={(correct) => {
                // For MC, selectedIdx is set separately
                handleAnswer(correct);
              }}
              disabled={gameState === 'feedback'}
              selectedIndex={selectedIdx}
              revealIndex={gameState === 'feedback' ? currentQuestion.type === 'multiple-choice' ? (currentQuestion as any).correctIndex : null : null}
            />

            {gameState === 'feedback' && lastCorrect !== null && (
              <FeedbackOverlay correct={lastCorrect} question={currentQuestion} />
            )}
          </View>
        )}
      </View>

      {pendingBadgeIds.length > 0 && <BadgeUnlockModal />}
    </SafeAreaView>
  );
}
