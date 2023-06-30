"use client";

import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import SideMenu from "@/components/SideMenu";
import { createContext, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const AppContext = createContext<any>(null);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [account, setAccount] = useState<string>("");

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContext.Provider value={{ account, setAccount }}>
          <SideMenu>
            <Header />
            {children}
          </SideMenu>
        </AppContext.Provider>
      </body>
    </html>
  );
}
