// this file will be served when request reaches ourdomain.com/news/:newsId
// [] in the file name tells nextjs that this will be dynamic page
// so that it should be loaded for different values in your path.

const DetailPage = () => {
  return <h1>The News Detail Page</h1>;
};

export default DetailPage;
