import React, { useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { Consumer } from "../contexts/shoppingCartContext";
import CartItem from "../components/CartItem";

const ShoppingCart = () => {
  const [purchaseMade, setPurchaseMade] = useState(false);
  return (
    <Consumer>
      {({ cart, removeItem, clearCart }) => (
        <div className="m-6">
          <h1 className="prose prose-xl font-bold mt-2 mb-2 text-gray-400">
            Shopping Cart
          </h1>
          <div className="pb-4">
            {cart.map((item, idx) => (
              <CartItem item={item} onRemove={removeItem} key={item.id + idx} />
            ))}
          </div>
          {purchaseMade && (
            <div>Congratulations! Your purchase was successful.</div>
          )}
          {!cart.length && (
            <p className="prose prose-m text-gray-300">
              Your shopping cart is empty
            </p>
          )}
          {typeof window !== "undefined" && (
            <PayPalButton
              currency="EUR"
              options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_ID || "sb",
                currency: "EUR",
              }}
              createOrder={(data, actions) => {
                const payload = {
                  purchase_units: cart.map((i) => {
                    let desc = i.title;
                    if (i.finish) {
                      desc += " box with " + i.finish.Name + " finish";
                      if (i.customDescription) {
                        desc += ` with custom description "${i.customDescription}"`;
                      }
                    } else if (i.size) {
                      desc += ` shirt size ${i.size} color ${i.color} sex ${i.sex}`;
                    }
                    return {
                      reference_id: i.title,
                      description: desc,
                      amount: {
                        currency_code: "EUR",
                        value: i.price,
                      },
                    };
                  }),
                };
                return !!cart.length && actions.order.create(payload);
              }}
              onApprove={(data, actions) => {
                clearCart();
                /* const test = actions.order.get(); */
                setPurchaseMade(true);
                /* const orderResponse = { */
                /*   orderId: data.orderID, */
                /*   payerId: data.payerID, */
                /*   cart, */
                /* }; */
              }}
            />
          )}
        </div>
      )}
    </Consumer>
  );
};

export default ShoppingCart;
