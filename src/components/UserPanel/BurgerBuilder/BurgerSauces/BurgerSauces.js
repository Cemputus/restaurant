import React from "react";

import classes from "./BurgerSauces.css";

class BurgerSauces extends React.Component {
  state = {
    ketchup: false,
    mayo: false,
    mustard: false
  };

  // The name must be stored in a variable because setState is asynchronous
  // If any of the sauces is true, a function with a parameter will be called
  // to update the price
  onCheckboxChange = e => {
    const name = e.target.name;
    this.setState(
      prevState => ({ [name]: !prevState[name] }),
      () => {
        if (this.state[name]) {
          this.props.sauceUpdatePrice(true, { ...this.state });
        } else {
          this.props.sauceUpdatePrice(false, { ...this.state });
        }
      }
    );
  };

  render() {
    const { ketchup, mayo, mustard } = this.state;
    return (
      <div className={classes.BurgerSauces}>
        <p>Sauces: </p>
        <p>
          <label>
            <input
              name="ketchup"
              onChange={e => this.onCheckboxChange(e)}
              checked={ketchup}
              type="checkbox"
            />
            <span>Ketchup</span>
          </label>
        </p>
        <p>
          <label>
            <input
              onChange={e => this.onCheckboxChange(e)}
              name="mayo"
              checked={mayo}
              type="checkbox"
            />
            <span>Mayonnaise</span>
          </label>
        </p>
        <p>
          <label>
            <input
              onChange={e => this.onCheckboxChange(e)}
              name="mustard"
              checked={mustard}
              type="checkbox"
            />
            <span>Mustard</span>
          </label>
        </p>
      </div>
    );
  }
}

export default BurgerSauces;
