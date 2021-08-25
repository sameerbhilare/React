import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

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

  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === 'completed') {
      // pushes a new page on the stack of pages
      history.push('/quotes');
    }
  }, [status, history]);

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };

  return <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
