import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { getSession } from "@/app/lib/auth";
import Lead, {
  employeeRanges,
  leadPriorities,
  leadStatuses,
  projectSizes,
} from "@/app/models/Lead";

type CellValue = string | number | boolean | null;

type ImportBody = {
  rows?: CellValue[][];
};

type SkippedRow = {
  row: number;
  reason: string;
};

const emailPattern = /^\S+@\S+\.\S+$/;

const headerAliases: Record<string, string> = {
  company: "company",
  companyname: "company",
  businessname: "company",

  contact: "contact",
  contactperson: "contact",
  contactname: "contact",

  email: "email",
  emailaddress: "email",

  website: "website",
  websiteurl: "website",
  companywebsite: "website",

  linkedin: "linkedin",
  linkedinurl: "linkedin",
  linkedinprofile: "linkedin",

  country: "country",
  location: "country",

  industry: "industry",
  sector: "industry",

  employees: "employees",
  employeerange: "employees",
  employeesize: "employees",
  companysize: "employees",

  service: "service",
  suggestedservice: "service",
  requiredservice: "service",

  status: "status",
  leadstatus: "status",

  priority: "priority",
  leadpriority: "priority",

  outsourcescore: "outsourceScore",
  outsourcingscore: "outsourceScore",
  outsourceprobability: "outsourceScore",
  outsourcingprobability: "outsourceScore",

  projectsize: "projectSize",
  estimatedprojectsize: "projectSize",
  budget: "projectSize",

  source: "source",
  leadsource: "source",

  techstack: "techStack",
  technologystack: "techStack",
  technologies: "techStack",

  followup: "followUp",
  followupdate: "followUp",
  nextfollowup: "followUp",

  lastcontacted: "lastContacted",
  lastcontacteddate: "lastContacted",

  notes: "notes",
  comments: "notes",
};

function normalizeHeader(value: CellValue): string {
    const normalized = String(value ?? "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  
    return headerAliases[normalized] ?? normalized;
  }

function getText(value: CellValue): string {
  return String(value ?? "").trim();
}

function getEnumValue<T extends readonly string[]>(
  values: T,
  value: CellValue,
  fallback: T[number]
): T[number] {
  const text = getText(value);

  const match = values.find(
    (item) => item.toLowerCase() === text.toLowerCase()
  );

  return match ?? fallback;
}

function getOutsourceScore(value: CellValue): number {
    const text = String(value ?? "").trim();
  
    if (!text) {
      return 5;
    }
  
    const matchedNumber = text.match(/\d+(\.\d+)?/);
  
    if (!matchedNumber) {
      return 5;
    }
  
    const score = Number(matchedNumber[0]);
  
    if (
      !Number.isFinite(score) ||
      score < 1 ||
      score > 10
    ) {
      return 5;
    }
  
    return Math.round(score);
  }

function getOptionalDate(value: CellValue): Date | null {
  const text = getText(value);

  if (!text) {
    return null;
  }

  const date = new Date(text);

  return Number.isNaN(date.getTime()) ? null : date;
}

function isEmptyRow(row: CellValue[]): boolean {
  return row.every((cell) => !getText(cell));
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const body = (await request.json()) as ImportBody;

    if (!Array.isArray(body.rows) || body.rows.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The spreadsheet must contain headers and at least one data row.",
        },
        {
          status: 400,
        }
      );
    }

    const [headerRow, ...dataRows] = body.rows;

    const columnIndexes = new Map<string, number>();

    headerRow.forEach((header, index) => {
      const normalizedHeader = normalizeHeader(header);

      if (normalizedHeader) {
        columnIndexes.set(normalizedHeader, index);
      }
    });

    if (!columnIndexes.has("company")) {
      return NextResponse.json(
        {
          success: false,
          message:
            'The first spreadsheet row must contain a "Company" column.',
        },
        {
          status: 400,
        }
      );
    }

    const getCell = (
      row: CellValue[],
      fieldName: string
    ): CellValue => {
      const index = columnIndexes.get(fieldName);

      if (index === undefined) {
        return "";
      }

      return row[index] ?? "";
    };

    const validLeads: Array<Record<string, unknown>> = [];
    const skippedRows: SkippedRow[] = [];

    dataRows.forEach((row, index) => {
      const spreadsheetRowNumber = index + 2;

      if (!Array.isArray(row) || isEmptyRow(row)) {
        return;
      }

      const company = getText(
        getCell(row, "company")
      );

      const email = getText(
        getCell(row, "email")
      ).toLowerCase();

      if (!company) {
        skippedRows.push({
          row: spreadsheetRowNumber,
          reason: "Company name is missing.",
        });

        return;
      }

      if (email && !emailPattern.test(email)) {
        skippedRows.push({
          row: spreadsheetRowNumber,
          reason: `Invalid email: ${email}`,
        });

        return;
      }

      validLeads.push({
        company,

        contact: getText(
          getCell(row, "contact")
        ),

        email,

        website: getText(
          getCell(row, "website")
        ),

        linkedin: getText(
          getCell(row, "linkedin")
        ),

        country:
          getText(getCell(row, "country")) ||
          "United Kingdom",

        industry: getText(
          getCell(row, "industry")
        ),

        employees: getEnumValue(
          employeeRanges,
          getCell(row, "employees"),
          "11-50"
        ),

        service: getText(
          getCell(row, "service")
        ),

        status: getEnumValue(
          leadStatuses,
          getCell(row, "status"),
          "New"
        ),

        priority: getEnumValue(
          leadPriorities,
          getCell(row, "priority"),
          "B"
        ),

        outsourceScore: getOutsourceScore(
          getCell(row, "outsourceScore")
        ),

        projectSize: getEnumValue(
          projectSizes,
          getCell(row, "projectSize"),
          "£5k - £20k"
        ),

        source: getText(
          getCell(row, "source")
        ),

        techStack: getText(
          getCell(row, "techStack")
        ),

        followUp: getOptionalDate(
          getCell(row, "followUp")
        ),

        lastContacted: getOptionalDate(
          getCell(row, "lastContacted")
        ),

        notes: getText(
          getCell(row, "notes")
        ),
      });
    });

    if (validLeads.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No valid lead rows were found in the spreadsheet.",
          skippedRows,
        },
        {
          status: 400,
        }
      );
    }

    await connectToDatabase();

    const insertedLeads = await Lead.insertMany(
      validLeads,
      {
        ordered: false,
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: `${insertedLeads.length} leads saved successfully.`,

        insertedCount: insertedLeads.length,
        skippedCount: skippedRows.length,
        skippedRows,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Bulk lead import error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to import spreadsheet data.",
      },
      {
        status: 500,
      }
    );
  }
}