import React, { useEffect, useState } from "react";
import { products } from "./data";
import About from "./About";
import Delivery from "./Delivery";
import "./App.css";
import ProductCard from "./components/ProductCard";
import PickupSelect from "./components/PickupSelect";

function App() {
  const [page, setPage] = useState("menu");
  const queryParams = new URLSearchParams(window.location.search);
  const telegramId = queryParams.get("telegram_id");

  // Состояние для выбора товара и показа модалки
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  return (
    <div className="app">
      <div className="header">
        <img src="/logo.jpg" alt="Sushi House Logo" className="logo" />
        <span onClick={() => setPage("menu")} style={{ cursor: "pointer" }}>
          Sushi House
        </span>
      </div>

      <nav className="nav">
        <button onClick={() => setPage("menu")}>Меню</button>
        <button onClick={() => setPage("about")}>О компании</button>
        <button onClick={() => setPage("delivery")}>Доставка и оплата</button>
      </nav>

      {page === "menu" && (
        <>
          {!telegramId && (
            <p style={{ color: "red", textAlign: "center" }}>
              ❌ Ошибка: Telegram ID не передан в URL
            </p>
          )}
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                telegramId={telegramId}
                onOrder={() => setSelectedProduct(product)} // 👉 при заказе открываем модалку
              />
            ))}
          </div>
        </>
      )}

      {page === "about" && <About />}
      {page === "delivery" && <Delivery />}

      {/* Модалка выбора самовывоза */}
      {selectedProduct && (
        <PickupSelect
          product={selectedProduct}
          telegramId={telegramId}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <footer className="footer">
        <img src="/logo.jpg" alt="Sushi House" className="footer-logo" />
        <div className="footer-info">
          <p><b>📞 Телефон:</b> +7 (401) 290-27-90</p>
          <p><b>⏰ Время работы:</b> 10:00 – 22:00</p>
          <p><b>📍 Адрес:</b> г. Калининград, ул. Ю.Гагарина, д. 16Б</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
