export type Req = { jsonrpc: "2.0"; id?: number; method: string; params?: any };

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

const ok = (id: number | undefined, result: object) => ({
  jsonrpc: "2.0",
  id,
  result,
});

const fail = (
  id: number | undefined | null,
  code: number,
  message: string,
) => ({
  jsonrpc: "2.0",
  id: id ?? null,
  error: { code, message },
});

export function handleRequest(req: Req) {
  try {
    switch (req.method) {
      case "ping":
        return ok(req.id, {});
      case "initialize":
        return ok(req.id, {
          protocolVersion: "2025-06-18",
          capabilities: { tools: {} },
          serverInfo: { name: "my-first-server", version: "0.1.0" },
        });
      case "notifications/initialized":
        return null;
      case "tools/list":
        return ok(req.id, { tools });
      case "tools/call": {
        const { name, arguments: args } = req.params ?? {};
        if (name !== "open_draft_pr")
          return fail(req.id, -32602, `Unknown tool: ${name}`);
        const missing: string[] = [];
        if (!args?.branch?.trim()) missing.push("branch");
        if (!args?.title?.trim()) missing.push("title");
        if (missing.length > 0)
          return fail(
            req.id,
            -32602,
            `open_draft_pr is missing: ${missing.join(", ")}`,
          );
        return ok(req.id, {
          content: [
            {
              type: "text",
              text: `(fake) Draft PR "${args.title}" opened from ${args.branch}`,
            },
          ],
        });
      }
      default:
        return fail(req.id, -32601, "Method not found");
    }
  } catch {
    return fail(req.id, -32603, "Internal error");
  }
}
