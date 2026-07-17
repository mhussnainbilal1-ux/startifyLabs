import { Suspense } from "react";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginLoading() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f6f8",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div
        style={{
          color: "#172d51",
          fontSize: "16px",
          fontWeight: 600,
        }}
      >
        Loading login...
      </div>
    </main>
  );
}