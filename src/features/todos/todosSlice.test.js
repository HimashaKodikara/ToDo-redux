import { describe, it, expect } from 'vitest';
import reducer, { addTodo, toggleTodo, removeTodo, clearCompleted } from './todosSlice';

describe('todosSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
    });
  });

  it('should handle addTodo', () => {
    const previousState = { items: [] };
    const text = 'Run the tests';
    const action = addTodo(text);
    const nextState = reducer(previousState, action);

    expect(nextState.items.length).toBe(1);
    expect(nextState.items[0].text).toBe(text);
    expect(nextState.items[0].completed).toBe(false);
    expect(nextState.items[0].id).toBeDefined();
  });

  it('should handle toggleTodo', () => {
    const previousState = {
      items: [
        { id: '1', text: 'Existing todo', completed: false },
      ],
    };

    expect(reducer(previousState, toggleTodo('1')).items[0].completed).toBe(true);
    expect(reducer(previousState, toggleTodo('2'))).toEqual(previousState);
  });

  it('should handle removeTodo', () => {
    const previousState = {
      items: [
        { id: '1', text: 'First todo', completed: false },
        { id: '2', text: 'Second todo', completed: false },
      ],
    };

    const nextState = reducer(previousState, removeTodo('1'));
    expect(nextState.items.length).toBe(1);
    expect(nextState.items[0].id).toBe('2');
  });

  it('should handle clearCompleted', () => {
    const previousState = {
      items: [
        { id: '1', text: 'First todo', completed: true },
        { id: '2', text: 'Second todo', completed: false },
        { id: '3', text: 'Third todo', completed: true },
      ],
    };

    const nextState = reducer(previousState, clearCompleted());
    expect(nextState.items.length).toBe(1);
    expect(nextState.items[0].id).toBe('2');
  });
});
