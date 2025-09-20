import React from "react";

function ProductCard({ product, telegramId, setPage, setLastProductName }) {
  const handleOrder = async () => {
    const payload = {
      telegram_id: telegramId,
      product_id: product.id,
      product_name: product.name,
      price: product.price
    };

    // Логируем отправку
    console.log("Отправка заказа:", payload);

    try {
      // Запускаем отправку на сервер, но не ждём результата
      fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(res => console.log("Ответ сервера:", res.status))
        .catch(err => console.error("Ошибка при отправке:", err));

    } catch (error) {
      console.error("Ошибка при формировании запроса:", error);
    }

    // Сразу переводим на страницу благодарности
    setLastProductName(product.name);
    setPage("thanks");
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-img" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p><b>{product.price} ₽</b></p>
      <button onClick={handleOrder}>Заказать</button>
    </div>
  );
}

export default ProductCard;
