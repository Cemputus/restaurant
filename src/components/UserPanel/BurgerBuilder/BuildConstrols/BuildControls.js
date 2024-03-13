import React, { Component } from "react";
import { connect } from "react-redux";

import BuildControl from "./BuildControl/BuildControl";
import { addMealToOrders } from "../../../../store/actions/orderActions";

import classes from "./BuildControls.css";
import BurgerSauces from "../BurgerSauces/BurgerSauces";

class BuildControls extends Component {
  state = {
    price: 5,
    sauces: {
      ketchup: false,
      mayo: false,
      mustard: false
    }
  };

  // Depending on the ingredient, update the price; this function is used for both adding and reducing the price based on the second parameter
  updatePrice = (ing, plus) => {
    switch (ing) {
      case "salad":
        if (plus) {
          this.setState({ price: this.state.price + 2 });
        } else {
          this.setState({ price: this.state.price - 2 });
        }
        break;
      case "burger":
        if (plus) {
          this.setState({ price: this.state.price + 5 });
        } else {
          this.setState({ price: this.state.price - 5 });
        }
        break;
      case "bacon":
        if (plus) {
          this.setState({ price: this.state.price + 4 });
        } else {
          this.setState({ price: this.state.price - 4 });
        }
        break;
      case "cheese":
        if (plus) {
          this.setState({ price: this.state.price + 3 });
        } else {
          this.setState({ price: this.state.price - 3 });
        }
        break;
      default:
        return null;
    }
  };

  onBurgerSubmitHandler = () => {
    const { price, sauces } = this.state;
    const { ings, addMealToOrders } = this.props;
    const id = {
      salad: ings.salad,
      bacon: ings.bacon,
      burger: ings.burger,
      cheese: ings.cheese,
      mayonnaise: sauces.mayo,
      ketchup: sauces.ketchup,
      mustard: sauces.mustard
    };
    let payload = {
      price,
      ings,
      name: "Sweet Burger",
      // Creating a custom ID for counting purposes
      id: JSON.stringify(id),
      count: 1,
      sauces: {
        ...sauces
      }
    };
    addMealToOrders(payload);
  };

  // Depending on the selected sauce, update the price
  sauceUpdatePrice = (plus, sauces) => {
    if (plus) {
      // Also retrieve sauces for the submit order
      this.setState({ price: this.state.price + 2, sauces: { ...sauces } });
    } else {
      this.setState({ price: this.state.price - 2, sauces: { ...sauces } });
    }
  };

  arrayOfIngs = (arr, ings) => {
    for (const key in ings) {
      arr.push({ [key]: ings[key] });
    }
  };

  render() {
    const {
      onAddIngHandler,
      onDeleteIngHandler,
      ings,
      disableBtn,
      disableControls,
      disableIngs
    } = this.props;
    const { price } = this.state;
    let arrayOfIngs = [];
    // Array of ingredients *** [{salad: 2}, {bacon: 3} ...] ***
    this.arrayOfIngs(arrayOfIngs, ings);
    let buildControls = arrayOfIngs.map((item, i) => (
      <BuildControl
        // From the props, I received an object with disabled ingredients, while iterating through the array with ingredients,
        // I access the object from the props and based on that, I get whether to disable the ingredient
        disableThisIng={disableIngs[Object.keys(item)[0]]}
        disableControls={disableControls}
        updatePrice={this.updatePrice}
        onAddIngHandler={onAddIngHandler}
        onDeleteIngHandler={onDeleteIngHandler}
        key={item + i}
        text={Object.keys(item)[0]} // Text based on which a specific ingredient is rendered in the switch statement
        val={item[Object.keys(item)[0]]} // Value based on which I disable the - button
      />
    ));

    return (
      <div className={classes.BuildControls}>
        <p className={classes.Price}>
          Price: <span>{parseFloat(price).toFixed(2)} UGX</span>
        </p>
        {buildControls}
        <BurgerSauces sauceUpdatePrice={this.sauceUpdatePrice} />
        <button
          onClick={this.onBurgerSubmitHandler}
          disabled={disableBtn}
          className={`btn small amber darken-1 ${classes.SubmitBurgerBtn}`}
        >
          Confirm
        </button>
      </div>
    );
  }
}

export default connect(
  null,
  { addMealToOrders }
)(BuildControls);
