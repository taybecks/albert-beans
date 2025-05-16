'use client';

import { FormProvider, useForm } from 'react-hook-form';

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const methods = useForm({
    defaultValues: {
      level: 'preBronze',
      selectedElements: {
        jumps: [],
        spins: [],
        steps: [],
      },
      comfortLevels: {},
    }
  });

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen p-8 bg-white font-sans">
        {children}
      </div>
    </FormProvider>
  );
}