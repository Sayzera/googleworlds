"use client";
import React from "react";
import { SignedIn } from "@clerk/clerk-react";
import { SidebarNav } from "./_components/sidebar-nav";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <SidebarNav />
      <div className="md:ml-64">
      <SignedIn>{children}</SignedIn>
      </div>
    </div>
  );
}

export default DashboardLayout;
