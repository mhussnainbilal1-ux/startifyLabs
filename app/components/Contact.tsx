"use client";

import Image from "next/image";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    number: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation (replace with backend/API later)
    if (!form.name || !form.email) {
      alert("Please fill required fields");
      return;
    }

    console.log("Form Data:", form);
    alert("Message sent successfully!");
  };

  return (
    <section className="section bg-light" id="contact">
      <div className="container">
        <div className="row">

          <div className="col-12">
            <div
              className="card bg-white"
              style={{
                backgroundImage: "url(/images/personal/testi-pet.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "15%",
                backgroundPosition: "right bottom",
              }}
            >
              <div className="card-body">
                <div className="row">

                  {/* Left Form */}
                  <div className="col-md-8">
                    <h2 className="fs-2 fw-normal lh-1 text-dark mb-3">
                      Get in touch !
                    </h2>

                    <p className="text-gray-700 fs-18 fs-lg mb-4 mb-md-5">
                      Always available for freelancing if the right project comes along,
                      Feel free to contact me.
                    </p>

                    <form onSubmit={handleSubmit}>
                      <div className="row">

                        <div className="col-md-6 mb-3">
                          <label className="fw-medium form-label fs-16">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Your name"
                            value={form.name}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="fw-medium form-label fs-16">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Your email"
                            value={form.email}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="fw-medium form-label fs-16">
                            Subject
                          </label>
                          <input
                            type="text"
                            id="subject"
                            className="form-control"
                            placeholder="Your subject"
                            value={form.subject}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="fw-medium form-label fs-16">
                            Contact
                          </label>
                          <input
                            type="text"
                            id="number"
                            className="form-control"
                            placeholder="+00 1234 5678 90"
                            value={form.number}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-12 mb-3">
                          <label className="fw-medium form-label fs-16">
                            Message
                          </label>
                          <textarea
                            id="message"
                            rows={5}
                            className="form-control"
                            placeholder="Enter your message..."
                            value={form.message}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="col-12">
                          <button type="submit" className="btn btn-primary mt-2">
                            Send message
                          </button>
                        </div>

                      </div>
                    </form>
                  </div>

                  {/* Right Info */}
                  <div className="col-md-4 text-center">

                    <Image
                      src="/images/personal/contact.svg"
                      alt="contact"
                      width={200}
                      height={200}
                      className="mx-auto d-block mb-5"
                    />

                    {/* Phone */}
                    <div className="d-flex align-items-center">
                      <div className="bg-light d-flex justify-content-center align-items-center thumb-lg rounded">
                        <i className="ti ti-phone fs-22"></i>
                      </div>

                      <div className="ms-3 text-start">
                        <span className="d-block lh-1">+1 234 567 89</span>
                        <span className="text-muted fs-14">
                          9:00am to 7:00pm
                        </span>
                      </div>
                    </div>

                    <hr className="hr-dashed my-3" />

                    {/* Email */}
                    <div className="d-flex align-items-center">
                      <div className="bg-light d-flex justify-content-center align-items-center thumb-lg rounded">
                        <i className="ti ti-mail fs-22"></i>
                      </div>

                      <div className="ms-3 text-start">
                        <span className="d-block lh-1">
                          example@example.com
                        </span>
                        <span className="text-muted fs-14">
                          Monday to Saturday
                        </span>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}