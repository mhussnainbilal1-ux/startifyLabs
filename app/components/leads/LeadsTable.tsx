"use client";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
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

  website: string;
  linkedin: string;

  country: string;
  industry: string;
  employees: string;

  service: string;
  status: string;
  priority: string;

  outsourceScore: number;
  projectSize: string;

  source: string;
  techStack: string;

  followUp: string | null;
  lastContacted: string | null;

  notes: string;

  createdAt?: string;
  updatedAt?: string;
};

type EditLeadForm = Omit<
  Lead,
  "outsourceScore" | "followUp" | "lastContacted"
> & {
  outsourceScore: string;
  followUp: string;
  lastContacted: string;
};

type Pagination = {
  page: number;
  limit: number;
  totalLeads: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type LeadsApiResponse = {
  success: boolean;
  message?: string;
  leads?: Lead[];
  lead?: Lead;
  pagination?: Pagination;
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

const leadSources = [
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

const emptyLead: EditLeadForm = {
  _id: "",

  company: "",
  contact: "",
  email: "",

  website: "",
  linkedin: "",

  country: "",
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

export default function LeadsTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const [pagination, setPagination] =
    useState<Pagination>({
      page: 1,
      limit: 20,
      totalLeads: 0,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });

  const [leads, setLeads] = useState<Lead[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] =
    useState<string>("");

  const [search, setSearch] = useState<string>("");

  const [statusFilter, setStatusFilter] =
    useState<string>("");

  const [serviceFilter, setServiceFilter] =
    useState<string>("");

  const [priorityFilter, setPriorityFilter] =
    useState<string>("");

  const [industryFilter, setIndustryFilter] =
    useState<string>("");

  const [employeeFilter, setEmployeeFilter] =
    useState<string>("");

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [editForm, setEditForm] =
    useState<EditLeadForm>(emptyLead);

  const fetchLeads = useCallback(
    async (): Promise<void> => {
      setLoading(true);
      setError("");
      setSuccessMessage("");

      try {
        const response = await fetch(
          `/api/leads?page=${page}&limit=${limit}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data =
          (await response.json()) as LeadsApiResponse;

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Unable to load leads."
          );
        }

        setLeads(data.leads || []);

        if (data.pagination) {
          setPagination(data.pagination);
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load leads."
        );
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  useEffect(() => {
    void fetchLeads();
  }, [fetchLeads]);

  const filteredLeads = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return leads.filter((lead) => {
      const searchableValues = [
        lead.company,
        lead.contact,
        lead.email,
        lead.website,
        lead.linkedin,
        lead.country,
        lead.industry,
        lead.employees,
        lead.service,
        lead.status,
        lead.priority,
        lead.projectSize,
        lead.source,
        lead.techStack,
        lead.notes,
      ];

      const matchesSearch =
        !normalizedSearch ||
        searchableValues.some((value) =>
          (value || "")
            .toLowerCase()
            .includes(normalizedSearch)
        );

      const matchesStatus =
        !statusFilter ||
        lead.status === statusFilter;

      const matchesService =
        !serviceFilter ||
        lead.service === serviceFilter;

      const matchesPriority =
        !priorityFilter ||
        lead.priority === priorityFilter;

      const matchesIndustry =
        !industryFilter ||
        lead.industry === industryFilter;

      const matchesEmployees =
        !employeeFilter ||
        lead.employees === employeeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesService &&
        matchesPriority &&
        matchesIndustry &&
        matchesEmployees
      );
    });
  }, [
    leads,
    search,
    statusFilter,
    serviceFilter,
    priorityFilter,
    industryFilter,
    employeeFilter,
  ]);

  const startEditing = (lead: Lead): void => {
    setEditingId(lead._id);
    setError("");
    setSuccessMessage("");

    setEditForm({
      ...lead,

      contact: lead.contact || "",
      email: lead.email || "",

      website: lead.website || "",
      linkedin: lead.linkedin || "",

      country: lead.country || "",
      industry: lead.industry || "",
      employees: lead.employees || "11-50",

      service: lead.service || "",
      status: lead.status || "New",
      priority: lead.priority || "B",

      outsourceScore: String(
        lead.outsourceScore ?? 5
      ),

      projectSize:
        lead.projectSize || "£5k - £20k",

      source: lead.source || "",
      techStack: lead.techStack || "",

      followUp: formatDateForInput(
        lead.followUp
      ),

      lastContacted: formatDateForInput(
        lead.lastContacted
      ),

      notes: lead.notes || "",
    });
  };

  const cancelEditing = (): void => {
    setEditingId(null);
    setEditForm(emptyLead);
    setError("");
  };

  const handleEditChange = (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
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

    if (!editForm.company.trim()) {
      setError("Company name is required.");
      return;
    }

    const outsourceScore = Number(
      editForm.outsourceScore
    );

    if (
      Number.isNaN(outsourceScore) ||
      outsourceScore < 1 ||
      outsourceScore > 10
    ) {
      setError(
        "Outsource score must be between 1 and 10."
      );
      return;
    }

    setSaving(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `/api/leads/${editingId}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            company: editForm.company.trim(),
            contact: editForm.contact.trim(),
            email: editForm.email.trim(),

            website: editForm.website.trim(),
            linkedin: editForm.linkedin.trim(),

            country: editForm.country.trim(),
            industry: editForm.industry,
            employees: editForm.employees,

            service: editForm.service,
            status: editForm.status,
            priority: editForm.priority,

            outsourceScore,

            projectSize: editForm.projectSize,

            source: editForm.source,
            techStack: editForm.techStack.trim(),

            followUp:
              editForm.followUp || null,

            lastContacted:
              editForm.lastContacted || null,

            notes: editForm.notes.trim(),
          }),
        }
      );

      const data =
        (await response.json()) as LeadsApiResponse;

      if (
        !response.ok ||
        !data.success ||
        !data.lead
      ) {
        throw new Error(
          data.message || "Unable to update lead."
        );
      }

      setLeads((previousLeads) =>
        previousLeads.map((lead) =>
          lead._id === editingId
            ? data.lead!
            : lead
        )
      );

      setEditingId(null);
      setEditForm(emptyLead);

      setSuccessMessage(
        "Lead updated successfully."
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update lead."
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteLead = async (
    lead: Lead
  ): Promise<void> => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${lead.company}"?`
    );

    if (!confirmed) return;

    setDeletingId(lead._id);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `/api/leads/${lead._id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        (await response.json()) as LeadsApiResponse;

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to delete lead."
        );
      }

      setLeads((previousLeads) =>
        previousLeads.filter(
          (currentLead) =>
            currentLead._id !== lead._id
        )
      );

      if (editingId === lead._id) {
        setEditingId(null);
        setEditForm(emptyLead);
      }

      setSuccessMessage(
        "Lead deleted successfully."
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete lead."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const clearFilters = (): void => {
    setSearch("");
    setStatusFilter("");
    setServiceFilter("");
    setPriorityFilter("");
    setIndustryFilter("");
    setEmployeeFilter("");
  };

  const paginationButtonStyle: CSSProperties = {
    padding: "9px 16px",
    border: "none",
    borderRadius: "7px",
    background:
      "linear-gradient(135deg,#172d51 0%, #00bcd4 100%)",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: 600,
  };

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "1600px",
        margin: "30px auto",
        padding: "24px",
        boxSizing: "border-box",
        fontFamily:
          "'Space Grotesk', sans-serif",
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
            View, filter and update your Startify
            Labs leads.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void fetchLeads()}
          disabled={loading}
          title="Refresh leads"
          style={{
            width: "48px",
            height: "48px",
            border: "none",
            borderRadius: "10px",
            background:
              "linear-gradient(135deg,#172d51 0%, #00bcd4 100%)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: loading
              ? "not-allowed"
              : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          <RefreshRoundedIcon
            style={{
              fontSize: "24px",
              animation: loading
                ? "spin 1s linear infinite"
                : "none",
            }}
          />
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
          padding: "18px",
          marginBottom: "18px",
          backgroundColor: "#ffffff",
          border: "1px solid #e8edf3",
          borderRadius: "12px",
          boxShadow:
            "0 6px 22px rgba(23,45,81,0.05)",
        }}
      >
        <input
          type="search"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search all lead fields..."
          style={{
            ...filterInputStyle,
            gridColumn:
              "span 2",
          }}
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          style={filterInputStyle}
        >
          <option value="">
            All statuses
          </option>

          {statuses.map((status) => (
            <option
              key={status}
              value={status}
            >
              {status}
            </option>
          ))}
        </select>

        <select
          value={serviceFilter}
          onChange={(event) =>
            setServiceFilter(event.target.value)
          }
          style={filterInputStyle}
        >
          <option value="">
            All services
          </option>

          {services.map((service) => (
            <option
              key={service}
              value={service}
            >
              {service}
            </option>
          ))}
        </select>

        <select
          value={priorityFilter}
          onChange={(event) =>
            setPriorityFilter(event.target.value)
          }
          style={filterInputStyle}
        >
          <option value="">
            All priorities
          </option>

          {priorities.map((priority) => (
            <option
              key={priority}
              value={priority}
            >
              Priority {priority}
            </option>
          ))}
        </select>

        <select
          value={industryFilter}
          onChange={(event) =>
            setIndustryFilter(event.target.value)
          }
          style={filterInputStyle}
        >
          <option value="">
            All industries
          </option>

          {industries.map((industry) => (
            <option
              key={industry}
              value={industry}
            >
              {industry}
            </option>
          ))}
        </select>

        <select
          value={employeeFilter}
          onChange={(event) =>
            setEmployeeFilter(event.target.value)
          }
          style={filterInputStyle}
        >
          <option value="">
            All company sizes
          </option>

          {employeeRanges.map((range) => (
            <option
              key={range}
              value={range}
            >
              {range} employees
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={clearFilters}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "9px",
            background:
              "linear-gradient(135deg,#172d51 0%, #00bcd4 100%)",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: "14px",
            cursor: "pointer",
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
        <div style={messageBoxStyle}>
          Loading leads...
        </div>
      ) : leads.length === 0 ? (
        <div style={messageBoxStyle}>
          No leads have been added yet.
        </div>
      ) : filteredLeads.length === 0 ? (
        <div style={messageBoxStyle}>
          No leads match the selected filters.
        </div>
      ) : (
        <>
        <div
          style={{
            width: "100%",
            overflow: "auto",
            maxHeight: "70vh",
            position: "relative",
            backgroundColor: "#ffffff",
            border: "1px solid #e8edf3",
            borderRadius: "14px",
            boxShadow:
              "0 8px 28px rgba(23,45,81,0.06)",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "3300px",
              borderCollapse: "separate",
              borderSpacing: 0,
            }}
          >
            <thead
              style={{
                position: "sticky",
                top: 0,
                zIndex: 10,
              }}
            >
              <tr
                style={{
                  background:
                    "linear-gradient(135deg,#172d51 0%, #00bcd4 100%)",
                  color: "#ffffff",
                }}
              >
                <th style={tableHeaderStyle}>
                  Priority
                </th>

                <th style={tableHeaderStyle}>
                  Company
                </th>
                <th style={tableHeaderStyle}>
                  Score
                </th>
                <th style={tableHeaderStyle}>
                  Contact
                </th>

                <th style={tableHeaderStyle}>
                  Email
                </th>

                <th style={tableHeaderStyle}>
                  Website
                </th>

                <th style={tableHeaderStyle}>
                  LinkedIn
                </th>

                <th style={tableHeaderStyle}>
                  Country
                </th>

                <th style={tableHeaderStyle}>
                  Industry
                </th>

                <th style={tableHeaderStyle}>
                  Employees
                </th>

                <th style={tableHeaderStyle}>
                  Service
                </th>

                <th style={tableHeaderStyle}>
                  Status
                </th>

               

                <th style={tableHeaderStyle}>
                  Project Size
                </th>

                <th style={tableHeaderStyle}>
                  Source
                </th>

                <th style={tableHeaderStyle}>
                  Tech Stack
                </th>

                <th style={tableHeaderStyle}>
                  Last Contacted
                </th>

                <th style={tableHeaderStyle}>
                  Follow-up
                </th>

                <th
                  style={{
                    ...tableHeaderStyle,
                    minWidth: "300px",
                  }}
                >
                  Notes
                </th>

                <th
                  style={{
                    ...tableHeaderStyle,
                    position: "sticky",
                    right: 0,
                    zIndex: 12,
                    textAlign: "center",
                    backgroundColor: "#172d51",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredLeads.map(
                (lead, index) => {
                  const isEditing =
                    editingId === lead._id;

                  const rowBackground =
                    index % 2 === 0
                      ? "#ffffff"
                      : "#f9fafb";

                  return (
                    <tr
                      key={lead._id}
                      style={{
                        backgroundColor:
                          rowBackground,
                        borderBottom:
                          "1px solid #edf1f5",
                      }}
                    >
                      <td style={tableCellStyle}>
                        {isEditing ? (
                          <select
                            name="priority"
                            value={editForm.priority}
                            onChange={
                              handleEditChange
                            }
                            style={{
                              ...tableInputStyle,
                              minWidth: "90px",
                            }}
                          >
                            {priorities.map(
                              (priority) => (
                                <option
                                  key={priority}
                                  value={priority}
                                >
                                  {priority}
                                </option>
                              )
                            )}
                          </select>
                        ) : (
                          <span
                            style={{
                              ...getPriorityStyle(
                                lead.priority
                              ),
                              display:
                                "inline-flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              fontSize: "13px",
                              fontWeight: 700,
                            }}
                          >
                            {lead.priority || "B"}
                          </span>
                        )}
                      </td>

                      <td style={tableCellStyle}>
                        {isEditing ? (
                          <input
                            name="company"
                            value={editForm.company}
                            onChange={
                              handleEditChange
                            }
                            style={{
                              ...tableInputStyle,
                              minWidth: "190px",
                            }}
                          />
                        ) : (
                          <strong
                            style={{
                              color: "#172d51",
                            }}
                          >
                            {lead.company}
                          </strong>
                        )}
                      </td>
                      <td style={tableCellStyle}>
                        {isEditing ? (
                          <select
                            name="outsourceScore"
                            value={
                              editForm.outsourceScore
                            }
                            onChange={
                              handleEditChange
                            }
                            style={{
                              ...tableInputStyle,
                              minWidth: "100px",
                            }}
                          >
                            {Array.from(
                              { length: 10 },
                              (_, index) => {
                                const score =
                                  index + 1;

                                return (
                                  <option
                                    key={score}
                                    value={score}
                                  >
                                    {score}/10
                                  </option>
                                );
                              }
                            )}
                          </select>
                        ) : (
                          <span
                            style={{
                              ...getScoreStyle(
                                lead.outsourceScore
                              ),
                              display:
                                "inline-block",
                              padding:
                                "6px 10px",
                              borderRadius:
                                "20px",
                              fontSize: "12px",
                              fontWeight: 700,
                            }}
                          >
                            {lead.outsourceScore ??
                              5}
                            /10
                          </span>
                        )}
                      </td>
                      <td style={tableCellStyle}>
                        {isEditing ? (
                          <input
                            name="contact"
                            value={editForm.contact}
                            onChange={
                              handleEditChange
                            }
                            style={tableInputStyle}
                          />
                        ) : (
                          lead.contact || "—"
                        )}
                      </td>

                      <td style={tableCellStyle}>
                        {isEditing ? (
                          <input
                            name="email"
                            type="email"
                            value={editForm.email}
                            onChange={
                              handleEditChange
                            }
                            style={{
                              ...tableInputStyle,
                              minWidth: "220px",
                            }}
                          />
                        ) : lead.email ? (
                          <a
                            href={`mailto:${lead.email}`}
                            style={linkStyle}
                          >
                            {lead.email}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>

                      <td style={tableCellStyle}>
                        {isEditing ? (
                          <input
                            name="website"
                            type="url"
                            value={editForm.website}
                            onChange={
                              handleEditChange
                            }
                            style={{
                              ...tableInputStyle,
                              minWidth: "220px",
                            }}
                          />
                        ) : lead.website ? (
                          <a
                            href={normalizeUrl(
                              lead.website
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={iconLinkStyle}
                          >
                            Website
                            <OpenInNewRoundedIcon
                              style={{
                                fontSize: "16px",
                              }}
                            />
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>

                      <td style={tableCellStyle}>
                        {isEditing ? (
                          <input
                            name="linkedin"
                            type="url"
                            value={editForm.linkedin}
                            onChange={
                              handleEditChange
                            }
                            style={{
                              ...tableInputStyle,
                              minWidth: "230px",
                            }}
                          />
                        ) : lead.linkedin ? (
                          <a
                            href={normalizeUrl(
                              lead.linkedin
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={iconLinkStyle}
                          >
                            LinkedIn
                            <OpenInNewRoundedIcon
                              style={{
                                fontSize: "16px",
                              }}
                            />
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>

                      <td style={tableCellStyle}>
                        {isEditing ? (
                          <input
                            name="country"
                            value={editForm.country}
                            onChange={
                              handleEditChange
                            }
                            style={tableInputStyle}
                          />
                        ) : (
                          lead.country || "—"
                        )}
                      </td>

                      <td style={tableCellStyle}>
                        {isEditing ? (
                          <select
                            name="industry"
                            value={editForm.industry}
                            onChange={
                              handleEditChange
                            }
                            style={{
                              ...tableInputStyle,
                              minWidth: "190px",
                            }}
                          >
                            <option value="">
                              Select industry
                            </option>

                            {industries.map(
                              (industry) => (
                                <option
                                  key={industry}
                                  value={industry}
                                >
                                  {industry}
                                </option>
                              )
                            )}
                          </select>
                        ) : (
                          lead.industry || "—"
                        )}
                      </td>

                      <td style={tableCellStyle}>
                        {isEditing ? (
                          <select
                            name="employees"
                            value={
                              editForm.employees
                            }
                            onChange={
                              handleEditChange
                            }
                            style={{
                              ...tableInputStyle,
                              minWidth: "130px",
                            }}
                          >
                            {employeeRanges.map(
                              (range) => (
                                <option
                                  key={range}
                                  value={range}
                                >
                                  {range}
                                </option>
                              )
                            )}
                          </select>
                        ) : (
                          lead.employees || "—"
                        )}
                      </td>

                      <td style={tableCellStyle}>
                        {isEditing ? (
                          <select
                            name="service"
                            value={editForm.service}
                            onChange={
                              handleEditChange
                            }
                            style={{
                              ...tableInputStyle,
                              minWidth: "220px",
                            }}
                          >
                            <option value="">
                              Select service
                            </option>

                            {services.map(
                              (service) => (
                                <option
                                  key={service}
                                  value={service}
                                >
                                  {service}
                                </option>
                              )
                            )}
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
                            onChange={
                              handleEditChange
                            }
                            style={{
                              ...tableInputStyle,
                              minWidth: "160px",
                            }}
                          >
                            {statuses.map(
                              (status) => (
                                <option
                                  key={status}
                                  value={status}
                                >
                                  {status}
                                </option>
                              )
                            )}
                          </select>
                        ) : (
                          <span
                            style={{
                              ...getStatusStyle(
                                lead.status
                              ),
                              display:
                                "inline-block",
                              padding:
                                "6px 10px",
                              borderRadius:
                                "20px",
                              fontSize: "12px",
                              fontWeight: 700,
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            {lead.status}
                          </span>
                        )}
                      </td>

                   

                      <td style={tableCellStyle}>
                        {isEditing ? (
                          <select
                            name="projectSize"
                            value={
                              editForm.projectSize
                            }
                            onChange={
                              handleEditChange
                            }
                            style={{
                              ...tableInputStyle,
                              minWidth: "170px",
                            }}
                          >
                            {projectSizes.map(
                              (size) => (
                                <option
                                  key={size}
                                  value={size}
                                >
                                  {size}
                                </option>
                              )
                            )}
                          </select>
                        ) : (
                          lead.projectSize || "—"
                        )}
                      </td>

                      <td style={tableCellStyle}>
                        {isEditing ? (
                          <select
                            name="source"
                            value={editForm.source}
                            onChange={
                              handleEditChange
                            }
                            style={{
                              ...tableInputStyle,
                              minWidth: "160px",
                            }}
                          >
                            <option value="">
                              Select source
                            </option>

                            {leadSources.map(
                              (source) => (
                                <option
                                  key={source}
                                  value={source}
                                >
                                  {source}
                                </option>
                              )
                            )}
                          </select>
                        ) : (
                          lead.source || "—"
                        )}
                      </td>

                      <td
                        style={{
                          ...tableCellStyle,
                          minWidth: "230px",
                        }}
                      >
                        {isEditing ? (
                          <textarea
                            name="techStack"
                            value={
                              editForm.techStack
                            }
                            onChange={
                              handleEditChange
                            }
                            rows={3}
                            style={{
                              ...tableInputStyle,
                              minWidth: "230px",
                              resize: "vertical",
                            }}
                          />
                        ) : (
                          <span
                            style={{
                              display: "block",
                              maxWidth: "260px",
                              whiteSpace:
                                "normal",
                              lineHeight: 1.5,
                            }}
                          >
                            {lead.techStack ||
                              "—"}
                          </span>
                        )}
                      </td>

                      <td style={tableCellStyle}>
                        {isEditing ? (
                          <input
                            name="lastContacted"
                            type="date"
                            value={
                              editForm.lastContacted
                            }
                            onChange={
                              handleEditChange
                            }
                            style={{
                              ...tableInputStyle,
                              minWidth: "160px",
                            }}
                          />
                        ) : (
                          formatDisplayDate(
                            lead.lastContacted
                          )
                        )}
                      </td>

                      <td style={tableCellStyle}>
                        {isEditing ? (
                          <input
                            name="followUp"
                            type="date"
                            value={
                              editForm.followUp
                            }
                            onChange={
                              handleEditChange
                            }
                            style={{
                              ...tableInputStyle,
                              minWidth: "160px",
                            }}
                          />
                        ) : (
                          formatDisplayDate(
                            lead.followUp
                          )
                        )}
                      </td>

                      <td
                        style={{
                          ...tableCellStyle,
                          minWidth: "300px",
                          maxWidth: "400px",
                        }}
                      >
                        {isEditing ? (
                          <textarea
                            name="notes"
                            value={editForm.notes}
                            onChange={
                              handleEditChange
                            }
                            rows={4}
                            style={{
                              ...tableInputStyle,
                              minWidth: "300px",
                              resize: "vertical",
                            }}
                          />
                        ) : (
                          <span
                            style={{
                              display: "block",
                              maxWidth: "380px",
                              whiteSpace:
                                "normal",
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
                          zIndex: 2,
                          backgroundColor:
                            rowBackground,
                          boxShadow:
                            "-6px 0 10px rgba(23,45,81,0.05)",
                          textAlign: "center",
                        }}
                      >
                        {isEditing ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent:
                                "center",
                              gap: "8px",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                void saveLead()
                              }
                              disabled={saving}
                              style={{
                                ...actionButtonStyle,
                                backgroundColor:
                                  "#00a9bf",
                                color:
                                  "#ffffff",
                                opacity: saving
                                  ? 0.7
                                  : 1,
                              }}
                            >
                              {saving
                                ? "Saving..."
                                : "Save"}
                            </button>

                            <button
                              type="button"
                              onClick={
                                cancelEditing
                              }
                              disabled={saving}
                              style={{
                                ...actionButtonStyle,
                                backgroundColor:
                                  "#ffffff",
                                color:
                                  "#475467",
                                border:
                                  "1px solid #d0d5dd",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              justifyContent:
                                "center",
                              alignItems:
                                "center",
                              gap: "8px",
                            }}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                startEditing(
                                  lead
                                )
                              }
                              title="Edit lead"
                              disabled={
                                deletingId ===
                                lead._id
                              }
                              style={{
                                ...iconButtonStyle,
                                backgroundColor:
                                  "#172d51",
                                opacity:
                                  deletingId ===
                                    lead._id
                                    ? 0.6
                                    : 1,
                              }}
                            >
                              <EditRoundedIcon
                                style={{
                                  fontSize:
                                    "20px",
                                }}
                              />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                void deleteLead(
                                  lead
                                )
                              }
                              title="Delete lead"
                              disabled={
                                deletingId ===
                                lead._id
                              }
                              style={{
                                ...iconButtonStyle,
                                backgroundColor:
                                  "#d92d20",
                                opacity:
                                  deletingId ===
                                    lead._id
                                    ? 0.6
                                    : 1,
                                cursor:
                                  deletingId ===
                                    lead._id
                                    ? "not-allowed"
                                    : "pointer",
                              }}
                            >
                              <DeleteRoundedIcon
                                style={{
                                  fontSize:
                                    "20px",
                                }}
                              />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>

         
        </div>
         <div
         style={{
           marginTop: "18px",
           display: "flex",
           alignItems: "center",
           justifyContent: "space-between",
           gap: "16px",
           flexWrap: "wrap",
           padding:"10px"
         }}
       >
         <div
           style={{
             display: "flex",
             alignItems: "center",
             gap: "10px",
           }}
         >
           <span
             style={{
               color: "#667085",
               fontSize: "14px",
             }}
           >
             Rows per page:
           </span>

           <select
             value={limit}
             onChange={(event) => {
               setLimit(Number(event.target.value));
               setPage(1);
             }}
             style={{
               padding: "8px 10px",
               border: "1px solid #d0d5dd",
               borderRadius: "7px",
               backgroundColor: "#ffffff",
             }}
           >
             <option value={10}>10</option>
             <option value={20}>20</option>
             <option value={50}>50</option>
             <option value={100}>100</option>
           </select>
         </div>

         <span
           style={{
             color: "#667085",
             fontSize: "14px",
           }}
         >
           Page {pagination.page} of{" "}
           {pagination.totalPages} —{" "}
           {pagination.totalLeads} leads
         </span>

         <div
           style={{
             display: "flex",
             gap: "8px",
           }}
         >
           <button
             type="button"
             disabled={!pagination.hasPreviousPage}
             onClick={() =>
               setPage((currentPage) =>
                 Math.max(1, currentPage - 1)
               )
             }
             style={{
               ...paginationButtonStyle,
               opacity: pagination.hasPreviousPage
                 ? 1
                 : 0.5,
               cursor: pagination.hasPreviousPage
                 ? "pointer"
                 : "not-allowed",
             }}
           >
             Previous
           </button>

           <button
             type="button"
             disabled={!pagination.hasNextPage}
             onClick={() =>
               setPage((currentPage) =>
                 currentPage + 1
               )
             }
             style={{
               ...paginationButtonStyle,
               opacity: pagination.hasNextPage
                 ? 1
                 : 0.5,
               cursor: pagination.hasNextPage
                 ? "pointer"
                 : "not-allowed",
             }}
           >
             Next
           </button>
         </div>
       </div>
       </>
      )}

      {!loading &&
        filteredLeads.length > 0 && (
          <p
            style={{
              margin: "14px 4px 0",
              color: "#667085",
              fontSize: "13px",
            }}
          >
            Showing {filteredLeads.length} of{" "}
            {leads.length} leads
          </p>
        )}
    </section>
  );
}

function formatDateForInput(
  date?: string | null
): string {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate
    .toISOString()
    .split("T")[0];
}

function formatDisplayDate(
  date?: string | null
): string {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function normalizeUrl(url: string): string {
  const trimmedUrl = url.trim();

  if (
    trimmedUrl.startsWith("http://") ||
    trimmedUrl.startsWith("https://")
  ) {
    return trimmedUrl;
  }

  return `https://${trimmedUrl}`;
}

function getPriorityStyle(
  priority: string
): CSSProperties {
  const styles: Record<
    string,
    CSSProperties
  > = {
    A: {
      backgroundColor: "#e8f8ef",
      color: "#16773a",
    },

    B: {
      backgroundColor: "#fff8db",
      color: "#8a6100",
    },

    C: {
      backgroundColor: "#fff1f0",
      color: "#b42318",
    },
  };

  return (
    styles[priority] || {
      backgroundColor: "#f2f4f7",
      color: "#475467",
    }
  );
}

function getScoreStyle(
  score: number
): CSSProperties {
  if (score >= 8) {
    return {
      backgroundColor: "#e8f8ef",
      color: "#16773a",
    };
  }

  if (score >= 5) {
    return {
      backgroundColor: "#fff8db",
      color: "#8a6100",
    };
  }

  return {
    backgroundColor: "#fff1f0",
    color: "#b42318",
  };
}

function getStatusStyle(
  status: string
): CSSProperties {
  const statusStyles: Record<
    string,
    CSSProperties
  > = {
    New: {
      backgroundColor: "#eef4ff",
      color: "#3448a5",
    },

    Researching: {
      backgroundColor: "#f2f4f7",
      color: "#475467",
    },

    Contacted: {
      backgroundColor: "#fff4e5",
      color: "#b54708",
    },

    "Follow Up 1": {
      backgroundColor: "#fff8db",
      color: "#8a6100",
    },

    "No-Reply F-1": {
      backgroundColor: "#fff3e8",
      color: "#b54708",
    },

    "Follow Up 2": {
      backgroundColor: "#fef0c7",
      color: "#93370d",
    },

    "No-Reply F-2": {
      backgroundColor: "#fef3f2",
      color: "#b42318",
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

    "Do Not Contact": {
      backgroundColor: "#f2f4f7",
      color: "#344054",
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
  fontFamily: "inherit",
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

const iconButtonStyle: CSSProperties = {
  width: "40px",
  height: "40px",
  padding: 0,
  border: "none",
  borderRadius: "7px",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const linkStyle: CSSProperties = {
  color: "#009bb1",
  textDecoration: "none",
};

const iconLinkStyle: CSSProperties = {
  color: "#009bb1",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
};

const messageBoxStyle: CSSProperties = {
  padding: "45px",
  textAlign: "center",
  backgroundColor: "#ffffff",
  border: "1px solid #e8edf3",
  borderRadius: "14px",
  color: "#6c7789",
};