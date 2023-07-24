import "./globals.scss";

export const metadata = {
  title: "Belle Class",
  description: "Beauty Clinic",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
