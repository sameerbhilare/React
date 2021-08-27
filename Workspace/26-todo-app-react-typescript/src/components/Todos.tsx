import React from 'react';
import Todo from '../models/todo';
import TodoItem from './TodoItem';

/*
  React.FC is from @types/react. React.FC is a generic type.
  It tells that this is a Functional Component (FC).
  React.FC will merge whichever object type we're defining in the < > brackets 
  with that base object type (with the children property).
  
  Advantages - 
  1. So now when you type 'props' and then a dot, you will get autocompletion for both 'items' and 'children'.
  2. Errors relfected in IDE.
  3. IMP - wherver this component is used, it will show error if required properties are not used there :)

  Therefore using our components incorrectly, for example, not passing in all the props 
  that component needs is pretty much impossible because we get errors like this directly in the IDE now.
*/
const Todos: React.FC<{ items: Todo[] }> = (props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <TodoItem key={item.id} text={item.text}/>
      ))}
    </ul>
  );
};

export default Todos;
