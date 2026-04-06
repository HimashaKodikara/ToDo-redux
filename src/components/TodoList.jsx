import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

export default function TodoList() {
  const todos = useSelector((state) => state.todos.items);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);

  if (status === 'loading') {
    return (
      <div className="text-center py-12 glass-panel rounded-2xl mt-6 animate-pulse">
        <p className="text-[var(--color-text-secondary)] text-lg">Loading tasks...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center py-12 glass-panel rounded-2xl mt-6 border border-red-500/30">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 glass-panel rounded-2xl animate-fade-in mt-6">
        <div className="inline-block p-4 rounded-full bg-[var(--color-surface-border)] mb-4">
          <svg className="w-12 h-12 text-[var(--color-text-secondary)] opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-[var(--color-text-secondary)] text-lg">Your to-do list is empty.</p>
        <p className="text-sm text-[var(--color-text-secondary)] opacity-60 mt-2">Add a task above to get started!</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4 px-2">
        <span className="text-sm text-[var(--color-text-secondary)] font-medium tracking-wider uppercase">
          Tasks ({todos.length})
        </span>
        <span className="text-sm text-[var(--color-text-secondary)] font-medium">
          {todos.filter(t => t.completed).length} completed
        </span>
      </div>
      <div>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
