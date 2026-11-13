import { test } from "node:test";
import assert from "node:assert";
import { handleRequest } from "./handler";

test("ping returns an empty result", () => {
  const res = handleRequest({ jsonrpc: "2.0", id: 1, method: "ping" });
  assert.deepStrictEqual(res, { jsonrpc: "2.0", id: 1, result: {} });
});
test("invalid method should be handled gracefully", () => {
  const res = handleRequest({ jsonrpc: "2.0", id: 2, method: "banana" });
  assert.deepStrictEqual(res, {
    jsonrpc: "2.0",
    id: 2,
    error: { code: -32601, message: "Method not found" },
  });
});
