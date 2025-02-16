"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { templates } from "@/constants/templates";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { cn } from "@/lib/utils";

import { api } from "../../../convex/_generated/api";

export const TemplatesGallery = () => {
  const router = useRouter();
  const {
    mutate: createDocument,
    isPending: isCreating,
    isSuccess: isCreated,
  } = useMutation({
    mutationFn: useConvexMutation(api.documents.create),
    onError: (error) => {
      toast.error("Something went wrong");
    },
    onSuccess: (data) => {
      router.push(`/documents/${data}`);
      toast.success("Document created successfully");
    },
  });

  const onTemplateClick = (title: string, initialContent: string) => {
    createDocument({ title, initialContent });
  };

  return (
    <div className="bg-[#F1F3F4]">
      <div className="pageDefaultWith gap-y-4">
        <h3 className=" font-medium">Start a new document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates?.map((template) => (
              <CarouselItem
                key={template.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6  pl-4"
              >
                <div
                  className={cn(
                    "aspect-[3/4] flex flex-col gap-y-2.5",
                    isCreating && "pointer-events-none opacity-50"
                  )}
                >
                  <Button
                    disabled={isCreating}
                    onClick={() => {
                      onTemplateClick(template.label, template.initialContent);
                    }}
                    // TODO: Add proper initial content
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                  ></Button>
                  <p className="text-sm font-medium truncate text-black ">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
