import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

// helper sorting function
const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  /*
    useLocation gives us access to a location object which has information 
    about the currently loaded page, about the currently loaded URL.
  */
  const location = useLocation();
  //console.log(location);

  // URLSearchParams is default JS constructor function
  // will then give us a nice queryParams object where we can then extract our query parameters by key.
  const queryParams = new URLSearchParams(location.search);
  const isSortAscending = queryParams.get('sort') === 'asc';

  const sortedQuotes = sortQuotes(props.quotes, isSortAscending);

  const changeSortingHandler = () => {
    // this will basically add the query parameter
    // pushing this page here actually rerenders this component.
    history.push('/quotes?sort=' + (isSortAscending ? 'desc' : 'asc'));
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortAscending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem key={quote.id} id={quote.id} author={quote.author} text={quote.text} />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
