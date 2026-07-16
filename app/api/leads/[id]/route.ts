import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Lead, { leadStatuses } from "@/app/models/Lead";
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
  country?: string;
  service?: string;
  status?: string;
  followUp?: string;
  notes?: string;
};

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

    const company = body.company?.trim();
    const contact = body.contact?.trim();
    const email = body.email?.trim().toLowerCase();

    if (!company || !contact || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Company, contact person and email are required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
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

    if (
      body.status &&
      !leadStatuses.includes(
        body.status as (typeof leadStatuses)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid lead status.",
        },
        {
          status: 400,
        }
      );
    }

    await connectToDatabase();

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      {
        company,
        contact,
        email,
        country: body.country?.trim() || "",
        service: body.service?.trim() || "",
        status: body.status || "New",
        followUp: body.followUp
          ? new Date(`${body.followUp}T00:00:00.000Z`)
          : null,
        notes: body.notes?.trim() || "",
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