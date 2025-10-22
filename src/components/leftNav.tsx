"use client";

import {
  Product1Icon,
  Product2Icon,
  Product3Icon,
  Product4Icon,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import React, { useState } from "react";

export interface LeftNavProps {
  className?: string;
}

const navigationItems = [
  { name: "Link in Bio", icon: Product1Icon, href: "#" },
  { name: "Store", icon: Product2Icon, href: "#" },
  { name: "Media Kit", icon: Product3Icon, href: "#" },
  { name: "Invoicing", icon: Product4Icon, href: "#" },
];

export const LeftNav: React.FC<LeftNavProps> = ({ className }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <TooltipProvider>
      <aside className={className}>
        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1 p-1 border border-white rounded-full shadow-xl">
            {navigationItems.map((item, index) => (
              <li key={`${item.name}-${index}`}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-center text-[#56616B] hover:text-[#131316] hover:bg-accent/100 p-2 rounded-full"
                      asChild
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <Link href={item.href}>
                        <item.icon
                          className="w-6 h-6"
                          mode={hoveredIndex === index ? "hover" : "default"}
                        />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10}>
                    <p className="font-medium">{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </TooltipProvider>
  );
};
