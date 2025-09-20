"use client";
import { foodkingUtility } from "@/utility";
import { Fragment, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

const FoodKingLayout = ({ children, header, footer }) => {
  useEffect(() => {
    foodkingUtility.scrollAnimation();
    foodkingUtility.stickyNav();
  }, []);
  return (
    <Fragment>
      <Header header={header} />
      {children}
      <Footer footer={footer} />
    </Fragment>
  );
};
export default FoodKingLayout;
