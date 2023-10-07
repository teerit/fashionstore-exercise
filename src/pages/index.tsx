import ProductList from "@/components/product/ProductList";
import { useCart } from "@/contexts/cart";
import { Category, Product } from "@/models/product";
import { useEffect, useState } from "react";
import { api } from "@/tools/api";

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
