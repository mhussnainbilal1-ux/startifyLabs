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

type LeadForm = {
  company: string;
  contact: string;
  email: string;
  country: string;
  service: string;
  status: string;
  followUp: string;
  notes: string;
};

const initialForm: LeadForm = {
  company: "",
  contact: "",
  email: "",
  country: "",
  service: "",
  status: "New",
  followUp: "",
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
];

export default function LeadForm() {
    
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
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
  
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
  
      const data = (await response.json()) as ApiResponse;
  
      if (!response.ok) {
        throw new Error(data.message || "Unable to add lead.");
      }
  
      setMessage(data.message);
      setForm(initialForm);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to add the lead.";
  
      setMessage(errorMessage);
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
  };

  const labelStyle: CSSProperties = {
    display: "block",
    marginBottom: "7px",
    color: "#172d51",
    fontSize: "14px",
    fontWeight: 600,
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
          backgroundColor: "#fff",
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
          
          <p
            style={{
              marginTop: "8px",
              color: "#6c7789",
              fontSize: "15px",
            }}
          >
            Add a potential Startify Labs client.
          </p>
        </div>
  
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
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
                required
              />
            </div>
  
            <div>
              <label htmlFor="contact" style={labelStyle}>
                Contact Person *
              </label>
  
              <input
                id="contact"
                name="contact"
                type="text"
                value={form.contact}
                onChange={handleChange}
                placeholder="John Smith"
                style={inputStyle}
                required
              />
            </div>
  
            <div>
              <label htmlFor="email" style={labelStyle}>
                Email *
              </label>
  
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@company.com"
                style={inputStyle}
                required
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
              />
            </div>
  
            <div>
              <label htmlFor="service" style={labelStyle}>
                Service
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
                  <option key={status}>{status}</option>
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
  
            <div
              style={{
                gridColumn: "1 / -1",
              }}
            >
              <label htmlFor="notes" style={labelStyle}>
                Notes
              </label>
  
              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Write notes about this lead..."
                rows={4}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "120px",
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
                backgroundColor: message.includes("success")
                  ? "#e8f8ef"
                  : "#fff3f2",
                color: message.includes("success")
                  ? "#0f8a42"
                  : "#d92d20",
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
                  "linear-gradient(135deg,#172d51 0%, #00bcd4 100%)",
                color: "#fff",
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