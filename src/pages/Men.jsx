import { Link } from "react-router-dom";
import { categoryInfo, getFirstProduct } from "../data/products";

function Men() {
  const categories = categoryInfo.men;

  return (
    <div className="category-page">
      <div className="category-header">
        <p className="section-small">STYLEHUB</p>
        <h1>Men's Collection</h1>
        <p>Explore our latest collection for men.</p>
      </div>

      <div className="category-selection-grid">
        {categories.map((category) => {
          const product = getFirstProduct("men", category.folder);

          return (
            <Link
              key={category.folder}
              to={category.link}
              className="category-selection-card"
            >
              <div className="category-selection-image">
                {product && (
                  <img
                    src={product.image}
                    alt={category.name}
                  />
                )}
              </div>

              <div className="category-selection-content">
                <h2>{category.name}</h2>
                <span>View Collection →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Men;
