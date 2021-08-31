import { isWebSocketCloseEvent } from "http://deno.land/std/ws/mod.ts"
import { v4 } from "https://deno.land/std/uuid/mod.ts"

/** @type Map<string, WebSocket> */
const clients = new Map()


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

export { sockConnection }