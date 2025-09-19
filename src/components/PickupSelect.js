import React, { useState } from "react";

function PickupSelect({ product, telegramId }) {
  const [selectedPickup, setSelectedPickup] = useState(null);

  const pickupPoints = [
    { id: 1, address: "г. Калининград, ул. Ю. Гагарина, д. 16Б" },
    { id: 2, address: "г. Калининград, ул. Согласия, д. 46" },
    { id: 3, address: "г. Калининград, ул. Автомобильная, д. 125" }
  ];

  const handleConfirm = async () => {
    if (!selectedPickup) {
      alert("❌ Выберите пункт самовывоза!");
      return;
    }

    const payload = {
      telegram_id: telegramId,
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      pickup_point: pickupPoints.find(p => p.id === selectedPickup).address
    };

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.status === "ok") {
        alert(`✅ Заказ подтвержден\n${product.name}\n${payload.pickup_point}`);

        // Закрываем мини-апп после подтверждения
        if (window.Telegram && window.Telegram.WebApp) {
          window.Telegram.WebApp.close();
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
    <div className="pickup-container">
      <h3>Выберите пункт самовывоза:</h3>
      <ul className="pickup-list">
        {pickupPoints.map((point) => (
          <li key={point.id}>
            <label>
              <input
                type="radio"
                name="pickup"
                value={point.id}
                checked={selectedPickup === point.id}
                onChange={() => setSelectedPickup(point.id)}
              />
              {point.address}
            </label>
          </li>
        ))}
      </ul>

      {selectedPickup && (
        <button onClick={handleConfirm} className="confirm-btn">
          Подтвердить
        </button>
      )}
    </div>
  );
}

export default PickupSelect;
