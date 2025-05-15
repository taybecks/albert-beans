import React, { useEffect, useState } from 'react'
import { PreBronze, JumpComboMap } from "../models/elements"; 
import { Button } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import path from 'path';
import { setMaxIdleHTTPParsers } from 'http';
import { Layout } from 'lucide-react';


interface CalculatingProps {
  layout: number[];
  jumpValues: { [key: string]: { id: string; label: string; type: string; value: number } };
  budget: { [key: string]: number };
  path: string[];
  subtotal: number;
  totalJumps: number;
}
interface JumpMap { [key: string]: Jump }
interface Jump {
  id: string;
  label: string;
  type: string;
  value: number;
}

const jumpStarts = [
  'F',
  'Lz',
  'Lo',
  'S',
  'T',
  'Wz'
]

function SecretSauce() {
  const { getValues } = useFormContext();
  const layout = [3,2,1,1]
  const budget = {
    'F': 2,
    'Lz': 2,
    'Lo': 2,
    'S': 2,
    'T': 2,
    'Wz': 2,
    'Eu': 2
  }
  let max = 0;
  let bestSequence = [] as string[];
  const [best, setBest] = useState<{
    score: number;
    jumps: string[];
  }>({
    score: 0,
    jumps: []
  });
  const [loading, setLoading] = useState(true);
  type JumpResult = { id: string; type: string; value: number };
  const [results, setResults] = React.useState<JumpResult[]>([]);

  const comfort = getValues("comfortLevels");
  const elements = getValues("selectedElements");

  const confidenceLevels = {
    jumps: {} as { [key: string]: number },
    spins: {} as { [key: string]: number },
    steps: {} as { [key: string]: number }
  }

  confidenceLevels.jumps = {
    '1HF': 100,
    '1HLz': 100,
    '1S': 100,
    '1Lo': 100,
    '1Wz': 100,
    '1T': 100,
    '1F': 100,
    '1Eu': 100
  }
  
  useEffect(() => {
    async function fetchData() {
      await stirTheSauce()
      setBest({
        score: max,
        jumps: bestSequence,
      })
      setLoading(false)
    }

    fetchData()
  }, []);

  if (loading) {
    return <div>Calculating...</div>
  }
  return (
    <div>
      <div className="w-full bg-gray-50 rounded-lg p-6 mb-8 flex justify-between items-center">
            <h2 className="text-xl font-medium">Program Overview</h2>
            <div className="text-right">
              <div className="text-sm text-gray-500">Projected Base Value</div>
              <div className="text-2xl font-bold">{best.score}</div>
            </div>
          </div>
      <div className="grid grid-cols-4 gap-4 w-full">
        {
          layout.map((item, idx) => {
            let jumpCount = -1;
            if (idx > 0) {
              for(let i = 0; i < idx; i++) {
                jumpCount += layout[i];
              }
            }
            return (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
                {[...Array(item)].map((nothing, index) => {
                  jumpCount++;
                  const jumpId = best.jumps[jumpCount]
                  const jumpData = PreBronze.jumps[jumpId]

                  return (
                  <div key={index} className="flex flex-col mb-2">
                    <div className="p-2 bg-white rounded shadow">
                      <p className="text-lg font-semibold">{jumpData.label}</p>
                      <p className="text-sm text-gray-500">Type: {jumpData.type}</p>
                      <p className="text-sm text-gray-500">Value: {jumpData.value}</p>
                      <p className="text-sm text-gray-500">Confidence: {confidenceLevels.jumps[jumpId]}%</p>
                    </div>
                  </div>
                )})}
              </div>
            )
          })
        }
      </div>
    </div>
  )

  async function stirTheSauce() {
    const subtotal = 0;
    const path = [] as string[];
    const level = PreBronze.jumps
    const jumpValues: JumpMap = {}
    Object.keys(level).forEach((key) => {
      const confidence = confidenceLevels.jumps[key as string] ?? 0;
      jumpValues[key] = {
        id: key,
        label: level[key].label,
        type: level[key].type,
        value: level[key].value[0] * (confidence / 100)
      }
    });

    const totalJumps = layout.reduce((acc, val) => acc + val, 0);
    await calcJumps({ layout, jumpValues, budget, path, subtotal, totalJumps });
  }
  
  async function calcJumps ({layout, jumpValues, budget, path, subtotal, totalJumps}: CalculatingProps ) {
    const jumpIndex = path.length
    if (jumpIndex === totalJumps) {
      //console.log(subtotal, path)
      if (subtotal > max) {
        max = subtotal 
        bestSequence = path
        console.log('New best sequence:', path, 'with value:', subtotal)
      }
      return;
    }

    // simulate promise
    await new Promise(resolve => setTimeout(resolve, 5))
     
    const jumpType = getJumpType(layout, jumpIndex)
    let previousJump = null
    if (jumpType !== 'first') {
      previousJump = jumpValues[path[jumpIndex - 1]]
    }
    const availableJumps = getAvailableJumps(jumpType, previousJump, budget)

    // loop over available jumps and recurse
    const nextJumps: JumpMap = {}
    Object.entries(jumpValues).filter(([id, value]) => {
      if(availableJumps.includes(value.type)) {
        nextJumps[id] = value
      }
    })

    for await(const j of Object.keys(nextJumps)) {
      const jump = nextJumps[j]
      const newBudget = { ...budget }
      newBudget[jump.type]--;
      const newSubTotal = subtotal + jump.value;
      const newPath = [...path, jump.id]

      await calcJumps({ layout, jumpValues, budget: newBudget, path: newPath, subtotal: newSubTotal, totalJumps })
    }
  }

  function getAvailableJumps (jumpType: string, previousJump: Jump | null, budget: { [x: string]: number; }) {
    const availableJumps = [] as string[];

    if (previousJump) {
      const nextPossible = JumpComboMap[previousJump.type]
      nextPossible.forEach((j) => {
        if (budget[j] > 0) {
          if (j === 'Eu') {
            if (jumpType === 'middle') {
              availableJumps.push(j)
            }
          } else {
            availableJumps.push(j)
          }
        }
      })
    } else {
      // first jump
      jumpStarts.forEach((j) => {
        if (budget[j] > 0) {
          availableJumps.push(j)
        }
      })
    }
    
    return availableJumps;
  }

  function getJumpType (layout: any[], jumpNumber: number) {
    let steps = 0;
    let jumpType = 'standard';
    layout.forEach((passSize) => {
      for (let i = 0; i < passSize; i++) {
        if (steps === jumpNumber) {
          if (passSize === 3 && i === 1) {
            jumpType = 'middle'
          } else if (i === 0) {
            jumpType = 'first'
          }
        }
        steps++;
      }
    })

    return jumpType;
  }

}

export default SecretSauce
