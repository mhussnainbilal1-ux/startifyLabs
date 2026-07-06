import Image from "next/image";
import Link from "next/link";
const skills = [
    { name: ".NET Core", exp: "10+ Years Enterprise Backend Experience", img: "/images/logos/NETCore.png" },
    { name: "Next.js", exp: "10+ Years Modern SaaS Development", img: "/images/logos/nextjs.png" },
    { name: "React", exp: "10+ Years Frontend Engineering Experience", img: "/images/logos/react.svg" },
    { name: "React Native", exp: "10+ Years Cross-Platform Mobile Apps", img: "/images/logos/reactnative.png" },
    { name: "Node.js", exp: "10+ Years Scalable Backend Systems", img: "/images/logos/nodejs-icon.svg" },
    { name: "Python", exp: "10+ Years Scalable Cloud Infrastructure", img: "/images/logos/python.jpeg" },

    { name: "MongoDB", exp: "10+ Years NoSQL Data Architecture", img: "/images/logos/mongodb.svg" },
    { name: "SQL Server", exp: "10+ Years Database Design & Optimization", img: "/images/logos/SQLServer.jpeg" },
    { name: "Azure", exp: "10+ Years Cloud Architecture & Deployment", img: "/images/logos/azure.jpeg" },
    { name: "AWS", exp: "10+ Years Scalable Cloud Infrastructure", img: "/images/logos/aws.png" },
  
    { name: "Bootstrap", exp: "10+ Years Responsive UI Development", img: "/images/logos/bootstrap.svg" },
    { name: "MUI", exp: "10+ Years Enterprise UI Systems", img: "/images/logos/mui.png" },
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
    <mark>About Our Company</mark>
  </h5>

  <h4 className="fw-normal lh-base text-gray-700 mb-4 fs-20">
    We are a white-label software development company focused on building
    scalable, high-performance digital products for agencies, startups, and
    enterprise-level businesses worldwide.
  </h4>

  <p className="text-muted mb-3">
    Our core strength lies in delivering end-to-end software engineering
    solutions that combine modern UI/UX, robust backend architecture, and
    cloud-ready infrastructure. We operate as a silent technical partner
    for agencies that need reliable development execution under their own brand.
  </p>

  <p className="text-muted mb-3">
    From SaaS platforms and admin dashboards to mobile applications and
    enterprise systems, we build products that are designed for scale,
    performance, and long-term maintainability. Every project follows
    industry best practices including modular architecture, secure coding
    standards, and optimized deployment pipelines.
  </p>

  <p className="text-muted mb-4">
    Our development process is structured around agile collaboration,
    transparent communication, and fast iteration cycles — ensuring that
    clients can launch faster without compromising on quality or stability.
  </p>

  <div className="social">
    <Link href="#"><i className="lab la-github github me-1"></i></Link>
    <Link href="#"><i className="lab la-twitter twitter me-1"></i></Link>
    <Link href="#"><i className="lab la-google google me-1"></i></Link>
    <Link href="#"><i className="lab la-linkedin-in linkedin me-1"></i></Link>
  </div>
</div>

          {/* Right Details */}
          <div className="col-lg-5 ms-auto align-self-center">
  <div className="mb-5 mb-lg-0">

    <div className="mb-4 p-3 rounded shadow-sm bg-white border-start border-3 border-primary">
      <h6 className="text-dark fw-semibold mb-1">Who We Are</h6>
      <p className="text-muted mb-0 fs-14">
        A white-label software engineering team delivering production-grade digital products for global clients.
      </p>
    </div>

    <div className="mb-4 p-3 rounded shadow-sm bg-white border-start border-3 border-success">
      <h6 className="text-dark fw-semibold mb-1">What We Do</h6>
      <p className="text-muted mb-0 fs-14">
        We build SaaS platforms, dashboards, mobile apps, and enterprise systems that agencies can rebrand and resell.
      </p>
    </div>

    <div className="mb-4 p-3 rounded shadow-sm bg-white border-start border-3 border-info">
      <h6 className="text-dark fw-semibold mb-1">How We Work</h6>
      <p className="text-muted mb-0 fs-14">
        Dedicated teams, agile delivery, clean architecture, and long-term scalable development partnerships.
      </p>
    </div>

    <div className="p-3 rounded shadow-sm bg-white border-start border-3 border-warning">
      <h6 className="text-dark fw-semibold mb-1">Why Choose Us</h6>
      <p className="text-muted mb-0 fs-14">
        Fast execution, NDA-based white-label work, and enterprise-level quality without agency overhead.
      </p>
    </div>

  </div>
</div>

          {/* Skills Section (UNCHANGED) */}
          <div className="col-12 mt-5">
            <div className="d-flex flex-wrap justify-content-center mt-4 mt-md-5">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="mx-3 mb-3 card-bg rounded p-1 pe-3 p-md-3 pe-md-4 shadow-sm"
                >
                  <div className="d-flex align-items-center">
                    <div className="thumb-md d-flex justify-content-center align-items-center">
                      <Image
                        src={skill.img}
                        alt={skill.name}
                        width={34}
                        height={34}
                      />
                    </div>

                    <div className="ms-3">
                      <h6 className="mb-0 fw-medium text-gray-700">
                        {skill.name}
                      </h6>
                      <p className="text-muted mb-0 fs-12">
                        {skill.exp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}