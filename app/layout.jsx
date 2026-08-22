import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LenisProvider } from '@/components/lenis-provider'

export const metadata = {
  title: 'Risikesh Somnath T — 3D Portfolio',
  description:
    'Portfolio of Risikesh Somnath T — Software Engineer, AI/ML practitioner, and Full Stack developer building scalable, production-grade systems.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning style={{ background: '#0C0C0C' }}>
      <body className="font-kanit" style={{ background: '#0C0C0C' }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LenisProvider>{children}</LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
