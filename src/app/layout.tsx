import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { NoiseOverlay } from "@/components/effects/noise-overlay";
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
    default: "NYC Digital Agency | Software Development Company in New York City",
    template: "%s | NYC Digital Agency",
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
    title: "NYC Digital Agency | Software Development Company in New York City",
    description: BUSINESS.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "NYC Digital Agency | Software Development Company in New York City",
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-void text-primary">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SmoothScrollProvider>
          <CustomCursor />
          <NoiseOverlay />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
