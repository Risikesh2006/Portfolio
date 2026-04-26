import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LenisProvider } from '@/components/lenis-provider'
import LineWaves from '@/components/ui/line-waves'

export const metadata = {
  title: 'Risikesh Somnath T — AI & Full Stack Developer',
  description:
    'Portfolio of Risikesh Somnath T — AI Developer, Full Stack Developer & AI Systems Engineer building applications that solve real-world problems.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/profile.jpg" fetchPriority="high" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LenisProvider>
            <div aria-hidden className="fixed inset-0 z-0 pointer-events-none">
              <LineWaves
                speed={0.3}
                innerLineCount={32}
                outerLineCount={36}
                warpIntensity={1}
                rotation={-45}
                edgeFadeWidth={0}
                colorCycleSpeed={1}
                brightness={0.2}
                color1="#ffffff"
                color2="#ffffff"
                color3="#ffffff"
                enableMouseInteraction
                mouseInfluence={2}
              />
              <div className="absolute inset-0 bg-background/80" />
            </div>
            <div className="relative z-10">
              {children}
            </div>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
