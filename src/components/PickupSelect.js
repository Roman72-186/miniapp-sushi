import React, { useState } from "react";

function PickupSelect({ product, telegramId, onClose }) {
  const [pickupPoint, setPickupPoint] = useState("");

  const pickupPoints = [
    "г. Калининград, ул. Ленина, 10",
    "г. Калининград, ул. Победы, 25",
    "г. Калининград, ул. Советская, 100"
  ];

  const handleConfirm = async () => {
    if (!pickupPoint) {
      alert("Пожалуйста, выберите пункт самовывоза");
      return;
    }

    const payload = {
      telegram_id: telegramId,
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      pickup_point: pickupPoint
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
          window.Telegram.WebApp.showAlert(
            `✅ Заказ получен: ${product.name}\nСамовывоз: ${pickupPoint}`,
            () => {
              window.Telegram.WebApp.close();
            }
          );
        } else {
          alert(`✅ Заказ получен: ${product.name}\nСамовывоз: ${pickupPoint}`);
          onClose();
        }
      } else {
        alert("❌ Ошибка: не удалось отправить заказ");
      }
    } catch (error) {
      alert("❌ Ошибка при отправке заказа");
      console.error(error);
    }
  };

  return (
    <div className="pickup-modal">
      <h3>Выберите пункт самовывоза</h3>
      <ul>
        {pickupPoints.map((point, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="pickup"
                value={point}
                checked={pickupPoint === point}
                onChange={(e) => setPickupPoint(e.target.value)}
              />
              {point}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleConfirm}>Подтвердить</button>
      <button onClick={onClose}>Отмена</button>
    </div>
  );
}

export default PickupSelect;
