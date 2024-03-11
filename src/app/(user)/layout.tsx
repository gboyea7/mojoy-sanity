import type { Metadata } from "next";
import "../../styles/globals.css";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import "slick-carousel/slick/slick.css";
import Footer from "../../components/Footer";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "Mojoy | Thinking of you",
  description:
    "Discover the latest tech products at Mojoy's Store. Thinking of you.",
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
          <title>Mojoy | Thinking of you</title>
          <meta name="description" content={metadata.description || ""} />
          <link rel="icon" href="./favicon.ico" />
        </Head>
        <body className="font-display">
          <Layout>
            <Navbar />
            {children}
            <Footer />
          </Layout>
        </body>
      </html>
    </>
  );
}
