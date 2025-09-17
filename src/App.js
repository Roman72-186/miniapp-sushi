import React, { useEffect } from "react";
import { products } from "./data";
import ProductCard from "./ProductCard";
import "./App.css";

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const telegramId = queryParams.get("telegram_id");

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      console.log("✅ Telegram WebApp инициализирован");
    } else {
      console.log("❌ Telegram WebApp объект не найден");
    }
  }, []);

  return (
    <div className="app">
      <h1>🍣 Наше меню</h1>
      {!telegramId && (
        <p style={{ color: "red" }}>
          ❌ Ошибка: Telegram ID не передан в URL
        </p>
      )}
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} telegramId={telegramId} />
        ))}
      </div>
    </div>
  );
}

export default App;
