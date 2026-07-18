import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://extremelooks.vercel.app"),
  title: "Extreme Looks | Premier Hair Salon",
  description:
    "Extreme Looks — where style meets precision. Book your appointment with our expert stylists today.",
  openGraph: {
    title: "Extreme Looks | Premier Hair Salon",
    description: "Extreme Looks — where style meets precision. Book your appointment with our expert stylists today.",
    images: [{ url: "/images/heroLandscape.png", width: 1200, height: 630, alt: "Extreme Looks salon" }],
  },
  twitter: {
    card: "summary",
    title: "Extreme Looks | Premier Hair Salon",
    description: "Extreme Looks — where style meets precision. Book your appointment with our expert stylists today.",
    images: ["/images/heroLandscape.png"],
  },
  icons: {
    icon: "/images/ELlogo.png",
    apple: "/images/ELlogo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body>
        <ScrollToTop />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
