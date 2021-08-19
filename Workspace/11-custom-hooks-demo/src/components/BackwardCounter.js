import useCounter from '../hooks/use-counter';

import Card from './Card';

const BackwardCounter = () => {
  /*
    Using Custom hook =>
    The state used in the useCounter custom hook will be tried to this component.
    If we use a custom hook in multiple components, every component will receive its own state.
    
    So just because we use a custom hook does not mean that we share state or effects across components.
    Instead for every component the custom hook is executed again.
    And every component instance then receives its own state. 
    
    So it's just a "logic which has shared" not the concrete state.
  */
  const counter = useCounter(false);

  return <Card>{counter}</Card>;
};

export default BackwardCounter;
