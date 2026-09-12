import { Link } from "react-router-dom";

function getProductUrl(product) {
  return `/product/${encodeURIComponent(product.name)}?image=${encodeURIComponent(
    product.image
  )}&price=${encodeURIComponent(product.price)}`;
}

function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  // =====================================
  // CALCULATE TOTALS
  // =====================================

  const totalPrice = cart.reduce(
    (total, product) =>
      total + Number(product.price) * product.quantity,
    0
  );

  const totalItems = cart.reduce(
    (total, product) =>
      total + product.quantity,
    0
  );

  // =====================================
  // EMPTY CART
  // =====================================

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">
            🛒
          </div>

          <h1>Your Cart is Empty</h1>

          <p>
            You haven't added any products to
            your cart yet.
          </p>

          <Link to="/">
            <button className="continue-shopping-button">
              CONTINUE SHOPPING
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // =====================================
  // CART PAGE
  // =====================================

  return (
    <div className="cart-page">

      <div className="cart-header">
        <div>
          <p className="section-small">
            YOUR BAG
          </p>

          <h1>Shopping Cart</h1>
        </div>

        <p>
          {totalItems}{" "}
          {totalItems === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="cart-container">

        {/* ================= CART ITEMS ================= */}

        <div className="cart-items">

          {cart.map((product) => (
            <div
              className="cart-item"
              key={`${product.name}-${product.size || "default"}`}
            >

              {/* PRODUCT IMAGE */}

              <div className="cart-image">
                <Link
                  to={getProductUrl(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </Link>
              </div>

              {/* PRODUCT INFORMATION */}

              <div className="cart-item-info">

                <p className="product-category">
                  FASHION
                </p>

                <Link
                  to={getProductUrl(product)}
                >
                  <h2>{product.name}</h2>
                </Link>

                <p className="cart-price">
                  ₹{product.price}
                </p>

                {/* SIZE */}

                {product.size && (
                  <p className="cart-size">
                    Size:{" "}
                    <strong>{product.size}</strong>
                  </p>
                )}

                {/* QUANTITY */}

                <div className="quantity-section">

                  <span>Quantity</span>

                  <div className="quantity-controls">

                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(product)
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span>
                      {product.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(product)
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>

                  </div>

                </div>

                {/* PRODUCT TOTAL */}

                <p className="product-total">
                  Total:{" "}
                  <strong>
                    ₹
                    {Number(product.price) *
                      product.quantity}
                  </strong>
                </p>

                {/* REMOVE */}

                <button
                  type="button"
                  className="remove-button"
                  onClick={() =>
                    removeFromCart(product)
                  }
                >
                  Remove
                </button>

              </div>
            </div>
          ))}

        </div>

        {/* ================= CART SUMMARY ================= */}

        <div className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>
              Items
            </span>

            <span>
              {totalItems}
            </span>
          </div>

          <div className="summary-row">
            <span>
              Subtotal
            </span>

            <span>
              ₹{totalPrice}
            </span>
          </div>

          <div className="summary-row">
            <span>
              Delivery
            </span>

            <span className="free-delivery">
              FREE
            </span>
          </div>

          <hr />

          <div className="summary-total">
            <span>
              Total
            </span>

            <strong>
              ₹{totalPrice}
            </strong>
          </div>

          <Link
            to="/checkout"
            className="checkout-link"
          >
            <button className="checkout-button">
              PROCEED TO CHECKOUT
            </button>
          </Link>

          <Link
            to="/"
            className="continue-shopping-link"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Cart;