import Image from "next/image";
import Link from "next/link";
import { Logo } from "./Logo";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Left */}
          <div className="col-lg-5 border-e-dashed">
            {/* <Logo color="white"/> */}

            <p className="my-4">
            Startify Labs is a UK-registered software development company helping startups, agencies, and growing businesses build scalable digital products. From custom web applications and SaaS platforms to mobile apps and AI-powered solutions, we deliver reliable, high-quality software with a focus on innovation, transparency, and long-term partnerships.
            </p>

          
          </div>

          {/* Right */}
          <div className="col-lg-6 offset-lg-1">
            <div className="row">
              <div className="col-md-4">
                <h6 className="text-footer mb-4 mt-sm-0 mt-5">Company</h6>

                <ul className="list-unstyled footer-list">
                  <li>
                    <Link href="#home">Home</Link>
                  </li>
                  <li>
                    <Link href="#about">About</Link>
                  </li>
                  <li>
                    <Link href="#services">Services</Link>
                  </li>
                </ul>
              </div>

              <div className="col-md-4">
                <h6 className="text-footer mb-4 mt-sm-0 mt-4">
                  Information
                </h6>

                <ul className="list-unstyled footer-list">

                  <li>
                    <Link href="#projects">Projects</Link>
                  </li>
                </ul>
              </div>

              <div className="col-md-4">
                <h6 className="text-footer mb-4 mt-sm-0 mt-4">
                  More Info
                </h6>

                <ul className="list-unstyled footer-list">
                  <li>
                    <Link href="#contact">Contact</Link>
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>
          {/* End Right */}
        </div>
      </div>
    </footer>
  );
}