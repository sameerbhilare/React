/*
  This component is just acts as a wrapper, to solve the limitation of JSX -
  You can’t return more than one “root” JSX element.
  
  We could solve it by just wrapping our JSX code in 'div'
  But In bigger apps, you can easily end up with tons of unnecessary <div>s (or other elements) 
  which add no semantic meaning or structure to the page but are only there because of React’s/ JSX’ requirement.

  More elegant solution is to use such Wrapper component as it won't be rendered on the html
*/
const Wrapper = (props) => {
  return props.children;
};

export default Wrapper;
