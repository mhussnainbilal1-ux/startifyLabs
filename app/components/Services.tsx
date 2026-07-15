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
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

export default function Services() {


  const services = [
    {
      title: "SaaS Product Development",
      desc: "Scalable SaaS platforms with secure architecture, subscriptions, integrations, and cloud-ready infrastructure.",
      icon: <CodeRoundedIcon />,
      color: "primary",
    },
    {
      title: "Enterprise Software Solutions",
      desc: "Custom business applications, ERP, CRM, and internal systems built for performance and growth.",
      icon: <BuildRoundedIcon />,
      color: "info",
    },
    // AI DEVELOPMENT
{
  title: "AI Solutions & Automation",
  desc: "AI-powered applications, intelligent automation, chatbots, and custom AI integrations to improve business efficiency.",
  icon: <AutoAwesomeRoundedIcon />,
  color: "primary",
},
    {
      title: "API Development & Integrations",
      desc: "Secure APIs, backend services, and seamless integrations that connect your digital ecosystem.",
      icon: <ApiRoundedIcon />,
      color: "success",
    },
    {
      title: "Business Dashboards & Portals",
      desc: "Powerful dashboards, analytics platforms, and management systems that simplify operations.",
      icon: <DashboardRoundedIcon />,
      color: "warning",
    },
    {
      title: "Mobile Application Development",
      desc: "Modern iOS and Android applications delivering smooth experiences across all devices.",
      icon: <PhoneAndroidRoundedIcon />,
      color: "primary",
    },
    {
      title: "Cloud Solutions & Migration",
      desc: "Cloud architecture, deployment, and migration solutions built on AWS and Azure platforms.",
      icon: <CloudQueueRoundedIcon />,
      color: "info",
    },
    {
      title: "DevOps & Deployment Automation",
      desc: "Reliable CI/CD pipelines, containerization, and automated deployments for faster releases.",
      icon: <AutorenewRoundedIcon />,
      color: "success",
    },
    {
      title: "UI/UX Design & Prototyping",
      desc: "User-focused interfaces, design systems, and prototypes that create exceptional experiences.",
      icon: <DesignServicesRoundedIcon />,
      color: "primary",
    },
    {
      title: "Software Architecture Consulting",
      desc: "Technical strategy, system design, and scalable architecture planning for complex products.",
      icon: <ArchitectureRoundedIcon />,
      color: "info",
    },
    {
      title: "MVP Development",
      desc: "Rapid MVP development helping startups validate ideas and launch production-ready products.",
      icon: <RocketLaunchRoundedIcon />,
      color: "warning",
    },
    {
      title: "Application Support & Maintenance",
      desc: "Continuous improvements, monitoring, updates, and technical support for existing applications.",
      icon: <BuildRoundedIcon />,
      color: "success",
    },
    {
      title: "Quality Assurance & Testing",
      desc: "Comprehensive testing strategies ensuring reliable, secure, and high-quality software.",
      icon: <BugReportRoundedIcon />,
      color: "warning",
    },
    {
      title: "Security & Authentication",
      desc: "Secure authentication, authorization, data protection, and application security solutions.",
      icon: <VerifiedUserRoundedIcon />,
      color: "success",
    },
    {
      title: "Third-Party Integrations",
      desc: "Connect payments, CRMs, ERPs, AI services, and external platforms with your applications.",
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