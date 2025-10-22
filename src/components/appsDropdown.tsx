"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`cursor-pointer flex items-center gap-2 rounded-full px-7 py-3 text-[#56616b] hover:text-[#131316] hover:bg-accent/100 data-[state=open]:bg-[#000004] data-[state=open]:text-white`}
        >
          <WidgetsIcon className="mb-1 size-5" />
          <span>Apps</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mt-4 w-84 border-white shadow-md rounded-xl p-2"
        align="start"
      >
        {navigationItems.map((item, index) => (
          <DropdownMenuLabel
            key={`${item.name}-${index}`}
            className="cursor-pointer flex items-center justify-between gap-3 px-2 py-4 hover:border hover:border-accent/100 hover:shadow hover:rounded-xl"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-center gap-3">
              <span className="p-2 border border-accent/100 rounded-lg">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium"> {item.name}</p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
            <ChevronRight
              size={12}
              className={cn("text-[#56616b] hidden", {
                block: hoveredIndex === index,
              })}
            />
          </DropdownMenuLabel>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppsDropdown;
