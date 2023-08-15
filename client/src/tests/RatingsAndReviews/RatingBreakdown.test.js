import React, {useState} from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { revs, visibleRevs, revsMeta, activeStars, sortReviews, removeAllFilters } from './data.js';
import RatingBreakdown from '../../components/RatingsAndReviews/RatingBreakdown.jsx';

describe('RatingBreakdown', () => {
  it('renders RatingBreakdown component', () => {
    const Wrapper = () => {
      const [reviews, setReviews] = useState(revs);
      return <RatingBreakdown sortReviews={sortReviews} metaData={revsMeta} reviews={reviews} setReviews={setReviews} activeStars={activeStars} removeAllFilters={removeAllFilters} />;
    };
    render (<Wrapper />);
  });
});