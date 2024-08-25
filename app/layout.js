"use client";
import { Inter } from "next/font/google";

// css
import "./globals.css";

// context
import FinanceContextProvider from "./components/context/FinanceContext";
import "react-toastify/dist/ReactToastify.css";

//toast
import { toast, ToastContainer } from "react-toastify";
import ReduxProvider from "./redux/provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <FinanceContextProvider>
            <ToastContainer />
            {children}
          </FinanceContextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
