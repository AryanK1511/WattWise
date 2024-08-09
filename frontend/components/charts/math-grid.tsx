"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MathGrid({ data, data2 }: { data: any; data2: any }) {
  const [reading, setReading] = useState(0);
  const cardItems = [
    {
      title: "Usage Per Day",
      value: `${
        (Number(data.power * 15) * 24).toFixed(1) +
        (Number(data2.power * 15) * 24).toFixed(1)
      } kWh`,
    },
    {
      title: "Usage Per Month",
      value: `${
        (Number(data.power * 15) * 24 * 30).toFixed(1) +
        (Number(data2.power * 15) * 24 * 30).toFixed(1)
      } kWh`,
    },
    {
      title: "Cost Prediction",
      value: `$${
        (Number(data.power * 15) * 0.122).toFixed(1) +
        (Number(data2.power * 15) * 0.122).toFixed(1)
      }`,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1 text-center">
      {cardItems.map((item, index) => (
        <Card key={index} className="flex flex-col col-span-1">
          <CardHeader className="items-center pb-0">
            <CardTitle className="text-lg">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center text-5xl text-blue-600 py-4">
            {item.value}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
