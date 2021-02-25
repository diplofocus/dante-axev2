import React from "react";
import TrashCan from "./TrashCan";
import { getStrapiMedia } from "../utils/medias";

const CartItem = ({ item, onRemove = () => {} }) => (
  <div className="flex border-solid border-2 border-primary items-center justify-between px-4">
    <div className="flex items-center">
      <img
        src={getStrapiMedia(item.image[0].formats.thumbnail.url)}
        alt={item.title}
        className="mr-2"
      />
      <h1 className="mr-2">{item.title}</h1>
      <h2>{item.finish.Name} Finish</h2>
    </div>
    <div className="justify-self-end flex justify-between">
      <h2 className="mr-4">{item.price.toFixed(2)} €</h2>
      <button onClick={() => onRemove(item.id)}>
        <TrashCan />
      </button>
    </div>
  </div>
);

export default CartItem;
