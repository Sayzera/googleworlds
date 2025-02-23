import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import { create, createReactionsProps } from "@/actions/reactions/reactions";

const main_api = createApi({
  reducerPath: "main_api",
  tagTypes: ["main_api"],
  refetchOnMountOrArgChange: true, // Her arguman değiştiğinde tekrardan istek atar ve yeni veri getirir
  // no cache
  keepUnusedDataFor: 0,
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState)?.main?.userData?.accessToken?.token
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    customAction: builder.mutation<
      {
        success: boolean;
        message: string;
        data: any;
      }, // Dönen cevap
      {
        mutation: (mutationArgs: any) => Promise<any>;
        mutationArgs: any;
      }
    >({
      queryFn: async ({ mutation, mutationArgs }) => {
        const response = await mutation(mutationArgs);

        return { data: response };
      },
    }),
  }),
});

export const { useCustomActionMutation } = main_api;

export default main_api;
