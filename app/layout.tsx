import type { Metadata } from "next";
import "./globals.css";
import "./styles/fonts.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer2";
import InfiniteLoop from "./components/layout/InfiniteLoop";
import SmoothScroll from "./providers/SmoothScroll";

export const metadata: Metadata = {
  title: "Shivneri - Innovative Business Solutions",
  description: "Transforming ideas into reality with cutting-edge technology and innovative solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
        <SmoothScroll>
          <Header />
          <div className="relative z-10 bg-black">{children}</div>
          <Footer />
          <InfiniteLoop />
        </SmoothScroll>
      </body>
    </html>
  );
}
