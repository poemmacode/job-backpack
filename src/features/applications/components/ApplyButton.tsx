'use client';

import { useState } from 'react';
import { createApplicationAction } from '../actions/applications';
import { Button } from '@/components/Button';

interface ApplyButtonProps {
  jobId: string;
  hasApplied: boolean;
}

export function ApplyButton({ jobId, hasApplied }: ApplyButtonProps) {
  const [isApplying, setIsApplying] = useState(false);

  if (hasApplied) {
    return (
      <Button variant="secondary" disabled>
        Already Applied
      </Button>
    );
  }

  async function handleApply() {
    setIsApplying(true);
    await createApplicationAction(jobId);
  }

  return (
    <Button onClick={handleApply} disabled={isApplying}>
      {isApplying ? 'Applying...' : 'Apply'}
    </Button>
  );
}
