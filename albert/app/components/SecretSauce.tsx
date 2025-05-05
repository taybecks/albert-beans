import React from 'react'
import { PreBronze, JumpComboMap } from "../models/elements"; 
import { Button } from '@mui/material'
import { setMaxIdleHTTPParsers } from 'http';

interface Props {}

const jumpStarts = [
  'F',
  'Lz',
  'Lo',
  'S',
  'T',
  'Wz'
]
const program = {
  spins: [1, 1],
  jumpPasses: [3,2,1,1],
}
const confidenceLevels = {
  spins: {
    'USp': 50,
    'CUSp': 50,
  },
  jumps: {
    '1HF': 100,
    '1HLz': 100,
    '1S': 90,
    '1Lo':60,
    '1Wz': 90,
    '1T': 80,
    '1F': 30,
    '1Eu': 60,
  }
}

function SecretSauce({}: Props) {
  const [max, setMax] = React.useState(0);
  const [results, setResults] = React.useState<any>([]);

  return (
    <div>
      <Button type="button" variant="contained" onClick={stirTheSauce}>Figure Out My Best Self</Button>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
        {results && results.length > 0 && results.map((item, idx) => (
          <div key={item.id ?? idx} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            background: '#fafafa',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <div><strong>Jump:</strong> {item.type}</div>
            <div><strong>ID:</strong> {item.id}</div>
            <div><strong>Value:</strong> {item.value?.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  )

  function stirTheSauce() {
    const jumpValues = getJumpValues();
    const availableJumps = []
    jumpStarts.forEach(jump => {
      availableJumps.push(...getJumpValueByType(jump, jumpValues));
    })
    const jumpBudget = {
      'F': 2,
      'Lz': 2,
      'Lo': 2,
      'S': 2,
      'T': 2,
      'Wz': 2,
      'Eu': 2
    }

    calcJumps(availableJumps, jumpBudget, jumpValues, [], 0)
  }

  function calcJumps(availableJumps, jumpBudget, jumpValues, path, subtotal) {
    if (path.length === 7) {
      if (subtotal > max) {
        console.log(subtotal, path)
        setMax(subtotal);
        setResults(path)

        return
      }
    } else {
      availableJumps.forEach(jump => {
        jumpBudget[jump.type] -= 1;

        const nextAvailableTypes = JumpComboMap[jump.type].filter(j => jumpBudget[j] > 0);
        const nextAvailableJumps = [];
        nextAvailableTypes.forEach(j => {
          nextAvailableJumps.push(...getJumpValueByType(j, jumpValues));
        });

        const nextPath = [...path];
        nextPath.push(jump);
        subtotal += jumpValues[jump.id].value ?? 0;

        calcJumps(nextAvailableJumps, jumpBudget, jumpValues, nextPath, subtotal);
      })
    }
  }

  function getJumpValues() {
    const allJumps = PreBronze.jumps;
    const jumpValues = {}
    Object.keys(allJumps).forEach(jump => {
      const confidence = confidenceLevels.jumps[jump] ?? 0;
      jumpValues[jump] = {
        type: allJumps[jump].type,
        value: allJumps[jump].value[0] * (confidence / 100)
      }
    })

    return jumpValues
  }

  function getJumpValueByType(type, jumpValues) {
    const results = []
    Object.keys(jumpValues).forEach(j => {
      const jump = jumpValues[j];
      if(jump.type === type) {
        results.push({
          id: j,
          type: jump.type,
          value: jump.value
        })
      }
    });
    return results;
  }
}

export default SecretSauce
