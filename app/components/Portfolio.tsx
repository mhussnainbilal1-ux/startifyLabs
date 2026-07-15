"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Project = {
  title: string;
  company: string;
  image: string;
  tags: string[];
  category: string[];
  bg: string;
};

const projects: Project[] = [
  
  {
    title: "Healthcare Analytics Platform",
    company: "CureMD - ICE Platform",
    image: "/images/logos/NETCore.png",
    tags: [".NET Core", "Multi-Tenant", "Healthcare", "Analytics"],
    category: ["dotnet", "database"],
    bg: "info",
  },
  {
    title: "Insurance Claims Management System",
    company: "Enterprise Insurance Solution",
    image: "/images/logos/react.svg",
    tags: ["React", "GraphQL", "Microservices", "SignalR"],
    category: ["react", "dotnet"],
    bg: "success",
  },
  {
    title: "Banking CRM & Loan Management System",
    company: "Saudi Investment Bank",
    image: "/images/logos/NETCore.png",
    tags: [".NET MVC", "CRM", "Banking", "Enterprise"],
    category: ["dotnet", "backend"],
    bg: "warning",
  },
  {
    title: "Enterprise CMS Platform",
    company: "PepsiCo Digital Platform",
    image: "/images/logos/react.svg",
    tags: ["React", ".NET Core", "CMS", "Azure"],
    category: ["react", "azure"],
    bg: "primary",
  },
  {
    title: "Mobile Application Ecosystem",
    company: "Consumer Mobile Solutions",
    image: "/images/logos/reactnative.png",
    tags: ["React Native", "Firebase", "APIs", "Mobile"],
    category: ["mobile", "reactnative"],
    bg: "info",
  },
  {
    title: "AI Powered Business Solutions",
    company: "Enterprise AI Integration",
    image: "/images/logos/python.jpeg",
    tags: ["Python", "LLMs", "RAG", "Automation"],
    category: ["ai", "python"],
    bg: "success",
  },
  {
    title: "Cloud Native Enterprise Systems",
    company: "AWS & Azure Solutions",
    image: "/images/logos/aws.png",
    tags: ["AWS", "Azure", "Docker", "CI/CD"],
    category: ["aws", "azure"],
    bg: "warning",
  },
  {
    title: "Microservices Architecture",
    company: "Enterprise Backend Systems",
    image: "/images/logos/NETCore.png",
    tags: [".NET Core", "APIs", "Microservices", "Cloud"],
    category: ["dotnet", "backend"],
    bg: "primary",
  },
  {
    title: "3D Printing Marketplace Platform",
    company: "WIPPIT",
    image: "/images/logos/react.svg",
    tags: ["React", ".NET Core", "Python", "Azure", "Marketplace"],
    category: ["react", "dotnet", "azure"],
    bg: "primary",
  },
  {
    title: "Vehicle Leasing Platform",
    company: "Vanarama (Auto Trader Group) - UK",
    image: "/images/logos/nextjs.png",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "Microservices"],
    category: ["react", "nextjs", "node"],
    bg: "primary",
  },
  {
    title: "AI Financial Intelligence Platform",
    company: "Beyond MI - UK",
    image: "/images/logos/react.svg",
    tags: ["React", "Next.js", "OpenAI", "AWS", "Multi-Tenant"],
    category: ["react", "nextjs", "aws"],
    bg: "info",
  },
  {
    title: "Global E-Commerce Platform",
    company: "Tommy Hilfiger & Calvin Klein",
    image: "/images/logos/react.svg",
    tags: ["React", "Payments", "GraphQL", "Microservices"],
    category: ["react", "node"],
    bg: "success",
  },
  {
    title: "Enterprise Water Management Portal",
    company: "Affinity Water - UK",
    image: "/images/logos/react.svg",
    tags: ["React", "React Native", "Node.js", "AWS"],
    category: ["react", "mobile", "aws"],
    bg: "warning",
  },
  {
    title: "Digital Banking & Payments Platform",
    company: "Velo Payments - UK",
    image: "/images/logos/azure.jpeg",
    tags: ["React", "Azure B2C", "Microservices", "APIs"],
    category: ["react", "azure"],
    bg: "primary",
  },
  {
    title: "Video Streaming & Subscription Platform",
    company: "Channel 5 - UK",
    image: "/images/logos/nextjs.png",
    tags: ["Next.js", "React", "SSR", "Performance"],
    category: ["nextjs", "react"],
    bg: "info",
  },
  {
    title: "Retail E-Commerce Platform",
    company: "Next PLC - UK",
    image: "/images/logos/nextjs.png",
    tags: ["Next.js", "React Native", "Payments", "AWS"],
    category: ["nextjs", "mobile"],
    bg: "success",
  },
  {
    title: "Enterprise CRM & Reporting Dashboard",
    company: "Financial Services Platform",
    image: "/images/logos/react.svg",
    tags: ["React", "Redux", "Charts", "APIs"],
    category: ["react"],
    bg: "warning",
  },
  {
    title: "SaaS Multi-Tenant Platform",
    company: "White-Label Solution",
    image: "/images/logos/nextjs.png",
    tags: ["Next.js", "Node.js", "MongoDB", "Cloud"],
    category: ["saas", "nextjs", "node"],
    bg: "primary",
  },
  {
    title: "Cloud Infrastructure & DevOps",
    company: "Enterprise Cloud Solutions",
    image: "/images/logos/aws.png",
    tags: ["AWS", "Docker", "CI/CD", "Kubernetes"],
    category: ["aws"],
    bg: "info",
  },
  {
    title: "API & Microservices Architecture",
    company: "Enterprise Backend Systems",
    image: "/images/logos/nodejs-icon.svg",
    tags: ["Node.js", "REST APIs", "Kafka", "Microservices"],
    category: ["node"],
    bg: "success",
  },
  {
    title: "Enterprise Application Modernization",
    company: "Legacy System Migration",
    image: "/images/logos/NETCore.png",
    tags: [".NET Core", "Azure", "SQL Server", "APIs"],
    category: ["dotnet", "azure"],
    bg: "warning",
  },
];

 
export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <section className="section" id="projects">
      <div className="container">

        {/* Heading */}
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-md-10 col-lg-7 text-center">
            <span className="badge rounded bg-soft-alt-success fw-normal fs-13 text-uppercase">
              Work
            </span>

            <h2 className="fs-2 fw-medium lh-1 text-dark my-3">
            Enterprise Solutions & Digital Platforms

            </h2>

            <p className="text-gray-700 fs-18 fs-lg mb-4 mb-md-5 lh-lg">
            Designing and delivering scalable enterprise applications,
  cloud solutions, AI-powered platforms, and digital products
  for organizations across healthcare, banking, finance,
  and technology sectors.           </p>
          </div>
        </div>

       
        {/* Projects */}
        <div className="row g-3 justify-content-center">
          {filteredProjects.map((project, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="card rounded shadow border-0 m-2">
                <div className="card-body p-4 m-2">

                  {/* Header */}
                  <div className="d-flex mb-3">
                    <div
                      className={`bg-soft-alt-${project.bg} d-flex justify-content-center align-items-center thumb-xl rounded`}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={34}
                        height={34}
                      />
                    </div>

                    <div className="ms-3">
                      <h5 className="text-dark fs-18 fw-medium m-0">
                        {project.title}
                      </h5>
                      <p className="text-muted mb-0 fs-13">
                        {project.company}{" "}
                        <Link href="#">
                          <i className="ti ti-external-link fs-18 text-primary"></i>
                        </Link>
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="d-flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="badge rounded bg-soft-alt-info fw-normal fs-12 text-uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}