import type { Metadata } from "next";
import "./globals.css";
import "./styles/fonts.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
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
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
