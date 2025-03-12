"use server";
import { db } from "@/lib/prisma";
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

export const updateJsonFormAction = async ({
  jsonForm,
  id,
}: {
  jsonForm: string;
  id: number;
}) => {
  const user = await currentUser();

  const userId = user?.id;

  const res = await db.jsonForms.update({
    data: {
      jsonForm: jsonForm,
    },
    where: {
      id: id,
      createdBy: userId as string,
    },
  });

  if (!res) {
    return {
      success: false,
      message: "Form güncellenemedi.",
      data: [],
    };
  }

  return {
    success: true,
    message: "Form başarıyla güncellendi.",
    data: res,
  };
};

export const updateJsonControllerFields = async ({
  fields,
  id,
}: {
  fields: {
    [key: string]: string;
  };
  id: number;
}) => {
  const user = await currentUser();

  const userId = user?.id;

  if (!fields?.["theme"] && !fields?.["background"]) {
    return {
      success: false,
      message: "Form güncellenemedi.",
      data: [],
    };
  }

  const res = await db.jsonForms.update({
    data: {
      ...fields,
    },
    where: {
      id: id,
      createdBy: userId as string,
    },
  });

  if (!res) {
    return {
      success: false,
      message: "Form güncellenemedi.",
      data: [],
    };
  }

  return {
    success: true,
    message: "Form başarıyla güncellendi.",
    data: res,
  };
};

export const getFormData = async ({ id }: { id: string }) => {
  const user = await currentUser();

  const userId = user?.id;
  const res = await db.jsonForms.findFirst({
    where: {
      createdBy: userId as string,
      id: Number(id),
    },
  });

  if (!res) {
    return {
      success: false,
      message: "Form bulunamadı.",
      data: [],
    };
  }

  return {
    success: true,
    message: "Form başarıyla getirildi.",
    data: res,
  };
};
