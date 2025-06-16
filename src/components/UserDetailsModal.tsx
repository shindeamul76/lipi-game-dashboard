
import { UserProfile, GamePreference, LearningProgress, UserRetentionMetrics } from '@/types/userManagement';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coins, TrendingUp, GamepadIcon, BookOpen, Activity, Star } from 'lucide-react';

interface UserDetailsModalProps {
  user: UserProfile | null;
  gamePreferences?: GamePreference[];
  learningProgress?: LearningProgress;
  retentionMetrics?: UserRetentionMetrics;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserDetailsModal({
  user,
  gamePreferences = [],
  learningProgress,
  retentionMetrics,
  open,
  onOpenChange
}: UserDetailsModalProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                {user.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-2xl">{user.name}</DialogTitle>
              <p className="text-muted-foreground">{user.email}</p>
              <Badge className="mt-1">{user.status}</Badge>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="games">Game Preferences</TabsTrigger>
            <TabsTrigger value="learning">Learning Progress</TabsTrigger>
            <TabsTrigger value="retention">Retention Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">Total Coins</span>
                  </div>
                  <p className="text-2xl font-bold">{user.totalCoins.toLocaleString()}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Level</span>
                  </div>
                  <p className="text-2xl font-bold">{user.level}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">Coins Spent</span>
                  </div>
                  <p className="text-2xl font-bold">{user.coinsSpent.toLocaleString()}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">XP Points</span>
                  </div>
                  <p className="text-2xl font-bold">{user.xp}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Experience Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Level {user.level} Progress</span>
                    <span>{user.xp} / {user.xp + user.xpToNextLevel} XP</span>
                  </div>
                  <Progress value={(user.xp / (user.xp + user.xpToNextLevel)) * 100} />
                  <p className="text-sm text-muted-foreground">
                    {user.xpToNextLevel} XP needed for next level
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="games" className="space-y-4">
            <div className="grid gap-4">
              {gamePreferences.map((game, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <GamepadIcon className="h-5 w-5" />
                        {game.gameName}
                        {game.favorite && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                      </CardTitle>
                      <Badge variant="outline">{game.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Time Played</p>
                        <p className="font-semibold">{Math.floor(game.timePlayed / 60)}h {game.timePlayed % 60}m</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Sessions</p>
                        <p className="font-semibold">{game.sessionsCount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Average Score</p>
                        <p className="font-semibold">{game.averageScore.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Played</p>
                        <p className="font-semibold">{new Date(game.lastPlayed).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {gamePreferences.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No game preferences data available</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="learning" className="space-y-4">
            {learningProgress ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Overall Learning Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Progress</span>
                        <span>{learningProgress.overallProgress}%</span>
                      </div>
                      <Progress value={learningProgress.overallProgress} />
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Beginner Mode</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Completion</span>
                          <span className="text-sm">{learningProgress.beginnerMode.completed}/{learningProgress.beginnerMode.total}</span>
                        </div>
                        <Progress value={(learningProgress.beginnerMode.completed / learningProgress.beginnerMode.total) * 100} />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Avg Score</p>
                          <p className="font-semibold">{learningProgress.beginnerMode.averageScore}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Time Spent</p>
                          <p className="font-semibold">{Math.floor(learningProgress.beginnerMode.timeSpent / 60)}h {learningProgress.beginnerMode.timeSpent % 60}m</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Intermediate Mode</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Completion</span>
                          <span className="text-sm">{learningProgress.intermediateMode.completed}/{learningProgress.intermediateMode.total}</span>
                        </div>
                        <Progress value={(learningProgress.intermediateMode.completed / learningProgress.intermediateMode.total) * 100} />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Avg Score</p>
                          <p className="font-semibold">{learningProgress.intermediateMode.averageScore}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Time Spent</p>
                          <p className="font-semibold">{Math.floor(learningProgress.intermediateMode.timeSpent / 60)}h {learningProgress.intermediateMode.timeSpent % 60}m</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Advanced Mode</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Completion</span>
                          <span className="text-sm">{learningProgress.advancedMode.completed}/{learningProgress.advancedMode.total}</span>
                        </div>
                        <Progress value={(learningProgress.advancedMode.completed / learningProgress.advancedMode.total) * 100} />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Avg Score</p>
                          <p className="font-semibold">{learningProgress.advancedMode.averageScore}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Time Spent</p>
                          <p className="font-semibold">{Math.floor(learningProgress.advancedMode.timeSpent / 60)}h {learningProgress.advancedMode.timeSpent % 60}m</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No learning progress data available</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="retention" className="space-y-4">
            {retentionMetrics ? (
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Retention Score</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Overall Score</span>
                        <span className="font-bold">{retentionMetrics.retentionScore}%</span>
                      </div>
                      <Progress value={retentionMetrics.retentionScore} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Churn Risk</span>
                        <Badge variant={retentionMetrics.churnRisk === 'low' ? 'default' : retentionMetrics.churnRisk === 'medium' ? 'secondary' : 'destructive'}>
                          {retentionMetrics.churnRisk.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Activity Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Days Since Joined</p>
                        <p className="text-xl font-bold">{retentionMetrics.daysSinceJoined}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Streak</p>
                        <p className="text-xl font-bold">{retentionMetrics.loginStreak}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Longest Streak</p>
                        <p className="text-xl font-bold">{retentionMetrics.longestStreak}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Sessions This Week</p>
                        <p className="text-xl font-bold">{retentionMetrics.sessionsThisWeek}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Sessions This Month</span>
                        <span className="font-semibold">{retentionMetrics.sessionsThisMonth}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No retention metrics data available</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
