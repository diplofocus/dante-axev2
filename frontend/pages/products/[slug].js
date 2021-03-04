import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getProducts, getProduct, getFinishes } from "../../utils/api";
import { getStrapiMedia } from "../../utils/medias";
import { Carousel } from "react-responsive-carousel";
import { Consumer } from "../../contexts/shoppingCartContext";

const ProductPage = ({ product, finishes = [], finishOptions }) => {
  const [options, setOptions] = useState({});
  console.log(options);
  const [added, setAdded] = useState(false);
  const currentFinish = options.finish
    ? finishes.find((f) => f.id === options.finish)
    : {};
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
      <Consumer>
        {({ cart, addItem }) => (
          <>
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
                <h4 className="mt-1 font-semibold text-lg leading-tight truncate text-gray-400">
                  {product.title} - ${product.price}
                </h4>
                <div className="mt-1 text-gray-600">{product.description}</div>
                {isBoxProduct(product) && (
                  <BoxForm
                    isCustom={isCustom}
                    setOptions={setOptions}
                    options={options}
                    finishes={finishes}
                  />
                )}
                {isShirt(product) && (
                  <ShirtForm options={options} setOptions={setOptions} />
                )}
              </div>

              {product.status === "published" ? (
                <button
                  onClick={() => {
                    setAdded(true);
                    addItem({
                      ...product,
                      finish: isBoxProduct ? currentFinish : undefined,
                      customDescription:
                        isBoxProduct && isCustom
                          ? options.description
                          : undefined,
                      ...(!isBoxProduct(product) ? options : {}),
                    });
                  }}
                  className={`mt-4 bg-white border border-gray-200 d hover:shadow-lg text-gray-700 font-semibold py-2 px-4 rounded shadow ${
                    validateButton(options, isBoxProduct(product), isCustom)
                      ? "cursor-not-allowed"
                      : ""
                  }`}
                  disabled={validateButton(
                    options,
                    isBoxProduct(product),
                    isCustom
                  )}
                >
                  {getButtonText(
                    options,
                    added,
                    isBoxProduct(product),
                    isCustom
                  )}
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
          </>
        )}
      </Consumer>
    </div>
  );
};

const getButtonText = (options, added, isBoxProduct, isCustom) => {
  if (added) return "Added! Add another?";
  if (isBoxProduct && isCustom && !options.description)
    return "Describe the box you want made";
  if (isBoxProduct && !options.finish) return "Choose a wood finish";
  if (!isBoxProduct && !(options.sex && options.size && options.color))
    return "Fill in all the form fields";
  return "Add to shopping cart";
};

const setFormValue = (setOptions) => (e) =>
  setOptions((opts) => ({
    ...opts,
    [e.target.name]: e.target.value,
  }));

const ShirtForm = ({ setOptions, options }) => (
  <>
    <label className="block my-4">
      <span className="text-gray-300">Sex</span>
      <select
        defaultValue="ph"
        className="form-select block w-full mt-1"
        name="sex"
        onChange={setFormValue(setOptions)}
        value={options.sex}
      >
        <option value="ph" disabled>
          -- Choose a value --
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </label>
    <label className="block my-4">
      <span className="text-gray-300">Size</span>
      <select
        defaultValue="ph"
        className="form-select block w-full mt-1"
        name="size"
        onChange={setFormValue(setOptions)}
        value={options.size}
      >
        <option value="ph" disabled>
          -- Choose a value --
        </option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
        <option value="3XL">3XL</option>
      </select>
    </label>
    <label className="block my-4">
      <span className="text-gray-300">Color</span>
      <select
        defaultValue="ph"
        className="form-select block w-full mt-1"
        name="color"
        onChange={setFormValue(setOptions)}
        value={options.color}
      >
        <option disabled value="ph">
          -- Choose a value --
        </option>
        <option value="black">Black</option>
        <option value="white">White</option>
      </select>
    </label>
  </>
);

const validateButton = (options, isBoxProduct, isCustom) => {
  if (isBoxProduct) {
    if (isCustom) return !(options.finish && options.description);
    return !!!options.finish;
  }
  return !(options.sex && options.size && options.color);
};

const BoxForm = ({ isCustom, setOptions, options, finishes }) => (
  <>
    {isCustom && (
      <label className="block mt-4">
        <span className="text-gray-600">Box Description</span>
        <textarea
          className="form-textarea mt-1 block w-full bg-gray-900 border-gray-800 text-gray-400"
          rows="3"
          placeholder="Describe what you want on your custom box."
          onChange={(e) =>
            setOptions((o) => ({
              ...o,
              description: e.target.value,
            }))
          }
          value={options.description}
        ></textarea>
      </label>
    )}
    <div className="mt-4 text-gray-600 grid grid-cols-2 gap-4">
      {finishes.map((x) => (
        <div className="text-center" key={x.id}>
          <img
            onClick={() => setOptions((o) => ({ ...o, finish: x.id }))}
            key={x.id}
            src={getStrapiMedia(x.FinishImage.url)}
            alt={x.id}
            width="auto"
            height="200px"
            className={
              (options.finish === x.id &&
                "border-solid border-8 border-primary-600") ||
              ""
            }
          />
          <p
            className={
              (options.finish === x.id && "font-semibold text-primary-200") ||
              ""
            }
          >
            {x.Name}
          </p>
        </div>
      ))}
    </div>
  </>
);

export default ProductPage;

const isBoxProduct = (p = { categories: [] }) =>
  (p || { categories: [] }).categories.some((x) =>
    ["boxes", "custom"].includes(x.slug)
  );

const isShirt = (p = { categories: [] }) =>
  p.categories.some((x) => x.slug === "shirts");

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
