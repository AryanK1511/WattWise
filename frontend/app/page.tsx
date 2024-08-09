"use client";

import { AreaGraph } from "@/components/charts/area-graph";
import { BarGraph } from "@/components/charts/bar-graph";
import { MathGrid } from "@/components/charts/math-grid";
import { PieGraph } from "@/components/charts/pie-graph";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>({});
  const [data2, setData2] = useState<any>({});
  const { toast } = useToast();

  // Fetch the data from dynamo DB
  const getDynamoData = async () => {
    try {
      const res = await fetch(`/api/dynamo`);
      const res2 = await fetch(`/api/dynamo2`);

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const res_data = await res.json();
      const res_data2 = await res2.json();

      if (res_data.power < 0) res_data.power * -1;
      if (res_data2.power < 0) res_data2.power * -1;

      setData(res_data);
      setData2(res_data2);

      if (res_data.power > 1500 || res_data.power < 150) {
        toast({
          title: "Warning, unusual power consumption detected!",
          description:
            "This is a warning message signifying unusual power consumption, beyond your limits of 150-1400 watts.",
          type: "foreground",
        });
      }

      return res_data;
    } catch (err) {
      console.log(err);
    }
  };

  // const getGeminiToast = async (data: string) => {
  //   toast({
  //     title: "We've noticed some interesting data!",
  //     description: data,
  //     type: "success",
  //   });
  // };

  // // Fetch the data every 1.3 seconds
  useEffect(() => {
    const intervalId = setInterval(async () => {
      await getDynamoData();
      console.log("The data is: ", data, data2);
    }, 1300);

    // const geminiIntervalId = setInterval(async () => {
    // const gemini_res = await fetch(`/api/gemini`);

    // if (!gemini_res.ok) {
    //   throw new Error("Something went wrong!");
    // }

    // const gemini_res_data = await gemini_res.text();
    // console.log("The gemini data is: ", gemini_res_data);
    // getGeminiToast(gemini_res_data);
    // }, 120000);

    // Clear interval on component unmount
    return () => {
      clearInterval(intervalId);
      // clearInterval(geminiIntervalId);
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <BarGraph data={data} data2={data2} />
        </div>
        <div className="col-span-3">
          <MathGrid data={data} />
        </div>
        <div className="col-span-4">
          <AreaGraph />
        </div>
        <div className="col-span-4 md:col-span-3">
          <PieGraph data={data} data2={data2} />
        </div>
      </div>
    </>
  );
}
