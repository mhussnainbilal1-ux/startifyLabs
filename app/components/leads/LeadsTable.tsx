"use client";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {
  ChangeEvent,
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type Lead = {
  _id: string;
  company: string;
  contact: string;
  email: string;
  country: string;
  service: string;
  status: string;
  followUp: string | null;
  notes: string;
  createdAt?: string;
  updatedAt?: string;
};

type LeadsApiResponse = {
  success: boolean;
  message?: string;
  leads?: Lead[];
  lead?: Lead;
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

const emptyLead: Lead = {
  _id: "",
  company: "",
  contact: "",
  email: "",
  country: "",
  service: "",
  status: "New",
  followUp: "",
  notes: "",
};

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [serviceFilter, setServiceFilter] = useState<string>("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Lead>(emptyLead);

  const fetchLeads = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "GET",
        cache: "no-store",
      });

      const data = (await response.json()) as LeadsApiResponse;

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load leads.");
      }

      setLeads(data.leads || []);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to load leads."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const filteredLeads = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesSearch =
        !normalizedSearch ||
        lead.company.toLowerCase().includes(normalizedSearch) ||
        lead.contact.toLowerCase().includes(normalizedSearch) ||
        lead.email.toLowerCase().includes(normalizedSearch) ||
        lead.country?.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        !statusFilter || lead.status === statusFilter;

      const matchesService =
        !serviceFilter || lead.service === serviceFilter;

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [leads, search, statusFilter, serviceFilter]);

  const startEditing = (lead: Lead): void => {
    setEditingId(lead._id);
    setError("");
    setSuccessMessage("");

    setEditForm({
      ...lead,
      followUp: formatDateForInput(lead.followUp),
    });
  };

  const cancelEditing = (): void => {
    setEditingId(null);
    setEditForm(emptyLead);
  };

  const handleEditChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    const { name, value } = event.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const saveLead = async (): Promise<void> => {
    if (!editingId) return;

    if (
      !editForm.company.trim() ||
      !editForm.contact.trim() ||
      !editForm.email.trim()
    ) {
      setError("Company, contact person and email are required.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(`/api/leads/${editingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: editForm.company,
          contact: editForm.contact,
          email: editForm.email,
          country: editForm.country,
          service: editForm.service,
          status: editForm.status,
          followUp: editForm.followUp,
          notes: editForm.notes,
        }),
      });

      const data = (await response.json()) as LeadsApiResponse;

      if (!response.ok || !data.success || !data.lead) {
        throw new Error(data.message || "Unable to update lead.");
      }

      setLeads((previousLeads) =>
        previousLeads.map((lead) =>
          lead._id === editingId ? data.lead! : lead
        )
      );

      setEditingId(null);
      setEditForm(emptyLead);
      setSuccessMessage("Lead updated successfully.");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to update lead."
      );
    } finally {
      setSaving(false);
    }
  };

  const clearFilters = (): void => {
    setSearch("");
    setStatusFilter("");
    setServiceFilter("");
  };

  const deleteLead = async (lead: Lead): Promise<void> => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${lead.company}"?`
    );
  
    if (!confirmed) return;
  
    setDeletingId(lead._id);
    setError("");
    setSuccessMessage("");
  
    try {
      const response = await fetch(`/api/leads/${lead._id}`, {
        method: "DELETE",
      });
  
      const data = (await response.json()) as LeadsApiResponse;
  
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to delete lead.");
      }
  
      setLeads((previousLeads) =>
        previousLeads.filter(
          (currentLead) => currentLead._id !== lead._id
        )
      );
  
      if (editingId === lead._id) {
        setEditingId(null);
        setEditForm(emptyLead);
      }
  
      setSuccessMessage("Lead deleted successfully.");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to delete lead."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "1500px",
        margin: "30px auto",
        padding: "24px",
        boxSizing: "border-box",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "20px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <div>
         

          <p
            style={{
              margin: "6px 0 0",
              color: "#6c7789",
              fontSize: "15px",
            }}
          >
            View, filter and update your Startify Labs leads.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchLeads}
          disabled={loading}
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
          <RefreshRoundedIcon
            style={{
              fontSize: "24px",
              animation: loading ? "spin 1s linear infinite" : "none",
            }}
          />
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(240px, 2fr) minmax(170px, 1fr) minmax(200px, 1fr) auto",
          gap: "12px",
          padding: "18px",
          marginBottom: "18px",
          backgroundColor: "#ffffff",
          border: "1px solid #e8edf3",
          borderRadius: "12px",
          boxShadow: "0 6px 22px rgba(23, 45, 81, 0.05)",
          overflowX: "auto",
        }}
      >
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search company, contact or email..."
          style={filterInputStyle}
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          style={filterInputStyle}
        >
          <option value="">All statuses</option>

          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={serviceFilter}
          onChange={(event) => setServiceFilter(event.target.value)}
          style={filterInputStyle}
        >
          <option value="">All services</option>

          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={clearFilters}
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
          Clear Filters
        </button>
      </div>

      {error && (
        <div
          style={{
            marginBottom: "16px",
            padding: "12px 16px",
            borderRadius: "9px",
            backgroundColor: "#fff1f0",
            color: "#b42318",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      {successMessage && (
        <div
          style={{
            marginBottom: "16px",
            padding: "12px 16px",
            borderRadius: "9px",
            backgroundColor: "#eaf8ef",
            color: "#16773a",
            fontSize: "14px",
          }}
        >
          {successMessage}
        </div>
      )}

      {loading ? (
        <div style={messageBoxStyle}>Loading leads...</div>
      ) : leads.length === 0 ? (
        <div style={messageBoxStyle}>No leads have been added yet.</div>
      ) : filteredLeads.length === 0 ? (
        <div style={messageBoxStyle}>
          No leads match the selected filters.
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            overflowX: "auto",
            backgroundColor: "#ffffff",
            border: "1px solid #e8edf3",
            borderRadius: "14px",
            boxShadow: "0 8px 28px rgba(23, 45, 81, 0.06)",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "1450px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  //backgroundColor: "#172d51",
                  background: "linear-gradient(135deg,#172d51 0%, #00bcd4 100%)",
                  color: "#ffffff",
                }}
              >
                <th style={tableHeaderStyle}>Company</th>
                <th style={tableHeaderStyle}>Contact</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Country</th>
                <th style={tableHeaderStyle}>Service</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Follow-up</th>
                <th style={{ ...tableHeaderStyle, minWidth: "250px" }}>
                  Notes
                </th>
                <th
                  style={{
                    ...tableHeaderStyle,
                    textAlign: "center",
                    position: "sticky",
                    right: 0,
                    backgroundColor: "#172d51",
                    zIndex: 2,
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.map((lead, index) => {
                const isEditing = editingId === lead._id;

                return (
                  <tr
                    key={lead._id}
                    style={{
                      backgroundColor:
                        index % 2 === 0 ? "#ffffff" : "#f9fafb",
                      borderBottom: "1px solid #edf1f5",
                    }}
                  >
                    <td style={tableCellStyle}>
                      {isEditing ? (
                        <input
                          name="company"
                          value={editForm.company}
                          onChange={handleEditChange}
                          style={tableInputStyle}
                        />
                      ) : (
                        <strong style={{ color: "#172d51" }}>
                          {lead.company}
                        </strong>
                      )}
                    </td>

                    <td style={tableCellStyle}>
                      {isEditing ? (
                        <input
                          name="contact"
                          value={editForm.contact}
                          onChange={handleEditChange}
                          style={tableInputStyle}
                        />
                      ) : (
                        lead.contact
                      )}
                    </td>

                    <td style={tableCellStyle}>
                      {isEditing ? (
                        <input
                          name="email"
                          type="email"
                          value={editForm.email}
                          onChange={handleEditChange}
                          style={{
                            ...tableInputStyle,
                            minWidth: "220px",
                          }}
                        />
                      ) : (
                        <a
                          href={`mailto:${lead.email}`}
                          style={{
                            color: "#009bb1",
                            textDecoration: "none",
                          }}
                        >
                          {lead.email}
                        </a>
                      )}
                    </td>

                    <td style={tableCellStyle}>
                      {isEditing ? (
                        <input
                          name="country"
                          value={editForm.country || ""}
                          onChange={handleEditChange}
                          style={tableInputStyle}
                        />
                      ) : (
                        lead.country || "—"
                      )}
                    </td>

                    <td style={tableCellStyle}>
                      {isEditing ? (
                        <select
                          name="service"
                          value={editForm.service || ""}
                          onChange={handleEditChange}
                          style={{
                            ...tableInputStyle,
                            minWidth: "210px",
                          }}
                        >
                          <option value="">Select service</option>

                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      ) : (
                        lead.service || "—"
                      )}
                    </td>

                    <td style={tableCellStyle}>
                      {isEditing ? (
                        <select
                          name="status"
                          value={editForm.status}
                          onChange={handleEditChange}
                          style={{
                            ...tableInputStyle,
                            minWidth: "140px",
                          }}
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span
                          style={{
                            ...getStatusStyle(lead.status),
                            display: "inline-block",
                            padding: "6px 10px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {lead.status}
                        </span>
                      )}
                    </td>

                    <td style={tableCellStyle}>
                      {isEditing ? (
                        <input
                          name="followUp"
                          type="date"
                          value={editForm.followUp || ""}
                          onChange={handleEditChange}
                          style={{
                            ...tableInputStyle,
                            minWidth: "160px",
                          }}
                        />
                      ) : (
                        formatDisplayDate(lead.followUp)
                      )}
                    </td>

                    <td
                      style={{
                        ...tableCellStyle,
                        minWidth: "250px",
                        maxWidth: "350px",
                      }}
                    >
                      {isEditing ? (
                        <textarea
                          name="notes"
                          value={editForm.notes || ""}
                          onChange={handleEditChange}
                          rows={3}
                          style={{
                            ...tableInputStyle,
                            minWidth: "260px",
                            resize: "vertical",
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            display: "block",
                            maxWidth: "320px",
                            whiteSpace: "normal",
                            lineHeight: 1.5,
                            color: "#475467",
                          }}
                        >
                          {lead.notes || "—"}
                        </span>
                      )}
                    </td>

                    <td
                      style={{
                        ...tableCellStyle,
                        position: "sticky",
                        right: 0,
                        backgroundColor:
                          index % 2 === 0 ? "#ffffff" : "#f9fafb",
                        boxShadow: "-6px 0 10px rgba(23,45,81,0.03)",
                        textAlign: "center",
                      }}
                    >
                      {isEditing ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "8px",
                          }}
                        >
                          <button
                            type="button"
                            onClick={saveLead}
                            disabled={saving}
                            style={{
                              ...actionButtonStyle,
                              backgroundColor: "#00a9bf",
                              color: "#ffffff",
                              opacity: saving ? 0.7 : 1,
                            }}
                          >
                            {saving ? "Saving..." : "Save"}
                          </button>

                          <button
                            type="button"
                            onClick={cancelEditing}
                            disabled={saving}
                            style={{
                              ...actionButtonStyle,
                              backgroundColor: "#ffffff",
                              color: "#475467",
                              border: "1px solid #d0d5dd",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => startEditing(lead)}
                          title="Edit Lead"
                          disabled={deletingId === lead._id}
                          style={{
                            ...actionButtonStyle,
                            backgroundColor: "#172d51",
                            color: "#ffffff",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                            opacity: deletingId === lead._id ? 0.6 : 1,
                          }}
                        >
                          <EditRoundedIcon style={{ fontSize: "20px" }} />
                        </button>
                      
                        <button
                          type="button"
                          onClick={() => deleteLead(lead)}
                          title="Delete Lead"
                          disabled={deletingId === lead._id}
                          style={{
                            ...actionButtonStyle,
                            backgroundColor: "#d92d20",
                            color: "#ffffff",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                            opacity: deletingId === lead._id ? 0.6 : 1,
                            cursor:
                              deletingId === lead._id ? "not-allowed" : "pointer",
                          }}
                        >
                          <DeleteRoundedIcon
                            style={{
                              fontSize: "20px",
                              opacity: deletingId === lead._id ? 0.5 : 1,
                            }}
                          />
                        </button>
                      </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!loading && filteredLeads.length > 0 && (
        <p
          style={{
            margin: "14px 4px 0",
            color: "#667085",
            fontSize: "13px",
          }}
        >
          Showing {filteredLeads.length} of {leads.length} leads
        </p>
      )}
    </section>
  );
}

function formatDateForInput(date?: string | null): string {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toISOString().split("T")[0];
}

function formatDisplayDate(date?: string | null): string {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getStatusStyle(status: string): CSSProperties {
  const statusStyles: Record<string, CSSProperties> = {
    New: {
      backgroundColor: "#eef4ff",
      color: "#3448a5",
    },
    Contacted: {
      backgroundColor: "#fff4e5",
      color: "#b54708",
    },
    Replied: {
      backgroundColor: "#e8f7ff",
      color: "#026aa2",
    },
    Meeting: {
      backgroundColor: "#f4ebff",
      color: "#6941c6",
    },
    Proposal: {
      backgroundColor: "#fff8db",
      color: "#8a6100",
    },
    Won: {
      backgroundColor: "#e8f8ef",
      color: "#16773a",
    },
    Lost: {
      backgroundColor: "#fff1f0",
      color: "#b42318",
    },
  };

  return (
    statusStyles[status] || {
      backgroundColor: "#f2f4f7",
      color: "#475467",
    }
  );
}

const filterInputStyle: CSSProperties = {
  width: "100%",
  minWidth: "170px",
  padding: "11px 13px",
  border: "1px solid #d9dee7",
  borderRadius: "8px",
  backgroundColor: "#ffffff",
  color: "#172d51",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const tableHeaderStyle: CSSProperties = {
  padding: "15px 14px",
  textAlign: "left",
  fontSize: "13px",
  fontWeight: 700,
  whiteSpace: "nowrap",
};

const tableCellStyle: CSSProperties = {
  padding: "14px",
  color: "#344054",
  fontSize: "14px",
  verticalAlign: "middle",
  whiteSpace: "nowrap",
};

const tableInputStyle: CSSProperties = {
  width: "100%",
  minWidth: "145px",
  padding: "9px 10px",
  border: "1px solid #b8c2d1",
  borderRadius: "7px",
  backgroundColor: "#ffffff",
  color: "#172d51",
  fontSize: "13px",
  outline: "none",
  boxSizing: "border-box",
};

const actionButtonStyle: CSSProperties = {
  padding: "8px 13px",
  border: "none",
  borderRadius: "7px",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const messageBoxStyle: CSSProperties = {
  padding: "45px",
  textAlign: "center",
  backgroundColor: "#ffffff",
  border: "1px solid #e8edf3",
  borderRadius: "14px",
  color: "#6c7789",
};