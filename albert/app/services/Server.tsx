import { FieldValues } from "react-hook-form";

export function saveRunthrough(runthrough: FieldValues) {
  console.log("Saving runthrough:", runthrough);

  return fetch('http://localhost:3030/run-through/taylor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(runthrough),
  });
}