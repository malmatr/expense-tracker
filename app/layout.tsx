"use client";

import "./globals.css";

import Nav from "@/components/Navigation";

import FinanceContextProvider from "@/lib/store/finance-context";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <FinanceContextProvider>
          <Nav />
          {children}
        </FinanceContextProvider>
      </body>
    </html>
  );
}
