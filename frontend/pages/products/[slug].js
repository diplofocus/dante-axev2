import { useState, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getProducts, getProduct, getFinishes } from "../../utils/api";
import { getStrapiMedia } from "../../utils/medias";
import { Carousel } from "react-responsive-carousel";

const ProductPage = ({ product, finishes = [], finishOptions }) => {
  const [finish, setFinish] = useState(null);
  const currentFinish = finishes.find((f) => f.id === finish) || {};
  const isCustom = isCustomBoxProduct(product);
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading category...</div>;
  }

  return (
    <div className="m-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-8">
      <Head>
        <title>{product.title} product</title>
      </Head>
      <div className="rounded-t-lg pt-2 pb-2">
        <Carousel
          showThumbs={product.image.length}
          infiniteLoop
          autoPlay
          showStatus={false}
        >
          {product.image.map((img) => (
            <img
              key={img.hash}
              src={getStrapiMedia(img.url)}
              className="m-auto"
              alt={product.title}
            />
          ))}
        </Carousel>
      </div>
      <div className="w-full p-5 flex flex-col justify-between">
        <div>
          <h4 className="mt-1 font-semibold text-lg leading-tight truncate text-gray-700">
            {product.title} - ${product.price}
          </h4>
          <div className="mt-1 text-gray-600">{product.description}</div>
          {isBoxProduct(product) && (
            <>
              {isCustom && (
                <label className="block mt-4">
                  <span className="text-gray-700">Box Description</span>
                  <textarea
                    className="form-textarea mt-1 block w-full"
                    rows="3"
                    placeholder="Describe what you want on your custom box."
                  ></textarea>
                </label>
              )}
              <div className="mt-4 text-gray-600 grid grid-cols-2 gap-4">
                {finishes.map((x) => (
                  <div className="text-center">
                    <img
                      onClick={() => setFinish(x.id)}
                      key={x.id}
                      src={getStrapiMedia(x.FinishImage.url)}
                      alt={x.id}
                      width="auto"
                      height="200px"
                      className={
                        (finish === x.id &&
                          "border-solid border-8 border-primary-600") ||
                        ""
                      }
                    />
                    <p className={(finish === x.id && " font-semibold") || ""}>
                      {x.Name}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {product.status === "published" ? (
          <button
            className={`snipcart-add-item mt-4 bg-white border border-gray-200 d hover:shadow-lg text-gray-700 font-semibold py-2 px-4 rounded shadow ${
              !finish ? "cursor-not-allowed" : ""
            }`}
            disabled={!!!finish}
            data-api-key={process.env.NEXT_SNIPCART_API_KEY}
            data-item-id={product.id}
            data-item-price={product.price}
            data-item-url={router.asPath}
            data-item-description={product.description}
            data-item-image={getStrapiMedia(
              product.image[0].formats.thumbnail.url
            )}
            data-item-name={product.title}
            v-bind="customFields"
            data-item-custom1-name="Wood finish"
            data-item-custom1-options={finishOptions}
            data-item-custom1-value={currentFinish.Name}
            data-item-custom2-name={isCustom ? "Box description" : undefined}
            data-item-custom2-type={isCustom ? "textarea" : undefined}
            data-item-custom2-value={isCustom ? "textarea" : undefined}
          >
            {!finish ? "Choose a wood finish" : "Add to cart"}
          </button>
        ) : (
          <div className="text-center mr-10 mb-1" v-else>
            <div
              className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
              role="alert"
            >
              <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                Coming soon...
              </span>
              <span className="font-semibold mr-2 text-left flex-auto">
                This article is not available yet.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;

const isBoxProduct = (p = { categories: [] }) =>
  (p || { categories: [] }).categories.some((x) => ["boxes", "custom"].includes(x.slug));

const isCustomBoxProduct = (p = { categories: [] }) =>
  (p || { categories: [] }).categories.some((x) => x.slug === "custom");

export async function getStaticProps({ params }) {
  const product = await getProduct(params.slug);
  const finishes = isBoxProduct(product) ? await getFinishes() : [];
  const finishOptions = finishes.map((f) => f.Name).join("|");
  return { props: { product, finishes, finishOptions } };
}

export async function getStaticPaths() {
  const products = await getProducts();

  return {
    paths: products.map((_product) => {
      return {
        params: { slug: _product.slug },
      };
    }),
    fallback: true,
  };
}
