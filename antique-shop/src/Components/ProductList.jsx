import { useState, useEffect } from "react";
import { useContext } from "react";
import { Link , } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

const ProductList = () => {
  const { addToCart } = useContext(CartContext) || {}
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try{
      const res = await fetch('http://localhost:5000/products');
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      setProducts(data);
    }catch (error){
      console.error("Error:", error)
    }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "200px", height:"auto", borderRadius:"15px", border:"2px solid black"}}
          />
          <h3>{product.name}</h3>
          <p>Price: {product.price}</p>
          <p>{product.description.substring(0, 50)}</p>
          <div>
            <button
              onClick={() => addToCart?.(product)}
              style={{
                backgroundColor: "orange",
                color: "whitesmoke",
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
                marginRight: "10px",
              }}
            >
              Add to Cart
            </button>
            <Link style={{color: "black",
              fontFamily:"cursive",
              fontSize:"bold",
              
            }} to={`/product/${product.id}`}> View Details</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
