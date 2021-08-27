import React from 'react';

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
const Todos: React.FC<{ items: string[] }> = (props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default Todos;
