import React, { useEffect, useState } from "react";
import { products } from "./data";
import ProductCard from "./ProductCard";
import About from "./About";
import Delivery from "./Delivery";
import "./App.css";

function App() {
  const [page, setPage] = useState("menu");
  const [lastProductName, setLastProductName] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);
  const telegramId = queryParams.get("telegram_id");

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

      {/* Меню показываем только если не страница благодарности */}
      {page !== "thanks" && (
        <nav className="nav">
          <button onClick={() => setPage("menu")}>Меню</button>
          <button onClick={() => setPage("about")}>О компании</button>
          <button onClick={() => setPage("delivery")}>Доставка и оплата</button>
        </nav>
      )}

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
                setPage={setPage}
                setLastProductName={setLastProductName}
              />
            ))}
          </div>
        </>
      )}

      {page === "about" && <About />}
      {page === "delivery" && <Delivery />}

      {page === "thanks" && (
        <div className="thanks-screen" style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>🎉 Спасибо за заказ!</h2>
          <p>Мы уже готовим <b>{lastProductName}</b>.</p>
          <p>Скоро свяжемся с вами для подтверждения.</p>
          {window.Telegram && window.Telegram.WebApp && (
            <button
              onClick={() => window.Telegram.WebApp.close()}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                borderRadius: "8px",
                backgroundColor: "#2ecc71",
                color: "#fff",
                border: "none",
                cursor: "pointer"
              }}
            >
              Закрыть приложение
            </button>
          )}
        </div>
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
