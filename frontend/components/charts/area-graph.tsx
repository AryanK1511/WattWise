"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { LineChart, CartesianGrid, Line, XAxis, ReferenceLine } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

let chartData = [
  { time: "", building1: 400, building2: 230 },
  { time: "", building1: 450, building2: 210 },
  { time: "", building1: 500, building2: 240 },
  { time: "", building1: 525, building2: 190 },
  { time: "", building1: 500, building2: 190 },
  { time: "", building1: 475, building2: 190 },
  { time: "", building1: 475, building2: 200 },
  { time: "", building1: 475, building2: 240 },
];

const chartConfig = {
  building1: {
    label: "Building1",
    color: "hsl(var(--chart-1))",
  },
  building2: {
    label: "Building2",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function AreaGraph() {
  const [predictedData, setPredictedData] = useState<any>({});
  const [currentHourState, setCurrentHourState] = useState<number>(0);
  const [chart, setChart] = useState<any>({});

  // Fetch the data from flask model
  const getPredictedData = async () => {
    let dataArray = [];
    let currentHour = Number(new Date().getHours().toString());
    let weekday = 6;
    let isWeekend = 1;

    for (let i = 0; i < 8; i++) {
      dataArray.push({
        hour: currentHour,
        weekday: weekday,
        is_weekend: isWeekend,
        is_public_holiday: 0,
      });

      currentHour++;
      if (currentHour > 23) {
        currentHour = 0;

        weekday++;
        if (weekday > 6) {
          weekday = 0;
        }

        if (weekday === 5 || weekday === 6) {
          isWeekend = 1;
        }
      }
    }

    try {
      const res = await fetch(`/api/flask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataArray),
      });

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const res_data = await res.json();
      console.log("The predicted data is: ", res_data);
      setPredictedData(res_data);
    } catch (err) {
      console.log(err);
    }
  };

  // Update the data array and fetch new predicted data
  useEffect(() => {
    let currentTime = new Date().getTime();
    let currentHour, currentMinute;
    getPredictedData();

    setCurrentHourState(Number(new Date().getHours().toString()));
    for (let i = 7; i >= 0; i--) {
      currentHour = new Date(currentTime).getHours();
      if (currentHour > 23) {
        currentHour = 0;
      }
      chartData[i].time = `${currentHour.toString().padStart(2, "0")}`;
      currentTime -= 60000 * 60;
    }

    // currentTime = new Date().getTime();
    // for (let i = 0; i < 8; i++) {
    //   currentHour = new Date(currentTime).getHours() + 1;
    //   if (currentHour > 23) {
    //     currentHour = 0;
    //   }
    //   let time = `${currentHour.toString().padStart(2, "0")}`;
    //   chartData.push({
    //     time: time,
    //     building1: predictedData[i],
    //     building2: predictedData[i],
    //   });
    //   currentTime += 60000 * 60;
    // }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Predicted Usage</CardTitle>
        <CardDescription>
          Showing last 8 hours of usage and predicted usage for the next 8
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[310px] w-full"
        >
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ReferenceLine x="08" stroke="red" />
            <Line
              dataKey="building2"
              type="natural"
              fill="var(--color-building1)"
              fillOpacity={0.4}
              stroke="var(--color-building1)"
            />
            <Line
              dataKey="building1"
              type="natural"
              fill="var(--color-building2)"
              fillOpacity={0.4}
              stroke="var(--color-building2)"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
