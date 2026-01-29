import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/utils/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RPGFicha",
  description: "Ficha RPG, para jogadores organizarem suas fichas e personagens, Ficha de RPG (D&D 5e 2014)",
  authors:[{name:'Gabriel Vedaa Queiroz', url:'https://github.com/gabrielvedanaqueiroz/gabrielvedanaqueiroz'},],
  keywords:['rpg', 'dungeons and dragons', 'dnd', 'dungeons', 'dragons', 'd20'],
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="pt-br">
      <meta name="theme-color" content="#e9bd20" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        
        <AuthProvider>
          {children}
        </AuthProvider>
        
        <ToastContainer />
      </body>
      
    </html>
  );
}
