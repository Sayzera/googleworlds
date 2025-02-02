"use client";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReactNode } from "react";
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth, SignIn } from "@clerk/nextjs";
import { FullScreenLoader } from "./fullscreen-loader";

// Import your Publishable Key

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const convexQueryClient = new ConvexQueryClient(convex);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
});
convexQueryClient.connect(queryClient);

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY!}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <Authenticated>{children}</Authenticated>
          <Unauthenticated>
            <div className="flex flex-col items-center justify-center  min-h-screen">
              <SignIn routing="hash" />
            </div>
          </Unauthenticated>
          <AuthLoading>
            <FullScreenLoader label="Loading" />
          </AuthLoading>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
