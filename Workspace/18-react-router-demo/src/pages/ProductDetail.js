import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  /*
        useParams returns an object where the keys are the dynamic segments leading to that page. 
        e.g. productId in case of ourdomain.com/product-detail/:productId
    */
  const params = useParams();

  return (
    <section>
      <h1>Product Detail</h1>
      <p>{params.productId}</p>
    </section>
  );
};

export default ProductDetail;
