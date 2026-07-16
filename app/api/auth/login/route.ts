import { NextResponse } from "next/server";
import { createSession } from "@/app/lib/auth";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginBody;

    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    const adminEmail = process.env.CRM_ADMIN_EMAIL?.trim().toLowerCase();
    const adminPassword = process.env.CRM_ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error("CRM admin credentials are not configured.");

      return NextResponse.json(
        {
          success: false,
          message: "Authentication is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    await createSession(adminEmail);

    return NextResponse.json({
      success: true,
      message: "Login successful.",
    });
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to log in.",
      },
      {
        status: 500,
      }
    );
  }
}