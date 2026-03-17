import { Level } from '@/types/game';
import { buildTier1Questions, buildTier2Questions, buildTier3Questions, buildTier4Questions } from './questions';

const geometryLevels: Level[] = [
  { id: 'geo-t1-l1', topicSlug: 'geometry', tier: 1, tierIndex: 1, title: 'Perimeter',           description: 'Calculate perimeters of basic shapes.',    generateQuestions: buildTier1Questions },
  { id: 'geo-t1-l2', topicSlug: 'geometry', tier: 1, tierIndex: 2, title: 'Area of Rectangles',  description: 'Find the area of rectangles and squares.', generateQuestions: buildTier1Questions },
  { id: 'geo-t1-l3', topicSlug: 'geometry', tier: 1, tierIndex: 3, title: 'Area of Triangles',   description: 'Calculate triangle areas.',                generateQuestions: buildTier1Questions },
  { id: 'geo-t1-l4', topicSlug: 'geometry', tier: 1, tierIndex: 4, title: 'Angles',              description: 'Identify and measure angles.',             generateQuestions: buildTier1Questions },
  { id: 'geo-t1-l5', topicSlug: 'geometry', tier: 1, tierIndex: 5, title: 'Lines & Rays',        description: 'Understand lines, segments, and rays.',   generateQuestions: buildTier1Questions },
  { id: 'geo-t2-l1', topicSlug: 'geometry', tier: 2, tierIndex: 1, title: 'Circles',             description: 'Area and circumference of circles.',       generateQuestions: buildTier2Questions },
  { id: 'geo-t2-l2', topicSlug: 'geometry', tier: 2, tierIndex: 2, title: 'Compound Shapes',     description: 'Area of combined shapes.',                 generateQuestions: buildTier2Questions },
  { id: 'geo-t2-l3', topicSlug: 'geometry', tier: 2, tierIndex: 3, title: 'Coordinate Geometry', description: 'Plot and interpret points on a grid.',     generateQuestions: buildTier2Questions },
  { id: 'geo-t2-l4', topicSlug: 'geometry', tier: 2, tierIndex: 4, title: 'Symmetry',            description: 'Identify lines of symmetry.',              generateQuestions: buildTier2Questions },
  { id: 'geo-t2-l5', topicSlug: 'geometry', tier: 2, tierIndex: 5, title: 'Transformations',     description: 'Reflections, rotations, translations.',    generateQuestions: buildTier2Questions },
  { id: 'geo-t3-l1', topicSlug: 'geometry', tier: 3, tierIndex: 1, title: 'Pythagorean Theorem', description: 'Apply a² + b² = c² to find side lengths.', generateQuestions: buildTier3Questions },
  { id: 'geo-t3-l2', topicSlug: 'geometry', tier: 3, tierIndex: 2, title: 'Angle Relationships', description: 'Supplementary, complementary, vertical.',  generateQuestions: buildTier3Questions },
  { id: 'geo-t3-l3', topicSlug: 'geometry', tier: 3, tierIndex: 3, title: 'Similar Triangles',   description: 'Use proportions to find missing sides.',   generateQuestions: buildTier3Questions },
  { id: 'geo-t3-l4', topicSlug: 'geometry', tier: 3, tierIndex: 4, title: '3D Shapes',           description: 'Surface area and volume basics.',          generateQuestions: buildTier3Questions },
  { id: 'geo-t3-l5', topicSlug: 'geometry', tier: 3, tierIndex: 5, title: 'Speed Round',         description: 'Mixed geometry under time pressure.',      generateQuestions: buildTier3Questions },
  { id: 'geo-t4-l1', topicSlug: 'geometry', tier: 4, tierIndex: 1, title: 'Proofs & Logic',      description: 'Geometric reasoning and proofs.',          generateQuestions: buildTier4Questions },
  { id: 'geo-t4-l2', topicSlug: 'geometry', tier: 4, tierIndex: 2, title: 'Congruence',          description: 'SSS, SAS, ASA congruence rules.',          generateQuestions: buildTier4Questions },
  { id: 'geo-t4-l3', topicSlug: 'geometry', tier: 4, tierIndex: 3, title: 'Circles Advanced',    description: 'Arcs, sectors, and inscribed angles.',     generateQuestions: buildTier4Questions },
  { id: 'geo-t4-l4', topicSlug: 'geometry', tier: 4, tierIndex: 4, title: 'Vectors',             description: 'Basic vector addition and magnitude.',     generateQuestions: buildTier4Questions },
  { id: 'geo-t4-l5', topicSlug: 'geometry', tier: 4, tierIndex: 5, title: 'Mastery Challenge',   description: 'The ultimate geometry test.',              generateQuestions: buildTier4Questions },
];

export default geometryLevels;
