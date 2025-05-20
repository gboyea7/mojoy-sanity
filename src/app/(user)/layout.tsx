import type { Metadata } from "next";
import "../../styles/globals.css";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import "slick-carousel/slick/slick.css";
import Footer from "../../components/Footer";
import NavBanner from "@/components/NavBanner";
import Layout from "@/components/Layout";

export const metadata = {
  title: "Mojoy | Thinking of you",
  description:
    "Discover the latest tech products at Mojoy's Store. Thinking of you.",
  favicon: "./favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description || ""} />
          <link rel="icon" href={metadata.favicon} />
        </Head>
        <body className="font-poppins bg-white text-gray-900 antialiased">
          <Layout>
            <NavBanner />
            <Navbar />
            {children}
            <Footer />
          </Layout>
        </body>
      </html>
    </>
  );
}
