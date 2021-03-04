import { getStrapiMedia } from "../utils/medias";
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/router";

const ProductsList = ({ products }) => {
  const router = useRouter();
  return (
    <div className="m-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-8 dark:bg-black">
      {products.map((_product) => (
        <div
          key={_product.id}
          className="border-2 border-gray-900 rounded-lg bg-gray-900 hover:shadow-xl shadow-md col-primary-800"
        >
          <a>
            <div className="cursor-pointer rounded-t-lg bg-gray-800 pb-2">
              <Carousel
                showThumbs={_product.image.length}
                infiniteLoop
                autoPlay
                showStatus={false}
                onClickItem={() => router.push(`/products/${_product.slug}`)}
              >
                {_product.image.map((img) => (
                  <img
                    key={img.hash}
                    className="crop mx-auto"
                    src={getStrapiMedia(img.formats.thumbnail.url)}
                    alt={_product.title}
                  />
                ))}
              </Carousel>
            </div>
            <div className="pl-4 pr-4 pb-4 pt-4 rounded-lg">
              <h4 className="mt-1 font-semibold text-base leading-tight truncate text-gray-300">
                {_product.title}
              </h4>
              <div className="mt-1 text-sm text-gray-200">
                {_product.description}
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
