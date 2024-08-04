import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { time } from "console";

const url = "https://polite-mice-reply.loca.lt/predict";
// const url = "http://localhost:3000/power/arduino?limit=60";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const record_array = await req.json();

    const flask_res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record_array),
    });

    if (flask_res.status !== 200) {
      throw new Error("Something went wrong!");
    }

    const flask_responseData = await flask_res.json();

    return new Response(flask_responseData, {
      status: 200,
    });
  } catch (error) {
    return new Response(`Failed to get data: ${error}`, { status: 500 });
  }
}
