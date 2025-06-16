import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Clock,
  Coins,
  Target,
  TrendingUp,
  Trophy,
  Star,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/Sidebar"; // ✅ Sidebar added
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line
} from "recharts";

// Mock data
const wordGamesOverview = {
  totalPlayers: 8500,
  dailyActiveUsers: 2800,
  weeklyActiveUsers: 5200,
  monthlyActiveUsers: 8100,
  totalCoinsDistributed: 450000,
  averageSessionTime: "8:45",
  completionRate: 82.4,
  playerRetention: {
    day1: 85,
    day7: 62,
    day30: 38
  }
};

const gameMetrics = [
  {
    id: 1,
    name: "Word Cruise",
    dailyPlayers: 1200,
    weeklyPlayers: 2800,
    monthlyPlayers: 4200,
    avgSessionTime: "12:30",
    completionRate: 78.5,
    coinsPerSession: 150,
    difficulty: "Medium",
    totalCoinsDistributed: 180000,
    playerSatisfaction: 4.2,
    popularityTrend: 12.7,
    category: "Adventure Word"
  },
  {
    id: 2,
    name: "Daily Word",
    dailyPlayers: 950,
    weeklyPlayers: 1800,
    monthlyPlayers: 2600,
    avgSessionTime: "6:15",
    completionRate: 92.1,
    coinsPerSession: 100,
    difficulty: "Easy",
    totalCoinsDistributed: 95000,
    playerSatisfaction: 4.5,
    popularityTrend: -2.1,
    category: "Daily Challenge"
  },
  {
    id: 3,
    name: "Daily Jumble",
    dailyPlayers: 650,
    weeklyPlayers: 1400,
    monthlyPlayers: 1900,
    avgSessionTime: "8:20",
    completionRate: 85.3,
    coinsPerSession: 120,
    difficulty: "Hard",
    totalCoinsDistributed: 78000,
    playerSatisfaction: 4.0,
    popularityTrend: 25.3,
    category: "Puzzle Challenge"
  }
];

const weeklyEngagementData = [
  { day: "Mon", wordCruise: 180, dailyWord: 140, dailyJumble: 95 },
  { day: "Tue", wordCruise: 165, dailyWord: 135, dailyJumble: 88 },
  { day: "Wed", wordCruise: 195, dailyWord: 150, dailyJumble: 102 },
  { day: "Thu", wordCruise: 210, dailyWord: 165, dailyJumble: 110 },
  { day: "Fri", wordCruise: 245, dailyWord: 180, dailyJumble: 125 },
  { day: "Sat", wordCruise: 280, dailyWord: 200, dailyJumble: 140 },
  { day: "Sun", wordCruise: 220, dailyWord: 170, dailyJumble: 115 }
];

const coinDistributionData = [
  { name: "Word Cruise", value: 50, coins: 180000 },
  { name: "Daily Word", value: 27, coins: 95000 },
  { name: "Daily Jumble", value: 23, coins: 78000 }
];

const difficultyProgressData = [
  { level: "Easy", players: 2400, completion: 95 },
  { level: "Medium", players: 1800, completion: 82 },
  { level: "Hard", players: 1200, completion: 68 },
  { level: "Expert", players: 600, completion: 45 }
];

const COLORS = ['#8B5CF6', '#06B6D4', '#F59E0B'];

export default function WordGamesAnalytics() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex">
      {/* ✅ Sidebar Section */}
      <Sidebar />

      {/* ✅ Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-screen-2xl mx-auto space-y-6">

            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <Trophy className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Word Games Analytics</h1>
            </div>
            <p className="text-muted-foreground mb-6">Comprehensive analytics for Word Cruise, Daily Word, and Daily Jumble</p>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <OverviewCard title="Total Players" value={wordGamesOverview.totalPlayers} icon={<Users className="h-8 w-8 text-blue-500" />} />
              <OverviewCard title="Daily Active Users" value={wordGamesOverview.dailyActiveUsers} icon={<TrendingUp className="h-8 w-8 text-green-500" />} />
              <OverviewCard title="Coins Distributed" value={wordGamesOverview.totalCoinsDistributed} icon={<Coins className="h-8 w-8 text-yellow-500" />} />
              <OverviewCard title="Avg Completion Rate" value={`${wordGamesOverview.completionRate}%`} icon={<Target className="h-8 w-8 text-purple-500" />} />
            </div>

            {/* Game Metric Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {gameMetrics.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>

            {/* Engagement & Coin Distribution Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WeeklyEngagementChart data={weeklyEngagementData} />
              <CoinDistributionChart data={coinDistributionData} />
            </div>

            {/* Difficulty & Retention */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DifficultyChart data={difficultyProgressData} />
              <RetentionSection data={wordGamesOverview.playerRetention} avgTime={wordGamesOverview.averageSessionTime} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// 🧩 Helper Components (modular for reuse)
function OverviewCard({ title, value, icon }: { title: string, value: number | string, icon: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{typeof value === "number" ? value.toLocaleString() : value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}

function GameCard({ game }: { game: any }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{game.name}</h3>
        <div className={cn(
          "flex items-center text-sm",
          game.popularityTrend >= 0 ? "text-green-500" : "text-red-500"
        )}>
          {game.popularityTrend >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span className="ml-1">{Math.abs(game.popularityTrend)}%</span>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <MetricRow label="Daily Players" value={game.dailyPlayers} />
        <MetricRow label="Session Time" value={game.avgSessionTime} />
        <MetricRow label="Completion Rate" value={`${game.completionRate}%`} />
        <MetricRow label="Coins/Session" value={game.coinsPerSession} />
        <MetricRow label="Satisfaction" value={<span className="flex items-center"><Star className="h-4 w-4 text-yellow-500 mr-1" /> {game.playerSatisfaction}</span>} />
        <div className="pt-2 border-t">
          <MetricRow label="Total Coins" value={<span className="text-yellow-600 font-bold">{game.totalCoinsDistributed.toLocaleString()}</span>} />
        </div>
      </div>
    </div>
  );
}

function MetricRow({ label, value }: { label: string, value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function WeeklyEngagementChart({ data }: { data: any[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Weekly Player Engagement</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="wordCruise" stroke="#8B5CF6" strokeWidth={2} name="Word Cruise" />
          <Line type="monotone" dataKey="dailyWord" stroke="#06B6D4" strokeWidth={2} name="Daily Word" />
          <Line type="monotone" dataKey="dailyJumble" stroke="#F59E0B" strokeWidth={2} name="Daily Jumble" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function CoinDistributionChart({ data }: { data: any[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Coin Distribution by Game</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: any, name: any, props: any) => [
            `${props.payload.coins.toLocaleString()} coins (${value}%)`,
            name
          ]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

function DifficultyChart({ data }: { data: any[] }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Performance by Difficulty Level</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="level" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Bar yAxisId="left" dataKey="players" fill="#8B5CF6" name="Players" />
          <Bar yAxisId="right" dataKey="completion" fill="#06B6D4" name="Completion %" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function RetentionSection({ data, avgTime }: { data: any, avgTime: string }) {
  const colors = ["green", "yellow", "red"];
  const labels = ["Day 1", "Day 7", "Day 30"];

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">Player Retention Rates</h3>
      <div className="space-y-6">
        {["day1", "day7", "day30"].map((key, i) => (
          <div key={key}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{labels[i]} Retention</span>
              <span className="text-sm font-bold">{data[key]}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className={`bg-${colors[i]}-500 h-2 rounded-full`}
                style={{ width: `${data[key]}%` }}
              />
            </div>
          </div>
        ))}
        <div className="pt-4 border-t text-center">
          <p className="text-2xl font-bold">{avgTime}</p>
          <p className="text-sm text-muted-foreground">Average Session Time</p>
        </div>
      </div>
    </div>
  );
}
