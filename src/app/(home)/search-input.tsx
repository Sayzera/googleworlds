"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";

export const SearchInput = () => {
  const [value, setValue] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <div className="flex-1 flex items-center justify-center">
      <form className="relative max-w-[720px] w-full">
        <Input
          value={value}
          placeholder="Search"
          className="md:text-base placeholder:text-neutral-800 
                 px-14 w-full border-none 
                 focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#F0F4F8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white 
                 "
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant={"ghost"}
          size={"icon"}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 [&_svg]:size-5"
        >
          <SearchIcon />
        </Button>

        {value && (
          <Button
            onClick={() => {
              setValue("");
            }}
            type="button"
            variant={"ghost"}
            size={"icon"}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 [&_svg]:size-5"
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );
};
