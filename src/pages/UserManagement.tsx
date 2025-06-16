
import { useState } from 'react';
import { useStats } from '@/hooks/useStats';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import UserProfileCard from '@/components/UserProfileCard';
import UserDetailsModal from '@/components/UserDetailsModal';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  userProfiles, 
  gamePreferences, 
  learningProgress, 
  userRetentionMetrics, 
  userStats 
} from '@/lib/userManagementData';
import { UserProfile } from '@/types/userManagement';
import { Search, Users, TrendingUp, Clock, DollarSign, Filter } from 'lucide-react';

export default function UserManagement() {
  const { refreshData, loading } = useStats();
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');

  const filteredUsers = userProfiles.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const userRetention = userRetentionMetrics[user.id];
    const matchesRisk = riskFilter === 'all' || 
                       (userRetention && userRetention.churnRisk === riskFilter);
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const handleUserClick = (user: UserProfile) => {
    setSelectedUser(user);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header onRefresh={refreshData} isLoading={loading} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-screen-2xl mx-auto space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                <p className="text-muted-foreground">
                  Manage user profiles, monitor engagement, and track retention metrics
                </p>
              </div>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Total Users</span>
                  </div>
                  <p className="text-2xl font-bold">{userStats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Registered users</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Active Users</span>
                  </div>
                  <p className="text-2xl font-bold">{userStats.activeUsers.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Currently active</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">Avg Session</span>
                  </div>
                  <p className="text-2xl font-bold">{userStats.averageSessionTime}m</p>
                  <p className="text-xs text-muted-foreground">Per session</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">Retention Rate</span>
                  </div>
                  <p className="text-2xl font-bold">{userStats.retentionRate}%</p>
                  <p className="text-xs text-muted-foreground">7-day retention</p>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  User Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 md:flex-row md:items-end">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Search Users</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Status</label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="banned">Banned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Churn Risk</label>
                    <Select value={riskFilter} onValueChange={setRiskFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Risk Levels</SelectItem>
                        <SelectItem value="low">Low Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setRiskFilter('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* User Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  User Profiles ({filteredUsers.length})
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map((user) => (
                  <div 
                    key={user.id} 
                    className="cursor-pointer"
                    onClick={() => handleUserClick(user)}
                  >
                    <UserProfileCard
                      user={user}
                      retentionMetrics={userRetentionMetrics[user.id]}
                    />
                  </div>
                ))}
              </div>
              
              {filteredUsers.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No users found matching your filters</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* User Details Modal */}
      <UserDetailsModal
        user={selectedUser}
        gamePreferences={selectedUser ? gamePreferences[selectedUser.id] : []}
        learningProgress={selectedUser ? learningProgress[selectedUser.id] : undefined}
        retentionMetrics={selectedUser ? userRetentionMetrics[selectedUser.id] : undefined}
        open={!!selectedUser}
        onOpenChange={(open) => !open && setSelectedUser(null)}
      />
    </div>
  );
}
