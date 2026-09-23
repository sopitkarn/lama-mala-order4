import { Mitr, Noto_Sans_Thai } from 'next/font/google';
import './globals.css';

const mitr = Mitr({
  subsets: ['thai', 'latin'],
  weight: ['600'],
  variable: '--font-display',
  display: 'swap',
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['400', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: 'ล่าหมา หมาล่า',
  description: 'ระบบสั่งอาหารร้านล่าหมา หมาล่า',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={`${mitr.variable} ${notoSansThai.variable}`}>
      <body>{children}</body>
    </html>
  );
}
