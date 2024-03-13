import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { deleteFromOrders } from "../../../store/actions/orderActions";

import classes from "./Orders.css";

class Orders extends Component {
  render() {
    const {
      checkout,
      orders: { orders },
      deleteFromOrders
    } = this.props;

    let orderList = orders.map((order, i) => {
      return (
        <li className={classes.OrderLi} key={order.id + i + order.price}>
          <div className={classes.PriceAndName}>
            <div className={classes.NameAndRemove}>
              <p className={classes.Name}>
                {order.count} x {order.name}
                {order.specialOfferItem ? ` + ${order.specialOfferItem}` : null}
              </p>
              {!checkout && (
                <p
                  onClick={() => deleteFromOrders(order.id)}
                  className={classes.RemoveFromCart}
                >
                  x
                </p>
              )}
            </div>
            <p>{parseFloat(order.price).toFixed(2)} UGX</p>
          </div>
          {order.name === "Sweet Burger" && (
            <div>
              <p>Salad: {order.ings["salata"]}</p>
              <p>Burger Patty: {order.ings["pljeskavica"]}</p>
              <p>Cheese: {order.ings["sir"]}</p>
              <p>Bacon: {order.ings["slanina"]}</p>
              <div className={classes.Sauces}>
                <p>Sauces: </p>
                {order.sauces.ketchup && <p>K</p>}
                {order.sauces.mayo && <p>M</p>}
                {order.sauces.mustard && <p>S</p>}
              </div>
            </div>
          )}
        </li>
      );
    });

    let totalPrice = orders.reduce((acc, curVal) => {
      return acc + parseFloat(curVal.price);
    }, 0);

    return (
      <div className={classes.OrdersDiv}>
        <ul className={classes.Orders}>{orderList}</ul>
        <div className={classes.Total}>
          <p>Total:</p>
          <p>{parseFloat(totalPrice).toFixed(2)} UGX</p>
        </div>
        {!checkout && (
          <Link
            to={{
              pathname: "/menu/checkout",
              state: { orders, totalPrice }
            }}
            disabled={!orders.length}
            className={`waves-effect waves-light btn-small orange lighten-1 ${
              classes.Checkout
            }`}
          >
            Continue
          </Link>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders
});

export default connect(
  mapStateToProps,
  { deleteFromOrders }
)(Orders);
