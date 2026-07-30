import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { JobCard } from '@/features/jobs/components/JobCard';

const mockJob = {
  id: '1',
  title: 'Software Engineer',
  company: 'Tech Corp',
  location: 'San Francisco, CA',
  salary: '$120,000 - $150,000',
  url: 'https://example.com',
  notes: '',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-15'),
  userId: 'user1',
};

describe('JobCard', () => {
  it('should render job title', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('should render company name', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
  });

  it('should render location when provided', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
  });

  it('should render salary when provided', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText('$120,000 - $150,000')).toBeInTheDocument();
  });

  it('should not render location when not provided', () => {
    const jobWithoutLocation = { ...mockJob, location: null };
    render(<JobCard job={jobWithoutLocation} />);
    expect(screen.queryByText('San Francisco, CA')).not.toBeInTheDocument();
  });

  it('should not render salary when not provided', () => {
    const jobWithoutSalary = { ...mockJob, salary: null };
    render(<JobCard job={jobWithoutSalary} />);
    expect(screen.queryByText('$120,000 - $150,000')).not.toBeInTheDocument();
  });

  it('should link to job detail page', () => {
    render(<JobCard job={mockJob} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/dashboard/jobs/1');
  });
});
