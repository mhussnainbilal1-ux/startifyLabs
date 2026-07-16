"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async (): Promise<void> => {
        setLoading(true);

        try {
            await fetch("/api/auth/logout", {
                method: "POST",
            });

            router.replace("/login");
            router.refresh();
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            title="Logout"
            style={{
                width: "48px",
                height: "48px",
                border: "none",
                borderRadius: "10px",
                background: "linear-gradient(135deg,#172d51 0%, #00bcd4 100%)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
            }}
        >
            <LogoutRoundedIcon
                style={{
                    fontSize: "24px",
                    animation: loading ? "spin 1s linear infinite" : "none",
                }}
            />
        </button>
    );
}