import ProductList from "@/components/product/ProductList";
import { Category, Product } from "@/models/product";
import { useEffect, useState } from "react";

const fetchProducts = (
  category: Category | null = null
): Promise<Product[]> => {
  const products = [
    {
      id: "91479834-ac10-42c4-87c0-4584f9083851",
      name: "Loose Cropped Jeans (Damaged)",
      price: 42.57,
      imageUrl:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/448429/item/goods_66_448429.jpg?width=300",
      category: Category.WOMEN,
    },
    {
      id: "91479834-ac10-42c4-87c0-4584f9083857",
      name: "Smart Skort Solid",
      price: 140.37,
      imageUrl:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455844/item/goods_09_455844.jpg?width=300",
      category: Category.WOMEN,
    },
    {
      id: "a8ce731c-f553-46d5-9ff6-563d198f3e39",
      name: "Oxford Striped Slim Fit Long Sleeve Shirt",
      price: 28.28,
      imageUrl:
        "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/452300/sub/goods_452300_sub14.jpg?width=1600&impolicy=quality_75",
      category: Category.MEN,
    },
  ];
  if (category === null) return new Promise((resolve) => resolve(products));

  const filteredProducts = products.filter(
    (product) => product.category === category
  );
  const ms = Math.round(Math.random() * 5000);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(filteredProducts);
    }, ms);
  });
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const onAddProduct = (productId: string) => {
    console.log(`add product:${productId} to the cart.`);
  };

  useEffect(() => {
    let isBind = false;
    setIsLoading(true);
    fetchProducts(selectedCategory).then((productsResult) => {
      if (!isBind) {
        setIsLoading(false);
        setProducts(productsResult);
      }
    });
    return () => {
      isBind = true
    }
  }, [selectedCategory]);

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => {
            setSelectedCategory(Category.MEN);
          }}
          className={`px-6 py-1 transition ease-in duration-200 hover:bg-blue-400 ${
            selectedCategory === Category.MEN ? "bg-blue-500 text-white" : ""
          } hover:text-white border-2 border-gray-900 focus:outline-none`}
        >
          MEN
        </button>
        <button
          onClick={() => {
            setSelectedCategory(Category.WOMEN);
          }}
          className={`px-6 py-1 transition ease-in duration-200 hover:bg-pink-400 ${
            selectedCategory === Category.WOMEN ? "bg-pink-500 text-white" : ""
          } hover:text-white border-2 border-gray-900 focus:outline-none`}
        >
          WOMEN
        </button>
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <ProductList items={products} onAddProduct={onAddProduct} />
      )}
    </>
  );
}
