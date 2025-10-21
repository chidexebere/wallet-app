"use client";

import { usePathname } from "next/navigation";
import {
  Product1Icon,
  Product2Icon,
  Product3Icon,
  Product4Icon,
  WidgetsIcon,
} from "./icons";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const navigationItems = [
  {
    name: "Link in Bio",
    icon: Product1Icon,
    description: "Manage your Link in Bio",
  },
  {
    name: "Store",
    icon: Product2Icon,
    description: "Manage your Store activities",
  },
  {
    name: "Media Kit",
    icon: Product3Icon,
    description: "Manage your Media Kit",
  },
  {
    name: "Invoicing",
    icon: Product4Icon,
    description: "Manage your Invoices",
  },
  { name: "Bookings", icon: Product3Icon, description: "Manage your Bookings" },
];

const AppsDropdown = () => {
  const pathname = usePathname();
  const isActive = pathname === "/apps";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`cursor-pointer flex items-center gap-2 rounded-full px-7 py-3 text-[#56616b] hover:text-[#131316] ${
            isActive ? "text-white bg-[#000004]" : "hover:bg-accent/100"
          }`}
        >
          <WidgetsIcon className="mb-1 size-5" />
          <span>Apps</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mt-5 w-64 border-white shadow-md"
        align="start"
      >
        {navigationItems.map((item) => (
          <DropdownMenuLabel
            key={item.name}
            className="flex items-center gap-3 p-4"
          >
            <item.icon className="h-5 w-5" />
            <div>
              <p className="text-sm font-medium"> {item.name}</p>
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            </div>
          </DropdownMenuLabel>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppsDropdown;
