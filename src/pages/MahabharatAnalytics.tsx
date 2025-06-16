import { useState } from "react";
import { ArrowLeft, Users, Clock, Trophy, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  learningModesProgress,
  matchGameMetrics,
  connectGameMetrics,
  matchGameWeeklyData,
  connectGameWeeklyData,
} from "@/lib/mahabharatData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from "recharts";
import Sidebar from "@/components/Sidebar";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

export default function MahabharatAnalytics() {
  const [selectedMode, setSelectedMode] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');

  const formatNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  const selectedModeData = learningModesProgress.find(mode => mode.mode === selectedMode);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-screen-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft size={20} />
                <span>Back to Dashboard</span>
              </Link>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Mahabharat Games Analytics</h1>
              <p className="text-muted-foreground">Detailed analytics for Mahabharat section games and learning modes</p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Match Game Players</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatNumber(matchGameMetrics.monthlyPlayers)}</div>
                  <p className="text-xs text-muted-foreground">Monthly active players</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Session (Match)</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{matchGameMetrics.averageSessionTime}</div>
                  <p className="text-xs text-muted-foreground">Average time per session</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate (Match)</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{matchGameMetrics.completionRate}%</div>
                  <p className="text-xs text-muted-foreground">Overall completion rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Coins (Match)</CardTitle>
                  <Coins className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatNumber(matchGameMetrics.coinsDistributed)}</div>
                  <p className="text-xs text-muted-foreground">Total coins this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="match-connect" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="match-connect">Match & Connect</TabsTrigger>
                <TabsTrigger value="learning-modes">Learning Modes</TabsTrigger>
              </TabsList>

              <TabsContent value="match-connect" className="space-y-10">
                {/* Match Game Section */}
                <GameAnalyticsSection
                  title="Match Game Analytics"
                  metrics={matchGameMetrics}
                  weeklyData={matchGameWeeklyData}
                  color="#8884d8"
                  chartIdPrefix="match"
                />

                {/* Connect Game Section */}
                <GameAnalyticsSection
                  title="Connect Game Analytics"
                  metrics={connectGameMetrics}
                  weeklyData={connectGameWeeklyData}
                  color="#82ca9d"
                  chartIdPrefix="connect"
                />
              </TabsContent>

              {/* Learning Modes */}
              <TabsContent value="learning-modes" className="space-y-6">
                <div className="flex gap-2 mb-6">
                  {learningModesProgress.map((mode) => (
                    <button
                      key={mode.mode}
                      onClick={() => setSelectedMode(mode.mode)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedMode === mode.mode
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {mode.mode} Mode
                    </button>
                  ))}
                </div>

                {selectedModeData && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>{selectedModeData.mode} Mode Overview</CardTitle>
                        <CardDescription>Key metrics for this mode</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <StatBox title="Total Users" value={selectedModeData.totalUsers} color="blue" />
                          <StatBox title="Active Users" value={selectedModeData.activeUsers} color="green" />
                          <StatBox title="Completion Rate" value={`${selectedModeData.completionRate}%`} color="purple" />
                          <StatBox title="Avg Score" value={selectedModeData.averageScore} color="orange" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Progress Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={[
                                { name: "Completed", value: selectedModeData.progressDistribution.completed },
                                { name: "In Progress", value: selectedModeData.progressDistribution.inProgress },
                                { name: "Not Started", value: selectedModeData.progressDistribution.notStarted },
                              ]}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              dataKey="value"
                            >
                              {COLORS.map((color, index) => (
                                <Cell key={`cell-${index}`} fill={color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Learning Modes Comparison</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={400}>
                          <BarChart data={learningModesProgress}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mode" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="activeUsers" fill="#8884d8" name="Active Users" />
                            <Bar dataKey="completionRate" fill="#82ca9d" name="Completion Rate" />
                            <Bar dataKey="averageScore" fill="#ffc658" name="Avg Score" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper components
function GameAnalyticsSection({ title, metrics, weeklyData, color, chartIdPrefix }: any) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sessions" stroke={color} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Difficulty Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Easy", value: metrics.difficultyDistribution.easy },
                    { name: "Medium", value: metrics.difficultyDistribution.medium },
                    { name: "Hard", value: metrics.difficultyDistribution.hard },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`${chartIdPrefix}-cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Retention */}
        <Card>
          <CardHeader>
            <CardTitle>Player Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {["day1", "day7", "day30"].map((key) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{`Day ${key.slice(3)} Retention`}</span>
                  <span className="font-medium">{metrics.playerRetention[key]}%</span>
                </div>
                <Progress value={metrics.playerRetention[key]} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Daily & Weekly Players */}
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <StatBox title="Daily Players" value={metrics.dailyPlayers} color="blue" />
            <StatBox title="Weekly Players" value={metrics.weeklyPlayers} color="green" />
            <StatBox title="Completion Rate" value={`${metrics.completionRate}%`} color="purple" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatBox({ title, value, color }: any) {
  return (
    <div className={`text-center p-4 rounded-lg bg-${color}-50`}>
      <div className={`text-2xl font-bold text-${color}-600`}>{value}</div>
      <div className="text-sm text-muted-foreground">{title}</div>
    </div>
  );
}
