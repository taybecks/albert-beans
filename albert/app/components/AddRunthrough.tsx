'use client'

import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import ElementEntry from './ElementEntry'
import { Box, Button } from '@mui/material';
import { saveRunthrough } from '../services/Server';


function AddRunthrough() {
  const methods = useForm({})
  const { getValues } = methods

  return (
    <FormProvider {...methods}>
      <ElementEntry
        label="3 Jump Combination"
        name="threeJumpCombination"
      />
      <ElementEntry
        label="2 Jump Combination"
        name="twoJumpCombination"
      />
      <ElementEntry
        label="Toe Loop"
        name="toeLoop"
      />
      <ElementEntry
        label="Salchow"
        name="salchow"
      />
      <ElementEntry
        label="Scratch Spin"
        name="scratchSpin"
      />
      <ElementEntry
        label="Change Foot Spin"
        name="changeFootSpin"
      />
      <Box
        component="footer"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 4,
        }}
      >
        <Button variant="contained" color="primary" type="submit" onClick={submitEntry}>
          Submit
        </Button>
      </Box>
    </FormProvider>
  );

  async function submitEntry() {
    const entry = getValues()
    const response = await saveRunthrough(entry)
    console.log('form submitted:', entry, response)
  }
}

export default AddRunthrough
