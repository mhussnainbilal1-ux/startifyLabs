
import Script from "next/script";
import Header from "./components/Header";
export const metadata = {
  title: "Startify Labs Ltd | White-Label Software Development Company",
  description:
    "Startify Labs Ltd is a white-label software development company helping startups, digital agencies, and enterprises build scalable web, mobile, SaaS, and custom software solutions.",

  keywords: [
    "Startify Labs",
    "Startify Labs Ltd",
    "Software Development Company",
    "Custom Software Development",
    "White Label Software Development",
    "Web Development",
    "React Development",
    "Next.js Development",
    "Node.js Development",
    "Full Stack Development",
    "SaaS Development",
    "MVP Development",
    "Enterprise Software Development",
    "Mobile App Development",
    "React Native Development",
    "API Development",
    "Cloud Solutions",
    "Digital Transformation",
    "Software Outsourcing",
    "Dedicated Development Team",
    "Remote Development Team",
    "UK Software Company",
    "Software Development UK",
    "Agency Partner",
    "Technology Consulting",
    "Business Automation",
    "CRM Development",
    "ERP Development",
    "AI Integration",
    "Startup Development",
    "Custom Web Applications"
  ],

  authors: [{ name: "Startify Labs Ltd" }],
};

export default function RootLayout({ children }:any) {
  return (
    <html lang="en">
      <head>
        {/* favicon */}
        <link rel="shortcut icon" href="/images/favicon.png" />

        {/* CSS */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/style.min.css" />
        <link rel="stylesheet" href="/css/colors/default.css" id="color-opt" />
      </head>
      <body>
        <Header/>
        {children}
       </body>
    </html>
  );
}