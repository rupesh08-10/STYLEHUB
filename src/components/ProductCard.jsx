import { Link } from "react-router-dom";

function ProductCard({
  image,
  name,
  price,
  onWishlist,
  onCart,
}) {
  const product = {
    image,
    name,
    price,
  };

  const productUrl = `/product/${encodeURIComponent(name)}?image=${encodeURIComponent(
    image
  )}&price=${encodeURIComponent(price)}`;

  const handleWishlist = () => {
    if (onWishlist) {
      onWishlist(product);
    }
  };

  const handleCart = () => {
    if (onCart) {
      onCart(product);
    }
  };

  return (
    <div className="product-card">

      {/* PRODUCT IMAGE */}
      <div className="product-image">

        <Link to={productUrl}>
          <img
            src={image}
            alt={name}
            loading="lazy"
          />
        </Link>

        {/* WISHLIST */}
        <button
          type="button"
          className="wishlist"
          onClick={handleWishlist}
          aria-label={`Add ${name} to wishlist`}
          title="Add to Wishlist"
        >
          ♡
        </button>

      </div>

      {/* PRODUCT INFO */}
      <div className="product-info">

        <p className="product-category">
          FASHION
        </p>

        <Link
          to={productUrl}
          className="product-name-link"
        >
          <h3>{name}</h3>
        </Link>

        <p className="product-price">
          ₹{price}
        </p>

        {/* ADD TO CART */}
        <button
          type="button"
          className="cart-button"
          onClick={handleCart}
        >
          ADD TO CART
        </button>

      </div>

    </div>
  );
}

export default ProductCard;