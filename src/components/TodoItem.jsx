import { useDispatch } from 'react-redux';
import { toggleTodo, removeTodo } from '../features/todos/todosSlice';
import { Check, Trash2 } from 'lucide-react';

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <div className={`group flex items-center gap-4 p-4 mb-3 rounded-xl transition-all duration-300 transform hover:scale-[1.01] glass-panel ${todo.completed ? 'opacity-60 saturate-50' : 'opacity-100 hover:shadow-lg'}`}>
      <button
        onClick={() => dispatch(toggleTodo(todo.id))}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
          todo.completed 
            ? 'bg-green-500 border-green-500 scale-105' 
            : 'border-[var(--color-surface-border)] hover:border-[var(--color-primary)]'
        }`}
      >
        {todo.completed && <Check size={14} className="text-white" strokeWidth={3} />}
      </button>

      <span className={`flex-1 text-lg transition-all duration-300 break-all ${
        todo.completed ? 'line-through text-[var(--color-text-secondary)]' : 'text-[var(--color-text-primary)]'
      }`}>
        {todo.text}
      </span>

      <button
        onClick={() => dispatch(removeTodo(todo.id))}
        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 hover:bg-red-900/40 p-2 rounded-lg transition-all focus:opacity-100 outline-none flex-shrink-0"
        aria-label="Delete todo"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}
