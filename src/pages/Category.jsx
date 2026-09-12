import ProductCard from "../components/ProductCard";
import { getProductsByCategory } from "../data/products";

function Category({ category, onWishlist, onCart }) {
  const products = getProductsByCategory(
    category.gender,
    category.folder
  );

  return (
    <div className="category-page">
      <div className="category-header">
        <p className="section-small">STYLEHUB</p>
        <h1>{category.title}</h1>
        <p>
          Explore our {category.name.toLowerCase()} collection.
        </p>
      </div>

      {products.length > 0 ? (
        <div className="product-container">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={category.price}
              onWishlist={onWishlist}
              onCart={onCart}
            />
          ))}
        </div>
      ) : (
        <div className="category-empty">
          <h2>No Products Found</h2>
          <p>
            There are no products in this collection.
          </p>
        </div>
      )}
    </div>
  );
}

export default Category;
