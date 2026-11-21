import "./globals.css";

export const metadata = {
  title: "Amit Choudhary — Senior Software Developer",
  description:
    "Portfolio of Amit Choudhary, a senior full-stack developer working across distributed Go services, cloud migration, enterprise SaaS and PHP products.",
  keywords: [
    "Amit Choudhary",
    "Senior Software Developer",
    "Go Developer",
    "Next.js Developer",
    "Full Stack Developer",
    "Cloud Migration",
    "Distributed Systems",
    "Laravel Developer",
    "PHP Developer",
    "Jaipur",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#0f131a",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
