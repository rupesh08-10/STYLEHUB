import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function Wishlist({
  wishlist,
  removeFromWishlist,
  onCart
}) {
  return (
    <div className="wishlist-page">

      <h1>My Wishlist</h1>

      {/* =====================================
          EMPTY WISHLIST
          ===================================== */}

      {wishlist.length === 0 ? (

        <div className="empty-wishlist">

          <h2>
            Your Wishlist is Empty
          </h2>

          <p>
            You haven't added any products
            to your wishlist yet.
          </p>

          <Link to="/">
            <button>
              Continue Shopping
            </button>
          </Link>

        </div>

      ) : (

        <div>

          <p>
            {wishlist.length} product
            {wishlist.length > 1 ? "s" : ""} saved
          </p>

          {/* =====================================
              WISHLIST PRODUCTS
              ===================================== */}

          <div className="product-container">

            {wishlist.map((product) => (

              <div
                key={product.name}
                className="wishlist-product"
              >

                <ProductCard
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  onWishlist={() => {}}
                  onCart={onCart}
                />


                {/* =====================================
                    REMOVE FROM WISHLIST
                    ===================================== */}

                <button
                  className="remove-wishlist-button"
                  onClick={() =>
                    removeFromWishlist(product.name)
                  }
                >
                  Remove from Wishlist
                </button>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}

export default Wishlist;