import { PrismaClient } from "@prisma/client";
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Parse the request body as JSON
    const {
      title,
      description,
      goal,
      deadline,
      educationalInstitution,
      courseOfStudy,
      diploma,
      experience,
      fundingType,
      ipfsImages,
    } = await request.json();

    // Create a new campaign record in the database
    const newCampaign = await prisma.campaign.create({
      data: {
        title,
        description,
        goal: parseFloat(goal),
        deadline: new Date(deadline),
        educationalInstitution,
        courseOfStudy,
        diploma,
        experience,
        fundingType,
        ipfsImages,
      },
    });

    // Return the newly created campaign in the response
    return NextResponse.json({ data: newCampaign });
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
  }
}
