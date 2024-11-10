import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const {
      title,
      description,
      goal,
      deadline,
      // educationalInstitution,
      // courseOfStudy,
      // diploma,
      // experience,
      // fundingType,
      // ipfsImages,
    } = await request.json();

    // Validate required fields
    if (!title || !description || !goal || !deadline) {
      return NextResponse.json(
        { error: "Required fields are missing." },
        { status: 400 }
      );
    }

    // Parse numerical and date values
    const parsedGoal = parseFloat(goal);
    const parsedDeadline = new Date(deadline);

    // Validate parsed data
    if (isNaN(parsedGoal) || parsedGoal <= 0) {
      return NextResponse.json(
        { error: "Goal must be a positive number." },
        { status: 400 }
      );
    }
    if (isNaN(parsedDeadline.getTime())) {
      return NextResponse.json(
        { error: "Invalid deadline format." },
        { status: 400 }
      );
    }

    // // Create a new campaign record in the database
    // const newCampaign = await prisma.campaign.create({
    //   data: {
    //     title,
    //     description,
    //     goal: parsedGoal,
    //     deadline: parsedDeadline,
    //     educationalInstitution,
    //     courseOfStudy,
    //     diploma,
    //     experience,
    //     fundingType,
    //     ipfsImages,
    //   },
    // });

    // return NextResponse.json({ data: newCampaign });
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    );
  } finally {
    // Ensure Prisma client is disconnected
    await prisma.$disconnect();
  }
}
