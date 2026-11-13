import { existsSync, readFileSync, writeFileSync } from "node:fs";

type Task = { id: string; goal: string; dependsOn: string[] };

const tasks: Task[] = [
  { id: "t1", goal: "Write API route", dependsOn: [] },
  { id: "t2", goal: "Write tests", dependsOn: ["t1"] },
  { id: "t3", goal: "Update docs", dependsOn: ["t1"] },
  { id: "t4", goal: "Open draft PR", dependsOn: ["t2", "t3"] },
];

const STATE_FILE = "state.json";

function loadDone(): string[] {
  if (!existsSync(STATE_FILE)) return [];
  return JSON.parse(readFileSync(STATE_FILE, "utf8"));
}

function saveDone(done: string[]) {
  writeFileSync(STATE_FILE, JSON.stringify(done));
}

function ready(all: Task[], done: string[]): Task[] {
  return all.filter(
    (t) => !done.includes(t.id) && t.dependsOn.every((d) => done.includes(d)),
  );
}

const done = loadDone();
let next = ready(tasks, done)[0];

while (next) {
  console.log("running", next.id, next.goal);
  if (next.id === "t3" && process.argv[2] === "crash") process.exit(1);
  done.push(next.id);
  saveDone(done);
  next = ready(tasks, done)[0];
}

console.log("all done:", done);
