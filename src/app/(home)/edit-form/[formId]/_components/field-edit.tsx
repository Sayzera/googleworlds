import { Delete, Edit } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  field: any;
  onUpdate: (field: { label: string; placeholder: string }) => void;
  onDelete: () => void;
};

function FieldEdit({ field, onUpdate, onDelete }: Props) {
  const [label, setLabel] = useState<string>(field.label);
  const [placeholder, setPlaceholder] = useState<string>(
    field.placeholder || ""
  );

  console.log(field, "field");

  return (
    <div className="flex items-center gap-x-2">
      <Popover>
        <PopoverTrigger>
          <Edit className="size-5" />
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <label className="text-xs text-gray-500">Label Name</label>
            <Input
              type="text"
              value={label}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLabel(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-gray-500">Placeholder</label>
            <Input
              type="text"
              value={placeholder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPlaceholder(e.target.value)
              }
            />
          </div>

          <div className="flex justify-start my-2">
            <Button
              size={"sm"}
              onClick={() => {
                onUpdate({
                  label,
                  placeholder,
                });
              }}
            >
              Update
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <AlertDialog>
        <AlertDialogTrigger>
          {" "}
          <Delete className="size-5 text-red-500" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this field?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to delete this
              field?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete && onDelete();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default FieldEdit;
