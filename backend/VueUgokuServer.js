import { Server } from "https://js.sabae.cc/Server.js";
import { CONTENT_TYPE } from "https://js.sabae.cc/CONTENT_TYPE.js";

class VueUgokuServer extends Server {
  constructor(port, staticPath) {
    super(port);
    this.staticPath = staticPath;
  }
  async handleWeb(req) {
    // super.handleWeb(req);
    const path = req.path;
    try {
      const getRange = (req) => {
        const range = req.headers.get("Range");
        if (!range || !range.startsWith("bytes=")) {
          return null;
        }
        const res = range.substring(6).split("-");
        if (res.length === 0) {
          return null;
        }
        return res;
      };

      const getIgnoredStaticPath = (path, ignores) => {
        return path === "/"
          || path.indexOf("..") >= 0
          || (!ignores.includes(path.split("/")[1]))
          ? "/index.html" : path
      }

      const getStaticDir = async (staticpath) => {
        let dirs = []
        for await (const { name } of Deno.readDir(staticpath)) {
          dirs.push(name)
        }
        return dirs
      }
      const withoutDir = await getStaticDir(this.staticPath);

      let range = getRange(req);
      const fn = getIgnoredStaticPath(path, withoutDir);
      const n = fn.lastIndexOf(".");
      const ext = n < 0 ? "html" : fn.substring(n + 1);

      const [data, totallen, gzip] = await readFileRange(
        this.staticPath + fn,
        range
      );
      if (!range) {
        if (data.length != totallen) {
          range = [0, data.length - 1];
        }
      } else if (range[1] == "") {
        range[1] = parseInt(range[0]) + data.length - 1;
      }

      const ctype = CONTENT_TYPE[ext] || "text/plain";
      const headers = {
        "Content-Type": ctype,
        "Accept-Ranges": "bytes",
        "Content-Length": data.length,
      };
      if (gzip) {
        headers["Content-Encoding"] = "gzip";
      }
      if (totallen == data.length) {
        range = null;
      }
      if (range) {
        headers["Content-Range"] =
          "bytes " + range[0] + "-" + range[1] + "/" + totallen;
      }
      return new Response(data, {
        status: range ? 206 : 200,
        headers: new Headers(headers),
      });
    } catch (e) {
      if (path !== "/favicon.ico") {
        console.log("err", path, e.stack);
      }
    }
  }
}

// ここからsabae.cc/Server.jsの一部コピペ
const RANGE_LEN = 1024 * 1024 * 10;
const DENO_BUF_SIZE = 32 * 1024;
const readFileRange = async (fn, range) => {
  let gzip = true;
  let data = null;
  let range0 = 0;
  let range1 = RANGE_LEN - 1;
  if (range) {
    range0 = parseInt(range[0]);
    if (range[1] != "") {
      range1 = parseInt(range[1]);
    } else {
      range1 += range0;
    }
  }
  let flen = 0;
  try {
    /* // unsupported gzip & range request
    //data = Deno.readFileSync(fn + ".gz");
    flen = (await Deno.stat(fn + ".gz")).size;
    if (range1 >= flen) {
      range1 = flen - 1;
    }
    data = await readFilePartial(fn + ".gz", range0, range1 - range0 + 1);
    */
    flen = (await Deno.stat(fn + ".gz")).size;
    if (flen < RANGE_LEN) {
      data = await Deno.readFile(fn + ".gz");
      return [data, data.length, gzip];
    }
  } catch (e) {}
  gzip = false;
  flen = (await Deno.stat(fn)).size;
  if (range1 >= flen) {
    range1 = flen - 1;
  }
  data = await readFilePartial(fn, range0, range1 - range0 + 1);
  return [data, flen, gzip];
};

const readFilePartial = async (fn, offset, len) => {
  const f = await Deno.open(fn);
  //console.log(fn, offset, len);
  await Deno.seek(f.rid, offset, Deno.SeekMode.Start);
  const buf = new Uint8Array(len);
  const rbuf = new Uint8Array(DENO_BUF_SIZE);
  let off = 0;
  for (;;) {
    const rlen = await Deno.read(f.rid, rbuf);
    for (let i = 0; i < rlen; i++) {
      buf[off + i] = rbuf[i];
    }
    //console.log(off, rlen);
    off += rlen;
    len -= rlen;
    if (len == 0) {
      break;
    }
  }
  await Deno.close(f.rid);
  return buf;
};

export { VueUgokuServer };
