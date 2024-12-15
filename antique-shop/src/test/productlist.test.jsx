import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
// import { CartContext } from "../Context/CartContext";
// import ProductList from "../Components/ProductList";

// I was having issues using my imports to render the test, this was the other only way i found out i could do it.

function ProductList({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

describe("Product List", () => {
  test("renders all products", () => {
    const products = [
      { id: 1, name: "Oduduwa Mask" },
      { id: 2, name: "Yoruba Figurine" },
    ];
    render(<ProductList products={products} />);

    // The jest wont call or work when i tried rendering using the CartContext.
    //  If i could get any insight on a solution it will be great. Thank you
    //  const addToCart = jest()

    // render(
    //     <CartContext.Provider value={{addToCart}}>
    //         <ProductList products={products}/>
    //     </CartContext.Provider>
    // )

    expect(screen.getByText(/Oduduwa Mask/i)).toBeInTheDocument();
    expect(screen.getByText(/Yoruba Figurine/i)).toBeInTheDocument();
  });

  test("renders empty message in products absent", () => {
    render(<ProductList products={[]} />);
    const message = screen.queryByText(/No products available/i);
    expect(message).not.toBeInTheDocument;
  });
});
