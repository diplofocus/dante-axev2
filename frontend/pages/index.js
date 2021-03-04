import Head from "next/head";
import ProductsList from "../components/ProductsList";
import { getProducts } from "../utils/api";
import { Provider } from "../contexts/shoppingCartContext";

const HomePage = ({ products }) => {
  return (
    <div className="dark">
      <Provider value={[1]}>
        <Head>
          <title>Dante Axe</title>
        </Head>
        <ProductsList products={products} />
      </Provider>
    </div>
  );
};

export async function getStaticProps() {
  const products = await getProducts();
  return { props: { products }, revalidate: 10 };
}

export default HomePage;
