import React, { useMemo } from 'react';

import classes from './DemoList.module.css';

const DemoList = (props) => {
  const { items } = props;

  const sortedList = useMemo(() => {
    console.log('Items sorted');
    return items.sort((a, b) => a - b);
  }, [items]);
  console.log('DemoList RUNNING');

  return (
    <div className={classes.list}>
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

/*
React.memo tells React that for this component (which it gets as a argument), 
React should look at the props this component gets and check the new value for all those props 
and compare it to the previous value those props got.
And only if the value of a prop changed, the component should be re-executed and re-evaluated. 
And if the parent component changed but the prop values for that component did not change, 
then component execution will be skipped.

This optimization comes at a cost. The memo method here tells React that whenever the App component changed,
it should go to this component and compare the new prop values to the previous prop values, 
So therefore React needs to do two things -
It needs to store the previous prop values, and it needs to make that comparison. 
And that, of course, also has its own performance cost.

So you need to do trade off between "the performance cost of re-evaluating the component" 
and "the performance cost of comparing props".
Hence we should not use React.memo for each and every component.

React.memo can be a great tool if you have a huge component tree with a lot of child components.
And on a high level in the component tree, you can avoid unnecessary re-render cycles for the entire branch of the component tree.

You just don't wanna wrap every component with React.memo. Instead, you wanna pick some key parts
in your component tree which allows you to cut off an entire branch of child components.
That's way more effective than doing this on every child component.
*/
export default React.memo(DemoList);
