import { createInterface } from "node:readline";

const rl = createInterface({ input: process.stdin });

export type Req = { jsonrpc: "2.0"; id?: number; method: string; params?: any };

export function handleRequest(req: Req) {
  switch (req.method) {
    case "ping":
      return { jsonrpc: "2.0", id: req.id, result: {} };
    default:
      return {
        jsonrpc: "2.0",
        id: req.id,
        error: { code: -32601, message: "Method not found" },
      };
  }
}

function send(message: object) {
  console.log(JSON.stringify(message));
}

function log(...args: unknown[]) {
  console.error("[server]", ...args);
}

const tools = [
  {
    name: "open_draft_pr",
    description:
      "Opens a draft pull request. Use when the user approves a change.",
    inputSchema: {
      type: "object",
      properties: {
        branch: { type: "string", description: "Branch to open the PR from" },
        title: { type: "string", description: "PR title" },
      },
      required: ["branch", "title"],
    },
  },
];

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
    case "tools/list":
      send({ jsonrpc: "2.0", id: req.id, result: { tools } });
      break;
    case "tools/call": {
      const { name, arguments: args } = req.params;
      if (name === "open_draft_pr") {
        let missingElement: string | null = null;
        if (!args?.branch?.trim()) missingElement = "branch is missing";
        if (!args?.title?.trim()) missingElement = "title is missing";
        if (!args?.branch?.trim() || !args?.title?.trim())
          missingElement = "branch and title both missing";
        if (!args?.branch?.trim() || !args?.title?.trim()) {
          send({
            jsonrpc: "2.0",
            id: req.id,
            error: {
              code: -32602,
              message: `open_draft_pr needs non-empty 'branch' and 'title', missing element(s): ${missingElement}`,
            },
          });
          break;
        }
        send({
          jsonrpc: "2.0",
          id: req.id,
          result: {
            content: [
              {
                type: "text",
                text: `(fake) Draft PR "${args.title}" opened from ${args.branch}`,
              },
            ],
          },
        });
      } else {
        send({
          jsonrpc: "2.0",
          id: req.id,
          error: { code: -32602, message: `Unknown tool: ${name}` },
        });
      }
      break;
    }
    default:
      send({
        jsonrpc: "2.0",
        id: req.id,
        error: { code: -32601, message: "Method not found" },
      });
  }
});
