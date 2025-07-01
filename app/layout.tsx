import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'H24 Langellotti ',
  description: 'Distributori automatici attivi 24 ore su 24, 7 giorni su 7',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
