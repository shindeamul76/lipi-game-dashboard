
export const gameStats = {
  totalUsers: 125000,
  dailyActiveUsers: 8500,
  totalCoinsDistributed: 2450000,
  monthlyRevenue: 15000,
  dailyChange: 3.2,
  weeklyChange: 12.5
};

export const userEngagementData = {
  current: 8500,
  dailyChange: 5.8,
  weeklyChange: 22.3
};

export const retentionIndex = {
  value: 78,
  indicator: "Good",
  previousValue: 72,
  previousChange: 6
};

export const trendingGames = [
  { id: 1, name: "Match & Connect", category: "Mahabharat", change: 18.4, symbol: "MAC" },
  { id: 2, name: "Word Cruise", category: "Word Game", change: 12.7, symbol: "WC" },
  { id: 3, name: "Daily Word", category: "Word Game", change: -2.1, symbol: "DW" },
  { id: 4, name: "Daily Jumble", category: "Word Game", change: 25.3, symbol: "DJ" },
  { id: 5, name: "Beginner Mode", category: "Learning", change: 15.2, symbol: "BM" },
  { id: 6, name: "Intermediate Mode", category: "Learning", change: 8.9, symbol: "IM" },
  { id: 7, name: "Advanced Mode", category: "Learning", change: 6.4, symbol: "AM" },
  { id: 8, name: "Story Mode", category: "Mahabharat", change: 20.1, symbol: "SM" },
];

export const gameAnalytics = [
  { 
    id: 1, 
    name: "Match & Connect", 
    category: "Mahabharat", 
    dailyPlayers: 2500, 
    avgSessionTime: "12:30", 
    coinsPerSession: 150, 
    completionRate: 85.2, 
    rank: 1,
    symbol: "MAC",
    brokerScore: 95,
    price: 150,
    priceChange: 18.4
  },
  { 
    id: 2, 
    name: "Word Cruise", 
    category: "Word Game", 
    dailyPlayers: 3200, 
    avgSessionTime: "8:45", 
    coinsPerSession: 120, 
    completionRate: 78.9, 
    rank: 2,
    symbol: "WC",
    brokerScore: 88,
    price: 120,
    priceChange: 12.7
  },
  { 
    id: 3, 
    name: "Daily Word", 
    category: "Word Game", 
    dailyPlayers: 1800, 
    avgSessionTime: "5:20", 
    coinsPerSession: 80, 
    completionRate: 92.1, 
    rank: 3,
    symbol: "DW",
    brokerScore: 92,
    price: 80,
    priceChange: -2.1
  },
  { 
    id: 4, 
    name: "Daily Jumble", 
    category: "Word Game", 
    dailyPlayers: 1500, 
    avgSessionTime: "6:15", 
    coinsPerSession: 100, 
    completionRate: 88.7, 
    rank: 4,
    symbol: "DJ",
    brokerScore: 89,
    price: 100,
    priceChange: 25.3
  },
  { 
    id: 5, 
    name: "Beginner Mode", 
    category: "Learning", 
    dailyPlayers: 950, 
    avgSessionTime: "15:40", 
    coinsPerSession: 200, 
    completionRate: 94.3, 
    rank: 5,
    symbol: "BM",
    brokerScore: 94,
    price: 200,
    priceChange: 15.2
  },
  { 
    id: 6, 
    name: "Intermediate Mode", 
    category: "Learning", 
    dailyPlayers: 720, 
    avgSessionTime: "18:20", 
    coinsPerSession: 250, 
    completionRate: 89.5, 
    rank: 6,
    symbol: "IM",
    brokerScore: 90,
    price: 250,
    priceChange: 8.9
  },
  { 
    id: 7, 
    name: "Advanced Mode", 
    category: "Learning", 
    dailyPlayers: 420, 
    avgSessionTime: "22:10", 
    coinsPerSession: 350, 
    completionRate: 76.8, 
    rank: 7,
    symbol: "AM",
    brokerScore: 77,
    price: 350,
    priceChange: 6.4
  },
];

export const gameCategories = [
  { id: "all", name: "All Games" },
  { id: "mahabharat", name: "Mahabharat" },
  { id: "word-game", name: "Word Games" },
  { id: "learning", name: "Learning Modes" },
];
