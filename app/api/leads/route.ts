import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/auth";
import { connectToDatabase } from "../../lib/mongodb";
import Lead, {
  employeeRanges,
  leadPriorities,
  leadStatuses,
  projectSizes,
} from "../../models/Lead";

type LeadRequestBody = {
  company?: string;
  contact?: string;
  email?: string;

  website?: string;
  linkedin?: string;

  country?: string;
  industry?: string;
  employees?: string;

  service?: string;
  status?: string;
  priority?: string;

  outsourceScore?: number | string;
  projectSize?: string;

  source?: string;
  techStack?: string;

  followUp?: string | null;
  lastContacted?: string | null;

  notes?: string;
};

const emailPattern = /^\S+@\S+\.\S+$/;

function getEnumValue<T extends readonly string[]>(
  values: T,
  value: string | undefined,
  fallback: T[number]
): T[number] {
  return values.includes(value as T[number])
    ? (value as T[number])
    : fallback;
}

function parseOptionalDate(
  value?: string | null
): Date | null {
  if (!value) {
    return null;
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

function getOutsourceScore(
  value?: number | string
): number {
  const parsedScore = Number(value);

  if (
    !Number.isFinite(parsedScore) ||
    parsedScore < 1 ||
    parsedScore > 10
  ) {
    return 5;
  }

  return parsedScore;
}

export async function POST(request: Request) {
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

    const body =
      (await request.json()) as LeadRequestBody;

    const company = body.company?.trim() || "";
    const contact = body.contact?.trim() || "";
    const email =
      body.email?.trim().toLowerCase() || "";

    const website = body.website?.trim() || "";
    const linkedin = body.linkedin?.trim() || "";

    const country = body.country?.trim() || "";
    const industry = body.industry?.trim() || "";

    const service = body.service?.trim() || "";
    const source = body.source?.trim() || "";
    const techStack = body.techStack?.trim() || "";
    const notes = body.notes?.trim() || "";

    if (!company) {
      return NextResponse.json(
        {
          success: false,
          message: "Company name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (email && !emailPattern.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    const employees = getEnumValue(
      employeeRanges,
      body.employees,
      "11-50"
    );

    const status = getEnumValue(
      leadStatuses,
      body.status,
      "New"
    );

    const priority = getEnumValue(
      leadPriorities,
      body.priority,
      "B"
    );

    const projectSize = getEnumValue(
      projectSizes,
      body.projectSize,
      "£5k - £20k"
    );

    const outsourceScore = getOutsourceScore(
      body.outsourceScore
    );

    const followUp = parseOptionalDate(
      body.followUp
    );

    const lastContacted = parseOptionalDate(
      body.lastContacted
    );

    await connectToDatabase();

    const lead = await Lead.create({
      company,
      contact,
      email,

      website,
      linkedin,

      country,
      industry,
      employees,

      service,
      status,
      priority,

      outsourceScore,
      projectSize,

      source,
      techStack,

      followUp,
      lastContacted,

      notes,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Lead added successfully.",
        lead,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Create lead error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      error &&
      typeof error === "object" &&
      "name" in error &&
      error.name === "ValidationError"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Lead validation failed. Please check the submitted fields.",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Unable to add the lead.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url);

    const requestedPage = Number(
      searchParams.get("page") || "1"
    );

    const requestedLimit = Number(
      searchParams.get("limit") || "20"
    );

    const page =
      Number.isFinite(requestedPage) &&
      requestedPage > 0
        ? Math.floor(requestedPage)
        : 1;

    const limit =
      Number.isFinite(requestedLimit) &&
      requestedLimit > 0
        ? Math.min(
            Math.floor(requestedLimit),
            100
          )
        : 20;

    const skip = (page - 1) * limit;

    await connectToDatabase();

    const [leads, totalLeads] =
      await Promise.all([
        Lead.find()
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit)
          .lean(),

        Lead.countDocuments(),
      ]);

    const totalPages = Math.max(
      1,
      Math.ceil(totalLeads / limit)
    );

    return NextResponse.json(
      {
        success: true,
        leads,

        pagination: {
          page,
          limit,
          totalLeads,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Get leads error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve leads.",
      },
      {
        status: 500,
      }
    );
  }
}