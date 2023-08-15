import React, { useState } from 'react';
import { render, screen, product, productName } from '@testing-library/react';
import '@testing-library/jest-dom';

import { revsMeta } from './data.js';
import PhotoForm from '../../components/RatingsAndReviews/PhotoForm.jsx';

describe('PhotoForm', () => {
  it('renders PhotoForm component', () => {
    render(<PhotoForm open={true} />);
  });
});