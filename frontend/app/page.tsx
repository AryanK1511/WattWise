"use client";

import { AreaGraph } from "@/components/charts/area-graph";
import { BarGraph } from "@/components/charts/bar-graph";
import { MathGrid } from "@/components/charts/math-grid";
import { PieGraph } from "@/components/charts/pie-graph";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>({});
  const { toast } = useToast();

  // Fetch the data from dynamo DB
  const getDynamoData = async () => {
    try {
      const res = await fetch(`/api/dynamo`);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const res_data = await res.json();
      setData(res_data);

      if (res_data.power > 700 || res_data.power < 300) {
        toast({
          title: "Warning, unusual power consumption detected!",
          description:
            "This is a warning message signifying unusual power consumption, beyond your limits of 300-700 watts.",
          type: "error",
        });
      }

      return res_data;
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch the data every 1.3 seconds
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
        <div className="col-span-3">
          <MathGrid data={data} />
        </div>
        <div className="col-span-4">
          <AreaGraph data={data} />
        </div>
        <div className="col-span-4 md:col-span-3">
          <PieGraph data={data} />
        </div>
      </div>
    </>
  );
}
