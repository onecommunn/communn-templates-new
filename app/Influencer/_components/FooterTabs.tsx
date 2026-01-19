"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Home, List, Map as MapIcon, Bookmark, PlusCircle } from "lucide-react";
type TabKey = "home" | "list" | "explore" | "saved" | "add";

const TABS = [
  { value: "home", label: "Home", Icon: Home },
  { value: "list", label: "List", Icon: List },
  { value: "explore", label: "Explore", Icon: MapIcon },
  { value: "saved", label: "Saved", Icon: Bookmark },
  { value: "add", label: "Add", Icon: PlusCircle },
] as const;

export default function FooterTabs(props: {
  activeTab: TabKey;
  setActiveTab: (v: TabKey) => void;
}) {
  const { activeTab, setActiveTab } = props;

  return (
    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)} className="z-[60]">
      <TabsList className="bg-white rounded-none border border-gray-100 px-2 py-2 flex items-center justify-between h-full w-full gap-1">
        {TABS.map((tab) => {
          const Icon = tab.Icon;

          return (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn(
                "group flex h-fit max-w-fit items-center gap-2 px-3 py-2.5 rounded-full",
                "text-slate-500 hover:bg-slate-100 transition-all duration-300 ease-out",
                "data-[state=active]:bg-[#2B52A1] data-[state=active]:text-white",
                "data-[state=active]:px-5 [&_svg:not([class*='size-'])]:size-5 cursor-pointer"
              )}
            >
              <Icon />
              <span className="hidden group-data-[state=active]:inline font-medium text-sm">
                {tab.label}
              </span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
