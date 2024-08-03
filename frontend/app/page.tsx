"use client";
import { AreaGraph } from "@/components/charts/area-graph";
import { BarGraph } from "@/components/charts/bar-graph";
import { PieGraph } from "@/components/charts/pie-graph";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>({
    data: {
      power: "378",
      timestamp: "2024-08-03T09:28:41.000Z",
      weekday: 5,
      is_weekend: 1,
      is_public_holiday: 0,
    },
  });

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
    const intervalId = setInterval(async () => {
      await getDynamoData();
      console.log("The data is: ", data);
    }, 1300);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [data]);

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
