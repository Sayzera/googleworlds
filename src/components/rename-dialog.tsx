"use client";

import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../convex/_generated/api";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface RenameDialogProps {
  documentId: Id<"documents">;
  children: React.ReactNode;
  initalTitle: string;
}

export const RenameDialog = ({
  documentId,
  children,
  initalTitle,
}: RenameDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initalTitle);
  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.documents.updateById),
    onSuccess: () => {
      toast.success("Document updated");
    },
    onError: (error) => {
      toast.error('Something went wrong');
    }
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate({
      id: documentId,
      title: title.trim() || "Untitled document",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename document</DialogTitle>
            <DialogDescription>
              Enter a new name for this document
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document name"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <DialogFooter>
            <Button type='button' variant={'ghost'} disabled={isPending}
             onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
             }}
            >Cancel</Button>
            <Button
             type="submit"
             disabled={isPending}
             
            >Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
