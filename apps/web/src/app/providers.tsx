'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@treviaz/ui/components/ui/sonner'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { queryClient } from '@/lib/query-client'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
        <Toaster position="top-right" />
      </NextThemesProvider>
    </QueryClientProvider>
  )
}
