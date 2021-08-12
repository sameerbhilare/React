// below import of 'React' is optional in latest versions of React.
// It is used under the hood when we use JSX code
import React from 'react';

// make the React nuild process aware that this .css should be used for this component
import './Chart.css';
import ChartBar from './ChartBar';

// A component in React is just a JavaScript function
/* React will pass a single object to our component function which will hold all passed-in parameters
   with key as the name of the attribute and value as its value.
   You can name it anything, but typically it is named as 'props'
*/
const Chart = (props) => {
  // convert dataPoint array to array of values/numbers only
  const dataPointValues = props.dataPoints.map((dataPoint) => dataPoint.value);
  const totalMax = Math.max(...dataPointValues);

  return (
    <div className='chart'>
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMax}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
