import { Toaster } from '@treviaz/ui/components/ui/sonner'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
      <Toaster position="top-right" />
    </NextThemesProvider>
  )
}
