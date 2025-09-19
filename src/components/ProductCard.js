import React, { useState } from "react";
import PickupSelect from "./PickupSelect";

function ProductCard({ product, telegramId }) {
  const [showPickup, setShowPickup] = useState(false);

  if (showPickup) {
    return <PickupSelect product={product} telegramId={telegramId} />;
  }

  return (
    <div className="product-card">
      <img
        src={product.image || "/placeholder.png"}
        alt={product.name}
        className="product-img"
      />
      <h3>{product.name}</h3>
      {product.description && <p>{product.description}</p>}
      <p>
        <b>{product.price} ₽</b>
      </p>
      <button onClick={() => setShowPickup(true)}>Выбрать</button>
    </div>
  );
}

export default ProductCard;
