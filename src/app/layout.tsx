import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/layout/theme-provider';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Content Remix AI',
  description: 'Nền tảng sáng tạo và remix video đa nền tảng bằng AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark">
      <body className={`${inter.className} bg-slate-900 text-slate-100 antialiased min-h-screen bg-gradient-to-br from-[#0F0B1A] via-[#1A1533] to-[#0F0B1A]`}>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" toastOptions={{ className: 'dark:bg-slate-800 dark:text-white' }} />
        </ThemeProvider>
      </body>
    </html>
  );
}
