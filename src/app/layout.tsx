// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { CourierWrapper } from '@/components/CourierProviderWrapper';
import NavBar from '@/components/NavBar';
import theme from '@/theme';
import { ThemeProvider } from '@mui/material/styles';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Courier Next.js Demo',
  description: 'Demo of Courier Inbox, Preferences, Toast in a Basic Next.js App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CourierWrapper>
            <NavBar />
            <main>{children}</main>
          </CourierWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}