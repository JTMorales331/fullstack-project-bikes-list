const url = import.meta.env.VITE_API_URL

export const getBikes = async (query) => {
  console.log({ query })
  try {
    let res = ""
    if (query.trim() !== "") {
      res = await fetch(`${url}/bikes?${new URLSearchParams({ q: query })}`)
    } else {

      res = await fetch(`${url}/bikes`)
    }

    const data = await res.json()
    console.log("Refetched")
    return data
  } catch (err) {
    throw new Error("Retrieving of bikes unsuccessful: ", err)
  }
}

export const getBikeById = async (id) => {
  console.log({ id })
  try {
    const res = await fetch(`${url}/bikes/${id}`)

    if (!res.ok) {
      throw new Error(`Failed to fetch bikes: ${res.status}`)
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
    const res = await fetch(`${url}/bikes/`,
      {
        credentials: 'include',
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to post bike: ${res.status}`)
    }


    return await res.json();

  } catch (err) {
    throw new Error("Bike post unsuccessful: " + err)
  }
}


export const updateBike = async (id, data) => {
  try {
    const res = await fetch(`${url}/api/bikes/${id}`,
      {
        credentials: 'include',
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to post bike: ${res.status}`)
    }


    return await res.json();

  } catch (err) {
    throw new Error("Bike post unsuccessful: " + err)
  }
}

export const deleteBike = async (id) => {
  try {
    const res = await fetch(`${url}/bikes/${id}`,
      {
        credentials: 'include',
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to post bike: ${res.status}`)
    }

    return;

  } catch (err) {
    throw new Error("Bike post unsuccessful: " + err)
  }
}