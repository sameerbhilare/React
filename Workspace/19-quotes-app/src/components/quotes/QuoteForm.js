import { useState } from 'react';
import { useRef } from 'react';
import { Prompt } from 'react-router-dom';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
  const [isUserEntering, setIsUserEntering] = useState(false);

  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const finishedEnteringFormHandler = () => {
    /* IMP *********
    Setting setIsUserEntering(false) inside of the submitFormHandler would NOT work
    because that's a little bit too late. This state update (setIsUserEntering(false)) would not go through,
    before we actually triggered a navigation action.
    Because the navigation action will be triggered in on props.onAddQuote().
    So that's all one synchronous process 
    and since the state updates are "scheduled", the state update would not be processed before we try to navigate away.
    That's why I'm using a separate function for that here which triggers when the button is clicked
    and therefore before we actually handle the form submission.
    */
    setIsUserEntering(false);
  };

  const formFocusedHandler = () => {
    setIsUserEntering(true);
  };

  return (
    <>
      {/* 
      Use Prompt component to prevent unwanted page transitions/navigations.
      Prompt component will automatically watch if we navigate away from this page.
      And if then a certain condition is met, it will show a warning before it allows us to leave. */}
      <Prompt
        when={isUserEntering}
        message={(location) =>
          'Are you sure you want to leave? All your entered data will be lost!'
        }
      />
      <Card>
        <form onFocus={formFocusedHandler} className={classes.form} onSubmit={submitFormHandler}>
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor='author'>Author</label>
            <input type='text' id='author' ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='text'>Text</label>
            <textarea id='text' rows='5' ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishedEnteringFormHandler} className='btn'>
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
