import { Link, Route, useParams } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

const DUMMY_QUOTES = [
  { id: 'q1', author: 'Max', text: 'Learning React is fun!' },
  { id: 'q2', author: 'Maximilian', text: 'Learning React is great!' },
];

const QuoteDetail = () => {
  const params = useParams();

  const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  if (!quote) {
    // if quote not found
    return <p>No quote found!</p>;
  }

  return (
    <>
      <HighlightedQuote text={quote.text} author={quote.author} />
      {/* Using react router to conditionally render content based on which path you are on */}
      <Route path='/quotes/:quoteId' exact>
        <div className='centered'>
          <Link className='btn--flat' to={`/quotes/${params.quoteId}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      {/* <Route path={`/quotes/${params.quoteId}/comments`} exact> */}
      <Route path='/quotes/:quoteId/comments' exact>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
