import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'

interface Props {
  name: string;
  label: string;
}

function ElementEntry({name, label}: Props) {
  const methods = useFormContext()
  const { register } = methods
  return (
    <div className="w-full flex space-between items-center">
      <FormControl>
        <FormLabel id={`${name}-radio-group-label`}>{label}</FormLabel>
        <RadioGroup
          aria-labelledby={`${name}-radio-group-label`}
          name={name}
          row
        >
          {[0, 1, 2, 3, 4].map((value) => (
        <FormControlLabel
          key={value}
          value={value}
          control={<Radio {...register(name)} />}
          label={value.toString()}
        />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default ElementEntry
