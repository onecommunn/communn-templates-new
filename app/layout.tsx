import "./globals.css";
import {
  Poppins,
  Montserrat,
  Inter,
  Cormorant_Garamond,
  Alex_Brush,
  Plus_Jakarta_Sans,
  Lora,
  Lato,
  Sora,
  Marcellus,
  Kanit,
  Archivo,
  Fraunces,
  Lexend,
  Kalnia,
  Figtree,
  Quattrocento_Sans,
} from "next/font/google";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alex-brush",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["italic", "normal"],
  variable: "--font-lato",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  variable: "--font-sora",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-marcellus",
});

const kanit = Kanit({
  subsets: ["latin", "latin-ext", "thai", "vietnamese"],
  weight: ["400", "100", "200", "300", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-kanit",
});

const archivo = Archivo({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "100", "200", "300", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "100", "200", "300", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const lexend = Lexend({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "100", "200", "300", "500", "600", "700", "800", "900"],
  style: ["normal"],
  variable: "--font-lexend",
});

const kalnia = Kalnia({
  subsets: ["latin", "latin-ext", "math"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-kalnia",
});

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-figtree",
});

const quattrocento = Quattrocento_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400","700",],
  style: ["normal", "italic"],
  variable: "--font-quattrocento",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${quattrocento.variable} ${figtree.variable} ${poppins.variable} ${montserrat.variable} ${inter.variable} ${cormorant.variable} ${alexBrush.variable} ${plusJakarta.variable} ${lora.variable} ${lato.variable} ${sora.variable} ${marcellus.variable} ${kanit.variable} ${archivo.variable} ${fraunces.variable} ${lexend.variable} ${kalnia.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
