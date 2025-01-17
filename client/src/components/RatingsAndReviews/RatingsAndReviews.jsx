import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import DropDownSort from './DropDownSort.jsx';

import ReviewsList from './ReviewsList.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import Characteristics from './Characteristics.jsx';
import AddReviewModal from './AddReviewModal.jsx';
import star from '../../assets/stars/star.png';
import { getReviews, getReviewsMeta, fetchProducts } from '../../lib/requestHelpers.js';

const RatingsAndReviews = ({ product }) => {

  const [currentSort, setCurrentSort] = useState('relevance');
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const [activeStars, setActiveStars] = useState([]);
  const [searchIndex, setSearchIndex] = useState(3);
  const [ratings, setRatings] = useState(null);
  const [productName, setProductName] = useState('');
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const sortOptions = ['relevance', 'helpfulness', 'newest'];


  // var url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?page=1&count=200&sort=relevance&product_id=40348`;

  // return axios({
  //   method: 'get',
  //   url: url,
  //   headers: {
  //     'Authorization': TOKEN
  //   }
  // })
  //   .then((res) => {
  //     let reviews = res.data.results;
  //     console.log('reponse:', res.data.results)
  //     return reviews;
  //   })
  //   .catch((err => {
  //     throw (err);
  //   }));

  // useEffect(() => {
  //   getReviews(product, currentSort)
  //     .then((reviews) => {
  //       setReviews(reviews);
  //       return reviews;
  //     })
  //     .then((reviews) => {
  //       let array = reviews.slice(0, 2);
  //       setVisibleReviews(array);
  //       return array;
  //     })
  //     .then(() => {
  //       return getReviewsMeta(product);
  //     })
  //     .then(({ data }) => {
  //       setMetaData(data);
  //       return data;
  //     })
  //     .then((data) => {
  //       setRatings(data.ratings);
  //     })
  //     .then(() => {
  //       return fetchProducts(product);
  //     })
  //     .then(({ name }) => {
  //       setProductName(name);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [product]);

  const addReviews = () => {
    var index = visibleReviews.length;
    let resultArray = [];
    let lastIndex = 0;
    if (activeStars.length === 0) {
      let reviewsArray = reviews;
      resultArray = reviewsArray.slice(0, index + 2);
      setVisibleReviews(resultArray);

    } else {
      let count = 0;
      for (var i = searchIndex; (count < 2 || i === reviews.length); i++) {
        lastIndex = i;
        if (activeStars.includes(reviews[i].rating)) {
          resultArray.push(reviews[i]);
          count++;
        }
      }
      setSearchIndex(lastIndex + 1);
      let array = visibleReviews;
      let newArray = array.concat(resultArray);
      setVisibleReviews(newArray);
    }
  };

  const sortReviews = (newStar) => {
    let resultArray = [];
    let newStarIndex = activeStars.indexOf(newStar);
    let starArray = activeStars;
    let lastIndex = 0;

    if ((newStarIndex !== -1) && activeStars[0] === newStar) {
      setActiveStars([]);
      let reviewsArray = reviews;
      resultArray = reviewsArray.slice(0, 2);
      lastIndex = 3;
    } else if (newStarIndex !== -1) {
      starArray.splice(newStarIndex, 1);
      setActiveStars(starArray);
      for (let i = 0; resultArray.length < 2; i++) {
        if (activeStars.includes(reviews[i].rating)) {
          resultArray.push(reviews[i]);
          lastIndex = i;
        }
      }
    } else {
      starArray.push(newStar);
      setActiveStars(starArray);
      for (let j = 0; resultArray.length < 2; j++) {
        if (activeStars.includes(reviews[j].rating)) {
          resultArray.push(reviews[j]);
          lastIndex = j;
        }
      }
    }
    setSearchIndex(lastIndex + 1);
    setVisibleReviews(resultArray);
  };

  const removeAllFilters = () => {
    setActiveStars([]);
    let array = reviews;
    setVisibleReviews(array.slice(0, 2));
  };

  const resetReviews = (currentSort) => {
    getReviews(product, currentSort)
      .then((reviews) => {
        setReviews(reviews);
        return reviews;
      })
      .then((reviews) => {
        let array = reviews.slice(0, 2);
        setVisibleReviews(array);
      })
      .then(() => {
        setActiveStars([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div onClick={() => {
        setDropDownOpen(false);
      }} id="ratings-and-reviews">

        <div id="main-title">RATINGS AND REVIEWS</div>

        <section className="breakdown-and-reviews">

          <div className="breakdown-and-characteristics">
            <RatingBreakdown ratings={ratings} sortReviews={sortReviews} metaData={metaData} setReviews={setReviews} activeStars={activeStars} removeAllFilters={removeAllFilters} />
            <Characteristics metaData={metaData} />
          </div>

          <div className="reviews-list-and-buttons">
            <div className="list-sort-heading">{reviews.length} reviews, sorted by <span className="sort-word" onClick={(e) => {
              e.stopPropagation();
              setDropDownOpen(!dropDownOpen);
            }}> {currentSort} ∨</span></div>
            <DropDownSort resetReviews={resetReviews} setCurrentSort={setCurrentSort} onClose={setDropDownOpen} currentSort={currentSort} sortOptions={sortOptions} open={dropDownOpen} />
            <ReviewsList visibleReviews={visibleReviews} />

            <div id="bottomButtons">
              {((reviews.length !== 0) && searchIndex !== reviews.length - 1) && <button className="review-button" onClick={addReviews}>MORE REVIEWS</button>}

              <button className="review-button" onClick={() => {
                setModalOpen(true);
              }}>ADD REVIEW +</button>
              <AddReviewModal product={product} productName={productName} metaData={metaData} open={modalOpen} closeModal={() => {
                setModalOpen(false);
              }} />
            </div>
          </div>

        </section>

      </div>
    </>
  );
};

export default RatingsAndReviews;