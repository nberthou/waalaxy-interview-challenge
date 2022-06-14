import { FC } from "react";
import Link from "next/link";

import { Product } from "types";

import styles from "styles/ProductCard.module.css";

type ProductCardProps = {
  product?: Product;
  loading: boolean;
};

const formatString = (
  stringToFormat: string,
  lengthToFormat: number,
  numberOfWords: number
) => {
  return stringToFormat.length > lengthToFormat
    ? `${stringToFormat.split(" ").slice(0, numberOfWords).join(" ")}...`
    : stringToFormat;
};

const ProductCard: FC<ProductCardProps> = ({ product, loading }) => {
  if (product) {
    const formattedPrice = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(product.price);
    const formattedName = formatString(product.name, 15, 2);
    const formattedDescription = formatString(product.description, 50, 12);
    return (
      <Link href={`/products/${product._id}`}>
        <div
          className={`w-full flex justify-center ${
            loading ? "animate-pulse" : ""
          }`}
        >
          <div className={styles.productCard}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              className={styles.productImage}
              alt={product.name}
            />
            <div className="flex justify-between w-full my-3">
              <div className={styles.productName}>{formattedName}</div>
              <div className={styles.productPrice}>{formattedPrice}</div>
            </div>
            <div className={styles.productDescription}>
              {formattedDescription}
            </div>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <div
        className={`w-full flex justify-center animate-pulse`}
      >
        <div className={`${styles.dummyCard} mockCard`}>
          <div className={styles.dummyImage} />
          <div className="flex justify-between w-full my-3">
            <div className={styles.dummyName}></div>
            <div className={styles.dummyPrice}></div>
          </div>
          <div className={styles.dummyDescription}></div>
          <div className={styles.dummyDescription}></div>
          <div className={styles.dummyDescription}></div>
        </div>
      </div>
    );
  }
};

export default ProductCard;
