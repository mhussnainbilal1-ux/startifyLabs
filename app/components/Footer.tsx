import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Left */}
          <div className="col-lg-5 border-e-dashed">
            {/* <Link href="/">
              <Image
                src="/images/logo-sm.png"
                alt="Logo"
                width={18}
                height={18}
              />
              <Image
                src="/images/logo-light.png"
                alt="Logo"
                width={80}
                height={16}
                className="ms-2"
              />
            </Link> */}

            <p className="my-4">
              In an ideal world this text wouldn&apos;t exist, a client would
              acknowledge the importance of having web copy before the design
              starts.
            </p>

            <ul className="list-unstyled footer-social mb-0 mt-sm-0 mt-3">
              <li className="list-inline-item">
                <Link href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-facebook icon-xs"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Link>
              </li>

              <li className="list-inline-item">
                <Link href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-twitter icon-xs"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </Link>
              </li>

              <li className="list-inline-item">
                <Link href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-github icon-xs"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </Link>
              </li>

              <li className="list-inline-item">
                <Link href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-instagram icon-xs"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </Link>
              </li>
            </ul>
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
                    <Link href="#resume">Resume</Link>
                  </li>
                  <li>
                    <Link href="#review">Client Say</Link>
                  </li>
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
                    <Link href="#blogs">Blogs</Link>
                  </li>
                  <li>
                    <Link href="#contact">Contact</Link>
                  </li>
                  <li>
                    <Link href="#">Terms &amp; Conditions</Link>
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