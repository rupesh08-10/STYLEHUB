import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

function Search({ onWishlist, onCart }) {
  const [searchText, setSearchText] = useState("");

  const searchValue = searchText.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    if (!searchValue) {
      return true;
    }

    return (
      product.name.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue) ||
      product.gender.toLowerCase().includes(searchValue)
    );
  });

  const clearSearch = () => {
    setSearchText("");
  };

  return (
    <div className="products search-page">
      <div className="search-header">
        <p className="section-small">FIND YOUR STYLE</p>
        <h1>Search Products</h1>
        <p>
          Search through our latest fashion collection.
        </p>
      </div>

      <div className="search-box">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>

          <input
            type="text"
            placeholder="Search for shirts, jeans, shoes, jewelry..."
            value={searchText}
            onChange={(event) =>
              setSearchText(event.target.value)
            }
            autoFocus
          />

          {searchText && (
            <button
              type="button"
              className="clear-search"
              onClick={clearSearch}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {searchValue !== "" && (
        <div className="search-results-info">
          {filteredProducts.length > 0 ? (
            <p>
              Showing <strong>{filteredProducts.length}</strong>{" "}
              result
              {filteredProducts.length !== 1 ? "s" : ""} for{" "}
              <strong>"{searchText}"</strong>
            </p>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h2>No Products Found</h2>
              <p>
                We couldn't find anything matching{" "}
                <strong>"{searchText}"</strong>.
              </p>

              <button
                type="button"
                onClick={clearSearch}
                className="continue-shopping-button"
              >
                CLEAR SEARCH
              </button>
            </div>
          )}
        </div>
      )}

      {filteredProducts.length > 0 && (
        <div className="product-container">
          {filteredProducts.map((product) => (
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
      )}
    </div>
  );
}

export default Search;
