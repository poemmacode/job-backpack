const TRANSITIONS: Record<string, string[]> = {
  interested: ['applied', 'withdrawn'],
  applied: ['interview', 'rejected', 'withdrawn'],
  interview: ['offer', 'rejected', 'withdrawn'],
  offer: ['accepted', 'rejected', 'withdrawn'],
  accepted: [],
  rejected: ['applied'],
  ghosted: ['applied'],
  withdrawn: ['applied'],
};

export function getValidTransitions(currentStatus: string): string[] {
  return TRANSITIONS[currentStatus] || [];
}
