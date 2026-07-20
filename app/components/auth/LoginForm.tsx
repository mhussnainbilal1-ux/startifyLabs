"use client";

import {
  ChangeEvent,
  CSSProperties,
  FormEvent,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

type LoginFormState = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  message?: string;
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as LoginResponse;

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to log in.");
      }

      const redirectPath = searchParams.get("redirect");

      const safeRedirect =
        redirectPath && redirectPath.startsWith("/leads")
          ? redirectPath
          : "/leads";

      router.replace(safeRedirect);
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to log in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f6f8",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          padding: "36px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 12px 40px rgba(23, 45, 81, 0.1)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            marginBottom: "28px",
          }}
        >
          <h1
            style={{
              margin: "0 0 8px",
              color: "#172d51",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            CRM Login
          </h1>

          <p
            style={{
              margin: 0,
              color: "#667085",
              fontSize: "15px",
            }}
          >
            Sign in to manage Startify Labs leads.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              marginBottom: "18px",
            }}
          >
            <label htmlFor="email" style={labelStyle}>
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              required
              style={inputStyle}
            />
          </div>

          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              style={inputStyle}
            />
          </div>

          {error && (
            <div
              style={{
                marginBottom: "18px",
                padding: "11px 13px",
                borderRadius: "8px",
                backgroundColor: "#fff1f0",
                color: "#b42318",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px 20px",
              border: "none",
              borderRadius: "9px",
              background: loading
                ? "#98a2b3"
                : "linear-gradient(135deg, #172d51, #00bcd4)",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}

const labelStyle: CSSProperties = {
  display: "block",
  marginBottom: "7px",
  color: "#172d51",
  fontSize: "14px",
  fontWeight: 600,
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid #d0d5dd",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  color: "#172d51",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};