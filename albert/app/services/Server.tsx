export function saveRunthrough(runthrough: any) {
  console.log("Saving runthrough:", runthrough);

  return fetch('http://localhost:3030/run-through/taylor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(runthrough),
  });
}