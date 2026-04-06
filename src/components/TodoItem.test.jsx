import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TodoItem from './TodoItem';
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

describe('TodoItem Component', () => {
  const mockTodo = { id: '1', text: 'Learn Testing', completed: false };

  it('renders todo text correctly', () => {
    renderWithRedux(<TodoItem todo={mockTodo} />);
    expect(screen.getByText('Learn Testing')).toBeInTheDocument();
  });

  it('applies styles based on completion status', () => {
    const { rerender, store } = renderWithRedux(<TodoItem todo={mockTodo} />);
    
    // Not completed
    const todoText = screen.getByText('Learn Testing');
    expect(todoText.className).not.toMatch(/line-through/);

    // Completed
    const completedTodo = { ...mockTodo, completed: true };
    rerender(<Provider store={store}><TodoItem todo={completedTodo} /></Provider>);
    expect(todoText.className).toMatch(/line-through/);
  });

  it('dispatches toggle action when complete button is clicked', async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<TodoItem todo={mockTodo} />, {
      initialState: { todos: { items: [mockTodo] } }
    });

    const toggleButton = screen.queryAllByRole('button')[0]; // First button is toggle
    await user.click(toggleButton);

    const state = store.getState().todos;
    expect(state.items[0].completed).toBe(true);
  });

  it('dispatches remove action when delete button is clicked', async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<TodoItem todo={mockTodo} />, {
      initialState: { todos: { items: [mockTodo] } }
    });

    const deleteButton = screen.getByRole('button', { name: /delete todo/i });
    await user.click(deleteButton);

    const state = store.getState().todos;
    expect(state.items.length).toBe(0);
  });
});
