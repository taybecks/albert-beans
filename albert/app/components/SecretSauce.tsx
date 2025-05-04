import React from 'react'
import { PreBronze, JumpComboMap } from "../models/elements"; 
import { Button } from '@mui/material'

interface Props {}

function SecretSauce({}: Props) {
  const program = {
    spins: [1, 1],
    jumpPasses: [1,1,2,3],
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

  return (
    <div>
      <Button type="button" variant="contained" onClick={stirTheSauce}>Figure Out My Best Self</Button>
    </div>
  )

  function stirTheSauce() {
    const jumpValues = getJumpValues();
    console.log(jumpValues)
  }

  function getJumpValues() {
    const allJumps = PreBronze.jumps;
    const jumpValues = {}
    Object.keys(allJumps).forEach(jump => {
      const confidence = confidenceLevels.jumps[jump] ?? 0;
      jumpValues[jump] = allJumps[jump].value[0] * (confidence / 100)
    })

    return jumpValues
  }
}

export default SecretSauce
