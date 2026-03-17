/**
 * Core game state machine.
 * States: idle → countdown → question → feedback → results
 */
import { useState, useRef, useCallback } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { Level, Question, GameState, AnswerRecord } from '@/types/game';
import { SessionResult } from '@/types/progress';
import { calculateScore } from '@/lib/game-engine/scorer';
import { evaluateBadges } from '@/lib/game-engine/badgeEvaluator';
import {
  updateProgressXp, upsertLevelCompletion, insertGameSession,
  getLevelCompletions, getEarnedBadgeIds, getProgress, insertBadge,
} from '@/lib/db/queries';
import { useAppStore } from '@/store/appStore';

const TIME_LIMIT_MS = 10 * 30 * 1000; // ~5 min total per session (10 questions × 30s avg)

export function useGameSession(level: Level, topicSlug: string) {
  const { user } = useUser();
  const userId = user?.id ?? 'guest';
  const addPendingBadges = useAppStore(s => s.addPendingBadges);

  const [gameState, setGameState] = useState<GameState>('idle');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [result, setResult] = useState<SessionResult | null>(null);

  const sessionStartRef = useRef<number>(0);
  const questionStartRef = useRef<number>(0);
  // Track fast answers for Speed Demon badge
  const fastAnswerCountRef = useRef(0);

  const startSession = useCallback(() => {
    const qs = level.generateQuestions();
    setQuestions(qs);
    setCurrentIndex(0);
    setAnswers([]);
    setLastCorrect(null);
    setResult(null);
    fastAnswerCountRef.current = 0;
    setGameState('countdown');

    // After 3 seconds go to first question
    setTimeout(() => {
      sessionStartRef.current = Date.now();
      questionStartRef.current = Date.now();
      setGameState('question');
    }, 3000);
  }, [level]);

  const submitAnswer = useCallback((correct: boolean) => {
    const timeTakenMs = Date.now() - questionStartRef.current;
    if (timeTakenMs < 10000) fastAnswerCountRef.current += 1;

    const record: AnswerRecord = {
      questionId: questions[currentIndex].id,
      correct,
      timeTakenMs,
    };

    const newAnswers = [...answers, record];
    setAnswers(newAnswers);
    setLastCorrect(correct);
    setGameState('feedback');

    // After feedback delay, advance
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        questionStartRef.current = Date.now();
        setCurrentIndex(currentIndex + 1);
        setGameState('question');
      } else {
        finalizeSession(newAnswers);
      }
    }, 2000);
  }, [questions, currentIndex, answers]);

  function finalizeSession(finalAnswers: AnswerRecord[]) {
    const totalTimeMs = Date.now() - sessionStartRef.current;
    const score = finalAnswers.filter(a => a.correct).length;

    const prevCompletions = getLevelCompletions(userId);
    const alreadyCompleted = prevCompletions.some(c => c.levelId === level.id && c.starsEarned > 0);
    const prevProgress = getProgress(userId);
    const prevBadges = getEarnedBadgeIds(userId);

    const { totalXp: xpEarned, stars } = calculateScore({
      score,
      timeTakenMs: totalTimeMs,
      timeLimitMs: TIME_LIMIT_MS,
      streak: prevProgress.currentStreak,
      isFirstCompletion: !alreadyCompleted,
    });

    // Save to DB
    upsertLevelCompletion(userId, topicSlug, level.id, score, stars);
    updateProgressXp(userId, xpEarned);
    insertGameSession({
      id: `${userId}-${level.id}-${Date.now()}`,
      userId, topicSlug, levelId: level.id,
      score, xpEarned, timeTakenMs: totalTimeMs,
      completedAt: new Date().toISOString(),
    });

    // Badge evaluation
    const updatedCompletions = getLevelCompletions(userId);
    const newBadgeIds = evaluateBadges({
      earnedBadgeIds: prevBadges,
      totalXp: prevProgress.totalXp + xpEarned,
      currentStreak: prevProgress.currentStreak,
      levelCompletions: updatedCompletions,
      sessionXp: xpEarned,
      fastAnswerCount: fastAnswerCountRef.current,
    });

    for (const badgeId of newBadgeIds) {
      insertBadge(userId, badgeId);
    }
    if (newBadgeIds.length > 0) addPendingBadges(newBadgeIds);

    const sessionResult: SessionResult = { score, starsEarned: stars, xpEarned, timeTakenMs: totalTimeMs, newBadgeIds };
    setResult(sessionResult);
    setGameState('results');
  }

  const currentQuestion = questions[currentIndex] ?? null;

  return {
    gameState,
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    answers,
    lastCorrect,
    result,
    startSession,
    submitAnswer,
  };
}
