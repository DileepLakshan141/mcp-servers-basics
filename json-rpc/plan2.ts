type Task = {
  id: string;
  goal: string;
  dependsOn: string[];
};

const tasks: Task[] = [
  { id: "t1", goal: "Write API route", dependsOn: [] },
  { id: "t2", goal: "Write tests", dependsOn: ["t1"] },
  { id: "t3", goal: "Update docs", dependsOn: ["t1"] },
  { id: "t4", goal: "Open draft PR", dependsOn: ["t2", "t3"] },
];

function ready(all: Task[], done: string[]): Task[] {
  return all.filter(
    (t) => !done.includes(t.id) && t.dependsOn.every((d) => done.includes(d)),
  );
}

console.log(ready(tasks, []).map((t) => t.id));
console.log(ready(tasks, ["t1"]).map((t) => t.id));
console.log(ready(tasks, ["t1", "t2", "t3"]).map((t) => t.id));
