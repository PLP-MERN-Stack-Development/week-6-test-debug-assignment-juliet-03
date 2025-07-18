import React from 'react';
import { render, screen } from '@testing-library/react';
import BugList from '../BugList';

describe('BugList Component', () => {
  test('renders list of bugs', () => {
    const mockBugs = [
      { _id: '1', title: 'Bug 1', description: 'First bug', status: 'open' },
      { _id: '2', title: 'Bug 2', description: 'Second bug', status: 'closed' }
    ];

    render(<BugList bugs={mockBugs} />);

    expect(screen.getByText(/Bug 1/i)).toBeInTheDocument();
    expect(screen.getByText(/First bug/i)).toBeInTheDocument();
    expect(screen.getByText(/open/i)).toBeInTheDocument();

    expect(screen.getByText(/Bug 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Second bug/i)).toBeInTheDocument();
    expect(screen.getByText(/closed/i)).toBeInTheDocument();
  });

  test('renders fallback when no bugs', () => {
    render(<BugList bugs={[]} />);
    expect(screen.getByText(/no bugs reported/i)).toBeInTheDocument();
  });
});