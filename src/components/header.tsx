"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChartIcon,
  ChatIcon,
  GroupIcon,
  HomeIcon,
  MainstackLogoIcon,
  MenuIcon,
  NotificationsIcon,
  PaymentsIcon,
  WidgetsIcon,
} from "./icons";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserProfileDropdown from "./userProfileDropdown";

const navigationItems = [
  { name: "Home", icon: HomeIcon, href: "/" },
  { name: "Analytics", icon: ChartIcon, href: "/analytics" },
  { name: "Revenue", icon: PaymentsIcon, href: "/revenue" },
  { name: "CRM", icon: GroupIcon, href: "/crm" },
  { name: "Apps", icon: WidgetsIcon, href: "/apps" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 border-b border-white bg-white shadow-md rounded-full">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="text-2xl font-bold text-[#131316]">
          <MainstackLogoIcon className="text-4xl" />
        </div>

        <nav className="flex items-center gap-8">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={`cursor-pointer flex items-center gap-2 rounded-full px-7 py-3 text-[#56616b] hover:text-[#131316] ${
                    isActive ? "text-white bg-[#000004]" : "hover:bg-accent/50"
                  }`}
                >
                  <item.icon className="mb-1 size-5" />
                  <span>{item.name}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#56616b] hover:text-[#131316]"
          >
            <NotificationsIcon className="mb-1 size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#56616b] hover:text-[#131316]"
          >
            <ChatIcon className="mb-1 size-5" />
          </Button>

          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
}
