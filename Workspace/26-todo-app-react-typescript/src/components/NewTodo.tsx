import { useRef } from "react";

const NewTodo = () => {

    const todoTextInputRef = useRef<HTMLInputElement>(null);

    // For form submission event, we can use 'React.FormEvent'
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        // '!' means this 'todoTextInputRef.current' will never be null
        // otherwise TS will automatically add '?' after 'todoTextInputRef.current' 
        const enteredText = todoTextInputRef.current!.value; 

        if (enteredText.trim().length === 0) {
            // throw an error
            return;
        }
    }

    return <form onSubmit={submitHandler}>
    <label htmlFor='text'>Todo text</label>
    <input type='text' id='text' ref={todoTextInputRef}/>
    <button>Add Todo</button>
  </form>;
}

export default NewTodo;