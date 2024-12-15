import { useContext, useMemo } from "react";
import { CartContext } from "../Context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart, calTotal } = useContext(CartContext);
  const navigate = useNavigate();

  const TAX_RATE = 0.05;

  const calcSubtotal = () => {
    if (!cart || cart.length === 0) return 0;
    return cart.reduce((subtotal, item) => {
      return subtotal + (item.price || 0) * (item.quantity || 0);
    }, 0);
  };

  const calcTaxes = (subtotal) => {
    return subtotal * TAX_RATE;
  };

  const calcTotal = (subtotal, taxes) => {
    return subtotal + taxes;
  };

  const subtotal = useMemo(() => calcSubtotal(), [cart]);
  const taxes = useMemo(() => calcTaxes(subtotal), [subtotal]);
  const total = useMemo(() => calcTotal(subtotal, taxes), [subtotal, taxes]);

  // console.log("Cart:", cart);
  // console.log("Subtotal:", subtotal);
  // console.log("Taxes:", taxes);
  // console.log("Total:", total);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <h2>
        <FaShoppingCart /> Your Cart
      </h2>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <div className="cart-items">
          <ul>
            {cart.map((item, index) => (
              <li key={item.id}>
                {item.name} : {item.price} (x{item.quantity})
                <button onClick={() => removeFromCart(item.id)}>
                  Remove item
                </button>
              </li>
            ))}
          </ul>

          <div>
            <h3>Order Summary</h3>
            <h4>Subtotal: ${subtotal ? subtotal.toFixed(2) : "0.00"}</h4>
            <h4>Taxes (5%): ${taxes ? taxes.toFixed(2) : "0.00"} </h4>

            <hr />

            <h3>
              <strong>Total: ${total ? total.toFixed(2) : "0.00"} </strong>
            </h3>
          </div>
        </div>
      )}
      <p>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            style={{
              border: "10px",
              padding: "10px 10px",
              margin: "5px",
              borderRadius: "5px",
              backgroundColor: "green",
              color: "whitesmoke",
            }}
          >
            Clear Cart
          </button>
        )}
      </p>
      <button
        onClick={handleCheckout}
        style={{
          border: "10px",
          padding: "10px 10px",
          margin: "5px",
          borderRadius: "5px",
          backgroundColor: "green",
          color: "whitesmoke",
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
