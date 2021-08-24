import { Route, useParams } from 'react-router-dom';
import Comments from '../components/comments/Comments';

const QuoteDetail = () => {
  const params = useParams();
  return (
    <>
      <h1>Quote Details Page</h1>
      <p>{params.quoteId}</p>
      {/* <Route path={`/quotes/${params.quoteId}/comments`} exact> */}
      <Route path='/quotes/:quoteId/comments' exact>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
