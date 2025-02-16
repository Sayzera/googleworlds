import Header from "@/components/header";
import React from "react";

type HomeLayoutProps = {
  children: React.ReactNode;
};

function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default HomeLayout;
