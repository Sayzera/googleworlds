import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderIcon } from "lucide-react";
import { DocumentRow } from "./document-row";

interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}
export const DocumentsTable = ({
  documents,
  loadMore,
  status,
}: DocumentsTableProps) => {
  return (
    <div className="pageDefaultWith gap-5 ">
      {documents === undefined ? (
        <div className="flex justify-center items-center h-24">
          <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="hidden md:flex">Shared</TableHead>
              <TableHead className="text-right">Created at</TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell
                  className="h-24 text-center text-muted-foreground "
                  colSpan={4}
                >
                  No documents found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents.map((document) => (
                <DocumentRow key={document._id} document={document} />
              ))}
            </TableBody>
          )}
         
        </Table>
      )}
    </div>
  );
};
