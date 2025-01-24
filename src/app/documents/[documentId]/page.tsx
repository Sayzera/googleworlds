import React from "react";
import { Editor } from "./editor";
import Toolbar from "./toolbar";
import { Navbar } from "./navbar";

type Props = {
  params: Promise<{ documentsId: string }>;
};

async function DocumentIdPage({ params }: Props) {
  const { documentsId } = await params;

  return (
    <div className="min-h-screen bg-[#F9FBFD]">
      <div className="flex flex-col px-4 gap-y-2 fixed top-0 inset-x-0  z-10 bg-[#FaFBFD] print:hidden h-[112px]">
        <Navbar />
        <Toolbar />
      </div>
      <div className="pt-[114px] print:pt-0">
        <Editor />
      </div>
    </div>
  );
}

export default DocumentIdPage;
