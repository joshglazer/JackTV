import { VideoSearchProvider } from "@/store/VideoSearchContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import { Header, Footer } from "./components/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JackTV",
  description: "Short videos for Jack to watch before he goes to bed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry options={{ key: "mui" }}>
          <VideoSearchProvider>
            <Header />
            <section>{children}</section>
            <Footer />
          </VideoSearchProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
