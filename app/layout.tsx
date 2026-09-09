import "./globals.css";

export const metadata = {
  title: "Maya's Pickle | YashAnjan Foods",
  description: "Premium Artisanal Pickles. Handcrafted Heritage.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Fonts for Playfair Display & Source Sans 3 */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
        {/* Material Symbols for Icons */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      {/* This body tag forces our custom Tailwind background and text colors to apply globally */}
      <body className="bg-background text-on-surface antialiased">
        {children}
      </body>
    </html>
  );
}