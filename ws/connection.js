import { isWebSocketCloseEvent } from "http://deno.land/std/ws/mod.ts"
import { v4 } from "https://deno.land/std/uuid/mod.ts"
import { JSONDB } from "https://js.sabae.cc/JSONDB.js";

/** @type Map<string, WebSocket> */
const clients = new Map()

/**
 * "userA": {},
 * "userB": {}
 */


const sockConnection = async (ws) => {
  const uid = v4.generate()

  for await (const ev of ws) {
    if (isWebSocketCloseEvent(ev)) {
      clients.delete(uid)
    }

    if (typeof ev === "string") {
      const { event, data } = JSON.parse(event)
      switch (event) {
        case "message":
          clients.forEach((ws) => {
            ws.send(JSON.stringify(obj))
          })
          break
      }
    }
  }
}

export { sockConnection }