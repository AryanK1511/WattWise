import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const url = "https://cyan-pillows-smash.loca.lt/power/arduino/current";

// const url = "http://localhost:3000/power/arduino/current";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const res = await axios.get(url);

    if (res.status !== 200) {
      throw new Error("Something went wrong!");
    }

    const responseData = res.data[0];

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(`Failed to get data: ${error}`, { status: 500 });
  }
}
