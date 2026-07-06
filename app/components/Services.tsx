"use client"
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import CloudQueueRoundedIcon from "@mui/icons-material/CloudQueueRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import ArchitectureRoundedIcon from "@mui/icons-material/ArchitectureRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import IntegrationInstructionsRoundedIcon from "@mui/icons-material/IntegrationInstructionsRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";


export default function Services() {


    const services = [
        // CORE DEVELOPMENT
        {
            title: "SaaS Product Development",
            desc: "End-to-end SaaS platforms with multi-tenant architecture, subscriptions, and scalable cloud deployment.",
            icon: <CodeRoundedIcon />,
            color: "primary",
        },
        {
            title: "Enterprise Web Applications",
            desc: "ERP, CRM, and business systems built with scalable and secure enterprise architecture.",
            icon: <BuildRoundedIcon />,
            color: "info",
        },
        {
            title: "API Development & Integration",
            desc: "Secure REST APIs, microservices, and third-party integrations for scalable systems.",
            icon: <ApiRoundedIcon />,
            color: "success",
        },
        {
            title: "Admin Dashboards & CRM Systems",
            desc: "Analytics dashboards, admin panels, and data-driven business management tools.",
            icon: <DashboardRoundedIcon />,
            color: "warning",
        },
        {
            title: "Mobile App Development",
            desc: "Cross-platform apps using React Native and Flutter with native performance.",
            icon: <PhoneAndroidRoundedIcon />,
            color: "primary",
        },

        // CLOUD & DEVOPS
        {
            title: "Cloud Architecture & Migration",
            desc: "AWS and Azure cloud solutions with scalable infrastructure and deployment automation.",
            icon: <CloudQueueRoundedIcon />,
            color: "info",
        },
        {
            title: "CI/CD & DevOps Engineering",
            desc: "Automated pipelines, Docker, Kubernetes, and continuous deployment systems.",
            icon: <AutorenewRoundedIcon />,
            color: "success",
        },

        // DESIGN & UX
        {
            title: "UI/UX Design Systems",
            desc: "Modern SaaS UI/UX design, Figma prototypes, and scalable design systems.",
            icon: <DesignServicesRoundedIcon />,
            color: "primary",
        },

        // CONSULTING
        {
            title: "Software Architecture Consulting",
            desc: "System design, database architecture, scalability planning, and technical consulting.",
            icon: <ArchitectureRoundedIcon />,
            color: "info",
        },
        {
            title: "MVP Development for Startups",
            desc: "Fast MVP delivery with scalable architecture and production-ready codebase.",
            icon: <RocketLaunchRoundedIcon />,
            color: "warning",
        },

        // SUPPORT & MAINTENANCE
        {
            title: "Application Maintenance & Support",
            desc: "Ongoing updates, bug fixing, performance optimization, and system improvements.",
            icon: <BuildRoundedIcon />,
            color: "success",
        },

        // QA & SECURITY
        {
            title: "Quality Assurance & Testing",
            desc: "Manual and automated testing, API testing, and performance validation.",
            icon: <BugReportRoundedIcon />,
            color: "warning",
        },
        {
            title: "Security & Authentication Systems",
            desc: "Secure login systems, JWT, OAuth, encryption, and application security audits.",
            icon: <VerifiedUserRoundedIcon />,
            color: "success",
        },

        // INTEGRATIONS
        {
            title: "Third-Party Integrations",
            desc: "Payment gateways, CRMs, ERPs, email/SMS systems, and AI API integrations.",
            icon: <IntegrationInstructionsRoundedIcon />,
            color: "primary",
        },
    ];

    return (
        <section className="section bg-gradient-light-white" id="services">
        <div className="container">
      
          {/* Heading */}
          <div className="row justify-content-center mb-4">
            <div className="col-12 col-md-10 col-lg-7 text-center position-relative">
              <span className="badge rounded bg-soft-alt-success fw-normal fs-13 text-uppercase">
                Services
              </span>
      
              <h2 className="fs-2 fw-medium lh-1 text-dark my-3 position-relative z-i-2">
                Our Services
              </h2>
      
              <div className="bg-text">
                <h1 className="fw-bold p-0">Services</h1>
              </div>
      
              <p className="text-gray-700 fs-18 fs-lg mb-4 mb-md-5 lh-lg">
                We craft digital, graphic and dimensional thinking, to create category leading brand experiences that have meaning.
              </p>
            </div>
          </div>
      
          {/* Cards */}
          <div className="row align-items-stretch">
            {services.map((service, index) => (
              <div key={index} className="col-lg-4 col-md-6 mt-4 pt-2 d-flex">
                
                <div className="card rounded shadow border-0 w-100 h-100">
                  <div className="card-body p-4 m-2 d-flex flex-column">
      
                    <div
                      className={`bg-soft-alt-${service.color} d-flex justify-content-center align-items-center thumb-xl rounded mb-3`}
                    >
                      {service.icon}
                    </div>
      
                    <h5 className="text-dark fs-22 fw-medium my-2">
                      {service.title}
                    </h5>
      
                    <p className="text-muted pb-4 flex-grow-1">
                      {service.desc}
                    </p>
      
                  </div>
                </div>
      
              </div>
            ))}
          </div>
      
        </div>
      </section>
    );
}