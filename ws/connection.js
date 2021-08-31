import { isWebSocketCloseEvent } from "http://deno.land/std/ws/mod.ts"
import { v4 } from "https://deno.land/std/uuid/mod.ts"
import { jsonfs } from "https://js.sabae.cc/jsonfs.js";
const userfn = "data/user.json";
let user = jsonfs.read(userfn) || [];

/** @type Map<string, WebSocket> */
const clients = new Map()

/**
 * "userA": {},
 * "userB": {}
 */


const sockConnection = async (ws) => {

  for await (const ev of ws) {
    if (isWebSocketCloseEvent(ev)) {
      clients.delete(uid)
      users=user.find(d=>d.ID==req.ID);
    }

    if (typeof ev === "string") {
      const { event, data } = JSON.parse(event)
      switch (event) {
        case "message":
          clients.forEach((ws) => {
            ws.send(JSON.stringify(obj))
          })
          break
        case "friends":
          
      }
    }
  }
}

export { sockConnection }