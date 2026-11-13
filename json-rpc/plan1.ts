// type Task = { id: string; goal: string };

function planner(request: string): Task[] {
  return [
    { id: "t1", goal: `Write the API route for: ${request}` },
    { id: "t2", goal: `Write tests for: ${request}` },
    { id: "t3", goal: `Updated the docs: ${request}` },
  ];
}

function worker(task: Task): string {
  return `done: ${task.goal}`;
}

const tasks = planner("add login");
for (const task of tasks) {
  console.log(worker(task));
}
