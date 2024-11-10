import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request: Request) {
//   const client = new Client("wss://s.altnet.rippletest.net:51233");
  try {
    // await client.connect();
    console.log("Connected to XRPL");
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
    console.log("parsedDeadline ->", parsedDeadline);
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
    // const crypto = require("crypto");

    // Generate a random preimage (secret)
    // const preimage = crypto.randomBytes(32);

    // const wallet = Wallet.fromSeed(process.env.XRPL_SECRET as string);
    // // Create a SHA-256 hash of the preimage
    // const escrowHash = crypto
    //   .createHash("sha256")
    //   .update(preimage)
    //   .digest("hex");
    // console.log("escrowHash ->", escrowHash);
    // const escrowParams: EscrowCreate = {
    //   TransactionType: "EscrowCreate",
    //   Account: Wallet.fromSeed(process.env.XRPL_SECRET as string).address,
    //   Amount: "1000", // Initial amount is 0
    //   Destination: Wallet.fromSeed(process.env.XRPL_SECRET as string).address,
    //   CancelAfter: isoTimeToRippleTime(parsedDeadline.toISOString()), // Add closing parenthesis and comma
    //   Condition: escrowHash, // Use the hash as the condition
    // };

    // Define escrow parameters

    // Submit escrow transaction
    // console.log("wallet ->", wallet);
    // // Fetch the current ledger index
    // const currentLedger = await client.getLedgerIndex();
    // console.log("currentLedger ->", currentLedger);
    // Add LastLedgerSequence to escrowParams
    // const prepared = await client.autofill({
    //   ...escrowParams,
    //   LastLedgerSequence: currentLedger, // Increase this value
    // });
    // console.log("prepared ->", prepared);
    // const signed = wallet.sign(prepared);
    // console.log("signed ->", signed);
    // const result = await client.submitAndWait(signed.tx_blob);

    // console.log("result ->", result);

    const newCampaign = await prisma.campaign.create({
      data: {
        title,
        description,
        goal: parsedGoal.toString(),
        deadline: parsedDeadline,
        educationalInstitution,
        courseOfStudy,
        diploma,
        experience,
        fundingType,
        ipfsImages,
        // escrowHash: "escrowHash",
      },
    });
    // await client.disconnect();
    return NextResponse.json({ data: newCampaign });
  } catch (error) {
    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    );
  } finally {
    // Ensure Prisma client is disconnected
    // await client.disconnect();
    await prisma.$disconnect();
  }
}
