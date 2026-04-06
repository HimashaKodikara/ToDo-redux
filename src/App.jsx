import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { ListTodo, Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="flex-1 w-full min-h-screen relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-primary opacity-20 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-2xl mx-auto relative z-10 w-full">
        <header className="mb-12 text-center transform transition-all duration-500 hover:scale-105">
          <div className="inline-flex items-center justify-center p-3 glass-panel rounded-2xl mb-6 ring-1 ring-white/10 shadow-[0_0_40px_rgba(99,102,241,0.3)]">
            <ListTodo size={40} className="text-[var(--color-primary)] mr-3" />
            <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 font-bold tracking-tight">
              Task Master
            </h1>
            <Sparkles size={24} className="text-purple-400 ml-2 animate-pulse" />
          </div>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-md mx-auto leading-relaxed">
            Organize your life with our premium interface.
          </p>
        </header>

        <main>
          <AddTodo />
          <TodoList />
        </main>
        
        <footer className="mt-16 text-center text-[var(--color-text-secondary)] opacity-50 text-sm">
          <p>Powered by React, Redux Toolkit, and Tailwind CSS v4</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
