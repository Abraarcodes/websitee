import React, { useState } from 'react';
    import { CheckCircle, Circle, Trash2 } from 'lucide-react';

    interface Todo {
      id: number;
      text: string;
      completed: boolean;
    }

    const TodoList: React.FC = () => {
      const [todos, setTodos] = useState<Todo[]>([]);
      const [newTodo, setNewTodo] = useState('');

      const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
          setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
          setNewTodo('');
        }
      };

      const handleToggleComplete = (id: number) => {
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
      };

      const handleDeleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
      };

      return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">My Todos</h2>
          <div className="flex mb-4">
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 mr-2 flex-grow focus:outline-none focus:border-blue-500"
              placeholder="Add a new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
          <ul className="space-y-2">
            {todos.map(todo => (
              <li key={todo.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <button onClick={() => handleToggleComplete(todo.id)} className="mr-2 focus:outline-none">
                    {todo.completed ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-gray-400" />}
                  </button>
                  <span className={`text-gray-800 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <button onClick={() => handleDeleteTodo(todo.id)} className="focus:outline-none">
                    <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    };

    export default TodoList;