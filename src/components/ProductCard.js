import React, { useState } from "react";
import PickupSelect from "./PickupSelect";

function ProductCard({ product, telegramId }) {
  const [showPickup, setShowPickup] = useState(false);

  if (showPickup) {
    // Если выбран товар → показываем окно самовывоза
    return <PickupSelect product={product} telegramId={telegramId} />;
  }

  return (
    <div className="product-card">
      <img
        src={product.image || "/placeholder.png"}
        alt={product.name}
        className="product-image"
      />
      <h3>{product.name}</h3>
      {product.description && <p>{product.description}</p>}
      <p className="product-price">{product.price} ₽</p>

      <button onClick={() => setShowPickup(true)} className="buy-btn">
        Выбрать
      </button>
    </div>
  );
}

export default ProductCard;
