export const registerUser = async (registerData) => {
  const res = await fetch("http://localhost:3000/api/users/register", {
    credentials: 'include',
    method: "POST",
    body: JSON.stringify(registerData),
    headers: { "Content-type": "application/json" },
  });

  console.log(res);

  if (!res.ok) throw new Error("Register unsuccessful");
  return await res.json();
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
  return await res.json();
}

export const isAuthenticated = () => {

  // reeturn true or false
  return sessionStorage.getItem("res-dedaci") === 'true';
}

export const signOut = async () => {
  // remove the res-dedaci
  sessionStorage.removeItem('res-dedaci');

  // remove the httpOnly jwt cookie
  const res = await fetch("http://localhost:3000/api/users/logout", {
    credentials: "include",
    method: "POST",
  })

  return res;
}