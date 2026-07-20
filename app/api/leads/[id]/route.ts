import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Lead, {
  employeeRanges,
  leadPriorities,
  leadStatuses,
  projectSizes,
} from "@/app/models/Lead";
import { getSession } from "@/app/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type UpdateLeadBody = {
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

function parseOptionalDate(value?: string | null): Date | null {
  if (!value) {
    return null;
  }

  const parsedDate = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

function getOutsourceScore(value?: number | string): number {
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

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
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

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid lead ID.",
        },
        {
          status: 400,
        }
      );
    }

    const body = (await request.json()) as UpdateLeadBody;

    const company = body.company?.trim() || "";
    const contact = body.contact?.trim() || "";
    const email = body.email?.trim().toLowerCase() || "";

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
          message: "Please enter a valid email address.",
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

    const followUp = parseOptionalDate(body.followUp);

    const lastContacted = parseOptionalDate(
      body.lastContacted
    );

    await connectToDatabase();

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      {
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
      },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!updatedLead) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead updated successfully.",
      lead: updatedLead,
    });
  } catch (error) {
    console.error("Update lead error:", error);

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
        message: "Unable to update the lead.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
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

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid lead ID.",
        },
        {
          status: 400,
        }
      );
    }

    await connectToDatabase();

    const deletedLead = await Lead.findByIdAndDelete(
      id
    ).lean();

    if (!deletedLead) {
      return NextResponse.json(
        {
          success: false,
          message: "Lead not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead deleted successfully.",
      lead: deletedLead,
    });
  } catch (error) {
    console.error("Delete lead error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to delete the lead.",
      },
      {
        status: 500,
      }
    );
  }
}