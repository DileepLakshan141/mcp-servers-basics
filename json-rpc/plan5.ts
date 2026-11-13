type Handoff = {
  from: string;
  to: string;
  goal: string;
  doneSoFar: string[];
  nextStep: string;
  filesTouched: string[];
  testsPassed: boolean;
};

function coder(): Handoff {
  return {
    from: "coder",
    to: "reviewer",
    goal: "Add login",
    doneSoFar: ["Wrote API route", "Wrote tests"],
    nextStep: "Review the diff and open a draft PR if it looks good",
    filesTouched: ["src/login.ts", "src/login.test.ts"],
  };
}

function reviewer(h: Handoff) {
  console.log(`[${h.to}] picked up from ${h.from}`);
  console.log("Goal:", h.goal);
  console.log("Already done:", h.doneSoFar.join(", "));
  console.log("My job:", h.nextStep);
}

reviewer(coder());
