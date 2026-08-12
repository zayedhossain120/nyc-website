import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { NoiseOverlay } from "@/components/effects/noise-overlay";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vertex & Co. | NYC Software, AI Automation & Growth Agency",
    template: "%s | Vertex & Co.",
  },
  description:
    "Vertex & Co. is the New York City agency high-growth companies hire for production-grade Next.js/NestJS engineering, custom AI agents, and paid + organic growth systems — under one roof, one team, one accountable partner.",
};

export const viewport: Viewport = {
  themeColor: "#060607",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-primary">
        <SmoothScrollProvider>
          <CustomCursor />
          <NoiseOverlay />
          <SiteHeader />
          {children}
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
