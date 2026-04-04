import React from "react";
import { LayoutDashboard, TreePine, BookOpen, Sparkles, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "./store/useUserStore";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: TreePine, label: "Tree", path: "/tree" },
    { icon: BookOpen, label: "Reflection", path: "/reflection" },
    { icon: Sparkles, label: "Lifestyle", path: "/lifestyle" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E4E1] px-6 py-4 md:top-0 md:bottom-auto md:border-t-0 md:border-b md:bg-[#FDFCFB]/80 md:backdrop-blur-md z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="hidden md:block">
          <h1 className="text-xl font-serif italic text-[#2D2D2D]">The Life Project</h1>
        </div>
        <div className="flex items-center justify-around w-full md:w-auto md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 transition-all duration-200 ${
                location.pathname === item.path ? 'text-[#2D2D2D] scale-110' : 'text-[#2D2D2D] opacity-40 hover:opacity-100'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-[10px] font-medium uppercase tracking-widest md:hidden">
                {item.label}
              </span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 text-[#2D2D2D] opacity-40 hover:opacity-100 transition-all duration-200"
          >
            <LogOut className="h-6 w-6" />
            <span className="text-[10px] font-medium uppercase tracking-widest md:hidden">
              Logout
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};
