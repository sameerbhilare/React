import classes from './TodoItem.module.css';

/*
    Here are expecting a function 'onRemoveTodo' as one of the props.
    Though onRemoveTodo will receive React.MouseEvent, but we can omit it if we don't plan to use it.
*/
const TodoItem: React.FC<{text: string, onRemoveTodo: (event:React.MouseEvent) => void}> = (props) => {
    return <li className={classes.item} onClick={props.onRemoveTodo}>{props.text}</li>
}

export default TodoItem;