import { Cinzel, Poppins } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "@/context/Loading.context";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "DGS Groups",
  description: "30 Years of Trust. Affordable Luxury. Redefining Mumbai's Skyline.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="font-poppins min-h-full flex flex-col">
        <LoadingProvider>{children}</LoadingProvider>
      </body>
    </html>
  );
}
