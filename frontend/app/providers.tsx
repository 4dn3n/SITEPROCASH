"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSmoothScroll } from "@/lib/lenis";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  useSmoothScroll();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
