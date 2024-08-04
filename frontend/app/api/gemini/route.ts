import { NextRequest, NextResponse } from "next/server";
import { getResponse } from "./model";
import axios from "axios";

//const url = "https://a6db-138-51-93-60.ngrok-free.app/power/arduino?limit=60";
const url = "http://localhost:3000/power/arduino?limit=120";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const ngrok_res = await axios.get(url);

    if (ngrok_res.status !== 200) {
      throw new Error("Something went wrong!");
    }

    const ngrok_responseData = ngrok_res.data;
    const extractedData = ngrok_responseData.map((data: any) => ({
      power: data.power,
      hour: data.hour,
      weekday: data.weekday,
      is_weekend: data.is_weekend,
      is_public_holiday: data.is_public_holiday,
    }));

    const gemini_res = await getResponse(JSON.stringify(extractedData));

    return new Response(gemini_res, {
      status: 200,
    });
  } catch (error) {
    return new Response(`Failed to get data: ${error}`, { status: 500 });
  }
}
