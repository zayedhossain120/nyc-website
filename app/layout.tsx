import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { NoiseOverlay } from "@/components/effects/noise-overlay";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { BUSINESS, SERVICE_KEYWORDS } from "@/lib/seo/business";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { SITE_URL } from "@/lib/site-config";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vertex & Co. | NYC Software Development, AI Automation & Growth Agency",
    template: "%s | Vertex & Co.",
  },
  description: BUSINESS.description,
  keywords: [...SERVICE_KEYWORDS],
  authors: [{ name: BUSINESS.name, url: SITE_URL }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: BUSINESS.name,
    title: "Vertex & Co. | NYC Software Development, AI Automation & Growth Agency",
    description: BUSINESS.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Vertex & Co. | NYC Software Development, AI Automation & Growth Agency",
    description: BUSINESS.description,
  },
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
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
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
