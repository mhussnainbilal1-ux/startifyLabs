"use client";

import Image from "next/image";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    number: "",
    message: "",
  });

  const [errorField, setErrorField] = useState(
    {
      nameError: "",
      emailError: "",
      subjectError: "",
      numberError: "",
      messageError: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setErrorField({
      nameError: "",
      emailError: "",
      subjectError: "",
      numberError: "",
      messageError: "",
    })

    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^\+?\d+$/;
    const MAX_MESSAGE_LENGTH = 1000;

    e.preventDefault();

    if (!form.name) {
      setErrorField({
        nameError: "Name is Required",
        emailError: "",
        subjectError: "",
        numberError: "",
        messageError: "",
      });
      return;
    }
    else if (!form.email) {
      setErrorField({
        nameError: "",
        emailError: "Email is Required",
        subjectError: "",
        numberError: "",
        messageError: "",
      });
      return;
    }
    else if (!emailRegex.test(form.email.trim())) {
      setErrorField({
        nameError: "",
        emailError: "Please enter a valid email address",
        subjectError: "",
        numberError: "",
        messageError: "",
      })
      return;
    }
    else if (!form.number) {
      setErrorField({
        nameError: "",
        emailError: "",
        subjectError: "",
        numberError: "Contact Number is Required",
        messageError: "",
      });
      return;
    }
    else if (!numberRegex.test(form.number.trim())) {
      setErrorField({
        nameError: "",
        emailError: "",
        subjectError: "",
        numberError: "Contact Number must contain only numbers",
        messageError: "",
      });
      return;
    }
    else if (!form.message) {
      setErrorField({
        nameError: "",
        emailError: "",
        subjectError: "",
        numberError: "",
        messageError: "Message is Required",
      });
      return;
    }
    else if (form.message.trim().length > MAX_MESSAGE_LENGTH) {
      setErrorField({
        nameError: "",
        emailError: "",
        subjectError: "",
        numberError: "",
        messageError: `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`,
      });
      return;
    }
    else {
      sendEmail();
    }
  };


  const sendEmail = async () => {
    const templateParams = {
      name: form.name,
      email: form.email,
      subject: form.subject,
      number: form.number,
      message: form.message,
    };

    try {
      setLoading(true);
      const response = await emailjs.send(
        "service_eksnaep",//"YOUR_SERVICE_ID",
        "template_xcrq5ao",//"YOUR_TEMPLATE_ID",
        templateParams,
        "noA_5j5NgHMHegU-0",//"YOUR_PUBLIC_KEY"
      );

      console.log("SUCCESS!", response);

      toast.success("Your message has been sent successfully.");

      setForm({
        name: "",
        email: "",
        subject: "",
        number: "",
        message: "",
      });
      setLoading(false);
    } catch (error) {
      console.error("FAILED...", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section className="section bg-light" id="contact">
      <div className="container">
        <div className="row">

          <div className="col-12">
            <div
              className="card bg-white"
              style={{
                // backgroundImage: "url(/images/personal/contact_us.png)",
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
                      Looking for a reliable technology partner?
                      Feel free to contact us.
                    </p>

                    <form onSubmit={handleSubmit}>
                      <div className="row">

                        <div className="col-md-6 mb-3">
                          <label className="fw-medium form-label fs-16">
                            Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Your name"
                            value={form.name}
                            onChange={handleChange}
                          />
                          {
                            errorField.nameError != "" &&
                            <span
                              style={{
                                color: "#dc2626",
                                fontSize: "10px",
                                marginTop: "4px",
                                display: "block",
                                fontWeight: 500,
                              }}
                            >
                              {errorField.nameError}
                            </span>
                          }
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="fw-medium form-label fs-16">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Your email"
                            value={form.email}
                            onChange={handleChange}
                          />
                          {
                            errorField.emailError != "" &&
                            <span
                              style={{
                                color: "#dc2626",
                                fontSize: "10px",
                                marginTop: "4px",
                                display: "block",
                                fontWeight: 500,
                              }}
                            >
                              {errorField.emailError}
                            </span>
                          }
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
                            Contact *
                          </label>
                          <input
                            type="text"
                            id="number"
                            className="form-control"
                            placeholder="+00 1234 5678 90"
                            value={form.number}
                            onChange={handleChange}
                          />
                          {
                            errorField.numberError != "" &&
                            <span
                              style={{
                                color: "#dc2626",
                                fontSize: "10px",
                                marginTop: "4px",
                                display: "block",
                                fontWeight: 500,
                              }}
                            >
                              {errorField.numberError}
                            </span>
                          }
                        </div>

                        <div className="col-12 mb-3">
                          <label className="fw-medium form-label fs-16">
                            Message *
                          </label>
                          <textarea
                            id="message"
                            rows={5}
                            className="form-control"
                            placeholder="Enter your message..."
                            value={form.message}
                            onChange={handleChange}
                          />
                          {
                            errorField.messageError != "" &&
                            <span
                              style={{
                                color: "#dc2626",
                                fontSize: "10px",
                                marginTop: "4px",
                                display: "block",
                                fontWeight: 500,
                              }}
                            >
                              {errorField.messageError}
                            </span>
                          }
                        </div>

                        {/* <div className="col-12">
                          <button type="submit" className="btn btn-primary mt-2">
                            Send message
                          </button>
                        </div> */}

                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-primary mt-2"
                            disabled={loading}
                            style={{
                              minWidth: "170px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "10px",
                            }}
                          >
                            {loading && (
                              <span
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  border: "2px solid rgba(255,255,255,0.4)",
                                  borderTop: "2px solid #fff",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                  animation: "spin 0.8s linear infinite",
                                }}
                              />
                            )}

                            {loading ? "Sending..." : "Send Message"}
                          </button>

                          <style jsx>{`
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `}</style>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Right Info */}
                  <div className="col-md-4 text-center">

                    <Image
                      src="/images/personal/contact.png"
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