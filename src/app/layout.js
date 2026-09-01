import { Cinzel, Poppins } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/context/Loading.context";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import PageTransition from "@/components/reuseable-animated-component/PageTransition";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "DGS Groups",
  description:
    "30 Years of Trust. Affordable Luxury. Redefining Mumbai's Skyline.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="font-poppins min-h-full flex flex-col">
        <LoadingProvider>
          <SmoothScrollProvider>
            <PageTransition barClassName="bg-primary">
              <Navbar />
              {children}
              <Footer />
            </PageTransition>
          </SmoothScrollProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
