import { createInterface } from "node:readline";

const rl = createInterface({ input: process.stdin });

function send(message: object) {
  console.log(JSON.stringify(message));
}

function log(...args: unknown[]) {
  console.error("[server]", ...args);
}

rl.on("line", (line) => {
  let req;
  try {
    req = JSON.parse(line);
  } catch {
    send({
      jsonrpc: "2.0",
      id: null,
      error: { code: -32700, message: "Parse error" },
    });
    return;
  }

  switch (req.method) {
    case "initialize":
      send({
        jsonrpc: "2.0",
        id: req.id,
        result: {
          protocolVersion: "2025-06-18",
          capabilities: { tools: {} },
          serverInfo: { name: "my-first-server", version: "0.1.0" },
        },
      });
      break;
    case "notifications/initialized":
      log("client finished handshake");
      break;
    case "ping":
      send({ jsonrpc: "2.0", id: req.id, result: {} });
      break;
    default:
      send({
        jsonrpc: "2.0",
        id: req.id,
        error: { code: -32601, message: "Method not found" },
      });
  }
});
