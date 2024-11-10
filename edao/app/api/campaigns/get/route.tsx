/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Retrieve all campaigns from the database
    const campaigns = await prisma.campaign.findMany();

    // Return the campaigns as a JSON response
    return NextResponse.json({ data: campaigns });
  } catch (error: any) {
    // Handle any errors that occur during the database query
    console.log("ERROR MESSGA ->", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
