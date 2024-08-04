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
  { name: "2024-04-01", desktop: 1.5 * 200, mobile: 800 },
  { name: "2024-04-02", desktop: 1.5 * 200, mobile: 700 },
  { name: "2024-04-03", desktop: 1.5 * 200, mobile: 700 },
  { name: "2024-04-04", desktop: 1.5 * 200, mobile: 710 },
  { name: "2024-04-05", desktop: 1.5 * 200, mobile: 700 },
  { name: "2024-04-06", desktop: 1.5 * 200, mobile: 690 },
  { name: "2024-04-07", desktop: 1.5 * 200, mobile: 690 },
  { name: "2024-04-08", desktop: 1.5 * 200, mobile: 690 },
  { name: "2024-04-09", desktop: 1.5 * 220, mobile: 620 },
  { name: "2024-04-10", desktop: 1.5 * 220, mobile: 620 },
  { name: "2024-04-11", desktop: 1.5 * 300, mobile: 620 },
  { name: "2024-04-12", desktop: 1.5 * 300, mobile: 620 },
  { name: "2024-04-13", desktop: 1.5 * 300, mobile: 620 },
  { name: "2024-04-14", desktop: 1.5 * 300, mobile: 700 },
  { name: "2024-04-15", desktop: 1.5 * 300, mobile: 700 },
  { name: "2024-04-16", desktop: 1.5 * 300, mobile: 600 },
  { name: "2024-04-17", desktop: 1.5 * 260, mobile: 600 },
  { name: "2024-04-18", desktop: 1.5 * 260, mobile: 600 },
  { name: "2024-04-19", desktop: 1.5 * 260, mobile: 510 },
  { name: "2024-04-20", desktop: 1.5 * 260, mobile: 510 },
  { name: "2024-04-21", desktop: 1.5 * 250, mobile: 480 },
  { name: "2024-04-22", desktop: 1.5 * 240, mobile: 480 },
  { name: "2024-04-23", desktop: 1.5 * 230, mobile: 480 },
  { name: "2024-04-24", desktop: 1.5 * 230, mobile: 480 },
  { name: "2024-04-25", desktop: 1.5 * 230, mobile: 540 },
  { name: "2024-04-26", desktop: 1.5 * 230, mobile: 590 },
  { name: "2024-04-27", desktop: 1.5 * 230, mobile: 590 },
  { name: "2024-04-28", desktop: 1.5 * 230, mobile: 590 },
  { name: "2024-04-59", desktop: 1.5 * 230, mobile: 590 },
  { name: "2024-04-30", desktop: 1.5 * 230, mobile: 590 },
  { name: "2024-05-01", desktop: 1.5 * 230, mobile: 590 },
  { name: "2024-05-02", desktop: 1.5 * 240, mobile: 590 },
  { name: "2024-05-03", desktop: 1.5 * 240, mobile: 590 },
  { name: "2024-05-04", desktop: 1.5 * 250, mobile: 590 },
  { name: "2024-05-05", desktop: 1.5 * 250, mobile: 610 },
  { name: "2024-05-06", desktop: 1.5 * 260, mobile: 610 },
  { name: "2024-05-07", desktop: 1.5 * 260, mobile: 540 },
  { name: "2024-05-08", desktop: 1.5 * 270, mobile: 510 },
  { name: "2024-05-01", desktop: 1.5 * 270, mobile: 450 },
  { name: "2024-05-10", desktop: 1.5 * 280, mobile: 525 },
  { name: "2024-05-11", desktop: 1.5 * 280, mobile: 300 },
  { name: "2024-05-12", desktop: 1.5 * 280, mobile: 330 },
  { name: "2024-05-13", desktop: 1.5 * 210, mobile: 330 },
  { name: "2024-05-14", desktop: 1.5 * 290, mobile: 330 },
  { name: "2024-05-15", desktop: 1.5 * 295, mobile: 330 },
  { name: "2024-05-16", desktop: 1.5 * 295, mobile: 330 },
  { name: "2024-05-17", desktop: 1.5 * 295, mobile: 330 },
  { name: "2024-05-18", desktop: 1.5 * 295, mobile: 620 },
  { name: "2024-05-19", desktop: 1.5 * 295, mobile: 590 },
  { name: "2024-05-20", desktop: 1.5 * 300, mobile: 610 },
  { name: "2024-05-21", desktop: 1.5 * 295, mobile: 620 },
  { name: "2024-05-22", desktop: 1.5 * 295, mobile: 620 },
  { name: "2024-05-23", desktop: 1.5 * 295, mobile: 610 },
  { name: "2024-05-24", desktop: 1.5 * 295, mobile: 610 },
  { name: "2024-05-25", desktop: 1.5 * 295, mobile: 610 },
  { name: "2024-05-26", desktop: 1.5 * 295, mobile: 610 },
  { name: "2024-05-27", desktop: 1.5 * 295, mobile: 610 },
  { name: "2024-05-28", desktop: 1.5 * 295, mobile: 690 },
  { name: "2024-05-29", desktop: 1.5 * 295, mobile: 610 },
  { name: "2024-05-30", desktop: 1.5 * 295, mobile: 610 },
  { name: "2024-05-31", desktop: 1.5 * 295, mobile: 590 },
  { name: "2024-06-01", desktop: 1.5 * 190, mobile: 550 },
  { name: "2024-06-02", desktop: 1.5 * 190, mobile: 539 },
  { name: "2024-06-03", desktop: 1.5 * 190, mobile: 510 },
  { name: "2024-06-10", desktop: 1.5 * 200, mobile: 600 },
  { name: "2024-06-11", desktop: 1.5 * 200, mobile: 480 },
  { name: "2024-06-12", desktop: 1.5 * 200, mobile: 480 },
  { name: "2024-06-13", desktop: 1.5 * 200, mobile: 1000 },
  { name: "2024-06-14", desktop: 1.5 * 200, mobile: 1000 },
  { name: "2024-06-15", desktop: 1.5 * 200, mobile: 950 },
  { name: "2024-06-16", desktop: 1.5 * 200, mobile: 940 },
  { name: "2024-06-17", desktop: 1.5 * 190, mobile: 910 },
  { name: "2024-06-18", desktop: 1.5 * 190, mobile: 910 },
  { name: "2024-06-19", desktop: 1.5 * 190, mobile: 910 },
  { name: "2024-06-20", desktop: 1.5 * 180, mobile: 910 },
  { name: "2024-06-21", desktop: 1.5 * 180, mobile: 890 },
  { name: "2024-06-22", desktop: 1.5 * 300, mobile: 890 },
  { name: "2024-06-23", desktop: 1.5 * 180, mobile: 850 },
  { name: "2024-06-24", desktop: 1.5 * 190, mobile: 850 },
  { name: "2024-06-25", desktop: 1.5 * 190, mobile: 840 },
  { name: "2024-06-26", desktop: 1.5 * 190, mobile: 840 },
  { name: "2024-06-27", desktop: 1.5 * 190, mobile: 830 },
  { name: "2024-06-28", desktop: 1.5 * 190, mobile: 780 },
  { name: "2024-06-29", desktop: 1.5 * 190, mobile: 750 },
  { name: "2024-06-30", desktop: 1.5 * 190, mobile: 750 },
  { name: "2024-06-07", desktop: 1.5 * 190, mobile: 480 },
  { name: "2024-06-08", desktop: 1.5 * 190, mobile: 480 },
  { name: "2024-06-09", desktop: 1.5 * 200, mobile: 480 },
  { name: "2024-06-04", desktop: 1.5 * 190, mobile: 430 },
  { name: "2024-06-05", desktop: 1.5 * 190, mobile: 430 },
  { name: "2024-06-06", desktop: 1.5 * 190, mobile: 320 },
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

export function BarGraph({ data, data2 }: { data: any; data2: any }) {
  const [chartData, setChartData] = useState<any>();
  const [total, setTotal] = useState<any>({ desktop: 0, mobile: 0 });
  const [count, setCount] = useState(0);
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop");

  React.useEffect(() => {
    chartDataHard[chartDataHard.length - 1].desktop = Number.isNaN(
      Number(data.power)
    )
      ? 0
      : Number(data.power);
    chartDataHard[chartDataHard.length - 1].mobile = Number.isNaN(
      Number(data2.power)
    )
      ? 0
      : Number(data2.power);

    if (
      data.power != 0 &&
      data2.power != 0 &&
      !Number.isNaN(Number(data.power)) &&
      !Number.isNaN(Number(data2.power))
    ) {
      setCount(count + 1);
      let hour = Number(
        chartDataHard[chartDataHard.length - 1].name.split(":")[0]
      );
      let minute = Number(
        chartDataHard[chartDataHard.length - 1].name.split(":")[1]
      );
      setChartData(chartDataHard.shift());
      minute = minute + 1;
      if (minute > 59) {
        minute = 0;
        hour = hour + 1;
      }
      chartDataHard.push({
        name: `${hour}:${minute}`,
        desktop: Number(data.power),
        mobile: Number(data2.power),
      });
    }

    let currentTime = new Date().getTime();
    currentTime += count * 60000;
    let currentHour, currentMinute;

    for (let i = 90; i >= 0; i--) {
      currentHour = new Date(currentTime).getHours();
      currentMinute = new Date(currentTime).getMinutes();

      chartDataHard[i].name = `${currentHour
        .toString()
        .padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
      currentTime -= 60000;
    }

    let cumBuilding1 = 0;
    let cumBuilding2 = 0;
    for (let i = 0; i < 90; i++) {
      cumBuilding1 += chartDataHard[i + 1].desktop;
      cumBuilding2 += chartDataHard[i + 1].mobile;
    }

    setChartData(chartDataHard);
    setTotal({
      desktop: cumBuilding1.toString().split(".")[0],
      mobile: cumBuilding2.toString().split(".")[0],
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
                    ? "Building 1"
                    : "Building 2"}
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
