import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Category from "./pages/Category";
import NewArrivals from "./pages/NewArrivals";
import Sale from "./pages/Sale";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import { categoryInfo } from "./data/products";

function App() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const addToWishlist = (product) => {
    setWishlist((currentWishlist) => {
      if (
        currentWishlist.some(
          (item) => item.name === product.name
        )
      ) {
        return currentWishlist;
      }

      return [...currentWishlist, product];
    });
  };

  const removeFromWishlist = (productName) => {
    setWishlist((currentWishlist) =>
      currentWishlist.filter(
        (item) => item.name !== productName
      )
    );
  };

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) =>
          item.name === product.name &&
          item.size === product.size
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.name === product.name &&
          item.size === product.size
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (product) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.name === product.name &&
        item.size === product.size
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (product) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.name === product.name &&
          item.size === product.size
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (product) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          !(
            item.name === product.name &&
            item.size === product.size
          )
      )
    );
  };

  const cartItemCount = cart.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const categoryRoutes = [
    ...categoryInfo.men.map((category) => ({
      path: category.link,
      category: {
        gender: "men",
        folder: category.folder,
        name: {
          Shirts: "Shirt",
          "T-Shirts": "T-Shirt",
          Jeans: "Jeans",
          Shoes: "Shoes",
          Watches: "Watch",
        }[category.name],
        title: category.title,
        price: {
          Shirts: "999",
          "T-Shirts": "799",
          Jeans: "1499",
          Shoes: "1999",
          Watches: "2499",
        }[category.name],
      },
    })),
    ...categoryInfo.women.map((category) => ({
      path: category.link,
      category: {
        gender: "women",
        folder: category.folder,
        name:
          category.name === "Suits"
            ? "Suit"
            : category.name,
        title: category.title,
        price: {
          Footwear: "1999",
          Jewelry: "1499",
          Suits: "2999",
        }[category.name],
      },
    })),
  ];

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">STYLEHUB</Link>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/men">Men</Link>
          <Link to="/women">Women</Link>
          <Link to="/new-arrivals">New Arrivals</Link>
          <Link to="/sale">Sale</Link>
        </div>

        <div className="nav-icons">
          <Link to="/search" title="Search">
            🔍
          </Link>

          <Link to="/wishlist" title="Wishlist">
            ♡
            {wishlist.length > 0 && (
              <span className="nav-count">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/cart" title="Cart">
            🛒
            {cartItemCount > 0 && (
              <span className="nav-count">
                {cartItemCount}
              </span>
            )}
          </Link>

          <Link to="/login">👤 Login</Link>
        </div>
      </nav>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onWishlist={addToWishlist}
                onCart={addToCart}
              />
            }
          />

          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />

          {categoryRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Category
                  category={route.category}
                  onWishlist={addToWishlist}
                  onCart={addToCart}
                />
              }
            />
          ))}

          <Route
            path="/new-arrivals"
            element={
              <NewArrivals
                onWishlist={addToWishlist}
                onCart={addToCart}
              />
            }
          />

          <Route
            path="/sale"
            element={
              <Sale
                onWishlist={addToWishlist}
                onCart={addToCart}
              />
            }
          />

          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                removeFromWishlist={removeFromWishlist}
                onCart={addToCart}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />

          <Route
            path="/search"
            element={
              <Search
                onWishlist={addToWishlist}
                onCart={addToCart}
              />
            }
          />

          <Route
            path="/product/:productName"
            element={<ProductDetails onCart={addToCart} />}
          />

          <Route
            path="/checkout"
            element={<Checkout cart={cart} />}
          />

          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h2>STYLEHUB</h2>
            <p>
              Discover the latest fashion for
              men and women.
            </p>
            <p>
              Simple. Stylish. Made for you.
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <Link to="/">Home</Link>
            <Link to="/men">Men</Link>
            <Link to="/women">Women</Link>
            <Link to="/new-arrivals">New Arrivals</Link>
            <Link to="/sale">Sale</Link>
          </div>

          <div className="footer-section">
            <h3>Customer</h3>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/search">Search</Link>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: rupesh.tome0810@gmail.com</p>
            <p>Phone: +91 705547666</p>
            <p>India</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            This website is developed for project purpose
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
