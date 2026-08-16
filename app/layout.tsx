import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "Voltura Power & Engineering | Bintulu, Sarawak";
const description = "Reliable electrical and mechanical installation, maintenance and engineering support for homes, businesses and growing industry in Bintulu, Sarawak.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title,
    description,
    keywords: ["electrical services Bintulu", "mechanical services Bintulu", "engineering Sarawak", "Voltura Engineering"],
    authors: [{ name: "Voltura Power & Engineering" }],
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_MY",
      siteName: "Voltura Power & Engineering",
      images: [{ url: `${origin}/og.png`, width: 1746, height: 912, alt: "Voltura electrical-to-data-infrastructure engineering visual" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#050a12" }, { media: "(prefers-color-scheme: light)", color: "#f7f9fc" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
