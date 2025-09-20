import React from "react";

function ProductCard({ product, telegramId }) {
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
        if (window.Telegram && window.Telegram.WebApp) {
          // показываем попап и закрываем только после нажатия кнопки
          window.Telegram.WebApp.showPopup(
            {
              title: "Заказ оформлен",
              message: `✅ ${product.name}`,
              buttons: [{ id: "ok", type: "ok", text: "ОК" }]
            },
            (buttonId) => {
              if (buttonId === "ok") {
                window.Telegram.WebApp.close();
              }
            }
          );
        } else {
          alert(`✅ Заказ получен: ${product.name}`);
          // для веб-версии просто закроем вкладку
          window.close();
        }
      } else {
        if (window.Telegram && window.Telegram.WebApp) {
          window.Telegram.WebApp.showPopup({
            title: "Ошибка",
            message: "❌ Не удалось отправить заказ",
            buttons: [{ id: "ok", type: "ok", text: "ОК" }]
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
          buttons: [{ id: "ok", type: "ok", text: "ОК" }]
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
