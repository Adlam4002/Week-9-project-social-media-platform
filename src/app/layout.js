import "./globals.css";
import Header from "@/components/Header";
import { League_Spartan } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const spartan = League_Spartan({ subsets: ["latin"] });

export const metadata = {
  title: "ConnectHub",
  description:
    "ConnectHub – your new favorite spot for connecting, sharing, and discovering!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={spartan.className}>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
