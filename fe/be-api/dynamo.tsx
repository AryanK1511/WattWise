import axios from "axios";

const url = "https://a6db-138-51-93-60.ngrok-free.app/power/arduino";

export const getDynamoData = async () => {
  try {
    const res = await fetch(`${url}/current`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

// export async function getDynamoData() {
//   // try {
//   //   const result = await fetch(url + "/current");
//   //   console.log("inside dynamo data");
//   //   return await result.json();
//   // } catch (error) {
//   //   console.log("error: " + error);
//   // }
//   // const result = await fetch(url + "/current");
//   // console.log("inside dynamo data");
//   return axios
//     .get(url + "/current")
//     .then((res: { data: any }) => res.data)
//     .catch((err) => console.log("The dynamo error is: ", err));
//   // return fetch(url + "/current").then((res) => res.json());
// }

export function getAllDynamo() {
  return axios.get(url);
}

export function getLastDynamo(interval: number) {
  return axios.get(`${url}?limit=${interval}`);
}
