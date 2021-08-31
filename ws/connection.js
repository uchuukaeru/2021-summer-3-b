import { isWebSocketCloseEvent } from "http://deno.land/std/ws/mod.ts"
import { v4 } from "https://deno.land/std/uuid/mod.ts"
import { JSONDB } from "https://js.sabae.cc/JSONDB.js";

const UESRS_PATH = './ws/users.json'
const usersDb = new JSONDB(UESRS_PATH)

/** @type Map<User, WebSocket> */
const clients = new Map()
/** @type Map<Room, WebSocket> */
const rooms = new Map()


const sockConnection = async (ws) => {
  const uid = v4.generate()
  clients.set(uid, ws)

  for await (const ev of ws) {
    if (isWebSocketCloseEvent(ev)) {
      clients.delete(uid)
    }

    if (typeof ev === "string") {
      const { event, data } = on(ws, ev)
      switch (event) {
        case "login":
          handleLogin(ws, data)
          break
        case "createRoom":
          handleCreateRoom(ws)
          break
        case "joinRoom":
          handleJoinRoom(ws, data)
          break
      }
    }
  }
}

const on = (ws, event) => {
  const obj = JSON.parse(event)
  if (!obj["event"]) sendError(ws, "please some event")
  return obj
};

const sendJSON = async (ws, onj) => {
  try {
    await ws.send(JSON.stringify(obj))
  } catch (e) {
    sendError(ws, e)
  }
}

const sendError = async (ws, text) => {
  console.error(text)
}

const broadcast = (wsarr, obj) => {
  wsarr.forEach((ws) => {
    ws.send(JSON.stringify(obj))
  })
}

/**
 * @param {WebSocket} ws
 * @param {Object} data
 * @param {String} data.session_id
 * @param {String} data.nickname
 * @param {User} user
 */
const handleLogin = async (ws, data) => {
  try {

    if (data.hasOwnProperty("nickname")) {
      await sendError(ws, "nickname is required")
    }

    const user = clients.get(data["session_id"])
    if (user) {
      if (user["id"] !== sessionId) {
        await sendError(ws, "please login")
      } else {
        user.attachWebSocket(ws)
      }
    }

    if (!user) {
      user = new User(ws, data.nickname)
      clients.set(user.id, user)
    }

  } catch (e) {
    console.error(e)
  }
}

const handleCreateRoom = async (ws, data) => {
  if (!data["room"]) {
    // const room = rooms.get(room)
  }
}

const handleJoinRoom = async () => {

}

class Room {
  constructor(name) {
    this.id = v4.generate()
    this.name = name
    this.users = []
    this.messages = []
  }
}

class User {
  constructor(ws) {
    this.ws = [ws]
    this.id = v4.generate()
    this.rooms = []
    this.init()
  }
  async init() {
    usersDb.data.push({
      id: this.id,
      friends: this.friends,
      rooms: this.rooms,
    })
    usersDb.write()
  }

  attachWebSocket(ws) {
    this.ws.push(ws)
  }

  async send(json) {
    try {
      await ws.send(JSON.stringify(json))
    } catch(e) {
      sendError(ws, e.messages)
    }
  }

}

export { sockConnection }