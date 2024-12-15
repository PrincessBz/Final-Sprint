import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { CartContext } from "../Context/CartContext";
import Cart from "../Components/Cart";
import { MemoryRouter } from "react-router-dom";

describe("Cart", () => {
  test("renders cart items", () => {
    const mockCart = [{ id: 1, name: "Oduduwa Mask", price: "200" }];
    render(
      <MemoryRouter>
        <CartContext.Provider value={{ cart: mockCart }}>
          <Cart />
        </CartContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Oduduwa Mask/i)).toBeInTheDocument();

    const cartItem = screen.getByText(/Oduduwa Mask/i);
    expect(cartItem).toBeInTheDocument();

    const checkoutButton = screen.getByText(/proceed to checkout/i);
    checkoutButton.click();
  });
});
