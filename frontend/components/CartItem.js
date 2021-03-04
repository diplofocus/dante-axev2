import React from "react";
import TrashCan from "./TrashCan";
import { getStrapiMedia } from "../utils/medias";

const CartItem = ({ item, onRemove = () => {} }) => (
  <div className="flex border-solid rounded border-2 border-gray-900 bg-gray-900 shadow-md items-center justify-between pr-4 mb-2">
    <div className="flex items-center">
      <img
        src={getStrapiMedia(item.image[0].formats.thumbnail.url)}
        alt={item.title}
        className="mr-2"
      />
      <h1 className="mr-2 text-gray-400">{item.title}</h1>
      {item.finish && (
        <h2 className="text-gray-500">{item.finish.Name} Finish</h2>
      )}
    </div>
    <div className="justify-self-end flex justify-between">
      <h2 className="mr-4 text-gray-300">{item.price.toFixed(2)} €</h2>
      <button onClick={() => onRemove(item.id)}>
        <TrashCan />
      </button>
    </div>
  </div>
);

export default CartItem;
