
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

// Match Game Metrics
export const matchGameMetrics = {
  dailyPlayers: 3200,
  weeklyPlayers: 10500,
  monthlyPlayers: 28000,
  averageSessionTime: "13:20",
  completionRate: 87.6,
  difficultyDistribution: {
    easy: 50,
    medium: 30,
    hard: 20
  },
  coinsDistributed: 420000,
  playerRetention: {
    day1: 93.4,
    day7: 76.1,
    day30: 62.8
  }
};

// Connect Game Metrics
export const connectGameMetrics = {
  dailyPlayers: 2700,
  weeklyPlayers: 9600,
  monthlyPlayers: 25200,
  averageSessionTime: "11:45",
  completionRate: 82.3,
  difficultyDistribution: {
    easy: 40,
    medium: 45,
    hard: 15
  },
  coinsDistributed: 385000,
  playerRetention: {
    day1: 91.2,
    day7: 73.8,
    day30: 60.5
  }
};

// Match Game Weekly Sessions Data
export const matchGameWeeklyData = [
  { day: "Mon", sessions: 450 },
  { day: "Tue", sessions: 600 },
  { day: "Wed", sessions: 700 },
  { day: "Thu", sessions: 800 },
  { day: "Fri", sessions: 1000 },
  { day: "Sat", sessions: 1200 },
  { day: "Sun", sessions: 1500 },
];

// Connect Game Weekly Sessions Data
export const connectGameWeeklyData = [
  { day: "Mon", sessions: 400 },
  { day: "Tue", sessions: 580 },
  { day: "Wed", sessions: 620 },
  { day: "Thu", sessions: 700 },
  { day: "Fri", sessions: 880 },
  { day: "Sat", sessions: 1100 },
  { day: "Sun", sessions: 1300 },
];