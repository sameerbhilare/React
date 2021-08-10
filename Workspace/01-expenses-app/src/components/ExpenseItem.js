// A component in React is just a JavaScript function
function ExpenseItem() {
  // JSX - must return JSX code with only one root element.
  // Inside of that root element, we can have many adjacent elements
  return (
    <div>
      <div>Aug 10th 2021</div>
      <div>
        <h2>Order Food</h2>
        <div>$100</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
