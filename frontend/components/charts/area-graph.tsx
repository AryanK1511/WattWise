"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function AreaGraph({ data }: { data: any }) {
  const [dataArray, setDataArray] = useState<any[]>([]);
  const [predictedData, setPredictedData] = useState<any>({});

  for (let i = 0; i < 24; i++) {
    let hour = i;
    // change things here - KRINS
    dataArray.push({
      hour: i,
      weekday: 0,
      is_weekend: 0,
      is_public_holiday: 0,
    });
  }

  // Fetch the data from flask model
  const getPredictedData = async () => {
    try {
      const res = await fetch(`/api/flask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          dataArray.map((data) => {
            return {
              hour: data.hour,
              weekday: data.weekday,
              is_weekend: data.is_weekend,
              is_public_holiday: data.is_public_holiday,
            };
          })
        ),
      });

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const res_data = await res.json();
      setPredictedData(res_data);
    } catch (err) {
      console.log(err);
    }
  };

  // Update the data array and fetch new predicted data
  useEffect(() => {
    const intervalId = setInterval(async () => {
      await getPredictedData();
      console.log("The predicted data is: ", predictedData);
    }, 1300);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [predictedData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Stacked</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[310px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}