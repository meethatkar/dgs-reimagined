import { Cinzel, Poppins } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/context/Loading.context";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import PageTransition from "@/components/reuseable-animated-component/PageTransition";
import Footer from "@/components/Footer";
import { ProjectsFilterProvider } from "@/context/ProjectsFilterContext";
import Navbar from "@/components/navbar/Navbar";
import UniqueMarquee from "@/components/reuseable-animated-component/unique-marquee/UniqueMarquee";

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
  icons: {
    icon: "/Logo.svg",
    shortcut: "/Logo.svg",
    apple: "/Logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cinzel.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/Logo.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/Logo.svg" />
      </head>
      <body className="font-poppins min-h-full flex flex-col" suppressHydrationWarning>
        <LoadingProvider>
          <SmoothScrollProvider>
            <ProjectsFilterProvider itemsPerPage={6}>
              <PageTransition barClassName="bg-primary">
                <Navbar />
                {children}
                <UniqueMarquee />
                <Footer />
              </PageTransition>
            </ProjectsFilterProvider>
          </SmoothScrollProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
