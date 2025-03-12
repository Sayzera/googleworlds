import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Themes from "@/app/_data/themes";
import GradientBg from "@/app/_data/gradient-bg";
import { Button } from "@/components/ui/button";

type Props = {
  setSelectedTheme: (theme: string) => void;
  setSelectedBackground: (bg: string) => void;
};

function Controller({ setSelectedTheme,setSelectedBackground }: Props) {
  const [showMore, setShowMore] = useState(6);
  return (
    <div>
      <h2>Select Themes</h2>
      <Select onValueChange={(value) => setSelectedTheme(value)}>
        <SelectTrigger className="w-full mt-2">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {Themes.map((theme, index) => {
            return (
              <SelectItem key={index} value={theme.theme}>
                {/* {theme.theme.toUpperCase()} */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    <div
                      className="h-5 w-5 rounded-l-md"
                      style={{
                        backgroundColor: theme.primary,
                      }}
                    />
                    <div
                      className="h-5 w-5"
                      style={{
                        backgroundColor: theme.secondary,
                      }}
                    />

                    <div
                      className="h-5 w-5"
                      style={{
                        backgroundColor: theme.accent,
                      }}
                    />
                    <div
                      className="h-5 w-5 rounded-r-md"
                      style={{
                        backgroundColor: theme.neutral,
                      }}
                    />
                  </div>

                  {theme.theme.toLocaleUpperCase()}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {/* Background Selection Controller */}
      <h2 className="mt-8 mb-1">Background</h2>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {GradientBg?.slice(0, showMore).map((bg, index) => {
          return (
            <div
              className="w-full h-[70px]  rounded-lg
               hover:border-black hover:border-2 flex items-center justify-center cursor-pointer
              "
              style={{ background: bg.gradient }}
              key={index}
              onClick={() => {
                setSelectedBackground(bg.gradient);
              }}
            >
              {index === 0 && "None"}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          size={"sm"}
          variant={"ghost"}
          onClick={() => {
            setShowMore(showMore + 6);
          }}
          disabled={showMore >= GradientBg.length}
        >
          Show More
        </Button>
      </div>
    </div>
  );
}

export default Controller;
