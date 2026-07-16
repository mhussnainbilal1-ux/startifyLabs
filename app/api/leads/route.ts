import { NextResponse } from "next/server";
import { connectToDatabase } from "../../lib/mongodb";
import Lead, { leadStatuses } from "../../models/Lead";
import { getSession } from "@/app/lib/auth";

type LeadRequestBody = {
  company?: string;
  contact?: string;
  email?: string;
  country?: string;
  service?: string;
  status?: string;
  followUp?: string;
  notes?: string;
};

export async function POST(request: Request) {
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

  try {
    const body = (await request.json()) as LeadRequestBody;

    const company = body.company?.trim();
    const contact = body.contact?.trim();
    const email = body.email?.trim().toLowerCase();

    if (!company || !contact || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Company, contact person and email are required.",
        },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    const status = leadStatuses.includes(
      body.status as (typeof leadStatuses)[number]
    )
      ? body.status
      : "New";

    await connectToDatabase();

    const lead = await Lead.create({
      company,
      contact,
      email,
      country: body.country?.trim() || "",
      service: body.service?.trim() || "",
      status: "New",
      followUp: body.followUp ? new Date(body.followUp) : null,
      notes: body.notes?.trim() || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Lead added successfully.",
        lead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create lead error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to add the lead.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
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

    await connectToDatabase();

    const leads = await Lead.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      leads,
    });
  } catch (error) {
    console.error("Get leads error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to retrieve leads.",
      },
      { status: 500 }
    );
  }
}