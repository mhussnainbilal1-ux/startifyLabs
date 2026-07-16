"use client";

import { useState } from "react";
import LeadForm from "./leadForm";
import LeadsTable from "./LeadsTable";
import LogoutButton from "../auth/LogoutButton";

function CollapseCard({ title, children, defaultOpen = false }:any) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        marginBottom: "20px",
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: "pointer",
          padding: "16px 20px",
          background: "linear-gradient(135deg,#172d51 0%, #00bcd4 100%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 600,
          fontSize: "18px",
          color: "White",
          userSelect: "none",
        }}
      >
        <span>{title}</span>
        <span
          style={{
            fontSize: "22px",
            transition: "0.3s",
          }}
        >
          {open ? "−" : "+"}
        </span>
      </div>

      <div
        style={{
          maxHeight: open ? "3000px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <div style={{ padding: "20px" }}>{children}</div>
      </div>
    </div>
  );
}

export default function LeadCollapseCard() {
  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "30px auto 200px",
       // padding: "20px 20px",
        marginTop:"100px",
       // border: "2px solid",
     //   borderImage: "linear-gradient(135deg,#172d51 0%, #00bcd4 100%) 1",
      }}
    >
          <div style={{ marginBottom: "12px", display: "flex", justifyContent: "end" }}>
              <LogoutButton />
          </div>
      <CollapseCard title="Add New Lead">
        <LeadForm />
      </CollapseCard>

      <CollapseCard title="Leads List">
        <LeadsTable />
      </CollapseCard>
    </div>
  );
}


