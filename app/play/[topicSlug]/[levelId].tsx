import { useLocalSearchParams } from 'expo-router';
import GameShell from '@/components/game/GameShell';
import { TOPICS } from '@/content/topics';

export default function GameScreen() {
  const { topicSlug, levelId } = useLocalSearchParams<{ topicSlug: string; levelId: string }>();
  const topic = TOPICS.find((t) => t.slug === topicSlug);
  const level = topic?.levels.find((l) => l.id === levelId);

  if (!topic || !level) return null;

  return <GameShell level={level} topicSlug={topicSlug} />;
}
