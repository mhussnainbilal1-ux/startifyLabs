import Image from "next/image";
import Link from "next/link";
const skills = [
  {
    name: ".NET Core",
    exp: "Enterprise-grade backend development and scalable API solutions",
    img: "/images/logos/NETCore.png",
  },
  {
    name: "Next.js",
    exp: "Modern web applications, SaaS platforms, and high-performance solutions",
    img: "/images/logos/nextjs.png",
  },
  {
    name: "React",
    exp: "Advanced frontend development with modern UI architectures",
    img: "/images/logos/react.svg",
  },
  {
    name: "React Native",
    exp: "Cross-platform mobile applications for iOS and Android",
    img: "/images/logos/reactnative.png",
  },
  {
    name: "Node.js",
    exp: "Scalable backend services, APIs, and real-time applications",
    img: "/images/logos/nodejs-icon.svg",
  },
  {
    name: "Python",
    exp: "Backend automation, integrations, and cloud-based solutions",
    img: "/images/logos/python.jpeg",
  },
  {
    name: "MongoDB",
    exp: "Flexible NoSQL database design and scalable data solutions",
    img: "/images/logos/mongodb.svg",
  },
  {
    name: "SQL Server",
    exp: "Enterprise database design, optimization, and data management",
    img: "/images/logos/SQLServer.jpeg",
  },
  {
    name: "Azure",
    exp: "Cloud deployment, infrastructure, and enterprise solutions",
    img: "/images/logos/azure.jpeg",
  },
  {
    name: "AWS",
    exp: "Cloud architecture, hosting, and scalable application deployment",
    img: "/images/logos/aws.png",
  },
  {
    name: "Bootstrap",
    exp: "Responsive web interfaces and rapid UI development",
    img: "/images/logos/bootstrap.svg",
  },
  {
    name: "MUI",
    exp: "Enterprise-ready React component systems and UI development",
    img: "/images/logos/mui.png",
  },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="row align-items-center">

          {/* Left Content */}
         {/* Left Content */}
<div className="col-lg-6 align-self-center">
  <h5 className="fs-24 text-dark fw-medium">
    About Startify Labs
  </h5>

  <h4 className="fw-normal lh-base text-gray-700 mb-4 fs-20">
  Your Trusted White-Label Software Development Partner
  </h4>

  <p className="text-muted mb-3">
  At Startify Labs, we help agencies, startups, and growing businesses across the UK, Europe, and the Middle East transform ideas into scalable digital products. As a trusted white-label development partner, we work behind the scenes to deliver high-quality software under your brand, allowing you to expand your services without increasing your in-house development team.
  </p>

  <p className="text-muted mb-3">
  We specialize in designing and developing modern web applications, SaaS platforms, enterprise systems, mobile applications, and custom software solutions that are secure, scalable, and built for long-term success. Every project is engineered using modern technologies, clean architecture, and industry best practices to ensure exceptional performance, reliability, and maintainability.
  </p>

  <p className="text-muted mb-4">
  Our collaborative, agile development process keeps projects transparent, efficient, and aligned with your business goals. Whether you need an experienced development team for a single project or a long-term technology partner, we provide the expertise and flexibility to help you deliver outstanding results with confidence.
  </p>


</div>

          {/* Right Details */}
          <div className="col-lg-5 ms-auto align-self-center">
  <div className="mb-5 mb-lg-0">

    <div className="mb-4 p-3 rounded shadow-sm bg-white border-start border-3 border-primary">
      <h6 className="text-dark fw-semibold mb-1">Who We Are</h6>
      <p className="text-muted mb-0 fs-14">
      A white-label software development company delivering production-ready digital solutions for agencies, startups, and enterprises across the UK, Europe, and the Middle East.
           </p>
    </div>

    {/* <div className="mb-4 p-3 rounded shadow-sm bg-white border-start border-3 border-success">
      <h6 className="text-dark fw-semibold mb-1">What We Do</h6>
      <p className="text-muted mb-0 fs-14">
      We build high-performance SaaS platforms, business applications, enterprise software, mobile apps, APIs, and custom web solutions that help businesses innovate, grow, and scale.
      </p>
    </div> */}

    <div className="mb-4 p-3 rounded shadow-sm bg-white border-start border-3 border-info">
      <h6 className="text-dark fw-semibold mb-1">How We Work</h6>
      <p className="text-muted mb-0 fs-14">
      Our experienced developers work as an extension of your team, following agile methodologies, transparent communication, and efficient delivery processes to ensure every project meets the highest quality standards.      </p>
    </div>

    <div className="p-3 rounded shadow-sm bg-white border-start border-3 border-warning">
      <h6 className="text-dark fw-semibold mb-1">Why Choose Us</h6>
      
      <p className="text-muted mb-0 fs-14">
      STARTIFY LABS LIMITED is a UK registered software development company providing white-label development services to agencies, startups, and businesses across the UK, Europe, and the Middle East.
      </p><br/>
      <p className="text-muted mb-0 fs-14">
        Fast execution, NDA-based white-label work, and enterprise-level quality without agency overhead.
      </p>
      {CompanyInfo()}
    </div>

  </div>
</div>

          {/* Skills Section (UNCHANGED) */}
          <div className="col-12 mt-5">
            <div className="d-flex flex-wrap justify-content-center mt-4 mt-md-5">
            {/* <div className="row"> */}
  {skills.map((skill, index) => (
    <div key={index} className="col-12 col-lg-2 mb-3">
      <div className="card-bg rounded p-3 shadow-sm h-100">
        <div className="d-flex flex-column align-items-center text-center">
          <div className="thumb-md d-flex justify-content-center align-items-center mb-2">
            <Image
              src={skill.img}
              alt={skill.name}
              width={34}
              height={34}
            />
          </div>

          <h6 className="mb-1 fw-medium text-gray-700">
            {skill.name}
          </h6>

          <p className="text-muted mb-0 fs-12">
            {skill.exp}
          </p>
        </div>
      </div>
    </div>
  ))}
{/* </div> */}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

const companyInfo = {
  
  registration: "Company Registration Number: XXXXXXXX",
  location: "Registered in England and Wales.",
};

 function CompanyInfo() {
  return (
    <div className="company-info">
<br/>
      <ul className="list-unstyled mb-0">
        <li className="mb-2">
        <p className="text-muted mb-0 fs-14">
        Company Number:{" "}
          17322309
        </p>
        </li>
        <li>
        <p className="text-muted mb-0 fs-14">
          Registered Office:{" "}
          England and Wales
          </p>
        </li>
      </ul>
    </div>
  );
}