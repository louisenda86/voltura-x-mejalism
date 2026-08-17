import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "voltura/engineering/mejalism";
const description = "Reliable electrical and mechanical installation, maintenance and engineering support for homes, businesses and growing industry in Bintulu, Sarawak.";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://voltura-engineering-bintulu.moailabs.chatgpt.site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: ["electrical services Bintulu", "mechanical services Bintulu", "engineering Sarawak", "Voltura Engineering"],
  authors: [{ name: "Voltura Power & Engineering" }],
  icons: { icon: `${basePath}/favicon.svg`, shortcut: `${basePath}/favicon.svg` },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_MY",
    siteName: title,
    images: [{ url: `${siteUrl}/og.png`, width: 1746, height: 912, alt: "Voltura electrical-to-data-infrastructure engineering visual" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${siteUrl}/og.png`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#050a12" }, { media: "(prefers-color-scheme: light)", color: "#f7f9fc" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
