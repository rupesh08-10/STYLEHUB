import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Checkout({ cart }) {

  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });


  // =====================================
  // CALCULATE TOTALS
  // =====================================

  const totalPrice = cart.reduce(
    (total, product) =>
      total +
      Number(product.price || 0) *
        Number(product.quantity || 1),
    0
  );


  const totalItems = cart.reduce(
    (total, product) =>
      total +
      Number(product.quantity || 1),
    0
  );


  // =====================================
  // HANDLE FORM INPUT
  // =====================================

  const handleChange = (event) => {

    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

  };


  // =====================================
  // PLACE ORDER
  // =====================================

  const handleSubmit = (event) => {

    event.preventDefault();

    setOrderPlaced(true);

  };


  // =====================================
  // EMPTY CART
  // =====================================

  if (cart.length === 0 && !orderPlaced) {

    return (

      <div className="checkout-page">

        <div className="empty-checkout">

          <p className="section-small">
            CHECKOUT
          </p>

          <h1>
            Your Cart is Empty
          </h1>

          <p>
            Please add some products before
            proceeding to checkout.
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
  // ORDER SUCCESS
  // =====================================

  if (orderPlaced) {

    return (

      <div className="checkout-page">

        <div className="checkout-success">

          <div className="success-icon">
            ✓
          </div>

          <p className="section-small">
            ORDER CONFIRMED
          </p>

          <h1>
            Order Placed Successfully!
          </h1>

          <p>
            Thank you for shopping with
            STYLEHUB.
          </p>

          <p>
            Your order has been received and
            will be processed shortly.
          </p>

          <div className="success-summary">

            <p>
              <strong>
                Items:
              </strong>{" "}
              {totalItems}
            </p>

            <p>
              <strong>
                Order Total:
              </strong>{" "}
              ₹{totalPrice.toLocaleString("en-IN")}
            </p>

          </div>

          <button
            className="checkout-button"
            onClick={() => navigate("/")}
          >
            CONTINUE SHOPPING
          </button>

        </div>

      </div>

    );

  }


  // =====================================
  // CHECKOUT PAGE
  // =====================================

  return (

    <div className="checkout-page">


      {/* ================= HEADER ================= */}

      <div className="checkout-header">

        <p className="section-small">
          STYLEHUB
        </p>

        <h1>
          Checkout
        </h1>

        <p>
          Complete your details to place
          your order.
        </p>

      </div>


      <div className="checkout-container">


        {/* ================= SHIPPING FORM ================= */}

        <div className="checkout-form">

          <h2>
            Shipping Information
          </h2>

          <form onSubmit={handleSubmit}>


            {/* NAME */}

            <div className="form-group">

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            {/* PHONE */}

            <div className="form-group">

              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{10}"
                maxLength="10"
                required
              />

              <small>
                Enter a 10-digit phone number.
              </small>

            </div>


            {/* ADDRESS */}

            <div className="form-group">

              <label htmlFor="address">
                Complete Address
              </label>

              <textarea
                id="address"
                name="address"
                placeholder="House number, street, area..."
                value={formData.address}
                onChange={handleChange}
                rows="4"
                required
              />

            </div>


            {/* CITY + STATE */}

            <div className="form-row">


              <div className="form-group">

                <label htmlFor="city">
                  City
                </label>

                <input
                  id="city"
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="state">
                  State
                </label>

                <input
                  id="state"
                  type="text"
                  name="state"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* PINCODE */}

            <div className="form-group">

              <label htmlFor="pincode">
                Pincode
              </label>

              <input
                id="pincode"
                type="text"
                name="pincode"
                placeholder="Enter 6-digit pincode"
                value={formData.pincode}
                onChange={handleChange}
                pattern="[0-9]{6}"
                maxLength="6"
                required
              />

            </div>


            {/* PLACE ORDER */}

            <button
              type="submit"
              className="checkout-button"
            >
              PLACE ORDER
            </button>

          </form>

        </div>


        {/* ================= ORDER SUMMARY ================= */}

        <div className="checkout-summary">

          <h2>
            Order Summary
          </h2>


          {/* TOTAL ITEMS */}

          <div className="summary-row">

            <span>
              Total Items
            </span>

            <span>
              {totalItems}
            </span>

          </div>


          {/* PRODUCTS */}

          <div className="checkout-products">

            {cart.map((product, index) => (

              <div
                className="checkout-product"
                key={
                  `${product.name}-${
                    product.size || "default"
                  }-${index}`
                }
              >


                {/* PRODUCT IMAGE */}

                <div className="checkout-product-image">

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                </div>


                {/* PRODUCT INFORMATION */}

                <div className="checkout-product-info">

                  <h3>
                    {product.name}
                  </h3>


                  {product.size && (

                    <p>
                      Size:{" "}
                      <strong>
                        {product.size}
                      </strong>
                    </p>

                  )}


                  <p>
                    Quantity:{" "}
                    {product.quantity}
                  </p>


                  <p>
                    ₹
                    {(
                      Number(product.price || 0) *
                      Number(product.quantity || 1)
                    ).toLocaleString("en-IN")}
                  </p>

                </div>

              </div>

            ))}

          </div>


          <hr />


          {/* SUBTOTAL */}

          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <span>
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>

          </div>


          {/* DELIVERY */}

          <div className="summary-row">

            <span>
              Delivery
            </span>

            <span className="free-delivery">
              FREE
            </span>

          </div>


          <hr />


          {/* TOTAL */}

          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ₹{totalPrice.toLocaleString("en-IN")}
            </strong>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Checkout;