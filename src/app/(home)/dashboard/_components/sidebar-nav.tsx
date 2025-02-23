"use client";
import React from "react";
import { usePathname } from "next/navigation";
import {
  ChartNoAxesCombined,
  MessageSquareQuote,
  ShieldCheck,
  SquareLibrary,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type Props = {};

export const SidebarNav = ({}: Props) => {
  const path = usePathname();
  const menuList = [
    {
      id: 1,
      name: "My Forms",
      icon: SquareLibrary,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Responses",
      icon: MessageSquareQuote,
      path: "/",
    },
    {
      id: 3,
      name: "Analytics",
      icon: ChartNoAxesCombined,
      path: "/",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/",
    },
  ];

  console.log(path, "path");
  return (
    <div className="md:w-64 fixed h-screen shadow-md border flex flex-col justify-between overflow-y-auto">
      {/* Üst menüler */}
      <div className="p-5">
        {menuList.map((menu, index) => (
          <h2
            key={index}
            className={`flex items-center gap-3 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer mb-3 text-zinc-700 ${
              path === menu.path ? "bg-primary !text-white" : ""
            }`}
          >
            <menu.icon />
            {menu.name}
          </h2>
        ))}
      </div>
      <div className="fixed bottom-20 p-6 w-64">
        <Button className="w-full">+ Create Form</Button>
        <div className="my-3">
          <Progress value={33} />
          <h2 className="text-sm mt-2 text-muted-foreground">
            <strong>2</strong>&nbsp;Out of <strong>3</strong><span>File Created</span>
          </h2>
          <div className="text-xs mt-4 text-muted-foreground">Upgrade your plan for unlimited AI from</div>
        </div>
      </div>
    </div>
  );
};
