import App from "next/app";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Layout from "../components/Layout";
import { getCategories } from "../utils/api";
import { ThemeProvider } from "next-themes";
import { Provider } from "../contexts/shoppingCartContext";
import "../styles/index.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const MyApp = ({ Component, pageProps }) => {
  const [cart, setCart] = useLocalStorage([], "shopping_cart");
  const addItem = (item) => setCart((cartItems) => [...cartItems, item]);
  const removeItem = (id) => setCart(cart.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);
  return (
    <Provider value={{ cart, addItem, removeItem, clearCart }}>
      <Layout categories={pageProps.categories}>
        <ThemeProvider defaultTheme="dark">
          <Component {...pageProps} />
        </ThemeProvider>
      </Layout>
    </Provider>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const categories = await getCategories();
  // Pass the data to our page via props
  return { ...appProps, pageProps: { categories, path: ctx.pathname } };
};

export default MyApp;
