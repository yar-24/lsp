'use client';
import Navbar from '@/components/Navbar';
import './globals.css';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import store from '@/redux/store';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Mading</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <Provider store={store}>
        <body className={inter.className}>
          <main className="app">{children}</main>
          <Navbar />
        </body>
      </Provider>
    </html>
  );
}
