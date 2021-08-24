import { useHistory } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm';

const NewQuote = () => {
  /*
    PRPGRAMMATIC NAVIGATION -
    useHistory hook allows us to change the browser history. So the history of pages we visited.
    history.push() - pushes a new page on the stack of pages
    history.replace() - replaces the current page.
    The difference is that with push(), we can go back with the back button to the page we're coming from,
    with replace we can't.
  */
  const history = useHistory();

  const addQuoteHandler = (quoteData) => {
    console.log(quoteData);

    // pushes a new page on the stack of pages
    history.push('/quotes');
  };

  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
