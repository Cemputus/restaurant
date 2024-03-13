import { ADD_TO_ORDERS, DELETE_FROM_ORDERS } from "../actions/types";

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_ORDERS:
      // Copy the existing orders array to avoid mutating the state directly
      let orders = [...state.orders];
      if (orders.length > 0) {
        let addToState = true;
        // Check if the item with the same ID already exists in the orders
        orders.forEach(order => {
          if (order.id === action.payload.id) {
            // If the item exists, increase its count and update the price
            order.count++;
            order.price = parseFloat(order.price) + parseFloat(action.payload.price);
            // Set addToState to false to indicate that the item is already in the state
            addToState = false;
          }
        });
        // If addToState is true, add the new item to the state; otherwise, keep the existing state
        if (addToState)
          return {
            orders: [...orders, action.payload]
          };
        else
          return {
            orders: [...orders]
          };
      } else {
        // If the orders array is empty, add the new item to the state
        return {
          ...state,
          orders: [...state.orders, action.payload]
        };
      }
    case DELETE_FROM_ORDERS:
      // Filter out the item with the specified ID from the orders array
      let updatedOrders = state.orders.filter(item => item.id !== action.payload);
      return {
        orders: updatedOrders
      };
    default:
      // If the action type is not recognized, return the current state
      return state;
  }
};
