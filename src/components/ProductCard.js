import React, { useState } from "react";
import PickupSelect from "./PickupSelect";

function ProductCard({ product, telegramId }) {
  const [showPickup, setShowPickup] = useState(false);

  const handleOrderClick = () => {
    setShowPickup(true); // открываем окно выбора самовывоза
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-img" />
      <h3>{product.name}</h3>
      <p>{product.description || ""}</p>
      <p>
        <b>{product.price} ₽</b>
      </p>
      <button onClick={handleOrderClick}>Заказать</button>

      {showPickup && (
        <PickupSelect
          product={product}
          telegramId={telegramId}
          onClose={() => setShowPickup(false)}
        />
      )}
    </div>
  );
}

export default ProductCard;
