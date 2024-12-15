import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
     //const { cart } = useContext(CartContext);

  // const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0)
  return (
    <header>
      <h1>Antique Shop Naija</h1>
      <nav className="Nav-links">
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link>Contacts</Link>
        <div className="cart">
          <Link to="/cart">
            Cart <FaShoppingCart size={12} />
            {/* {cart.lenght} */}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
