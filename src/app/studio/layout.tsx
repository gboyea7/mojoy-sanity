import "../../styles/globals.css";
export const metadata = {
  title: "Mojoy || Admin",
  description: "Mojoy Admin Studio",
  favicon: "./favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
