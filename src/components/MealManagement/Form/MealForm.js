import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";

import Input from "./Input";
import Combobox from "../../UI/Combobox";

class MealForm extends Component {
  state = {
    name: "",
    price: "",
    desc: "",
    specialOffer: false,
    discount: false,
    specialOfferItem: null,
    successMsg: false,
    img: null
  };

  componentDidMount() {
    const { meal, editMeal } = this.props;
    if (editMeal) {
      this.setState({ ...meal });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const {
      name,
      price,
      desc,
      specialOffer,
      discount,
      id,
      specialOfferItem,
      img
    } = this.state;
    const { firestore, editMeal } = this.props;

    const data = {
      name,
      price,
      desc,
      specialOffer,
      discount,
      specialOfferItem,
      img
    };

    if (editMeal) {
      if (!specialOffer) {
        this.setState({ specialOfferItem: null });
        data.specialOfferItem = null;
      }
      firestore.update({ collection: "meals", doc: id }, data).then(() => {
        this.setState({ successMsg: true });
        setTimeout(() => this.setState({ successMsg: false }), 2000);
      });
    } else {
      firestore.add({ collection: "meals" }, data);
      this.setState({
        name: "",
        price: "",
        desc: "",
        specialOffer: false,
        discount: false,
        specialOfferItem: null
      });
    }
  };

  onDpChangeHandler = e => {
    this.setState({ specialOfferItem: e.value });
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheckChange = e => {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    });
  };

  render() {
    const { successMsg } = this.state;
    const {
      name,
      desc,
      price,
      specialOffer,
      discount,
      specialOfferItem
    } = this.state;
    const { editMeal } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <Input
          name="name"
          type="text"
          label="Name"
          value={name}
          onInputChange={this.onInputChange}
          inputType="input"
          classes="col m12"
          editMeal={editMeal}
          additionStyle={{ marginBottom: "0" }}
        />
        <Input
          inputType="textarea"
          label="Description"
          onInputChange={this.onInputChange}
          value={desc}
          name="desc"
          classes="col m12"
          editMeal={editMeal}
          additionStyle={{ marginBottom: "0" }}
        />
        <div className="row">
          <div className="col m6">
            <Input
              inputType="input"
              type="text"
              label="Price"
              onInputChange={this.onInputChange}
              value={price}
              name="price"
              classes="col m12"
              icon
              editMeal={editMeal}
              additionStyle={{ marginBottom: "0" }}
            />
          </div>
          <div className="col m6" style={{ marginBottom: ".5rem" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "1rem"
              }}
            >
              <input
                disabled={specialOffer}
                type="checkbox"
                name="discount"
                checked={discount}
                onChange={this.onCheckChange}
              />
              <span />
              <p>Discount Price</p>
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "1rem"
              }}
            >
              <input
                disabled={discount}
                type="checkbox"
                name="specialOffer"
                checked={specialOffer}
                onChange={this.onCheckChange}
              />
              <span />
              <p>Special Offer</p>
            </label>
          </div>
          <div className="col m12">
            {specialOffer ? (
              <div style={{ marginBottom: "1rem" }}>
                {editMeal ? (
                  <p style={{ marginBottom: ".3rem", color: "#333" }}>
                    Special Offer Item
                  </p>
                ) : null}
                <Combobox
                  dpValue={specialOfferItem}
                  onDpChangeHandler={this.onDpChangeHandler}
                />
              </div>
            ) : null}
            <button
              style={{ width: "100%" }}
              className="btn-small waves-effect waves-light orange darken-2"
              type="submit"
            >
              <i className="material-icons right">send</i>{" "}
              {editMeal ? "Edit" : "Add"}
            </button>
            {editMeal && (
              <p
                style={{
                  marginTop: ".5rem",
                  color: "#333",
                  opacity: successMsg ? 1 : 0,
                  transition: "opacity 1s ease"
                }}
              >
                Data successfully stored!
              </p>
            )}
          </div>
        </div>
      </form>
    );
  }
}

export default firestoreConnect()(MealForm);
