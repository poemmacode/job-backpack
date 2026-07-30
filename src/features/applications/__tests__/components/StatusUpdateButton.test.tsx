import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { StatusUpdateButton } from '@/features/applications/components/StatusUpdateButton';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: vi.fn(),
  }),
}));

vi.mock('@/features/applications/actions/applications', () => ({
  updateApplicationStatusAction: vi.fn(),
}));

describe('StatusUpdateButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the button with correct text', () => {
    render(<StatusUpdateButton applicationId="1" currentStatus="applied" />);
    
    expect(screen.getByText('Change Status')).toBeInTheDocument();
  });

  it('should not render when no valid transitions', () => {
    const { container } = render(
      <StatusUpdateButton applicationId="1" currentStatus="accepted" />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('should show dropdown when clicked', () => {
    render(<StatusUpdateButton applicationId="1" currentStatus="applied" />);
    
    fireEvent.click(screen.getByText('Change Status'));
    
    expect(screen.getByText('Interview')).toBeInTheDocument();
    expect(screen.getByText('Rejected')).toBeInTheDocument();
    expect(screen.getByText('Withdrawn')).toBeInTheDocument();
  });

  it('should show confirmation for danger statuses', () => {
    render(<StatusUpdateButton applicationId="1" currentStatus="applied" />);
    
    fireEvent.click(screen.getByText('Change Status'));
    fireEvent.click(screen.getByText('Rejected'));
    
    expect(screen.getByText('Confirm Status Change')).toBeInTheDocument();
    expect(screen.getByText(/Change to "Rejected"/)).toBeInTheDocument();
  });

  it('should show danger icon for danger statuses', () => {
    render(<StatusUpdateButton applicationId="1" currentStatus="applied" />);
    
    fireEvent.click(screen.getByText('Change Status'));
    
    const rejectedButton = screen.getByText('Rejected').closest('button');
    expect(rejectedButton).toHaveClass('text-red-600');
  });
});
