import { FC } from "react";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Meme me",
  description: "Social media website for intertainment",
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }): JSX.Element => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
