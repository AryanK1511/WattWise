import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { time } from "console";

//const url = "https://a6db-138-51-93-60.ngrok-free.app/power/arduino?limit=60";
const url = "http://localhost:3000/power/arduino?limit=60";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { hour, weekday, is_public_holiday, is_weekend } = await req.json();

    const flask_res = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hour: hour,
        weekday: weekday,
        is_weekend: is_weekend,
        is_holiday: is_public_holiday,
      }),
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
