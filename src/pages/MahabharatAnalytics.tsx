
import { useState } from "react";
import { ArrowLeft, Users, Clock, Trophy, Coins, TrendingUp, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { learningModesProgress, matchConnectMetrics, mahabharatWeeklyData } from "@/lib/mahabharatData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";

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
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
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
              <CardTitle className="text-sm font-medium">Total Players</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(matchConnectMetrics.monthlyPlayers)}</div>
              <p className="text-xs text-muted-foreground">Monthly active players</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Session</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{matchConnectMetrics.averageSessionTime}</div>
              <p className="text-xs text-muted-foreground">Average time per session</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{matchConnectMetrics.completionRate}%</div>
              <p className="text-xs text-muted-foreground">Overall completion rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Coins Distributed</CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(matchConnectMetrics.coinsDistributed)}</div>
              <p className="text-xs text-muted-foreground">Total coins this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="match-connect" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="match-connect">Match & Connect</TabsTrigger>
            <TabsTrigger value="learning-modes">Learning Modes</TabsTrigger>
          </TabsList>

          {/* Match & Connect Tab */}
          <TabsContent value="match-connect" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Activity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>Match & Connect player activity over the week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mahabharatWeeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="matchConnect" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Difficulty Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Difficulty Distribution</CardTitle>
                  <CardDescription>Player preference by difficulty level</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Easy', value: matchConnectMetrics.difficultyDistribution.easy },
                          { name: 'Medium', value: matchConnectMetrics.difficultyDistribution.medium },
                          { name: 'Hard', value: matchConnectMetrics.difficultyDistribution.hard }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
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

              {/* Player Retention */}
              <Card>
                <CardHeader>
                  <CardTitle>Player Retention</CardTitle>
                  <CardDescription>Retention rates for Match & Connect</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Day 1 Retention</span>
                      <span className="font-medium">{matchConnectMetrics.playerRetention.day1}%</span>
                    </div>
                    <Progress value={matchConnectMetrics.playerRetention.day1} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Day 7 Retention</span>
                      <span className="font-medium">{matchConnectMetrics.playerRetention.day7}%</span>
                    </div>
                    <Progress value={matchConnectMetrics.playerRetention.day7} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Day 30 Retention</span>
                      <span className="font-medium">{matchConnectMetrics.playerRetention.day30}%</span>
                    </div>
                    <Progress value={matchConnectMetrics.playerRetention.day30} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Player Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Player Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{formatNumber(matchConnectMetrics.dailyPlayers)}</div>
                      <div className="text-sm text-muted-foreground">Daily Players</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{formatNumber(matchConnectMetrics.weeklyPlayers)}</div>
                      <div className="text-sm text-muted-foreground">Weekly Players</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Learning Modes Tab */}
          <TabsContent value="learning-modes" className="space-y-6">
            {/* Mode Selection */}
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
                {/* Mode Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedModeData.mode} Mode Overview</CardTitle>
                    <CardDescription>Key metrics for {selectedModeData.mode.toLowerCase()} learning mode</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{formatNumber(selectedModeData.totalUsers)}</div>
                        <div className="text-sm text-muted-foreground">Total Users</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{formatNumber(selectedModeData.activeUsers)}</div>
                        <div className="text-sm text-muted-foreground">Active Users</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{selectedModeData.completionRate}%</div>
                        <div className="text-sm text-muted-foreground">Completion Rate</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{selectedModeData.averageScore}</div>
                        <div className="text-sm text-muted-foreground">Avg Score</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Progress Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Progress Distribution</CardTitle>
                    <CardDescription>User progress breakdown for {selectedModeData.mode} mode</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Completed', value: selectedModeData.progressDistribution.completed },
                            { name: 'In Progress', value: selectedModeData.progressDistribution.inProgress },
                            { name: 'Not Started', value: selectedModeData.progressDistribution.notStarted }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
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

                {/* Learning Modes Comparison */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Learning Modes Comparison</CardTitle>
                    <CardDescription>Comparison across all learning modes</CardDescription>
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
                        <Bar dataKey="completionRate" fill="#82ca9d" name="Completion Rate %" />
                        <Bar dataKey="averageScore" fill="#ffc658" name="Average Score" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
