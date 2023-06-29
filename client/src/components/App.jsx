import React, {useState} from 'react';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import Overview from './overview/Overview.jsx';
import RelatedAndComparisons from './RelatedAndComparisons/RelatedAndComparisons.jsx';




const App = () => {

  const [product, setProduct] = useState(40348);

  return (
    <section id="container">
      <p>Hello Neptune</p>
      <Overview product={product} setProduct={setProduct}/>
      <RelatedAndComparisons product={product} setProduct={setProduct}/>
      <RatingsAndReviews product={product} setProduct={setProduct}/>
    </section>
  );
};

export default App;