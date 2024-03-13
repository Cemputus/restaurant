import React from "react";

import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = props => {
  const { ings, disableBurger } = props;
  const transformedIngs = Object.keys(ings).map(ingredientType => {
    return [...Array(ings[ingredientType])].map((_, index) => {
      // The length is important, regardless of what the array is filled with
      return <BurgerIngredient key={ingredientType + index} type={ingredientType} />;
    });
  });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {!disableBurger && (
        <button className={classes.DisabledNotation}>DISABLED</button>
      )}
      {transformedIngs}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
