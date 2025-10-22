"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CloseIcon } from "./icons";

interface RightDrawerProps {
  openDrawerComponent: React.ReactNode;
  closeDrawerComponent?: React.ReactNode;
  footerButton?: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function RightDrawer({
  openDrawerComponent,
  closeDrawerComponent,
  footerButton,
  children,
  title,
  description,
}: RightDrawerProps) {
  const closeIcon = (
    <CloseIcon className="size-6 text-foreground hover:bg-secondary rounded-full cursor-pointer" />
  );
  return (
    <Sheet>
      {/* This is the button that opens the drawer */}
      <SheetTrigger asChild>{openDrawerComponent}</SheetTrigger>

      {/* This is the actual drawer panel */}
      <SheetContent
        side="right"
        className="min-w-[30rem] h-full flex flex-col bg-background rounded-2xl m-1 shadow border border-border p-2"
        closeIcon={closeIcon}
      >
        {/* Header Section */}
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-foreground">
            {title}
          </SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        {children}

        {/* Footer Section */}
        <SheetFooter className="flex flex-row gap-4">
          {footerButton}
          <SheetClose asChild>{closeDrawerComponent}</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
