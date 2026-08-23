import { Link, useLocation } from "react-router-dom";
import { Home, Heart, PenLine, Compass, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const BottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/capacity-checker", label: "Check", icon: Heart },
    { path: "/journal", label: "Journal", icon: PenLine },
    { path: "/guide", label: "Guide", icon: Compass },
    { path: "/shop", label: "Shop", icon: ShoppingBag },
    { path: "/auth", label: user ? "Profile" : "Sign In", icon: User },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border safe-area-bottom"
      aria-label="Primary mobile navigation"
    >
      <div className="flex items-stretch justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 min-h-[56px] px-1 py-1.5 rounded-xl transition-colors",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              )}
            >
              <Icon className="w-6 h-6 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[11px] leading-tight font-medium truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
