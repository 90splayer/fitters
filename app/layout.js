import "./globals.css";

export const metadata = {
  title: "Fitters — digital wardrobe MVP",
  description: "A simple starter wardrobe app: add clothing items and generate outfits.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
