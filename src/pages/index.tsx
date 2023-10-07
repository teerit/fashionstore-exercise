import ProductList from "@/components/product/ProductList";
import { useCart } from "@/contexts/cart";
import { Category, Product } from "@/models/product";
import { useEffect, useState } from "react";
import { api } from "@/tools/api";


// const fetchProducts = (): Promise<Product[]> => {
//   const products = [
//     {
//       id: "91479834-ac10-42c4-87c0-4584f9083851",
//       name: "Loose Cropped Jeans (Damaged)",
//       price: 42.57,
//       imageUrl:
//         "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/448429/item/goods_66_448429.jpg?width=300",
//       category: Category.WOMEN,
//     },
//     {
//       id: "91479834-ac10-42c4-87c0-4584f9083857",
//       name: "Smart Skort Solid",
//       price: 140.37,
//       imageUrl:
//         "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/455844/item/goods_09_455844.jpg?width=300",
//       category: Category.WOMEN,
//     },
//     {
//       id: "a8ce731c-f553-46d5-9ff6-563d198f3e39",
//       name: "Oxford Striped Slim Fit Long Sleeve Shirt",
//       price: 28.28,
//       imageUrl:
//         "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/452300/sub/goods_452300_sub14.jpg?width=1600&impolicy=quality_75",
//       category: Category.MEN,
//     },
//   ];
//   return new Promise((resolve) => resolve(products));
// };

type GetProductResponse = {
  data: Product[];
};

export const getProducts = async (): Promise<Product[]> => {
  const { data: responseBody } = await api.get<GetProductResponse>(
    "/products"
  );
  return responseBody.data;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const cart = useCart();
  const onAddProduct = (productId: string) => {
    cart.addNumberOfItems(1);
    console.log(`add product:${productId} to the cart.`);
  };

  useEffect(() => {
    let isStale = false;
    setIsLoading(true);
    getProducts().then((productsResult) => {
      if (!isStale) {
        setIsLoading(false);
        setProducts(productsResult);
      }
    });
    return () => {
      isStale = true;
    };
  }, []);
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <ProductList items={products} onAddProduct={onAddProduct} />
      )}
    </>
  );
}
