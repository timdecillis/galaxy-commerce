import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { revsMeta } from './data.js';
import Characteristics from '../../components/RatingsAndReviews/Characteristics.jsx';

describe('Characteristics', () => {
  it('renders Characteristics component', () => {
    render(<Characteristics metaData={revsMeta} />);
  });
});