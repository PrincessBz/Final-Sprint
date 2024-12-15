import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Header from "../Components/Header";
import { BrowserRouter } from "react-router-dom";

describe("Header", () => {
  test("renders shop name", () => {
    render(
      <BrowserRouter>
        (<Header />
        );
      </BrowserRouter>
    );
    const headerText = screen.getByText(/Antique Shop Naija/i);
    expect(headerText).toBeInTheDocument();
  });

  test("contains navigation links", () => {
    <BrowserRouter>
      render(
      <Header />
      );
    </BrowserRouter>;
    const navLinks = screen.getAllByRole("link");
    expect(navLinks.length).toBeGreaterThan(0);
  });
});
