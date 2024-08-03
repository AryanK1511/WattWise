"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { Label, Pie, PieChart } from "recharts";

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

let chartDataHard = [
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "other", visitors: 100, fill: "var(--color-other)" },
];

const chartConfig = {
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-5))",
  },
  other: {
    label: "Other",
    color: "#12B981",
  },
} satisfies ChartConfig;

export function MathGrid({ data }: { data: any }) {
  const [chartData, setChartData] = useState<any>();
  const [totalPower, setTotalPower] = useState<number>(0);

  React.useEffect(() => {
    chartDataHard[0].visitors = Number(data.power);
    setChartData(chartDataHard);
    setTotalPower(Number(data.power) + 100);
  }, [data]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6  text-center">
      <Card className="flex flex-col col-span-3">
        <CardHeader className="items-center pb-0">
          <CardTitle>Usage Per hour</CardTitle>
          <CardDescription>
            Check hows your electricity is being utlized
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0"></CardContent>
      </Card>
      <Card className="flex flex-col col-span-3">
        <CardHeader className="items-center pb-0">
          <CardTitle>Usage per Day</CardTitle>
          <CardDescription>
            Check hows your electricity is being utlized
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0"></CardContent>
      </Card>
      <Card className="flex flex-col col-span-3">
        <CardHeader className="items-center pb-0">
          <CardTitle>Usage per Month</CardTitle>
          <CardDescription>
            Check hows your electricity is being utlized
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0"></CardContent>
      </Card>
      <Card className="flex flex-col col-span-3">
        <CardHeader className="items-center pb-0">
          <CardTitle>Cost Prediction</CardTitle>
          <CardDescription>
            Check hows your electricity is being utlized
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0"></CardContent>
      </Card>
    </div>
  );
}
