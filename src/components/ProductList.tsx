import { Product } from "@/models/product";

type ProductListProps = {
  items: Product[];
  removeItems(s: string): void;
};

const ProductList = ({ items, removeItems }: ProductListProps) => {
  return (
    <ul className="list-disc list-inside">
      {items.map((item) => (
        <li key={item.name}>
          {item.name}{" "}
          <button
            onClick={() => {
              removeItems(item.name);
            }}
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
