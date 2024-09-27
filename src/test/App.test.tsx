import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import useUsers from '../services/useUsers';

vi.mock('../services/useUsers');

const mockedUsers = [
  {
    id: 1,
    username: 'johndoe',
    image: 'image_url',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    username: 'janedoe',
    image: 'image_url2',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@example.com',
  },
];

describe('App Component', () => {
  const mockFetchUsers = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useUsers as jest.Mock).mockReturnValue({
      fetchUsers: mockFetchUsers,
      users: mockedUsers,
    });
  });

  const renderWithRouter = (ui: JSX.Element) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  it('renders the search input and filters the user list', async () => {
    renderWithRouter(<App />);

    const searchInput = screen.getByLabelText('Search users by name');
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'john' } });

    await waitFor(() => {
      expect(mockFetchUsers).toHaveBeenCalledWith('search?q=john');
    });
  });

  it('renders users in grid view by default', () => {
    renderWithRouter(<App />);

    const johnDoeElements = screen.getAllByText(/John Doe/i);
    expect(johnDoeElements.length).toBe(2);
  });

  it('switches between grid and list view', async () => {
    renderWithRouter(<App />);

    const viewSelect = screen.getByLabelText('View');
    fireEvent.change(viewSelect, { target: { value: 'list' } });
  });

  it('starts and stops the slideshow', async () => {
    renderWithRouter(<App />);

    const startButton = screen.getByText(/Start Slideshow/i);
    const stopButton = screen.getByText(/Stop Slideshow/i);

    expect(startButton).not.toBeDisabled();
    expect(stopButton).toBeDisabled();

    fireEvent.click(startButton);
    expect(startButton).toBeDisabled();
    expect(stopButton).not.toBeDisabled();

    await waitFor(() => {
      expect(mockedUsers).toContainEqual(mockedUsers[0]);
    });

    fireEvent.click(stopButton);
    expect(startButton).not.toBeDisabled();
    expect(stopButton).toBeDisabled();
  });
});
