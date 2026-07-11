import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const turfData = await request.json();

    const client = await clientPromise;
    const db = client.db("turf");

    const result = await db.collection("turfs").insertOne({
      ...turfData,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to add turf" },
      { status: 500 }
    );
  }
}