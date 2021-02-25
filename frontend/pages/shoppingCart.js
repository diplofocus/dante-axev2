import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { Consumer } from "../contexts/shoppingCartContext";
import CartItem from "../components/CartItem";

const ShoppingCart = () => (
  <Consumer>
    {({ cart, removeItem }) => (
      <div>
        <h1 className="prose prose-xl font-bold mt-2 mb-2">Shopping Cart</h1>
        {cart.map((item) => (
          <CartItem item={item} onRemove={removeItem} key={item.id} />
        ))}
        {cart.length ? (
          typeof window !== "undefined" && (
            <div className="flex p-2 float-right">
              <PayPalButton
                currency="EUR"
                options={{
                  clientId: "sb",
                  currency: "EUR",
                }}
                createOrder={(data, actions) => {
                  console.log(data);
                  console.log(actions);
                  return actions.order.create({
                    purchase_units: cart.map((i) => ({
                      reference_id: i.id,
                      amount: {
                        currency_code: "EUR",
                        value: "15.00",
                      },
                    })),
                  });
                }}
              />
            </div>
          )
        ) : (
          <p className="prose prose-m">Your shopping cart is empty</p>
        )}
      </div>
    )}
  </Consumer>
);

export default ShoppingCart;
