import { serve } from "https://deno.land/std/http/server.ts"
import { acceptWebSocket, acceptable } from "https://deno.land/std/ws/mod.ts"

import { sockConnection } from "./connection.js"

export const WsServer = async (port) => {
  console.log(`http://localhost:${port}`)
  const server = await serve({ port })

  for await (const req of server) {
    if (req.url === "/ws" && req.method === "GET") {
      if (acceptable(req)) {
        acceptWebSocket({
          conn: req.conn,
          bufReader: req.r,
          bufWriter: req.w,
          headers: req.headers,
        })
        .then(sockConnection)
      }
    }
  }
}

