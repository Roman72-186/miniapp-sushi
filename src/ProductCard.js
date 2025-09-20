import React from "react";

function ProductCard({ product, telegramId, setPage, setLastProductName }) {
  const handleOrder = () => {
    const payload = {
      telegram_id: telegramId,
      product_id: product.id,
      product_name: product.name,
      price: product.price,
    };

    // Логируем для отладки
    console.log("Отправляем заказ:", payload);

    // Отправляем на вебхук (не ждём ответа)
    fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((err) => console.error("Ошибка при отправке заказа:", err));

    // Сразу переводим на страницу благодарности
    setLastProductName(product.name);
    setPage("thanks");
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-img" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>
        <b>{product.price} ₽</b>
      </p>
      <button onClick={handleOrder}>Заказать</button>
    </div>
  );
}

export default ProductCard;
