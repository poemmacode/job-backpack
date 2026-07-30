import { describe, it, expect } from 'vitest';
import { getValidTransitions } from '@/features/applications/utils/status-transitions';

describe('getValidTransitions', () => {
  it('should return applied and withdrawn for interested status', () => {
    const transitions = getValidTransitions('interested');
    expect(transitions).toEqual(['applied', 'withdrawn']);
  });

  it('should return interview, rejected, withdrawn for applied status', () => {
    const transitions = getValidTransitions('applied');
    expect(transitions).toEqual(['interview', 'rejected', 'withdrawn']);
  });

  it('should return offer, rejected, withdrawn for interview status', () => {
    const transitions = getValidTransitions('interview');
    expect(transitions).toEqual(['offer', 'rejected', 'withdrawn']);
  });

  it('should return accepted, rejected, withdrawn for offer status', () => {
    const transitions = getValidTransitions('offer');
    expect(transitions).toEqual(['accepted', 'rejected', 'withdrawn']);
  });

  it('should return empty array for accepted status', () => {
    const transitions = getValidTransitions('accepted');
    expect(transitions).toEqual([]);
  });

  it('should return applied for rejected status', () => {
    const transitions = getValidTransitions('rejected');
    expect(transitions).toEqual(['applied']);
  });

  it('should return applied for ghosted status', () => {
    const transitions = getValidTransitions('ghosted');
    expect(transitions).toEqual(['applied']);
  });

  it('should return applied for withdrawn status', () => {
    const transitions = getValidTransitions('withdrawn');
    expect(transitions).toEqual(['applied']);
  });

  it('should return empty array for unknown status', () => {
    const transitions = getValidTransitions('unknown');
    expect(transitions).toEqual([]);
  });
});
