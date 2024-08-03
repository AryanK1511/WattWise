import axios from "axios";

const url = "https://c94a-138-51-93-41.ngrok-free.app/power/arduino";

export async function getDynamoData() {
  return axios.get(url + "/current").then((res: { data: any }) => res.data);
}

export function getAllDynamo() {
  return axios.get(url);
}

export function getLastDynamo(interval: number) {
  return axios.get(`${url}?limit=${interval}`);
}
