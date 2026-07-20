"use client";

import {
  ChangeEvent,
  CSSProperties,
  FormEvent,
  useState,
} from "react";

type ApiResponse = {
  success: boolean;
  message: string;
};

type LeadFormData = {
  company: string;
  contact: string;
  email: string;
  website: string;
  linkedin: string;
  country: string;
  industry: string;
  employees: string;
  service: string;
  status: string;
  priority: string;
  outsourceScore: string;
  projectSize: string;
  source: string;
  techStack: string;
  followUp: string;
  lastContacted: string;
  notes: string;
};

const initialForm: LeadFormData = {
  company: "",
  contact: "",
  email: "",
  website: "",
  linkedin: "",
  country: "United Kingdom",
  industry: "",
  employees: "11-50",
  service: "",
  status: "New",
  priority: "B",
  outsourceScore: "5",
  projectSize: "£5k - £20k",
  source: "",
  techStack: "",
  followUp: "",
  lastContacted: "",
  notes: "",
};

const services = [
  "Web Development",
  "SaaS Development",
  "Mobile App Development",
  "Custom Software",
  "API Integration",
  "Dedicated Development Team",
  "Maintenance & Support",
  "Other",
];

const statuses = [
  "New",
  "Researching",
  "Contacted",
  "Follow Up 1",
  "No-Reply F-1",
  "Follow Up 2",
  "No-Reply F-2",
  "Replied",
  "Meeting",
  "Proposal",
  "Won",
  "Lost",
  "Do Not Contact",
];

const priorities = ["A", "B", "C"];

const employeeRanges = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "500+",
];

const projectSizes = [
  "< £5k",
  "£5k - £20k",
  "£20k - £100k",
  "£100k+",
];

const industries = [
  "SaaS",
  "FinTech",
  "HealthTech",
  "Logistics",
  "E-commerce",
  "Artificial Intelligence",
  "Property Technology",
  "Education",
  "Digital Agency",
  "Marketing Agency",
  "Enterprise Software",
  "Cybersecurity",
  "ClimateTech",
  "Recruitment",
  "Other",
];

const sources = [
  "LinkedIn",
  "Company Website",
  "Google",
  "Sifted",
  "Crunchbase",
  "Wellfound",
  "Clutch",
  "Referral",
  "Cold Research",
  "Other",
];

export default function LeadForm() {
  const [form, setForm] = useState<LeadFormData>(initialForm);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const payload = {
        ...form,

        outsourceScore: Number(form.outsourceScore),

        followUp: form.followUp || null,

        lastContacted: form.lastContacted || null,

        website: form.website.trim(),
        linkedin: form.linkedin.trim(),
        email: form.email.trim(),
        contact: form.contact.trim(),
        techStack: form.techStack.trim(),
        notes: form.notes.trim(),
      };
console.log("payload", payload)
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as ApiResponse;

      if (!response.ok) {
        throw new Error(data.message || "Unable to add lead.");
      }

      setMessage(data.message || "Lead saved successfully.");
      setIsSuccess(true);
      setForm(initialForm);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to add the lead.";

      setMessage(errorMessage);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid #d9dee7",
    borderRadius: "8px",
    fontSize: "15px",
    color: "#172d51",
    backgroundColor: "#ffffff",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  const labelStyle: CSSProperties = {
    display: "block",
    marginBottom: "7px",
    color: "#172d51",
    fontSize: "14px",
    fontWeight: 600,
  };

  const fullWidthStyle: CSSProperties = {
    gridColumn: "1 / -1",
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "30px",
        backgroundColor: "#f5f6f8",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          margin: "30px auto",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "35px",
          boxShadow: "0 10px 35px rgba(23,45,81,.08)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            marginBottom: "30px",
            borderBottom: "1px solid #edf1f5",
            paddingBottom: "20px",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#172d51",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            Add New Lead
          </h1>

          <p
            style={{
              marginTop: "8px",
              marginBottom: 0,
              color: "#6c7789",
              fontSize: "15px",
            }}
          >
            Add and qualify a potential Startify Labs client.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "22px",
            }}
          >
            <div>
              <label htmlFor="company" style={labelStyle}>
                Company *
              </label>

              <input
                id="company"
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
                placeholder="Company name"
                style={inputStyle}
                maxLength={150}
                required
              />
            </div>

            <div>
              <label htmlFor="contact" style={labelStyle}>
                Contact Person
              </label>

              <input
                id="contact"
                name="contact"
                type="text"
                value={form.contact}
                onChange={handleChange}
                placeholder="John Smith"
                style={inputStyle}
                maxLength={100}
              />
            </div>

            <div>
              <label htmlFor="email" style={labelStyle}>
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@company.com"
                style={inputStyle}
                maxLength={150}
              />
            </div>

            <div>
              <label htmlFor="website" style={labelStyle}>
                Website
              </label>

              <input
                id="website"
                name="website"
                type="url"
                value={form.website}
                onChange={handleChange}
                placeholder="https://company.com"
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="linkedin" style={labelStyle}>
                LinkedIn
              </label>

              <input
                id="linkedin"
                name="linkedin"
                type="url"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/company/..."
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="country" style={labelStyle}>
                Country
              </label>

              <input
                id="country"
                name="country"
                type="text"
                value={form.country}
                onChange={handleChange}
                placeholder="United Kingdom"
                style={inputStyle}
                maxLength={100}
              />
            </div>

            <div>
              <label htmlFor="industry" style={labelStyle}>
                Industry
              </label>

              <select
                id="industry"
                name="industry"
                value={form.industry}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Select Industry</option>

                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="employees" style={labelStyle}>
                Employee Range
              </label>

              <select
                id="employees"
                name="employees"
                value={form.employees}
                onChange={handleChange}
                style={inputStyle}
              >
                {employeeRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="service" style={labelStyle}>
                Suggested Service
              </label>

              <select
                id="service"
                name="service"
                value={form.service}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Select Service</option>

                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="status" style={labelStyle}>
                Status
              </label>

              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                style={inputStyle}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="priority" style={labelStyle}>
                Priority
              </label>

              <select
                id="priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                style={inputStyle}
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    Priority {priority}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="outsourceScore" style={labelStyle}>
                Outsource Score
              </label>

              <select
                id="outsourceScore"
                name="outsourceScore"
                value={form.outsourceScore}
                onChange={handleChange}
                style={inputStyle}
              >
                {Array.from({ length: 10 }, (_, index) => {
                  const score = index + 1;

                  return (
                    <option key={score} value={score}>
                      {score} / 10
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label htmlFor="projectSize" style={labelStyle}>
                Estimated Project Size
              </label>

              <select
                id="projectSize"
                name="projectSize"
                value={form.projectSize}
                onChange={handleChange}
                style={inputStyle}
              >
                {projectSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="source" style={labelStyle}>
                Lead Source
              </label>

              <select
                id="source"
                name="source"
                value={form.source}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Select Source</option>

                {sources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="followUp" style={labelStyle}>
                Follow-up Date
              </label>

              <input
                id="followUp"
                name="followUp"
                type="date"
                value={form.followUp}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="lastContacted" style={labelStyle}>
                Last Contacted
              </label>

              <input
                id="lastContacted"
                name="lastContacted"
                type="date"
                value={form.lastContacted}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={fullWidthStyle}>
              <label htmlFor="techStack" style={labelStyle}>
                Technology Stack
              </label>

              <input
                id="techStack"
                name="techStack"
                type="text"
                value={form.techStack}
                onChange={handleChange}
                placeholder="React, Next.js, Node.js, AWS"
                style={inputStyle}
                maxLength={500}
              />
            </div>

            <div style={fullWidthStyle}>
              <label htmlFor="notes" style={labelStyle}>
                Notes
              </label>

              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Why is this company a good prospect? Add funding, hiring or product signals..."
                rows={5}
                maxLength={5000}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "130px",
                }}
              />
            </div>
          </div>

          {message && (
            <div
              style={{
                marginTop: "20px",
                padding: "12px 16px",
                borderRadius: "8px",
                backgroundColor: isSuccess
                  ? "#e8f8ef"
                  : "#fff3f2",
                color: isSuccess ? "#0f8a42" : "#d92d20",
                border: `1px solid ${
                  isSuccess ? "#b7ebc6" : "#ffd1cc"
                }`,
              }}
            >
              {message}
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "30px",
              borderTop: "1px solid #edf1f5",
              paddingTop: "25px",
            }}
          >
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "13px 30px",
                minWidth: "170px",
                border: "none",
                borderRadius: "10px",
                background:
                  "linear-gradient(135deg, #172d51 0%, #00bcd4 100%)",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "15px",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Saving..." : "Save Lead"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}