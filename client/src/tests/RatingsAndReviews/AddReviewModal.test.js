import React, {useState} from 'react';
import { render, screen, product, productName } from '@testing-library/react';
import '@testing-library/jest-dom';

import { revsMeta } from './data.js';
import AddReviewModal from '../../components/RatingsAndReviews/AddReviewModal.jsx';

describe('AddReviewModal', () => {
  it('renders AddReviewModal component', () => {
    const Wrapper = () => {
      const [isOpen, setIsOpen] = useState(true);

      return <AddReviewModal productName={productName} product={product}metaData={revsMeta} open={isOpen} onClose={() => {
        setIsOpen(false);
      }} />;
    };
    render(<Wrapper />);
  });
});

