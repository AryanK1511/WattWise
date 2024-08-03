const apiUrl = "http://localhost:3000";

const getCurrentPower = async () => {
  const res = await fetch(`${apiUrl}/power/arduino/current`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  return data;
};

export { getCurrentPower };
