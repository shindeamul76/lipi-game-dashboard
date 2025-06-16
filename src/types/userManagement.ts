
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'banned';
  totalCoins: number;
  coinsSpent: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
}

export interface GamePreference {
  gameId: string;
  gameName: string;
  category: string;
  timePlayed: number; // in minutes
  sessionsCount: number;
  averageScore: number;
  lastPlayed: string;
  favorite: boolean;
}

export interface LearningProgress {
  userId: string;
  beginnerMode: {
    completed: number;
    total: number;
    averageScore: number;
    timeSpent: number; // in minutes
  };
  intermediateMode: {
    completed: number;
    total: number;
    averageScore: number;
    timeSpent: number;
  };
  advancedMode: {
    completed: number;
    total: number;
    averageScore: number;
    timeSpent: number;
  };
  overallProgress: number; // percentage
}

export interface UserRetentionMetrics {
  userId: string;
  daysSinceJoined: number;
  loginStreak: number;
  longestStreak: number;
  sessionsThisWeek: number;
  sessionsThisMonth: number;
  retentionScore: number; // 0-100
  churnRisk: 'low' | 'medium' | 'high';
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  retentionRate: number;
  averageSessionTime: number;
  topSpenders: number;
}
