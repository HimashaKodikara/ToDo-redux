import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todosSlice';
import { Plus } from 'lucide-react';

export default function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text.trim()));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-primary)] to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative flex items-center bg-[var(--color-surface)] border border-[var(--color-surface-border)] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[var(--color-primary)] transition-all glass-panel">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 bg-transparent px-6 py-4 text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none w-full"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-6 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
    </form>
  );
}
