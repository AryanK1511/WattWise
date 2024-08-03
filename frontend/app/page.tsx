"use client";
import { AreaGraph } from "@/components/charts/area-graph";
import { BarGraph } from "@/components/charts/bar-graph";
import { PieGraph } from "@/components/charts/pie-graph";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>();

  const url = "https://a6db-138-51-93-60.ngrok-free.app/power/arduino/current";
  const getDynamoData = async () => {
    try {
      const res = await fetch(`/api/dynamo`);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const res_data = await res.json();
      setData(res_data);
      return res_data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("use effect");
    const intervalId = setInterval(() => {
      getDynamoData();
    }, 3000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <BarGraph data={data} />
        </div>
        <div className="col-span-4">
          <AreaGraph />
        </div>
        <div className="col-span-4 md:col-span-3">
          <PieGraph data={data} />
        </div>
      </div>
    </>
  );
}
