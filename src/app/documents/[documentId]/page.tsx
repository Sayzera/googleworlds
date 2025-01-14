import React from "react";
import { Editor } from "./editor";

type Props = {
  params: Promise<{ documentsId: string }>;
};

async function DocumentIdPage({ params }: Props) {
  const { documentsId } = await params;

  return (
    <div className="min-h-screen bg-[#FAFBDD]">
      <Editor />
    </div>
  );
}

export default DocumentIdPage;
