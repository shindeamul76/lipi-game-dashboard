import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
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
  Star,
  BookOpen,
  Trophy,
  Coins,
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
  onClick,
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
  const location = useLocation();
  const currentPath = location.pathname;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-56",
        className
      )}
    >
      {/* Logo */}
      <div className="p-4">
        <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
          <div className="h-8 w-8 rounded-md bg-white flex items-center justify-center overflow-hidden">
            <img
              src="https://play-lh.googleusercontent.com/93oaBUaKy6QdkE0wJBwnaLHgGLPC1Ya-jJ3tdR8444cfO5lq21_tavdDvU3q8UMhSYSu"
              alt="LipiGame Logo"
              className="h-8 w-8 object-contain"
            />
          </div>
          {!collapsed && (
            <h1 className="font-semibold text-xl text-sidebar-foreground">
              Lipi<span className="text-primary">Game</span>
            </h1>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <div className="absolute top-4 -right-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center h-6 w-6 rounded-full bg-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="px-2 mt-6 space-y-6">
        <div className="space-y-1">
          <NavLink to="/" className="block">
            {({ isActive }) => (
              <SidebarLink
                icon={LayoutDashboard}
                label="Dashboard"
                active={isActive}
                collapsed={collapsed}
              />
            )}
          </NavLink>

          <NavLink to="/game-analytics" className="block">
            {({ isActive }) => (
              <SidebarLink
                icon={List}
                label="Game Analytics"
                active={isActive}
                collapsed={collapsed}
              />
            )}
          </NavLink>

          <NavLink to="/mahabharat-analytics" className="block">
            {({ isActive }) => (
              <SidebarLink
                icon={BookOpen}
                label="Mahabharat Games"
                active={isActive}
                collapsed={collapsed}
              />
            )}
          </NavLink>

          <NavLink to="/word-games-analytics" className="block">
            {({ isActive }) => (
              <SidebarLink
                icon={Trophy}
                label="Word Games"
                active={isActive}
                collapsed={collapsed}
              />
            )}
          </NavLink>

          <NavLink to="/learning-modes" className="block">
            {({ isActive }) => (
              <SidebarLink
                icon={Star}
                label="Learning Modes"
                active={isActive}
                collapsed={collapsed}
              />
            )}
          </NavLink>
        </div>

        {/* Marketing Section */}
        <div className="pt-4 border-t border-sidebar-border">
          <p
            className={cn(
              "text-xs uppercase text-sidebar-foreground/60 mb-2 px-3",
              collapsed && "text-center"
            )}
          >
            {collapsed ? "More" : "Marketing"}
          </p>
          <div className="space-y-1">
            <NavLink to="/user-insights" className="block">
              {({ isActive }) => (
                <SidebarLink
                  icon={LineChart}
                  label="User Insights"
                  active={isActive}
                  collapsed={collapsed}
                />
              )}
            </NavLink>

            <NavLink to="/user-management" className="block">
              {({ isActive }) => (
                <SidebarLink
                  icon={Users}
                  label="User Management"
                  active={isActive}
                  collapsed={collapsed}
                />
              )}
            </NavLink>

            <NavLink to="/coin-analytics" className="block">
              {({ isActive }) => (
                <SidebarLink
                  icon={Coins}
                  label="Coin Analytics"
                  active={isActive}
                  collapsed={collapsed}
                />
              )}
            </NavLink>

            <NavLink to="/trending-games" className="block">
              {({ isActive }) => (
                <SidebarLink
                  icon={TrendingUp}
                  label="Trending Games"
                  active={isActive}
                  collapsed={collapsed}
                />
              )}
            </NavLink>
          </div>
        </div>
      </div>

      {/* Bottom Settings */}
      <div className="absolute bottom-4 w-full px-2">
        <NavLink to="/settings" className="block">
          {({ isActive }) => (
            <SidebarLink
              icon={Settings}
              label="Settings"
              active={isActive}
              collapsed={collapsed}
            />
          )}
        </NavLink>
      </div>
    </div>
  );
}
