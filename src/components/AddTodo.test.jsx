import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AddTodo from './AddTodo';
import todosReducer from '../features/todos/todosSlice';

const renderWithRedux = (
  component,
  { initialState, store = configureStore({ reducer: { todos: todosReducer }, preloadedState: initialState }) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('AddTodo Component', () => {
  it('renders input field and add button', () => {
    renderWithRedux(<AddTodo />);
    
    expect(screen.getByPlaceholderText(/What needs to be done\?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('button is disabled when input is empty', () => {
    renderWithRedux(<AddTodo />);
    const button = screen.getByRole('button', { name: /add/i });
    expect(button).toBeDisabled();
  });

  it('allows user to type in input and submit', async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<AddTodo />);
    
    const input = screen.getByPlaceholderText(/What needs to be done\?/i);
    const button = screen.getByRole('button', { name: /add/i });
    
    await user.type(input, 'New test todo');
    expect(input.value).toBe('New test todo');
    expect(button).toBeEnabled();
    
    await user.click(button);
    
    // Input should be cleared after submit
    expect(input.value).toBe('');
    
    // Check if it was added to the redux store
    const state = store.getState().todos;
    expect(state.items.length).toBe(1);
    expect(state.items[0].text).toBe('New test todo');
    expect(state.items[0].completed).toBe(false);
  });
});
