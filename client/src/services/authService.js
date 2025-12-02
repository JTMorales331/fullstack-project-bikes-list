export const registerUser = async (registerData) => {
  const res = await fetch("http://localhost:3000/api/users/register", {
    credentials: 'include',
    method: "POST",
    body: JSON.stringify(registerData),
    headers: { "Content-type": "application/json" },
  });

  console.log(res);

  if (!res.ok) throw new Error("Login unsuccessful");
  const data = await res.json();
  sessionStorage.setItem("user-email", data.email);
  sessionStorage.setItem("res-dedaci", true);

  if (!res.ok) throw new Error("Register unsuccessful");
  return data
}

export const loginUser = async (loginData) => {
  const res = await fetch("http://localhost:3000/api/users/login", {
    credentials: 'include',
    method: "POST",
    body: JSON.stringify(loginData),
    headers: { "Content-type": "application/json" },
  });

  console.log(res);

  if (!res.ok) throw new Error("Login unsuccessful");
  const data = await res.json();

  sessionStorage.setItem("user-email", data.email);
  sessionStorage.setItem("res-dedaci", true);

  return data;
}

export const isAuthenticated = () => {

  // reeturn true or false
  return sessionStorage.getItem("res-dedaci") === 'true';
}

export const getCurrentAuthUser = () => {

  // reeturn true or false
  return sessionStorage.getItem("user-email");
}

export const signOut = async () => {

  try {

    // remove the httpOnly jwt cookie
    const res = await fetch("http://localhost:3000/api/users/logout", {
      credentials: "include",
      method: "POST",
    })


    console.log({ res })
    sessionStorage.removeItem("res-dedaci");
    sessionStorage.removeItem("user-email");
    return true;

  } catch (err) {
    // throw new Error("Error signing out: ", err?.message)
    return false;
  }
}