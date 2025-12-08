export const getBikes = async (query) => {
  console.log({ query })
  try {
    let res = ""
    if (query.trim() !== "") {
      res = await fetch(`http://localhost:3000/api/bikes?${new URLSearchParams({ q: query })}`)
    } else {

      res = await fetch(`http://localhost:3000/api/bikes`)
    }

    const data = await res.json()
    console.log({ data })
    return data
  } catch (err) {
    throw new Error("Retrieving of bikes unsuccessful: ", err)
  }
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