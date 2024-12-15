import { useContext, useMemo } from "react";
import { CartContext } from "../Context/CartContext";

const Checkout = () => {
  const { cart, calTotal } = useContext(CartContext);

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

  //  console.log("Cart:", cart);
  //  console.log("Subtotal:", subtotal);
  //  console.log("Taxes:", taxes);
  //  console.log("Total:", total);


  const handleCheckout = () => {
    alert("Order placed successfully");
  };
  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="checkout sum">
            <h3>Order Summary</h3>
            {cart.map((item) => (
              <ul key={item.id}>
                <li key={item.id}>
                  {item.name}: ${item.price} x{item.quantity} = ${" "}
                  {(item.price * item.quantity).toFixed(2)}
                </li>
              </ul>
            ))}
          </div>

          <div>
            <h4>Subtotal: ${subtotal ? subtotal.toFixed(2) : "0.00"}</h4>
            <h4>Taxes (5%): ${taxes ? taxes.toFixed(2) : "0.00"} </h4>

            {/* <hr /> */}

            <h3>
              <strong>Total: ${total ? total.toFixed(2) : "0.00"} </strong>
            </h3>
          </div>

          <button className="plod" onClick={handleCheckout}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
