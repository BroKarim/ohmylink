"use client";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

import { Toaster } from "sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { ThemeProvider } from "@/components/theme-provider";
export function Providers({ children, routerConfig }: { children: React.ReactNode; routerConfig: Parameters<typeof NextSSRPlugin>[0]["routerConfig"] }) {
  const queryClient = getQueryClient();

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <NextSSRPlugin routerConfig={routerConfig} />
        {children}
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
