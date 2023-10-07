import ProductList from "@/components/ProductList";
import { useState, useMemo } from "react";

type Product = { name: string };

const useProduct = (initialValue: Product[]) => {
  const [products, setProducts] = useState(initialValue);
  const removeProduct = useMemo(
    () => (name: string) => {
      setProducts(products.filter((product) => name !== product.name));
    },
    [products]
  );

  const addProduct = useMemo(
    () => (name: string) => {
      setProducts([...products, { name }]);
    },
    [products]
  );

  return { products, removeProduct, addProduct };
};

export default function Home() {
  const [productName, setProductName] = useState("");
  const { products, addProduct, removeProduct } = useProduct([
    { name: "Loose Cropped Jeans (Damaged)" },
    { name: "Smart Skort Solid" },
  ]);

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addProduct(productName);
          setProductName("");
        }}
      >
        <h1 className="text-2xl font-bold">Add a new product</h1>
        <div>
          <label htmlFor="product-name">Product name:</label>
          <input
            className="bg-slate-200"
            id="product-name"
            value={productName}
            onChange={(event) => {
              setProductName(event.target.value);
            }}
          />
          <p data-testid="result">{productName}</p>
        </div>
      </form>
      <hr />
      <ProductList items={products} onRemoveProduct={removeProduct} />
    </>
  );
}
