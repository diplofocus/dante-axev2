import CategoryButtons from "./CategoryButtons";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Consumer } from "../contexts/shoppingCartContext";

const Layout = ({ children, categories }) => {
  return (
    <Consumer>
      {(value) => (
        <div className="flex justify-center bg-gray-200 bg-gray-800">
          <div className="max-w-screen-lg flex flex-col min-h-screen w-full bg-gray-800">
            <Navbar />
            <CategoryButtons categories={categories} />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </div>
      )}
    </Consumer>
  );
};

export default Layout;
