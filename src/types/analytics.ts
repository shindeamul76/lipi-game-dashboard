
export interface TrendingGame {
  id: number;
  name: string;
  category: string;
  change: number;
  symbol?: string; // Optional for backward compatibility
}

export interface GameAnalytic {
  id: number;
  name: string;
  category: string;
  dailyPlayers: number;
  avgSessionTime: string;
  coinsPerSession: number;
  completionRate: number;
  rank: number;
  symbol?: string; // Optional for backward compatibility
  brokerScore?: number; // Optional for backward compatibility
  price?: number; // Optional for backward compatibility
  priceChange?: number; // Optional for backward compatibility
}

export interface LearningModeProgress {
  mode: 'Beginner' | 'Intermediate' | 'Advanced';
  totalUsers: number;
  activeUsers: number;
  completionRate: number;
  averageScore: number;
  timeSpent: string;
  coinsEarned: number;
  progressDistribution: {
    completed: number;
    inProgress: number;
    notStarted: number;
  };
}

export interface MatchConnectMetrics {
  dailyPlayers: number;
  weeklyPlayers: number;
  monthlyPlayers: number;
  averageSessionTime: string;
  completionRate: number;
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  coinsDistributed: number;
  playerRetention: {
    day1: number;
    day7: number;
    day30: number;
  };
}
