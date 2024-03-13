import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";

import Burger from "../Burger/Burger";
import BuildControls from "./BuildConstrols/BuildControls";
import Spinner from "../../UI/Spinner";

import classes from "./BurgerBuilder.css";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      burger: 0,
      cheese: 0
    }
  };

  onAddIngHandler = ing => {
    this.setState({
      ...this.state,
      ingredients: {
        ...this.state.ingredients,
        [ing]: this.state.ingredients[ing] + 1
      }
    });
  };

  onDeleteIngHandler = ing => {
    this.setState({
      ...this.state,
      ingredients: {
        ...this.state.ingredients,
        [ing]: this.state.ingredients[ing] - 1
      }
    });
  };

  render() {
    // Disable the "Confirm" button if no ingredient is added
    let arr = [];
    for (const key in this.state.ingredients) {
      arr.push(this.state.ingredients[key]);
    }

    let disable = arr.every(val => !val);

    let renderBurger = (
      <div className={classes.SpinnerDiv}>
        <Spinner />
      </div>
    );

    const { burgerStatus } = this.props;

    if (burgerStatus) {
      const disableIngs = {
        burger: burgerStatus.burger.burger,
        salad: burgerStatus.burger.salad,
        cheese: burgerStatus.burger.cheese,
        bacon: burgerStatus.burger.bacon
      };
      renderBurger = (
        <div className={classes.BurgerBuilder}>
          <Burger
            disableBurger={burgerStatus.burger.allowBuild}
            ings={{ ...this.state.ingredients }}
          />
          <BuildControls
            disableIngs={disableIngs}
            disableControls={burgerStatus.burger.allowBuild}
            disableBtn={disable}
            getPrice={this.getPrice}
            onAddIngHandler={this.onAddIngHandler}
            onDeleteIngHandler={this.onDeleteIngHandler}
            ings={{ ...this.state.ingredients }}
          />
        </div>
      );
    }

    return renderBurger;
  }
}

export default compose(
  firestoreConnect(["burger"]),
  connect(state => ({
    burgerStatus: state.firestore.data.burger
  }))
)(BurgerBuilder);
