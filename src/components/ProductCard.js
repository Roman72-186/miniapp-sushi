import React from "react";

function ProductCard({ product, onOrder }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-img" />
      <h3>{product.name}</h3>
      {product.description && <p>{product.description}</p>}
      <p><b>{product.price} ₽</b></p>
      <button onClick={onOrder}>Заказать</button>
    </div>
  );
}

export default ProductCard;
