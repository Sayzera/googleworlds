"use client";
import React from "react";
import { Navbar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";
import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { DocumentsTable } from "./document-table";

type Props = {};

function Home({}: Props) {

  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    {},
    { initialNumItems: 5 },
  )






  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-x-0 top-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
}

export default Home;
