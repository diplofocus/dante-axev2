import Link from "next/link";
import { Consumer } from "../contexts/shoppingCartContext";

const Navbar = () => {
  return (
    <Consumer>
      {({ cart }) => (
        <div className="flex justify-between ml-6 mr-6 mt-4">
          <Link href="/">
            <a>
              <img
                src="/dante.png"
                alt="home"
                className="logo"
                height="150"
                width="150"
              />
            </a>
          </Link>
          <Link className="flex items-center" href="/shoppingCart">
            <a>
              <img src="/cart.svg" alt="Cart" />
              <span className="ml-3 font-semibold text-sm text-indigo-500">
                {cart.length
                  ? cart.reduce((acc, curr) => acc + curr.price, 0).toFixed(2) +
                    "€"
                  : "You have no items in your shopping cart."}
              </span>
            </a>
          </Link>
        </div>
      )}
    </Consumer>
  );
};

export default Navbar;
