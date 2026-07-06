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
      title: "Enterprise SaaS Platform",
      company: "White-label Solution",
      image: "/images/logos/nextjs.png",
      tags: ["Next.js", "React", "SaaS", "Multi-Tenant"],
      category: ["saas", "nextjs", "react"],
      bg: "primary",
    },
    {
      title: "ERP Management System",
      company: "Corporate Client",
      image: "/images/logos/NETCore.png",
      tags: [".NET Core", "SQL Server", "Azure", "APIs"],
      category: ["dotnet", "azure", "backend"],
      bg: "info",
    },
    {
      title: "CRM Dashboard Platform",
      company: "Agency White-label",
      image: "/images/logos/react.svg",
      tags: ["React", "Node.js", "MongoDB", "Admin Panel"],
      category: ["react", "node"],
      bg: "success",
    },
    {
      title: "E-Commerce Marketplace",
      company: "Retail Client",
      image: "/images/logos/nextjs.png",
      tags: ["Next.js", "Stripe", "Node.js", "MongoDB"],
      category: ["nextjs", "ecommerce"],
      bg: "warning",
    },
    {
      title: "Mobile Banking App",
      company: "Fintech Project",
      image: "/images/logos/reactnative.png",
      tags: ["React Native", "APIs", "Security", "Auth"],
      category: ["mobile", "reactnative"],
      bg: "primary",
    },
    {
      title: "Cloud Migration System",
      company: "Enterprise Infrastructure",
      image: "/images/logos/azure.jpeg",
      tags: ["Azure", "AWS", "Docker", "CI/CD"],
      category: ["azure", "aws", "cloud"],
      bg: "info",
    },
    {
      title: "API Gateway & Microservices",
      company: "SaaS Backend System",
      image: "/images/logos/nodejs-icon.svg",
      tags: ["Node.js", "Microservices", "REST APIs", "JWT"],
      category: ["node", "api"],
      bg: "success",
    },
    {
      title: "Hospital Management System",
      company: "Healthcare Client",
      image: "/images/logos/NETCore.png",
      tags: [".NET Core", "SQL Server", "Role Management", "Reports"],
      category: ["dotnet", "sql"],
      bg: "warning",
    },
    {
      title: "Learning Management System (LMS)",
      company: "Education Platform",
      image: "/images/logos/react.svg",
      tags: ["React", "Node.js", "Video Streaming", "Dashboard"],
      category: ["react", "lms"],
      bg: "primary",
    },
    {
      title: "Logistics Tracking System",
      company: "Transport Company",
      image: "/images/logos/nodejs-icon.svg",
      tags: ["Node.js", "Maps API", "Real-time Tracking", "WebSockets"],
      category: ["node", "logistics"],
      bg: "info",
    },
    {
      title: "HR Management System",
      company: "Enterprise Client",
      image: "/images/logos/bootstrap.svg",
      tags: ["Bootstrap", "React", "Attendance", "Payroll"],
      category: ["hr", "admin"],
      bg: "success",
    },
    {
      title: "Real Estate Platform",
      company: "Property Marketplace",
      image: "/images/logos/nextjs.png",
      tags: ["Next.js", "Maps", "Search Filters", "Listings"],
      category: ["nextjs", "realestate"],
      bg: "warning",
    },
    {
      title: "DevOps CI/CD Pipeline System",
      company: "Infrastructure Automation",
      image: "/images/logos/aws.png",
      tags: ["AWS", "Docker", "CI/CD", "Kubernetes"],
      category: ["aws", "devops"],
      bg: "primary",
    },
    {
      title: "Admin Analytics Dashboard",
      company: "SaaS Product",
      image: "/images/logos/react.svg",
      tags: ["React", "Charts", "Analytics", "MUI"],
      category: ["react", "admin"],
      bg: "info",
    },
  ];

  const filters = [
    "all",
    "saas",
    "react",
    "nextjs",
    "dotnet",
    "node",
    "azure",
    "aws",
    "mobile",
    "database",
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
              My Projects
            </h2>

            <p className="text-gray-700 fs-18 fs-lg mb-4 mb-md-5 lh-lg">
              We craft digital, graphic and dimensional thinking, to create category leading brand experiences that have meaning.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="row justify-content-center mb-5">
          <div className="col-12 text-center">
            <ul className="list-unstyled filter-tab">
              {filters.map((f) => (
                <li
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`list-inline-item mx-2 text-dark ${
                    activeFilter === f ? "active fw-bold" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </li>
              ))}
            </ul>
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