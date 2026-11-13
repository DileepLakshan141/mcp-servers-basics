#!/usr/bin/env node
import { createInterface } from "node:readline";
import { handleRequest } from "./handler.ts";
const rl = createInterface({ input: process.stdin });

rl.on("line", (line) => {
  let req;
  try {
    req = JSON.parse(line);
  } catch {
    console.log(
      JSON.stringify({
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: "Parse error" },
      }),
    );
    return;
  }
  const res = handleRequest(req);
  if (res) console.log(JSON.stringify(res));
});
