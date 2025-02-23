'use server'
import db from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";

export type PostCreateBody = Prisma.Args<typeof db.jsonForms, "create">["data"];

export const createJsonForm = async (data: PostCreateBody) => {
  const user = await currentUser();

  const userId = user?.id;

  const res = await db.jsonForms.create({
    data: {
      jsonForm: data.jsonForm,
      createdBy: userId as string,
    },
  });

  if (!res) {
    return {
      success: false,
      message: "Form oluşturulamadı.",
      data: [],
    };
  }

  return {
    success: true,
    message: "Form başarıyla oluşturuldu.",
    data: res,
  };
};
