
import Script from "next/script";
import Header from "./components/Header";

export const metadata = {
  title: "Selfown - Responsive Personal page",
  description: "Premium Bootstrap 5 Template",
  keywords: "bootstrap 5, premium, marketing, multipurpose",
  authors: [{ name: "Mannatthemes" }],
};

export default function RootLayout({ children }:any) {
  return (
    <html lang="en">
      <head>
        {/* favicon */}
        <link rel="shortcut icon" href="/images/favicon.ico" />

        {/* CSS */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/style.min.css" />
        <link rel="stylesheet" href="/css/colors/default.css" id="color-opt" />
      </head>

      <body>
        <Header/>
        {children}

        {/* Scripts (recommended way in Next.js) */}

        {/* <Script src="/js/bootstrap.bundle.min.js" strategy="beforeInteractive" /> */}

        {/* feather icon */}
        {/* <Script src="/js/feather.js" strategy="afterInteractive" />
        <Script src="/js/shuffle.min.js" strategy="afterInteractive" />
        <Script src="/js/projects.init.js" strategy="afterInteractive" />
        <Script src="/js/typed.js" strategy="afterInteractive" />
        <Script src="/js/app.js" strategy="afterInteractive" /> */}
      </body>
    </html>
  );
}