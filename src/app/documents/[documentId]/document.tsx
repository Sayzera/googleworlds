'use client'
import { Preloaded, usePreloadedQuery } from "convex/react";
import React from "react";
import { Editor } from "./editor";
import Toolbar from "./toolbar";
import { Navbar } from "./navbar";
import { Room } from "./room";
import { api } from "../../../../convex/_generated/api";

type Props = {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
};

export  const Document = ({ preloadedDocument }: Props) => {
  const document =  usePreloadedQuery(preloadedDocument)
  return (
    <div className="min-h-screen bg-[#F9FBFD]">
      <Room>
        <div className="flex flex-col px-4 gap-y-2 fixed top-0 inset-x-0  z-10 bg-[#FaFBFD] print:hidden h-[112px]">
          <Navbar data={document} />
          <Toolbar />
        </div>
        <div className="pt-[114px] print:pt-0">
          <Editor initialContent={document?.initialContent} />
        </div>
      </Room>
    </div>
  );
}
