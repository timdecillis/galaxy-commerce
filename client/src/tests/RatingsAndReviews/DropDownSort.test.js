import React, { useState } from "react";
import { render, screen, product, productName } from "@testing-library/react";
import "@testing-library/jest-dom";

import { revsMeta, sortOptions } from "./data.js";
import DropDownSort from "../../components/RatingsAndReviews/DropDownSort.jsx";

describe("DropDownSort", () => {
  it("renders DropDownSort component when state is open", () => {
    const Wrapper = () => {
      const [dropDownOpen, setDropDownOpen] = useState(true);
      const [currentSort, setCurrentSort] = useState("relevance");
      return (
        <DropDownSort
          onClose={setDropDownOpen}
          sortOptions={sortOptions}
          open={dropDownOpen}
        />
      );
    };
    render(<Wrapper />);
    expect(document.getElementsByClassName("drop-down")).toBeTruthy();
  });
});
