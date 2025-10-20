"use client";
import useSWR from "swr";

import { Bug, Gift, LogOut, Settings, SwitchCamera } from "lucide-react";
import { MenuIcon, ReceiptIcon, WidgetsIcon } from "./icons";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const fetcher = (url: string): Promise<UserDetails> =>
  fetch(url).then((r) => r.json());

function getInitials(fullName: string): string {
  const names = fullName.trim().split(" ");
  if (names.length < 1) return "";
  return names.map((name) => name.charAt(0).toUpperCase()).join("");
}

const navigationItems = [
  { name: "Settings ", icon: Settings },
  { name: "Purchase History", icon: ReceiptIcon },
  { name: "Refer and Earn", icon: Gift },
  { name: "Integrations", icon: WidgetsIcon },
  { name: "Report Bug", icon: Bug },
  { name: "Switch Account", icon: SwitchCamera },
  { name: "Sign out", icon: LogOut },
];

const UserProfileDropdown = () => {
  const { data, error, isLoading } = useSWR(
    "https://fe-task-api.mainstack.io/user",
    fetcher
  );

  const fullName = data ? `${data.first_name} ${data.last_name}` : "";

  if (isLoading) return <div>Loading...</div>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-full bg-[#EFF1F6] pl-3 pr-4 py-2 text-white cursor-pointer hover:bg-[#EFF1F6]/80"
        >
          <Badge className="h-7 min-w-7 rounded-full px-1 font-mono tabular-nums bg-gradient-to-br from-[#5C6670] to-[#131316]">
            {getInitials(fullName)}
          </Badge>
          <MenuIcon className="size-4 text-[#56616B]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mr-[-30px] mt-5 w-64 border-white shadow-md"
        align="end"
      >
        {/* Header Section */}
        <DropdownMenuLabel className="flex items-center gap-3 p-4">
          <Badge className="h-8 min-w-8 rounded-full px-1 font-mono tabular-nums bg-gradient-to-br from-[#5C6670] to-[#131316] text-white flex items-center justify-center">
            {getInitials(fullName)}
          </Badge>
          <div>
            <p className="text-sm font-medium"> {fullName}</p>
            <p className="text-xs text-muted-foreground">{data?.email ?? ""}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuGroup>
          {navigationItems.map((item) => {
            return (
              <DropdownMenuItem
                key={item.name}
                className="flex items-center gap-3 p-4 cursor-pointer"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;
