import React, { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { Consumer } from "../contexts/shoppingCartContext";
import CartItem from "../components/CartItem";

const ShoppingCart = () => {
  const [purchaseMade, setPurchaseMade] = useState(false);
  return (
    <Consumer>
      {({ cart, removeItem, clearCart }) => (
        <div>
          <h1 className="prose prose-xl font-bold mt-2 mb-2">Shopping Cart</h1>
          {cart.map((item) => (
            <CartItem item={item} onRemove={removeItem} key={item.id} />
          ))}
          {cart.length ? (
            typeof window !== "undefined" && (
              <PayPalButton
                currency="EUR"
                options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_ID,
                  currency: "EUR",
                }}
                createOrder={(data, actions) => {
                  console.log(data);
                  console.log(actions);
                  console.log(cart);
                  return actions.order.create({
                    purchase_units: cart.map((i) => {
                      console.log(i);
                      let id = i.id;
                      if (i.finish) {
                        id += i.finish.id;
                      }
                      return {
                        reference_id: id,
                        amount: {
                          currency_code: "EUR",
                          value: i.price,
                        },
                      };
                    }),
                  });
                }}
                onApprove={(data, actions) => {
                  console.log("completed", data, actions);
                  clearCart();
                  setPurchaseMade(true);
                }}
              />
            )
          ) : purchaseMade ? (
            <div>Congratulations! Your purchase was successful.</div>
          ) : (
            <p className="prose prose-m">Your shopping cart is empty</p>
          )}
        </div>
      )}
    </Consumer>
  );
};

export default ShoppingCart;
