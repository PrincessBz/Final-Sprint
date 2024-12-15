import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  // const {product} = location.state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        const selectedProduct = data.find(
          (item) => item.id === parseInt(id, 10)
        );
        // if (!selectedProduct) {
        //   throw new Error("Product not found");
        // }
        setProduct(selectedProduct);
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details">
      <div className="product-img">
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "300px", height: "auto" }}
        />
      </div>
      <h3>{product.name}</h3>

      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;
