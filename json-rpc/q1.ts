function retry(maxAttempts: number): string[] {
  const log: string[] = [];
  for (let attempt = 1; attempt < maxAttempts; attempt++) {
    log.push(`try ${attempt}`);
  }
  return log;
}

console.log(retry(3));
console.log(retry(1));
