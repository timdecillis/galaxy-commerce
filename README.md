# Frontend Capstone Project - GalaxyCommerce

This React app provides the frontend for an e-commerce web application.The app includes three primary features: Overview, Related Products & Comparisons, and Ratings & Reviews.


## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Tech Stack](#tech-stack)

## Overview

The Overview provides general information and images of the viewed product. Related Products and Comparisons lists similar products and, when clicked, will show a comparison of features of the currently viewed product with the selected related product. Additionally, the user may add the currently viewed product to "Your Outfit", which is a cookie-based persistent feature. The Ratings & Reviews section provides the visitor with the average rating for the currently viewed product, as well as the corresponding reviews, which can be sorted by date created, helpfulness, or relevancy. The user can also filter the reviews by score, or leave a new review for the product.

This app interacts with the third-party Atelier API which provides the front-end with dynamically rendered content such as the products, images, reviews, related products, and product styles.

## Getting Started

1. From the terminal, clone repo
```
git clone https://github.com/timdecillis/galaxy-commerce
```
2. Copy config.example.js, rename to config.js, and update the file with your GitHub token.

3. Install dependencies
```
npm install
```
4. Compile and serve the app locally:

```
npm run client-dev
```
## Tech Stack

Javascript, React, SASS

