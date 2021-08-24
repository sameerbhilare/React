import { useParams } from 'react-router-dom';

const QuoteDetail = () => {
  const params = useParams();
  return <h1>Quote Details Page {params.quoteId}</h1>;
};

export default QuoteDetail;
