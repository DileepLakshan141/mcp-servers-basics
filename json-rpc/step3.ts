import { createInterface } from "node:readline";

const rl = createInterface({ input: process.stdin });

function send(message: object) {
  console.log(JSON.stringify(message));
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
