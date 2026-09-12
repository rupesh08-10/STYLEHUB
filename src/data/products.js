import products from "./products.json";

export { products };

export const categoryInfo = {
  men: [
    { name: "Shirts", folder: "shirts", link: "/men/shirts", title: "Men's Shirts" },
    { name: "T-Shirts", folder: "t shirt", link: "/men/t-shirts", title: "Men's T-Shirts" },
    { name: "Jeans", folder: "jeans", link: "/men/jeans", title: "Men's Jeans" },
    { name: "Shoes", folder: "shoes", link: "/men/shoes", title: "Men's Shoes" },
    { name: "Watches", folder: "watch", link: "/men/watches", title: "Men's Watches" },
  ],
  women: [
    { name: "Footwear", folder: "footwear", link: "/women/footwear", title: "Women's Footwear" },
    { name: "Jewelry", folder: "jewelry", link: "/women/jewelry", title: "Women's Jewelry" },
    { name: "Suits", folder: "suit", link: "/women/suits", title: "Women's Suits" },
  ],
};

export const getProductsByCategory = (gender, folder) =>
  products.filter(
    (product) =>
      product.gender === gender && product.folder === folder
  );

export const getFirstProduct = (gender, folder) =>
  getProductsByCategory(gender, folder)[0];

export const getRandomProducts = (count = 8) => {
  const shuffled = [...products];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
};

export const formatProduct = (product, prefix = "", price = product.price) => ({
  ...product,
  name: prefix ? `${prefix} ${product.name}` : product.name,
  price,
});
