"use server";

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
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
      } = req.body;

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

      res.status(201).json(newCampaign);
    } catch (error) {
      console.error("Error creating campaign:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
