export const getBikes = () => {
  return fetch("http://localhost:3000/api/bikes")
}

export const postBike = async (data) => {
  try {
    const res = await fetch("http://localhost:3000/api/bikes/",
      {
        credentials: 'include',
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" },
      }
    );

    return await res.json();

  } catch (err) {
    throw new Error("Bike post unsuccessful: " + err)
  }
}