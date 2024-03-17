import type { NavItem } from "@/types/layout";
import { DashboardNav } from "./dashboard-nav";

import { cn } from "@/lib/utils";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "User",
    href: "/dashboard/user",
    icon: "user",
    label: "user",
  },
  {
    title: "Employee",
    href: "/dashboard/employee",
    icon: "employee",
    label: "employee",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Kanban",
    href: "/dashboard/kanban",
    icon: "kanban",
    label: "kanban",
  },
  {
    title: "Login",
    href: "/",
    icon: "login",
    label: "login",
  },
];

export default function Sidebar() {
  return (
    <nav className={cn("relative hidden h-screen border-r pt-12 lg:block w-60")}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {/* <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">Overview</h2> */}
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
