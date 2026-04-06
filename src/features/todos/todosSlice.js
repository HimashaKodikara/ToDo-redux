import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodosData } from './todosAPI';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const data = await fetchTodosData();
    return data.map(todo => ({
      id: todo.id.toString(),
      text: todo.title,
      completed: todo.completed,
      createdAt: new Date().toISOString()
    }));
  }
);

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: crypto.randomUUID(),
        text: action.payload,
        completed: false,
        createdAt: new Date().toISOString()
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
    clearCompleted: (state) => {
      state.items = state.items.filter(t => !t.completed);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add fetched todos that aren't already in the list
        const newItems = action.payload.filter(
          newTodo => !state.items.some(t => t.id === newTodo.id)
        );
        state.items = state.items.concat(newItems);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { addTodo, toggleTodo, removeTodo, clearCompleted } = todosSlice.actions;

export default todosSlice.reducer;
