"use client";
import { AreaGraph } from "@/components/charts/area-graph";
import { BarGraph } from "@/components/charts/bar-graph";
import { PieGraph } from "@/components/charts/pie-graph";
import { getDynamoData } from "@/be-api/dynamo";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>();

  setInterval(() => {
    getDynamoData().then((res) => {
      setData(res.data);
      console.log("got a new data " + Object.keys(res));
    });
  }, 3000);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <BarGraph />
        </div>
        <div className="col-span-4">
          <AreaGraph />
        </div>
        <div className="col-span-4 md:col-span-3">
          <PieGraph />
        </div>
      </div>
    </>
  );
}
