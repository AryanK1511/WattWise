import { NextRequest, NextResponse } from "next/server";
import { getResponse } from "./model";
import axios from "axios";

const url = "https://a6db-138-51-93-60.ngrok-free.app/power/arduino?limit=60";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const ngrok_res = await axios.get(url);

    if (ngrok_res.status !== 200) {
      throw new Error("Something went wrong!");
    }

    const ngrok_responseData = ngrok_res.data[0];

    const gemini_res = await getResponse(ngrok_responseData);

    return new Response(gemini_res, {
      status: 200,
    });
  } catch (error) {
    return new Response(`Failed to get data: ${error}`, { status: 500 });
  }
}
