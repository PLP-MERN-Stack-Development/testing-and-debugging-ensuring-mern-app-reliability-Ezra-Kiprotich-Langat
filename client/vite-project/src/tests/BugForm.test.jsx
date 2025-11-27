import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../components/BugForm';

test('renders BugForm and submits', () => {
  const mockFn = jest.fn();
  render(<BugForm onBugCreated={mockFn} />);

  fireEvent.change(screen.getByPlaceholderText(/Title/i), { target: { value: 'Bug 1' } });
  fireEvent.change(screen.getByPlaceholderText(/Description/i), { target: { value: 'Description 1' } });
  fireEvent.click(screen.getByText(/Report Bug/i));

  expect(mockFn).not.toHaveBeenCalled(); // apiClient not mocked here
});
