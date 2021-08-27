import { useState } from 'react';
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import Todo from './models/todo';

function App() {

  // using generic to specify whattype of state we are managing
  const [todos, setTodos] = useState<Todo[]>([]);

  const addtodoHandler = (text: string) => {
    const newTodo = new Todo(text);
    setTodos(prevTodos => {
      return prevTodos.concat(newTodo);
    });
  }

  return (
    <div>
      <NewTodo onAddTodo={addtodoHandler}/>
      <Todos items={todos} />
    </div>
  );
}

export default App;
