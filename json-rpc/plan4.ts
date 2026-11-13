type Result = { ok: boolean; output: string };

function flakyWorker(task: string, attempt: number): Result {
  if (task === "Write tests" && attempt < 2) {
    return { ok: false, output: "tests failed to compile" };
  }
  return { ok: true, output: `done: ${task}` };
}

function supervise(task: string, maxAttempts: number): Result {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const result = flakyWorker(task, attempt);
    console.log(
      `[supervisor] ${task}, attempt ${attempt}:`,
      result.ok ? "ok" : result.output,
    );
    if (result.ok) return result;
  }
  return { ok: false, output: `gave up on: ${task}` };
}

console.log(supervise("Write API route", 3));
console.log(supervise("Write tests", 3));
console.log(supervise("Write tests", 1));
