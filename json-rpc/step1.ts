type RpcRequest = {
  jsonrpc: "2.0";
  id: number;
  method: string;
  params?: object;
};

const msg: RpcRequest = { jsonrpc: "2.0", id: 1, method: "tools/list" };

console.log(JSON.stringify(msg));
