import { isWebSocketCloseEvent } from "http://deno.land/std/ws/mod.ts"
import { v4 } from "https://deno.land/std/uuid/mod.ts"
import { JSONDB } from "https://js.sabae.cc/JSONDB.js";

/** @type Map<User, WebSocket> */
const clients = new Map()

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
        case "message":
          broadcast(clients, data)
      }
    }
  }
}

const on = (ws, event) => {
  const obj = JSON.parse(event)
  if (!obj["event"]) sendError(ws, "please some event")
  return obj
};

const broadcast = (wsarr, obj) => {
  wsarr.forEach((ws) => {
    ws.send(JSON.stringify(obj))
  })
}

export { sockConnection }