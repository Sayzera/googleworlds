import React from "react";
import { Editor } from "./editor";
import Toolbar from "./toolbar";

type Props = {
  params: Promise<{ documentsId: string }>;
};

async function DocumentIdPage({ params }: Props) {
  const { documentsId } = await params;

  return (
    <div className="min-h-screen bg-[#F9FBFD]">
      <Toolbar />
      <Editor />
    </div>
  );
}

export default DocumentIdPage;
