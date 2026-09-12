import { Link } from "react-router-dom";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { getRandomProducts } from "../data/products";

function Home({ onWishlist, onCart }) {
  const [featuredProducts] = useState(() => getRandomProducts(8));

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small">NEW COLLECTION 2026</p>

          <h1>
            FIND YOUR
            <br />
            PERFECT STYLE
          </h1>

          <p className="hero-description">
            Discover the latest fashion for men and women.
            Simple, stylish and made for you.
          </p>

          <div className="hero-buttons">
            <Link to="/men">
              <button>SHOP MEN</button>
            </Link>

            <Link to="/women">
              <button className="women-button">
                SHOP WOMEN
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="categories">
        <p className="section-small">EXPLORE</p>
        <h2>SHOP BY CATEGORY</h2>

        <div className="category-container">
          <div className="category-card men">
            <div className="category-content">
              <h3>MEN</h3>
              <Link to="/men">
                <button>SHOP NOW →</button>
              </Link>
            </div>
          </div>

          <div className="category-card women">
            <div className="category-content">
              <h3>WOMEN</h3>
              <Link to="/women">
                <button>SHOP NOW →</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="products">
        <p className="section-small">OUR COLLECTION</p>
        <h2>FEATURED PRODUCTS</h2>

        <div className="product-container">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              onWishlist={onWishlist}
              onCart={onCart}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
