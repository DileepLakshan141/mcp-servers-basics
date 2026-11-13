const existingPrBranches: string[] = ["feat/login"];

function openDraftPr(branch: string): string {
  if (existingPrBranches.includes(branch))
    return "PR already exists: skipping the step.";
  existingPrBranches.push(branch);
  return `opened PR for ${branch}`;
}

console.log(openDraftPr("feat/login"));
console.log(openDraftPr("feat/login"));
console.log(existingPrBranches);
