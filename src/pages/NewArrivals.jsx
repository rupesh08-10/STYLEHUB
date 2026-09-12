import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { formatProduct, getRandomProducts } from "../data/products";

const newPrices = {
  shirts: "999",
  "t shirt": "899",
  jeans: "1499",
  shoes: "1999",
  watch: "2499",
  footwear: "1999",
  jewelry: "1499",
  suit: "2999",
};

function NewArrivals({ onWishlist, onCart }) {
  const [newProducts] = useState(() =>
    getRandomProducts(8).map((product) =>
      formatProduct(product, "New", newPrices[product.folder])
    )
  );

  return (
    <div className="products listing-page">
      <div className="listing-header">
        <p className="section-small">STYLEHUB</p>
        <h1>New Arrivals</h1>
        <p>
          Check out the latest styles added to STYLEHUB.
        </p>
      </div>

      <div className="product-container">
        {newProducts.map((product) => (
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
    </div>
  );
}

export default NewArrivals;
