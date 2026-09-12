import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { formatProduct, getRandomProducts } from "../data/products";

const salePrices = {
  shirts: "699",
  "t shirt": "599",
  jeans: "999",
  shoes: "1299",
  watch: "1499",
  footwear: "999",
  jewelry: "799",
  suit: "1499",
};

function Sale({ onWishlist, onCart }) {
  const [saleProducts] = useState(() =>
    getRandomProducts(8).map((product) =>
      formatProduct(product, "Sale", salePrices[product.folder])
    )
  );

  return (
    <div className="products listing-page">
      <div className="listing-header">
        <p className="section-small">STYLEHUB</p>
        <h1>Sale</h1>
        <p>
          Grab your favorite styles at special prices.
        </p>
      </div>

      <div className="product-container">
        {saleProducts.map((product) => (
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

export default Sale;
