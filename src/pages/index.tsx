import ProductList from "@/components/ProductList";
import { useState } from "react";

const delay = (cb: () => void) => {
  const ms = Math.round(Math.random() * 2000);
  setTimeout(cb, ms);
};

export default function Home() {
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState([
    { name: "Loose Cropped Jeans (Damaged)" },
    { name: "Smart Skort Solid" },
  ]);
  const [productCount, setProductCount] = useState(2);
  const onAddProduct = (name: string) => {
    delay(() => {
      setProducts((prevState) => [...prevState, { name }]);
      setProductName("");
      setProductCount((prevProdCount) => prevProdCount + 1);
    });
  };
  const onRemoveProduct = (name: string) => {
    delay(() => {
      setProducts((prevState) =>
        prevState.filter((product) => name !== product.name)
      );
      setProductCount((prevState) => prevState - 1);
    });
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onAddProduct(productName);
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
      <h1 className="text-2xl font-bold" data-testid="title">
        Products {productCount}
      </h1>
      <ProductList items={products} onRemoveProduct={onRemoveProduct} />
    </>
  );
}
