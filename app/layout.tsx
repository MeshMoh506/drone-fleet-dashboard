import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { Toaster } from '@/components/ui/Toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import FloatingThemeToggle from '@/components/FloatingThemeToggle';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Drone Fleet Management Dashboard',
  description:
    'Professional drone fleet management interface with real-time monitoring',
  keywords: ['drone', 'fleet management', 'monitoring', 'dashboard'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            {children}
            <FloatingThemeToggle />
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
