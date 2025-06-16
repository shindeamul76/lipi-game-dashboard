
import { UserProfile, UserRetentionMetrics } from '@/types/userManagement';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Coins, TrendingUp, Calendar, Activity } from 'lucide-react';

interface UserProfileCardProps {
  user: UserProfile;
  retentionMetrics?: UserRetentionMetrics;
}

export default function UserProfileCard({ user, retentionMetrics }: UserProfileCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-yellow-500';
      case 'banned': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {user.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Badge className={getStatusColor(user.status)}>
            {user.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Coins size={16} className="text-yellow-500" />
              <span className="text-sm font-medium">Coins</span>
            </div>
            <p className="text-2xl font-bold">{user.totalCoins.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">
              Spent: {user.coinsSpent.toLocaleString()}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-blue-500" />
              <span className="text-sm font-medium">Level {user.level}</span>
            </div>
            <Progress value={(user.xp / (user.xp + user.xpToNextLevel)) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {user.xp} / {user.xp + user.xpToNextLevel} XP
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Joined</span>
            </div>
            <p className="text-sm">{new Date(user.joinDate).toLocaleDateString()}</p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Last Active</span>
            </div>
            <p className="text-sm">{new Date(user.lastActive).toLocaleDateString()}</p>
          </div>
        </div>

        {retentionMetrics && (
          <div className="pt-2 border-t">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Retention Score</span>
              <span className="text-sm font-bold">{retentionMetrics.retentionScore}%</span>
            </div>
            <Progress value={retentionMetrics.retentionScore} className="h-2 mb-2" />
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                Streak: {retentionMetrics.loginStreak} days
              </span>
              <span className={`text-xs font-medium ${getRiskColor(retentionMetrics.churnRisk)}`}>
                {retentionMetrics.churnRisk.toUpperCase()} RISK
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
