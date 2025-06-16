
import { UserProfile, GamePreference, LearningProgress, UserRetentionMetrics, UserStats } from '@/types/userManagement';

export const userProfiles: UserProfile[] = [
  {
    id: "user-001",
    name: "Arjun Sharma",
    email: "arjun.sharma@email.com",
    avatar: "AS",
    joinDate: "2024-01-15",
    lastActive: "2024-06-15",
    status: "active",
    totalCoins: 15420,
    coinsSpent: 8580,
    level: 12,
    xp: 2850,
    xpToNextLevel: 650
  },
  {
    id: "user-002",
    name: "Priya Patel",
    email: "priya.patel@email.com",
    avatar: "PP",
    joinDate: "2024-02-03",
    lastActive: "2024-06-14",
    status: "active",
    totalCoins: 22100,
    coinsSpent: 12400,
    level: 18,
    xp: 4200,
    xpToNextLevel: 300
  },
  {
    id: "user-003",
    name: "Rahul Kumar",
    email: "rahul.kumar@email.com",
    avatar: "RK",
    joinDate: "2024-03-10",
    lastActive: "2024-06-10",
    status: "inactive",
    totalCoins: 8750,
    coinsSpent: 3250,
    level: 8,
    xp: 1450,
    xpToNextLevel: 1050
  },
  {
    id: "user-004",
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    avatar: "SR",
    joinDate: "2024-01-28",
    lastActive: "2024-06-15",
    status: "active",
    totalCoins: 31500,
    coinsSpent: 18900,
    level: 25,
    xp: 6750,
    xpToNextLevel: 1250
  },
  {
    id: "user-005",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    avatar: "VS",
    joinDate: "2024-04-12",
    lastActive: "2024-06-13",
    status: "active",
    totalCoins: 12300,
    coinsSpent: 5700,
    level: 10,
    xp: 2100,
    xpToNextLevel: 900
  }
];

export const gamePreferences: { [userId: string]: GamePreference[] } = {
  "user-001": [
    {
      gameId: "match-connect",
      gameName: "Match & Connect",
      category: "Mahabharat",
      timePlayed: 450,
      sessionsCount: 85,
      averageScore: 1250,
      lastPlayed: "2024-06-15",
      favorite: true
    },
    {
      gameId: "word-cruise",
      gameName: "Word Cruise",
      category: "Word Game",
      timePlayed: 320,
      sessionsCount: 62,
      averageScore: 980,
      lastPlayed: "2024-06-14",
      favorite: false
    }
  ],
  "user-002": [
    {
      gameId: "daily-word",
      gameName: "Daily Word",
      category: "Word Game",
      timePlayed: 280,
      sessionsCount: 95,
      averageScore: 1450,
      lastPlayed: "2024-06-14",
      favorite: true
    },
    {
      gameId: "beginner-mode",
      gameName: "Beginner Mode",
      category: "Learning",
      timePlayed: 540,
      sessionsCount: 78,
      averageScore: 1680,
      lastPlayed: "2024-06-13",
      favorite: true
    }
  ]
};

export const learningProgress: { [userId: string]: LearningProgress } = {
  "user-001": {
    userId: "user-001",
    beginnerMode: {
      completed: 45,
      total: 50,
      averageScore: 1250,
      timeSpent: 340
    },
    intermediateMode: {
      completed: 28,
      total: 40,
      averageScore: 1100,
      timeSpent: 280
    },
    advancedMode: {
      completed: 8,
      total: 30,
      averageScore: 950,
      timeSpent: 120
    },
    overallProgress: 67
  },
  "user-002": {
    userId: "user-002",
    beginnerMode: {
      completed: 50,
      total: 50,
      averageScore: 1680,
      timeSpent: 420
    },
    intermediateMode: {
      completed: 35,
      total: 40,
      averageScore: 1450,
      timeSpent: 380
    },
    advancedMode: {
      completed: 18,
      total: 30,
      averageScore: 1320,
      timeSpent: 240
    },
    overallProgress: 86
  }
};

export const userRetentionMetrics: { [userId: string]: UserRetentionMetrics } = {
  "user-001": {
    userId: "user-001",
    daysSinceJoined: 151,
    loginStreak: 12,
    longestStreak: 28,
    sessionsThisWeek: 18,
    sessionsThisMonth: 75,
    retentionScore: 85,
    churnRisk: "low"
  },
  "user-002": {
    userId: "user-002",
    daysSinceJoined: 133,
    loginStreak: 25,
    longestStreak: 35,
    sessionsThisWeek: 22,
    sessionsThisMonth: 92,
    retentionScore: 94,
    churnRisk: "low"
  },
  "user-003": {
    userId: "user-003",
    daysSinceJoined: 97,
    loginStreak: 0,
    longestStreak: 15,
    sessionsThisWeek: 2,
    sessionsThisMonth: 8,
    retentionScore: 32,
    churnRisk: "high"
  }
};

export const userStats: UserStats = {
  totalUsers: 125000,
  activeUsers: 8500,
  newUsersThisMonth: 2850,
  retentionRate: 78.5,
  averageSessionTime: 12.5,
  topSpenders: 450
};
