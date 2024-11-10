import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface CampaignData {
  title: string;
  description: string;
  goal: string;
  deadline: string; // Assuming the date is coming as a string
  educationalInstitution: string;
  courseOfStudy: string;
  diploma: string;
  experience: string;
  fundingType: string;
  ipfsImages: string[];
}

export async function POST(request: Request) {
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
  }: CampaignData = await request.json();

  // Validate and parse input data
  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof educationalInstitution !== "string" ||
    typeof courseOfStudy !== "string" ||
    typeof diploma !== "string" ||
    typeof experience !== "string" ||
    typeof fundingType !== "string" ||
    !Array.isArray(ipfsImages) ||
    !ipfsImages.every((img) => typeof img === "string")
  ) {
    throw new Error("Invalid input types");
  }
  const parsedGoal = parseFloat(goal);
  if (isNaN(parsedGoal)) {
    throw new Error("Invalid goal value");
  }

  const parsedDeadline = new Date(deadline);
  if (isNaN(parsedDeadline.getTime())) {
    throw new Error("Invalid deadline value");
  }

  if (
    !Array.isArray(ipfsImages) ||
    !ipfsImages.every((img) => typeof img === "string")
  ) {
    throw new Error("Invalid ipfsImages value");
  }

  // Create a new campaign record in the database
  const newCampaign = await prisma.campaign.create({
    data: {
      title,
      description,
      goal: parsedGoal,
      deadline: parsedDeadline,
      educationalInstitution,
      courseOfStudy,
      diploma,
      experience,
      fundingType,
      ipfsImages,
    },
  });

  return NextResponse.json({ data: newCampaign });
}
