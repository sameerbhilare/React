import React from 'react';
import { CSSTransition, Transition } from 'react-transition-group';

import './Modal.css';

const animationTiming = {
  enter: 400, // milliseconds
  exit: 1000, // milliseconds
};

const modal = (props) => {
  // **** Using 'CSSTransition' component
  return (
    <CSSTransition
      in={props.show}
      timeout={animationTiming}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: '',
        enterActive: 'ModalOpen',
        exit: '',
        exitActive: 'ModalClosed',
      }}
    >
      <div className='Modal'>
        <h1>A Modal</h1>
        <button className='Button' onClick={props.closed}>
          Dismiss
        </button>
      </div>
    </CSSTransition>
  );

  // **** Using 'Transition' component
  // return (
  //   <Transition in={props.show} timeout={animationTiming} mountOnEnter unmountOnExit>
  //     {/* 'state' will be either of 'entering', 'entered', 'existing', 'exited' */}
  //     {(state) => {
  //       const cssClasses = [
  //         'Modal',
  //         state === 'entering' ? 'ModalOpen' : state === 'exiting' ? 'ModalClosed' : null,
  //       ];
  //       return (
  //         <div className={cssClasses.join(' ')}>
  //           <h1>A Modal</h1>
  //           <button className='Button' onClick={props.closed}>
  //             Dismiss
  //           </button>
  //         </div>
  //       );
  //     }}
  //   </Transition>
  // );
};

export default modal;
