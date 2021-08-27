import React from 'react';
import { useState } from 'react';
import Todo from '../models/todo';

// type alias for complex obj structure so that it can be easily used in multiple other places
type TodosContextType = {
    items: Todo[]; 
    addTodo: (text: string) => void; 
    removeTodo: (id:string) => void
}

// creating context by passing type information via generics to React.createContext()
export const TodosContext = React.createContext<TodosContextType>({
    items: [],
    addTodo: (text: string) => {},
    removeTodo: (id: string) => {}
});

const TodosContextProvider: React.FC = (props) => {

    // todos state
    // using generic to specify whattype of state we are managing
    const [todos, setTodos] = useState<Todo[]>([]);

    // add todo handler
    const addTodoHandler = (text: string) => {
        const newTodo = new Todo(text);
        setTodos(prevTodos => {
            return prevTodos.concat(newTodo);
        });
    }
    
    // remove todo handler
    const removeTodoHandler = (todoId: string) => {
        setTodos(prevTodos => {
            return prevTodos.filter(todo => todo.id !== todoId).concat();
        });
    }

    // context 
    const context: TodosContextType = {items: todos, addTodo: addTodoHandler, removeTodo:removeTodoHandler };

    return <TodosContext.Provider value={context}>{props.children}</TodosContext.Provider>
}

export default TodosContextProvider;