import ProductList from "@/components/ProductList";
import { useState } from "react";

export default function Home() {
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState([
    { name: "Loose Cropped Jeans (Damaged)" },
  ]);

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setProducts([...products, { name: productName }]);
          setProductName("");
        }}
      >
        <h1 className="text-2xl font-bold">Add a new product</h1>
        <div>
          <label htmlFor="product-name">Product name:</label>
          <input
            className="bg-slate-200"
            id="product-name"
            onChange={(event) => {
              setProductName(event.target.value);
            }}
          />
          <p data-testid="result">{productName}</p>
        </div>
      </form>
      <hr />
      <ProductList items={products} />
    </>
  );
}
