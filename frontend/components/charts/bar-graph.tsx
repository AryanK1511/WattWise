"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { time } from "console";

export const description = "An interactive bar chart";

const chartDataHard = [
  { name: "2024-04-01", desktop: 2.5 * 200, mobile: 150 },
  { name: "2024-04-02", desktop: 2.5 * 200, mobile: 180 },
  { name: "2024-04-03", desktop: 2.5 * 200, mobile: 120 },
  { name: "2024-04-04", desktop: 2.5 * 200, mobile: 260 },
  { name: "2024-04-05", desktop: 2.5 * 200, mobile: 290 },
  { name: "2024-04-06", desktop: 2.5 * 200, mobile: 340 },
  { name: "2024-04-07", desktop: 2.5 * 200, mobile: 180 },
  { name: "2024-04-08", desktop: 2.5 * 200, mobile: 320 },
  { name: "2024-04-09", desktop: 2.5 * 220, mobile: 110 },
  { name: "2024-04-10", desktop: 2.5 * 220, mobile: 190 },
  { name: "2024-04-11", desktop: 2.5 * 300, mobile: 350 },
  { name: "2024-04-12", desktop: 2.5 * 300, mobile: 210 },
  { name: "2024-04-13", desktop: 2.5 * 300, mobile: 380 },
  { name: "2024-04-14", desktop: 2.5 * 300, mobile: 220 },
  { name: "2024-04-15", desktop: 2.5 * 300, mobile: 170 },
  { name: "2024-04-16", desktop: 2.5 * 300, mobile: 190 },
  { name: "2024-04-17", desktop: 2.5 * 260, mobile: 360 },
  { name: "2024-04-18", desktop: 2.5 * 260, mobile: 410 },
  { name: "2024-04-19", desktop: 2.5 * 260, mobile: 180 },
  { name: "2024-04-20", desktop: 2.5 * 260, mobile: 150 },
  { name: "2024-04-21", desktop: 2.5 * 250, mobile: 200 },
  { name: "2024-04-22", desktop: 2.5 * 240, mobile: 170 },
  { name: "2024-04-23", desktop: 2.5 * 230, mobile: 230 },
  { name: "2024-04-24", desktop: 2.5 * 230, mobile: 290 },
  { name: "2024-04-25", desktop: 2.5 * 230, mobile: 250 },
  { name: "2024-04-26", desktop: 2.5 * 230, mobile: 130 },
  { name: "2024-04-27", desktop: 2.5 * 230, mobile: 420 },
  { name: "2024-04-28", desktop: 2.5 * 230, mobile: 180 },
  { name: "2024-04-29", desktop: 2.5 * 230, mobile: 240 },
  { name: "2024-04-30", desktop: 2.5 * 230, mobile: 380 },
  { name: "2024-05-01", desktop: 2.5 * 230, mobile: 220 },
  { name: "2024-05-02", desktop: 2.5 * 240, mobile: 310 },
  { name: "2024-05-03", desktop: 2.5 * 240, mobile: 190 },
  { name: "2024-05-04", desktop: 2.5 * 250, mobile: 420 },
  { name: "2024-05-05", desktop: 2.5 * 250, mobile: 390 },
  { name: "2024-05-06", desktop: 2.5 * 260, mobile: 520 },
  { name: "2024-05-07", desktop: 2.5 * 260, mobile: 300 },
  { name: "2024-05-08", desktop: 2.5 * 270, mobile: 210 },
  { name: "2024-05-09", desktop: 2.5 * 270, mobile: 180 },
  { name: "2024-05-10", desktop: 2.5 * 280, mobile: 330 },
  { name: "2024-05-11", desktop: 2.5 * 280, mobile: 270 },
  { name: "2024-05-12", desktop: 2.5 * 280, mobile: 240 },
  { name: "2024-05-13", desktop: 2.5 * 290, mobile: 160 },
  { name: "2024-05-14", desktop: 2.5 * 290, mobile: 490 },
  { name: "2024-05-15", desktop: 2.5 * 295, mobile: 380 },
  { name: "2024-05-16", desktop: 2.5 * 295, mobile: 400 },
  { name: "2024-05-17", desktop: 2.5 * 295, mobile: 420 },
  { name: "2024-05-18", desktop: 2.5 * 295, mobile: 350 },
  { name: "2024-05-19", desktop: 2.5 * 295, mobile: 180 },
  { name: "2024-05-20", desktop: 2.5 * 300, mobile: 230 },
  { name: "2024-05-21", desktop: 2.5 * 295, mobile: 140 },
  { name: "2024-05-22", desktop: 2.5 * 295, mobile: 120 },
  { name: "2024-05-23", desktop: 2.5 * 295, mobile: 290 },
  { name: "2024-05-24", desktop: 2.5 * 295, mobile: 220 },
  { name: "2024-05-25", desktop: 2.5 * 295, mobile: 250 },
  { name: "2024-05-26", desktop: 2.5 * 295, mobile: 170 },
  { name: "2024-05-27", desktop: 2.5 * 295, mobile: 460 },
  { name: "2024-05-28", desktop: 2.5 * 295, mobile: 190 },
  { name: "2024-05-29", desktop: 2.5 * 295, mobile: 130 },
  { name: "2024-05-30", desktop: 2.5 * 295, mobile: 280 },
  { name: "2024-05-31", desktop: 2.5 * 295, mobile: 230 },
  { name: "2024-06-01", desktop: 2.5 * 190, mobile: 200 },
  { name: "2024-06-02", desktop: 2.5 * 190, mobile: 410 },
  { name: "2024-06-03", desktop: 2.5 * 190, mobile: 160 },
  { name: "2024-06-04", desktop: 2.5 * 190, mobile: 380 },
  { name: "2024-06-05", desktop: 2.5 * 190, mobile: 140 },
  { name: "2024-06-06", desktop: 2.5 * 190, mobile: 250 },
  { name: "2024-06-07", desktop: 2.5 * 190, mobile: 370 },
  { name: "2024-06-08", desktop: 2.5 * 190, mobile: 320 },
  { name: "2024-06-09", desktop: 2.5 * 200, mobile: 480 },
  { name: "2024-06-10", desktop: 2.5 * 200, mobile: 200 },
  { name: "2024-06-11", desktop: 2.5 * 200, mobile: 150 },
  { name: "2024-06-12", desktop: 2.5 * 200, mobile: 420 },
  { name: "2024-06-13", desktop: 2.5 * 200, mobile: 130 },
  { name: "2024-06-14", desktop: 2.5 * 200, mobile: 380 },
  { name: "2024-06-15", desktop: 2.5 * 200, mobile: 350 },
  { name: "2024-06-16", desktop: 2.5 * 200, mobile: 310 },
  { name: "2024-06-17", desktop: 2.5 * 190, mobile: 520 },
  { name: "2024-06-18", desktop: 2.5 * 190, mobile: 170 },
  { name: "2024-06-19", desktop: 2.5 * 190, mobile: 290 },
  { name: "2024-06-20", desktop: 2.5 * 180, mobile: 450 },
  { name: "2024-06-21", desktop: 2.5 * 180, mobile: 210 },
  { name: "2024-06-22", desktop: 2.5 * 300, mobile: 270 },
  { name: "2024-06-23", desktop: 2.5 * 180, mobile: 530 },
  { name: "2024-06-24", desktop: 2.5 * 190, mobile: 180 },
  { name: "2024-06-25", desktop: 2.5 * 190, mobile: 190 },
  { name: "2024-06-26", desktop: 2.5 * 190, mobile: 380 },
  { name: "2024-06-27", desktop: 2.5 * 190, mobile: 490 },
  { name: "2024-06-28", desktop: 2.5 * 190, mobile: 200 },
  { name: "2024-06-29", desktop: 2.5 * 190, mobile: 160 },
  { name: "2024-06-30", desktop: 2.5 * 190, mobile: 400 },
];

const chartConfig = {
  views: {
    label: "Power Usage Per Minute",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-5))",
  },
  mobile: {
    label: "Mobile",
    color: "#12B981",
  },
} satisfies ChartConfig;

export function BarGraph(data: any) {
  const [chartData, setChartData] = useState<any>();
  const [total, setTotal] = useState<any>({ desktop: 0, mobile: 0 });
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop");

  React.useEffect(() => {
    chartDataHard[chartDataHard.length - 1].desktop = Number(data.data.power);

    let currentTime = new Date().getTime();
    let currentHour, currentMinute;

    for (let i = 90; i >= 0; i--) {
      currentHour = new Date(currentTime).getHours();
      currentMinute = new Date(currentTime).getMinutes();
      chartDataHard[i].name = `${currentHour
        .toString()
        .padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
      currentTime -= 60000 * 60;
    }

    setChartData(chartDataHard);
    setTotal({
      desktop: chartDataHard.reduce((acc, { desktop }) => acc + desktop, 0),
      mobile: chartDataHard.reduce((acc, { mobile }) => acc + mobile, 0),
    });
  }, [data]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Power Consumption</CardTitle>
          <CardDescription>
            Showing the power consumption in the last 90 minutes
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label == "Desktop"
                    ? "Drawing Room"
                    : "Bedroom"}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {chartConfig[chart].label == "Desktop"
                    ? total.desktop
                    : total.mobile}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              // tickFormatter={(value) => {
              //   const date = new Date(value);
              //   return date.toLocaleDateString("en-US", {
              //     month: "short",
              //     day: "numeric",
              //   });
              // }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  // labelFormatter={(value) => {
                  //   return new Date(value).toLocaleDateString("en-US", {
                  //     month: "short",
                  //     day: "numeric",
                  //     year: "numeric",
                  //   });
                  // }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
