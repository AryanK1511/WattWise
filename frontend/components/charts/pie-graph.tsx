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

export function PieGraph({ data, data2 }: { data: any; data2: any }) {
  const [chartData, setChartData] = useState<any>();
  const [totalPower, setTotalPower] = useState<number>(0);

  React.useEffect(() => {
    chartDataHard[0].visitors = Number(data.power);
    chartDataHard[1].visitors = Number(data2.power);
    setChartData(chartDataHard);
    setTotalPower(Number(data.power) + Number(data2.power));
  }, [data]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Current Usage</CardTitle>
        <CardDescription>
          Check hows your electricity is being utlized
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
              animationDuration={500}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalPower.toLocaleString().split(".")[0]}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Watts
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
