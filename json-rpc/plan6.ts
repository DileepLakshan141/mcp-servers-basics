type Status = "open" | "in_progress" | "done" | "failed";
type Bead = {
  id: string;
  title: string;
  status: Status;
  blockedBy: string[];
  assignee?: string;
};

const beads: Bead[] = [
  { id: "b1", title: "Write API route", status: "open", blockedBy: [] },
  { id: "b2", title: "Write tests", status: "open", blockedBy: ["b1"] },
  { id: "b3", title: "Update docs", status: "open", blockedBy: ["b1"] },
  { id: "b4", title: "Open draft PR", status: "open", blockedBy: ["b2", "b3"] },
];

function ready(all: Bead[]): Bead[] {
  return all.filter(
    (b) =>
      b.status === "open" &&
      b.blockedBy.every(
        (id) => all.find((x) => x.id === id)?.status === "done",
      ),
  );
}

function claim(all: Bead[], id: string, agent: string): boolean {
  const b = all.find((x) => x.id === id);
  if (!b || b.status !== "open") return false;
  b.status = "in_progress";
  b.assignee = agent;
  return true;
}

function complete(all: Bead[], id: string): boolean {
  const b = all.find((x) => x.id === id);
  if (!b || b.status !== "in_progress") return false;
  b.status = "done";
  return true;
}

console.log(ready(beads).map((b) => b.id));
console.log(claim(beads, "b1", "agent-A"));
console.log(claim(beads, "b1", "agent-B"));
console.log(ready(beads).map((b) => b.id));
console.log(complete(beads, "b1"));
console.log(complete(beads, "b1"));
console.log(ready(beads).map((b) => b.id));
