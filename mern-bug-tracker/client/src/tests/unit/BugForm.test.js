import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../BugForm';

describe('BugForm', () => {
  test('renders inputs and submits form with correct data', () => {
    const mockSubmit = jest.fn();

    render(<BugForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Enter bug title'), {
      target: { value: 'Test Bug Title' },
    });

    fireEvent.change(screen.getByPlaceholderText('Enter bug description'), {
      target: { value: 'Test Bug Description' },
    });

    fireEvent.click(screen.getByRole('button', { name: /add bug/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Test Bug Title',
      description: 'Test Bug Description',
    });
  });
});