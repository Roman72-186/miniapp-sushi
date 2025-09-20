import React from "react";

function ProductCard({ product, telegramId, setPage, setLastProductName }) {
  const handleOrder = async () => {
    const payload = {
      telegram_id: telegramId,
      product_id: product.id,
      product_name: product.name,
      price: product.price
    };

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.status === "ok") {
        // Переводим пользователя на страницу "Спасибо"
        setLastProductName(product.name);
        setPage("thanks");
      } else {
        if (window.Telegram && window.Telegram.WebApp) {
          window.Telegram.WebApp.showPopup({
            title: "Ошибка",
            message: "❌ Не удалось отправить заказ",
            buttons: [{ id: "ok", type: "default", text: "ОК" }]
          });
        } else {
          alert("❌ Ошибка: не удалось отправить заказ");
        }
      }
    } catch (error) {
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.showPopup({
          title: "Ошибка",
          message: "❌ Ошибка при отправке заказа",
          buttons: [{ id: "ok", type: "default", text: "ОК" }]
        });
      } else {
        alert("❌ Ошибка при отправке заказа");
      }
      console.error(error);
    }
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
