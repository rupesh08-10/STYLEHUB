import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

function ProductDetails({ onCart }) {
  const { productName } = useParams();
  const [searchParams] = useSearchParams();

  const [selectedSize, setSelectedSize] = useState("");

  // =====================================
  // GET PRODUCT DATA FROM URL
  // =====================================

  const product = {
    name: decodeURIComponent(productName || ""),
    image: searchParams.get("image"),
    price: searchParams.get("price") || "0",
    category: "FASHION",
  };

  // =====================================
  // PRODUCT NOT FOUND
  // =====================================

  if (!product.image) {
    return (
      <div className="product-details not-found">

        <p className="section-small">
          STYLEHUB
        </p>

        <h1>Product Not Found</h1>

        <p>
          Sorry, we couldn't find the product
          you're looking for.
        </p>

        <Link to="/">
          <button className="checkout-button">
            BACK TO HOME
          </button>
        </Link>

      </div>
    );
  }

  // =====================================
  // ADD TO CART
  // =====================================

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }

    const cartProduct = {
      ...product,
      size: selectedSize,
    };

    onCart(cartProduct);

    alert(
      `${product.name} - Size ${selectedSize} added to cart!`
    );
  };

  // =====================================
  // PRODUCT DETAILS PAGE
  // =====================================

  return (
    <div className="product-details">

      {/* ================= PRODUCT IMAGE ================= */}

      <div className="details-image">

        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

      </div>

      {/* ================= PRODUCT INFORMATION ================= */}

      <div className="details-info">

        <p className="product-category">
          {product.category}
        </p>

        <h1>
          {product.name}
        </h1>

        <h2 className="details-price">
          ₹{product.price}
        </h2>

        <p className="details-description">
          Discover the perfect combination of
          style, comfort and quality with our{" "}
          <strong>{product.name}</strong>.
          Designed for modern fashion lovers
          who want to look and feel their best.
        </p>

        {/* ================= PRODUCT FEATURES ================= */}

        <div className="product-features">

          <div>
            <strong>✓</strong>
            <span>Quality Material</span>
          </div>

          <div>
            <strong>✓</strong>
            <span>Comfortable Fit</span>
          </div>

          <div>
            <strong>✓</strong>
            <span>Modern Style</span>
          </div>

        </div>

        {/* ================= SIZE ================= */}

        <div className="size-section">

          <div className="size-heading">

            <h3>
              Select Size
            </h3>

            {selectedSize && (
              <span>
                Selected:{" "}
                <strong>
                  {selectedSize}
                </strong>
              </span>
            )}

          </div>

          <div className="sizes">

            {["S", "M", "L", "XL"].map(
              (size) => (
                <button
                  key={size}
                  type="button"
                  className={
                    selectedSize === size
                      ? "selected-size"
                      : ""
                  }
                  onClick={() =>
                    setSelectedSize(size)
                  }
                >
                  {size}
                </button>
              )
            )}

          </div>

        </div>

        {/* ================= ADD TO CART ================= */}

        <button
          type="button"
          className="cart-button details-cart-button"
          onClick={handleAddToCart}
        >
          ADD TO CART
        </button>

        {/* ================= CONTINUE SHOPPING ================= */}

        <Link
          to="/"
          className="continue-shopping-link"
        >
          ← Continue Shopping
        </Link>

      </div>

    </div>
  );
}

export default ProductDetails;