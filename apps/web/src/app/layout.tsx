import '@treviaz/ui/globals.css'

import { env } from '@treviaz/env'
import type { Metadata } from 'next'

import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Treviaz',
  description: 'Make your condominium management easier.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={env.NEXT_PUBLIC_NODE_ENV === 'development'}
      className="scroll-smooth"
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
