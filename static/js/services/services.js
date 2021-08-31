import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";

const login = async (id, password) => {
  const data = await fetchJSON("/api/login", {
    ID: id,
    password,
  })
  return data
}

const getFriends = async (id, session) => {
  await fetchJSON("/api/getFriends", {
    ID: id,
    session,
  })
}

export {
  login,
  getFriends,
}