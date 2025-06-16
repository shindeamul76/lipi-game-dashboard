
import { LearningModeProgress, MatchConnectMetrics } from "@/types/analytics";

export const learningModesProgress: LearningModeProgress[] = [
  {
    mode: 'Beginner',
    totalUsers: 3500,
    activeUsers: 950,
    completionRate: 94.3,
    averageScore: 85.7,
    timeSpent: '15:40',
    coinsEarned: 285000,
    progressDistribution: {
      completed: 2800,
      inProgress: 650,
      notStarted: 50
    }
  },
  {
    mode: 'Intermediate',
    totalUsers: 2200,
    activeUsers: 720,
    completionRate: 89.5,
    averageScore: 78.2,
    timeSpent: '18:20',
    coinsEarned: 360000,
    progressDistribution: {
      completed: 1850,
      inProgress: 320,
      notStarted: 30
    }
  },
  {
    mode: 'Advanced',
    totalUsers: 850,
    activeUsers: 420,
    completionRate: 76.8,
    averageScore: 72.4,
    timeSpent: '22:10',
    coinsEarned: 294000,
    progressDistribution: {
      completed: 580,
      inProgress: 220,
      notStarted: 50
    }
  }
];

export const matchConnectMetrics: MatchConnectMetrics = {
  dailyPlayers: 2500,
  weeklyPlayers: 8900,
  monthlyPlayers: 24500,
  averageSessionTime: '12:30',
  completionRate: 85.2,
  difficultyDistribution: {
    easy: 45,
    medium: 35,
    hard: 20
  },
  coinsDistributed: 375000,
  playerRetention: {
    day1: 92.5,
    day7: 78.3,
    day30: 65.8
  }
};

export const mahabharatWeeklyData = [
  { day: 'Mon', matchConnect: 2200, learning: 1650, total: 3850 },
  { day: 'Tue', matchConnect: 2400, learning: 1820, total: 4220 },
  { day: 'Wed', matchConnect: 2100, learning: 1580, total: 3680 },
  { day: 'Thu', matchConnect: 2600, learning: 1950, total: 4550 },
  { day: 'Fri', matchConnect: 2800, learning: 2100, total: 4900 },
  { day: 'Sat', matchConnect: 3200, learning: 2400, total: 5600 },
  { day: 'Sun', matchConnect: 2900, learning: 2200, total: 5100 }
];
