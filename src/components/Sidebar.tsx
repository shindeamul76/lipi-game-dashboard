import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  TrendingUp, 
  LineChart, 
  List, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Users,
  BarChart4,
  Star,
  BookOpen,
  Gamepad2,
  Trophy,
  Coins
} from "lucide-react";

interface SidebarLinkProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

const SidebarLink = ({ 
  icon: Icon, 
  label, 
  active = false, 
  collapsed = false,
  onClick 
}: SidebarLinkProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-md w-full transition-all duration-200",
        active 
          ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" 
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        collapsed && "justify-center"
      )}
    >
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
    </button>
  );
};

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState("Dashboard");

  return (
    <div
      className={cn(
        "relative h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-56",
        className
      )}
    >
      <div className="p-4">
        <div className={cn(
          "flex items-center gap-2",
          collapsed && "justify-center"
        )}>
          <div className="h-8 w-8 rounded-md bg-primary/90 flex items-center justify-center">
            <Gamepad2 size={18} className="text-primary-foreground" />
          </div>
          {!collapsed && (
            <h1 className="font-semibold text-xl text-sidebar-foreground">Lipi<span className="text-primary">Game</span></h1>
          )}
        </div>
      </div>

      <div className="absolute top-4 -right-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center h-6 w-6 rounded-full bg-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <div className="px-2 mt-6 space-y-6">
        <div className="space-y-1">
          <SidebarLink 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={activeLink === "Dashboard"}
            collapsed={collapsed}
            onClick={() => setActiveLink("Dashboard")}
          />
          <SidebarLink 
            icon={List} 
            label="Game Analytics" 
            active={activeLink === "Game Analytics"}
            collapsed={collapsed}
            onClick={() => setActiveLink("Game Analytics")}
          />
          <a href="/mahabharat-analytics" className="block">
            <SidebarLink 
              icon={BookOpen} 
              label="Mahabharat Games" 
              active={activeLink === "Mahabharat Games"}
              collapsed={collapsed}
              onClick={() => setActiveLink("Mahabharat Games")}
            />
          </a>
          <a href="/word-games-analytics" className="block">
            <SidebarLink 
              icon={Trophy} 
              label="Word Games" 
              active={activeLink === "Word Games"}
              collapsed={collapsed}
              onClick={() => setActiveLink("Word Games")}
            />
          </a>
          <SidebarLink 
            icon={Star} 
            label="Learning Modes" 
            active={activeLink === "Learning Modes"}
            collapsed={collapsed}
            onClick={() => setActiveLink("Learning Modes")}
          />
        </div>

        <div className="pt-4 border-t border-sidebar-border">
          <p className={cn(
            "text-xs uppercase text-sidebar-foreground/60 mb-2 px-3",
            collapsed && "text-center"
          )}>
            {collapsed ? "More" : "Marketing"}
          </p>
          <div className="space-y-1">
            <SidebarLink 
              icon={LineChart} 
              label="User Insights" 
              active={activeLink === "User Insights"}
              collapsed={collapsed}
              onClick={() => setActiveLink("User Insights")}
            />
            <a href="/user-management" className="block">
              <SidebarLink 
                icon={Users} 
                label="User Management" 
                active={activeLink === "User Management"}
                collapsed={collapsed}
                onClick={() => setActiveLink("User Management")}
              />
            </a>
            <SidebarLink 
              icon={Coins} 
              label="Coin Analytics" 
              active={activeLink === "Coin Analytics"}
              collapsed={collapsed}
              onClick={() => setActiveLink("Coin Analytics")}
            />
            <SidebarLink 
              icon={TrendingUp} 
              label="Trending Games" 
              active={activeLink === "Trending Games"}
              collapsed={collapsed}
              onClick={() => setActiveLink("Trending Games")}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 w-full px-2">
        <SidebarLink 
          icon={Settings} 
          label="Settings" 
          active={activeLink === "Settings"}
          collapsed={collapsed}
          onClick={() => setActiveLink("Settings")}
        />
      </div>
    </div>
  );
}
